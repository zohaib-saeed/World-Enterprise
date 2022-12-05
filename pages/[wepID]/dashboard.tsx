import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  // Grid as Grid2,
  Unstable_Grid2 as Grid2,
  Button,
  IconButton,
  Typography,
  Box,
  Avatar,
  MenuItem,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  ListItem,
  List,
  SxProps,
  Theme,
} from "@mui/material";
import {
  Add,
  ArrowBack,
  BarChart,
  ChevronRight,
  Comment,
  CreditCard,
  Groups,
  Money,
  PermIdentity,
  Person,
  PieChart,
  ShowChart,
  SvgIconComponent,
  VerticalAlignBottom,
  VerticalAlignTop,
} from "@mui/icons-material";
import { Container } from "@mui/system";
import { Select } from "../../components/input";
import { useDispatch, useSelector } from "react-redux";
import { selectStepState, setStepState } from "../../store/stepSlice";
import { Admin, Transaction, STEP } from "../../store/types";
import { ProfileAppBar } from "../../components/Appbar";
import {
  AdminDetailModal,
  ProposalDetailModal,
  TransactionDetailModal,
} from "../../components/dialog";
import {
  setToEditShareholderState,
  removeAdminState,
  replaceAdminState,
  selectTempEnterpriseState,
  setToEditAdminState,
} from "../../store/enterprisesSlice";

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { wepID },
  } = router;
  const dispatch = useDispatch();
  const stepState = useSelector(selectStepState);
  const enterprise = useSelector(selectTempEnterpriseState);

  const [logo, setLogo] = useState(enterprise.info.logo);
  const [name, setName] = useState(enterprise.info.name);
  const [ID, setID] = useState(enterprise.info.wepID);
  const [treasury, setTreasury] = useState(8350);
  const [sharedValue, setSharedValue] = useState(4520);
  const [myShare, setMyShare] = useState(3550);
  const [totalShare, setTotalShare] = useState(20000);
  const [totalMembers, setTotalMembers] = useState(252);
  const [proposals, setProposals] = useState<
    {
      id: number;
      name: string;
      type: "admin" | "shareholder";
      yesPercent: number;
      totalPercent: number;
    }[]
  >([]);
  const [transactions, setTrnasactions] = useState<Transaction[]>([]);
  const [admins, setAdmins] = useState<Admin[]>(enterprise.admins);

  useEffect(() => {
    dispatch(setStepState(STEP.INDEX));
  }, []);

  useEffect(() => {
    console.log(enterprise);
    setAdmins(enterprise.admins);
    // proposals
    let proposals: {
      id: number;
      name: string;
      type: "admin" | "shareholder";
      yesPercent: number;
      totalPercent: number;
    }[] = [];
    let totalVotes = 1000;
    enterprise.proposals.forEach((proposal, idx) => {
      proposals = [
        ...proposals,
        {
          id: idx,
          name: proposal.name,
          type: proposal.type,
          yesPercent:
            proposal.votesYes + proposal.votesNo == 0
              ? 0
              : (proposal.votesYes / (proposal.votesYes + proposal.votesNo)) *
                100,
          totalPercent:
            totalVotes == 0 ? 0 : (proposal.votesYes / totalVotes) * 100,
        },
      ];
    });
    setProposals(proposals);
    // transactions
    setTrnasactions(enterprise.transactions);
  }, [enterprise]);

  const back = () => {
    router.push("/");
  };

  const setting = () => {
    router.push(`/${wepID}/setting`);
  };

  const send = () => {
    router.push(`/${wepID}/send`);
  };

  const receive = () => {
    router.push(`/${wepID}/receive`);
  };

  const trade = () => {
    dispatch(setStepState(STEP.DASHBOARD_TRADE_ADD));
    router.push(`/${wepID}/trades`);
  };

  const allMembers = () => {
    router.push(`/${wepID}/members`);
  };

  const proposalsAll = () => {
    router.push(`/${wepID}/proposals`);
  };

  const trxAll = () => {
    router.push(`/${wepID}/transactions`);
  };

  const adminAdd = () => {
    dispatch(setStepState(STEP.ADMIN_ADD));
    router.push(`/${wepID}/admins`);
  };

  const adminsAll = () => {
    router.push(`/${wepID}/admins`);
  };

  const adminClickHandler = (idx: number) => () => {
    setAdminIdx(idx);
    setAdminDlgOpen(true);
  };

  const proposalClickHandler = (idx: number) => () => {
    setProposalIdx(idx);
    setProposalDlgOpen(true);
  };

  const trxClickHandler = (idx: number) => () => {
    setTrxIdx(idx);
    setTrxDlgOpen(true);
  };

  // Admin View Dialog
  const [adminDlgOpen, setAdminDlgOpen] = useState(false);
  const [adminIdx, setAdminIdx] = useState(-1);
  const adminReplaceHandler = (idx: number) => () => {
    dispatch(setToEditAdminState(idx));
    dispatch(setStepState(STEP.DASHBOARD_ADMIN_EDIT));
    router.push(`/${wepID}/admins`);
    setAdminDlgOpen(false);
  };
  const adminRemoveHndler = (idx: number) => () => {
    dispatch(removeAdminState(idx));
    setAdminDlgOpen(false);
  };

  // Porposal View Dialog
  const [proposalDlgOpen, setProposalDlgOpen] = useState(false);
  const [proposalIdx, setProposalIdx] = useState(-1);
  const proposalReject = () => {
    setProposalDlgOpen(false);
  };
  const proposalAgree = () => {
    setProposalDlgOpen(false);
  };

  // Tramsaction View Dialog
  const [trxDlgOpen, setTrxDlgOpen] = useState(false);
  const [trxIdx, setTrxIdx] = useState(-1);
  const trxReject = () => {
    setTrxDlgOpen(false);
  };
  const trxAgree = () => {
    setTrxDlgOpen(false);
  };

  return (
    <>
      <Head>
        <title>{wepID}</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" sx={{ backgroundColor: "#F2F2F2" }}>
        <ProfileAppBar
          logo={logo}
          name={name}
          ID={ID || ""}
          back={back}
          setting={setting}
        />
        <Grid2 px={2} pb={3} mt={-9} spacing={5} component="main">
          <Grid2 sx={{ background: "#ffffff", borderRadius: "8px" }}>
            <Grid2 container px="15px" py="18px">
              <Grid2 xs={6}>
                <Typography variant="body1">Treasury</Typography>
                <Container
                  sx={{
                    mt: "5px",
                    p: 0,
                    display: "flex",
                    color: "#3D61B0",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "20px",
                      mr: "4px",
                    }}
                  >
                    $
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "29px",
                    }}
                  >
                    {treasury.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </Typography>
                </Container>
                <Select
                  id="assets"
                  value="All assets"
                  sx={{
                    mt: "5px",
                    alignItems: "flex-end",
                    "& .MuiSelect-select": {
                      height: "18px",
                      // "-webkit-text-fill-color": "#4B4749",
                      WebkitTextFillColor: "#4B4749",
                      backgroundColor: "#FFFFFFFF",
                      borderColor: "#FFFFFFFF",
                      p: 0,
                      fontSize: "12px",
                      fontWeight: "400",
                      lineHeight: "15px",
                    },
                  }}
                >
                  <MenuItem value="All assets">All assets</MenuItem>
                </Select>
              </Grid2>
              <Grid2 xs={6}>
                <Typography variant="body1">Share Value</Typography>
                <Container
                  sx={{
                    mt: "5px",
                    p: "0!important",
                    display: "flex",
                    color: "#3D61B0",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "20px",
                      mr: "4px",
                    }}
                  >
                    $
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "29px",
                    }}
                  >
                    {sharedValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </Typography>
                </Container>
                <Typography
                  mt="5px"
                  variant="body1"
                  sx={{ height: "18px", alignItems: "flex-end" }}
                >
                  1ABC=$1.25
                  <Button
                    variant="outlined"
                    sx={{
                      p: 0,
                      ml: 1,
                      height: "16px",
                      width: "21px",
                      minWidth: "0px",
                      backgroundColor: "#FFFFFFFF",
                      border: "1px solid #E3E8EB",
                      ":hover": {
                        backgroundColor: "#FFFFFFFF",
                        border: "1px solid #E3E8EB",
                      },
                    }}
                  >
                    <ShowChart
                      fontSize="small"
                      htmlColor="#00C9F2"
                      sx={{ height: "18px" }}
                    />
                  </Button>
                </Typography>
              </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container p="15px" spacing={2} onClick={allMembers}>
              <Grid2
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                xs={4}
              >
                <InfoCard
                  LogoIcon={BarChart}
                  title="My Shares"
                  num={myShare}
                  secNum={(myShare / totalShare) * 100}
                />
              </Grid2>
              <Grid2
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                xs={4}
              >
                <InfoCard
                  LogoIcon={PieChart}
                  title="Total Shares"
                  num={totalShare}
                />
              </Grid2>
              <Grid2
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                xs={4}
              >
                <InfoCard
                  LogoIcon={Groups}
                  title="Total Members"
                  num={totalMembers}
                />
              </Grid2>
            </Grid2>
            <Grid2 container p="0px 15px 15px 15px" spacing={2}>
              <Grid2
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                xs={4}
              >
                <InfoButton
                  BtnIcon={VerticalAlignTop}
                  BtnText="Send"
                  onClick={send}
                />
              </Grid2>
              <Grid2
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                xs={4}
              >
                <InfoButton
                  BtnIcon={VerticalAlignBottom}
                  BtnText="Receive"
                  onClick={receive}
                />
              </Grid2>
              <Grid2
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                xs={4}
              >
                <InfoButton BtnIcon={Money} BtnText="Trade" onClick={trade} />
              </Grid2>
            </Grid2>
          </Grid2>
          {/* Proposals */}
          <Section
            key="proposals"
            title="Proposals to approve"
            seeAll={proposalsAll}
            sx={{ height: "140px", overflow: "auto" }}
          >
            <List>
              {proposals.map((v, i) => {
                return (
                  <>
                    <ListItemButton
                      key={`proposals-${i}`}
                      sx={{
                        px: 0,
                        pt: 1,
                        pb: proposals.length - 1 == i ? 0 : 1,
                        width: "100%",
                      }}
                      onClick={proposalClickHandler(i)}
                    >
                      <ListItemText
                        primary={v.name}
                        secondary={(() => {
                          switch (v.type) {
                            case "admin":
                              return "New Admin Request";
                            case "shareholder":
                              return "New Shareholder Request";
                            default:
                              return "";
                          }
                        })()}
                        primaryTypographyProps={{
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                          fontWeight: "500",
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
                        }}
                        sx={
                          {
                            // display: "block",
                            // width: "100%"
                          }
                        }
                      />
                      <ListItemText
                        primary={v.yesPercent.toFixed(2) + "%"}
                        secondary={v.totalPercent.toFixed(2) + "%"}
                        primaryTypographyProps={{
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "15px",
                          lineHeight: "18px",
                          textAlign: "right",
                          color: "#42B03D",
                        }}
                        secondaryTypographyProps={{
                          mt: 1,
                          fontFamily: "Montserrat",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "15px",
                          textAlign: "right",
                          color: "#FF6142",
                        }}
                        sx={
                          {
                            // display: "block",
                            // width: "100%"
                          }
                        }
                      />
                    </ListItemButton>
                    {proposals.length - 1 != i && (
                      <Divider key={`proposals-divider-${i}`} />
                    )}
                  </>
                );
              })}
            </List>
          </Section>
          {/* Recent transactions */}
          <Section
            key="trx"
            title="Recent Transactions"
            seeAll={trxAll}
            sx={{ height: "130px", overflow: "auto" }}
          >
            <TransactionList
              transactions={transactions}
              onClickItem={trxClickHandler}
            />
          </Section>
          <Section
            key="admins"
            title={`Admins (${admins.length})`}
            seeAll={adminsAll}
            addNew={adminAdd}
          >
            {/* <Grid2 container spacing={2} xs={12} mt={2}> */}
            <Box overflow="auto" whiteSpace="nowrap">
              {admins.map((admin, idx) => {
                return (
                  // <Grid2 key={idx} display="flex" flexDirection="column" justifyContent="center" alignItems="center" xs={4}>
                  <Box
                    key={idx}
                    sx={{
                      display: "inline-flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      // width: "120px",
                      m: 2,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={adminClickHandler(idx)}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: "#FAFBFC",
                        width: "68px",
                        height: "68px",
                        borderColor: "#FFFFFFFF",
                      }}
                    >
                      <PermIdentity
                        htmlColor="#4B4749"
                        sx={{ width: "30px", height: "30px" }}
                      />
                    </Avatar>
                    52/
                    <Typography
                      variant="body1"
                      sx={{ mt: 1, lineHeight: "15px", alignItems: "flex-end" }}
                    >
                      {admin.fullName}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        alignItems: "flex-end",
                        color: admin.isActive ? "#42B03D" : "#979797",
                      }}
                    >
                      &#x2022; {admin.isActive ? "Active" : "Pending"}
                    </Typography>
                  </Box>
                  // </Grid2>
                );
              })}
            </Box>
            {/* </Grid2> */}
          </Section>
        </Grid2>
      </Box>
      <AdminDetailModal
        open={adminDlgOpen}
        onClose={() => {
          setAdminDlgOpen(false);
        }}
        email={(admins[adminIdx] && admins[adminIdx].email) || ""}
        phone={(admins[adminIdx] && admins[adminIdx].phone) || ""}
        walletAddr={(admins[adminIdx] && admins[adminIdx].walletAddr) || ""}
        replace={adminReplaceHandler(adminIdx)}
        remove={adminRemoveHndler(adminIdx)}
      />
      <ProposalDetailModal
        open={proposalDlgOpen}
        handleClose={() => setProposalDlgOpen(false)}
        reject={proposalReject}
        agree={proposalAgree}
        name={
          (enterprise.proposals[proposalIdx] &&
            enterprise.proposals[proposalIdx].name) ||
          ""
        }
        walletAddr={
          (enterprise.proposals[proposalIdx] &&
            enterprise.proposals[proposalIdx].walletAddr) ||
          ""
        }
        id={
          (enterprise.proposals[proposalIdx] &&
            enterprise.proposals[proposalIdx].id.toString()) ||
          ""
        }
        yesNum={
          enterprise.proposals[proposalIdx] &&
          enterprise.proposals[proposalIdx].votesYes
        }
        noNum={
          enterprise.proposals[proposalIdx] &&
          enterprise.proposals[proposalIdx].votesNo
        }
      />
      <TransactionDetailModal
        open={trxDlgOpen}
        handleClose={() => setTrxDlgOpen(false)}
        reject={trxReject}
        agree={trxAgree}
        type={
          (enterprise.transactions[trxIdx] &&
            enterprise.transactions[trxIdx].type) ||
          ""
        }
        category={
          (enterprise.transactions[trxIdx] &&
            enterprise.transactions[trxIdx].category) ||
          ""
        }
        amount={
          enterprise.transactions[trxIdx] &&
          enterprise.transactions[trxIdx].amount
        }
        date={
          enterprise.transactions[trxIdx] &&
          enterprise.transactions[trxIdx].date
        }
        isSend={
          enterprise.transactions[trxIdx] &&
          enterprise.transactions[trxIdx].isSend
        }
      />
    </>
  );
};

