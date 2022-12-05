import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Step,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectStepState, setStepState } from "../../store/stepSlice";
import { STEP } from "../../store/types";
import { AppBar } from "../../components/Appbar";
import { AddCircleOutline, ArrowForward, Close } from "@mui/icons-material";
// import Dialog from '../../components/dialog'
import { AdminAdd } from "../../components/pages/admins";
import { ShareholderAdd } from "../../components/pages/shareholders";
import {
  BtnCancel,
  BtnOK,
  BtnOption,
  DetailDialog,
  InfoAddr,
  InfoVote,
  ProposalDetailModal,
  Transition,
} from "../../components/dialog";
import { Info } from "../../components/dialog";
import { Container } from "@mui/system";
import { selectTempEnterpriseState } from "../../store/enterprisesSlice";

const Proposals: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { wepID },
  } = router;
  const stepState = useSelector(selectStepState);
  const enterprise = useSelector(selectTempEnterpriseState);

  const [proposals, setProposals] = useState<
    {
      type: "admin" | "shareholder";
      walletAddr: string;
      state: boolean;
      percent: number;
    }[]
  >([]);
  const [newOpen, setNewOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [detailOpen, setDetailOpen] = useState(false);

  const backHandler = () => {
    router.push(`/${wepID}/dashboard`);
  };
  // add dialog
  const addHandler = () => {
    setNewOpen(true);
  };

  const newOpenClose = () => {
    setNewOpen(false);
  };

  const adminHandler = () => {
    setNewOpen(false);
    dispatch(setStepState(STEP.PROPOSAL_ADMIN));
  };
  const shareholderHandler = () => {
    setNewOpen(false);
    dispatch(setStepState(STEP.PROPOSAL_SHAREHOLDER));
  };

  // Detail Dialog
  const onClickItem = (i: number) => () => {
    setIdx(i);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const handleReject = () => {
    handleDetailClose();
  };

  const handleAgree = () => {
    handleDetailClose();
  };

  useEffect(() => {
    let proposals: {
      type: "admin" | "shareholder";
      walletAddr: string;
      state: boolean;
      percent: number;
    }[] = [];
    enterprise.proposals.forEach((proposal) => {
      proposals = [
        ...proposals,
        {
          type: proposal.type,
          walletAddr: proposal.walletAddr,
          state: proposal.isApproved,
          percent:
            proposal.votesYes + proposal.votesNo == 0
              ? 0
              : (proposal.votesYes / (proposal.votesYes + proposal.votesNo)) *
                100,
        },
      ];
    });
    setProposals(proposals);
    console.log("I am " + enterprise);
  }, [enterprise]);

  return (
    <>
      <Head>
        <title>Proposals</title>
        <meta name="description" content="Proposals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {stepState == STEP.PROPOSAL_ADMIN && <AdminAdd />}
      {stepState == STEP.PROPOSAL_SHAREHOLDER && <ShareholderAdd />}
      {stepState == STEP.INDEX && (
        <>
          <AppBar
            position="absolute"
            title="Proposals"
            back={backHandler}
            type={proposals.length == 0 ? "none" : "add"}
            handle={proposals.length == 0 ? undefined : addHandler}
          />
          <Grid
            container
            component="main"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              px: 0,
              mt: proposals.length == 0 ? 0 : 9,
            }}
          >
            {proposals.length == 0 ? (
              <IconButton sx={{ marginTop: "50vh" }} onClick={addHandler}>
                <AddCircleOutline htmlColor="#00C9F2" />
              </IconButton>
            ) : (
              <>
                <List dense={true} sx={{ width: "100%", pt: 2, px: 0 }}>
                  {proposals.map((proposal, i) => {
                    return (
                      <Item
                        key={i}
                        type={proposal.type}
                        walletAddr={proposal.walletAddr}
                        state={proposal.state}
                        percent={proposal.percent}
                        onClick={onClickItem(i)}
                      />
                    );
                  })}
                </List>
              </>
            )}
          </Grid>
          <ProposalDetailModal
            open={detailOpen}
            handleClose={handleDetailClose}
            reject={handleReject}
            agree={handleAgree}
            name={
              (enterprise.proposals[idx] && enterprise.proposals[idx].name) ||
              ""
            }
            walletAddr={
              (enterprise.proposals[idx] &&
                enterprise.proposals[idx].walletAddr) ||
              ""
            }
            id={
              (enterprise.proposals[idx] &&
                enterprise.proposals[idx].id.toString()) ||
              ""
            }
            yesNum={
              enterprise.proposals[idx] && enterprise.proposals[idx].votesYes
            }
            noNum={
              enterprise.proposals[idx] && enterprise.proposals[idx].votesNo
            }
          />
          <DetailDialog
            open={newOpen}
            onClose={newOpenClose}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="xl"
          >
            <DialogTitle id="alert-dialog-title">
              <span>{"New Proposal"}</span>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <BtnOption onClick={adminHandler}>
                <span>Add Admin</span>
                <ArrowForward htmlColor="#BCC0C4" />
              </BtnOption>
              <BtnOption onClick={shareholderHandler}>
                <span>Add Shareholder</span>
                <ArrowForward htmlColor="#BCC0C4" />
              </BtnOption>
            </DialogContent>
            <Divider />
            <DialogActions>
              <BtnCancel onClick={newOpenClose}>Cancel</BtnCancel>
            </DialogActions>
          </DetailDialog>
        </>
      )}
    </>
  );
};

export const Item = ({
  type,
  walletAddr,
  state,
  percent,
  onClick,
}: {
  type: "admin" | "shareholder";
  walletAddr: string;
  state: boolean;
  percent: number;
  onClick: Function;
}) => {
  return (
    <>
      <ListItemButton
        component="div"
        sx={{
          px: 3,
          py: 1,
        }}
        onClick={() => {
          onClick();
        }}
      >
        <ListItemText
          primary={type == "admin" ? "Add Admin" : "Add Member"}
          secondary={walletAddr}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "18px",
            color: "#241F21",
            textAlign: "left",
          }}
          secondaryTypographyProps={{
            mt: 1,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            color: "#4B4749",
            textAlign: "left",
            maxWidth: "24ch",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          sx={{
            display: "block",
            width: "100%",
          }}
        />
        <ListItemText
          primary={state ? "Approved" : "Pending Vote"}
          secondary={`${percent.toFixed(2)}%`}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "18px",
            color: (() => {
              if (state) return "#36D233";
              else return "#FF2A00";
            })(),
            textAlign: "right",
          }}
          secondaryTypographyProps={{
            mt: 1,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            color: (() => {
              if (percent > 50) return "#36D233";
              else return "#FF2A00";
            })(),
            textAlign: "right",
          }}
          sx={{
            display: "block",
            width: "100%",
          }}
        />
      </ListItemButton>
      <Divider />
    </>
  );
};

export default Proposals;
