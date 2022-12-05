import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography, Unstable_Grid2 as Grid2 } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { AppBar } from "../../Appbar";
import { STEP, Shareholder } from "../../../store/types";
import { selectShareholdersState } from "../../../store/enterprisesSlice";
import { selectStepState } from "../../../store/stepSlice";
import { setStepState } from "../../../store/stepSlice";
import { Container } from "@mui/system";
import ShareholdersList from "./shareholdersList";

const ShareholdersView: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const shareholdersState: Shareholder[] = useSelector(selectShareholdersState)
  const stepState = useSelector(selectStepState)

  const backHandler = () => {
    if (stepState == STEP.CREATE_SHAREHOLDERS_VIEW) dispatch(setStepState(STEP.CREATE_ENTERPRISE_INPUT))
    else router.back()
  }

  const addHandler = () => {
    if (stepState == STEP.CREATE_SHAREHOLDERS_VIEW) dispatch(setStepState(STEP.CREATE_SHAREHOLDER_ADD))
    else dispatch(setStepState(STEP.SHAREHOLDER_ADD))
  }

  const continueHandler = () => {
    dispatch(setStepState(STEP.CREATE_ADMINS_VIEW))
  }

  return (
    <>
      <AppBar position="absolute" title="Shareholders" back={backHandler} type={ shareholdersState.length == 0 ? "none" : "add"} handle={ shareholdersState.length == 0 ? undefined : addHandler } />
      <Grid2
        container
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          px: 3,
          mt: shareholdersState.length == 0 ? 0: 9,
        }}
      >
        {shareholdersState.length == 0 ? (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              m: 0,
              p: 0,
            }}
          >
            <Box component="img" src="/images/Splash_Element6.png" alt={"SP6"} sx={{
              position: "absolute",
              right: "0",
              top: "14.18vh",
              width: "min(8.34vh, 15.96vw)",
              height: "min(13.03vh, 24.93vw)",
            }} />
            <Box component="img" src="/images/Splash_Element7.png" alt={"SP6"} sx={{
              position: "absolute",
              left: "0",
              bottom: "min(22.7vh, 43.42vw)",
              width: "min(8.34vh, 15.96vw)",
              height: "min(16.68vh, 31.92vw)",
            }} />
            <Box component="img" src="/images/splash_we_members.png" alt={"splash"} sx={{
              right: "0",
              mt: "24.89vh",
              width: "min(28.23vh, 53.99vw)",
              height: "min(26.06vh, 49.83vw)",
            }} />
            <Typography variant="h2" sx={{ mt: "min(6.63vh, 12.67vw)" }}>
              Add Shareholders
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Shareholders own equity and vote on proposals for the World Enterprise.
            </Typography>
            <Container sx={{
              position: "absolute",
              bottom: "7vh",
              px: 3,
            }}>
              <Button
                fullWidth
                sx={{
                  // mt: "min(19.19vh, 36.7vw)",
                  // mx: 3,
                }}
                onClick={addHandler}
              >
                Add Shareholders
              </Button>              
            </Container>
          </Container>
        ) : (
          <>
            <ShareholdersList/>  
            {stepState == STEP.CREATE_SHAREHOLDERS_VIEW && (
              <Button fullWidth sx={{ mt: 4, mb: 3, }} onClick={continueHandler}>Continue to Add Admins</Button>
            )}  
          </>
        )}
      </Grid2>
    </>
  )
}

export default ShareholdersView