const InfoCard = ({
  LogoIcon,
  title,
  num,
  secNum,
}: {
  LogoIcon: SvgIconComponent;
  title: string;
  num: number;
  secNum?: number;
}) => {
  return (
    <>
      <Avatar
        sx={{
          backgroundColor: "#FAFBFC",
          width: "68px",
          height: "68px",
          borderColor: "#FFFFFFFF",
        }}
      >
        <LogoIcon htmlColor="#4B4749" sx={{ width: "30px", height: "30px" }} />
      </Avatar>
      <Typography
        variant="body1"
        sx={{ mt: 1, height: "18px", alignItems: "flex-end" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="#3D61B0"
        sx={{
          fontWeight: "600",
          fontSize: "16px",
          height: "20px",
          lineHeight: "20px",
          alignItems: "flex-end",
        }}
      >
        {num.toLocaleString(undefined)}
        {secNum && (
          <span
            style={{
              marginLeft: "5px",
              color: "#42B03D",
              fontFamily: "Montserrat",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "10px",
              lineHeight: "12px",
              textAlign: "center",
            }}
          >
            {secNum.toFixed(2)}%
          </span>
        )}
      </Typography>
    </>
  );
};

const InfoButton = ({
  BtnIcon,
  BtnText,
  onClick,
}: {
  BtnIcon: SvgIconComponent;
  BtnText: string;
  onClick: Function;
}) => {
  return (
    <Button
      onClick={() => onClick()}
      startIcon={<BtnIcon />}
      fullWidth
      sx={{
        backgroundColor: "#3D61B014",
        color: "#3D61B0",
        fontSize: "12px",
        py: 1,
        mt: 0,
        ":hover": { backgroundColor: "#3D61B024" },
      }}
    >
      {BtnText}
    </Button>
  );
};

const Section = ({
  children,
  title,
  seeAll,
  addNew,
  sx,
}: {
  children: ReactNode;
  title: string;
  seeAll: Function;
  addNew?: Function;
  sx?: SxProps;
}) => {
  return (
    <Grid2 sx={{ background: "#ffffff", borderRadius: "8px", p: 2, mt: 3 }}>
      <Typography variant="h5">
        {title}
        {addNew && (
          <IconButton
            onClick={() => {
              addNew();
            }}
            sx={{
              backgroundColor: "#FFFFFFFF",
              border: "0",
              ":hover": {
                backgroundColor: "#FFFFFFFF",
                border: "0",
              },
              color: "#3D61B0",
              p: 0,
            }}
          >
            <Add htmlColor="#3D61B0" />
          </IconButton>
        )}
        <Button
          variant="outlined"
          endIcon={<ChevronRight htmlColor="#3D61B0" />}
          onClick={() => {
            seeAll();
          }}
          sx={{
            backgroundColor: "#FFFFFFFF",
            border: "0",
            ":hover": {
              backgroundColor: "#FFFFFFFF",
              border: "0",
            },
            color: "#3D61B0",
            p: 0,
            float: "right",
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "17px",
          }}
        >
          See all
        </Button>
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Container sx={{ m: 0, p: 0, ...sx }}>{children}</Container>
    </Grid2>
  );
};

export const TransactionList = ({
  transactions,
  onClickItem,
}: {
  transactions: Transaction[];
  onClickItem: Function;
}) => {
  return (
    <>
      {transactions.map((trx, i) => {
        return (
          <>
            <ListItemButton
              key={i}
              component="div"
              sx={{
                px: 0,
                pt: 1,
                pb: transactions.length - 1 == i ? 0 : 1,
                width: "100%",
              }}
              onClick={onClickItem(i)}
            >
              <ListItemAvatar>
                <Avatar sx={{ width: "40px", height: "40px" }}>
                  <CreditCard htmlColor="#4B4749" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={trx.type}
                secondary={trx.category}
                primaryTypographyProps={{
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "500",
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
                }}
                sx={
                  {
                    // display: "block",
                    // width: "100%"
                  }
                }
              />
              <ListItemText
                primary={trx.amount.toLocaleString(undefined)}
                secondary={trx.date.toLocaleString("en-us", {
                  day: "numeric",
                  month: "short",
                  year: "2-digit",
                })}
                primaryTypographyProps={{
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "17px",
                  textAlign: "right",
                  color: "#4B4749",
                }}
                secondaryTypographyProps={{
                  mt: 1,
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "10px",
                  lineHeight: "12px",
                  textAlign: "right",
                  color: "#4B4749",
                }}
              />
            </ListItemButton>
            {transactions.length - 1 != i && <Divider key={`divider${i}`} />}
          </>
        );
      })}
    </>
  );
};

export default DashboardPage;
