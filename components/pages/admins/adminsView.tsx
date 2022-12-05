import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Typography, Unstable_Grid2 as Grid2 } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { AppBar } from "../../Appbar";
import { Admin, STEP } from "../../../store/types";
import { selectAdminsState } from "../../../store/enterprisesSlice";
import { selectStepState, setStepState } from "../../../store/stepSlice";
import AdminsList from "./adminsList";

const AdminsView: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const admins: Admin[] = useSelector(selectAdminsState)
  const stepState = useSelector(selectStepState)

  const backHandler = () => {
    if (stepState == STEP.CREATE_ADMINS_VIEW) dispatch(setStepState(STEP.CREATE_SHAREHOLDERS_VIEW))
    else {
      const {
        query: { wepID }
      } = router
      router.push(`/${wepID}/dashboard`)
    }
  }

  const addHandler = () => {
    if (stepState == STEP.CREATE_ADMINS_VIEW) dispatch(setStepState(STEP.CREATE_ADMIN_ADD))
    else {
      dispatch(setStepState(STEP.ADMIN_ADD))
    }
  }

  const continueHandler = () => {
    if (stepState == STEP.CREATE_ADMINS_VIEW) dispatch(setStepState(STEP.CREATE_PROCESSING))
  }

  return (
    <>
      <AppBar position="absolute" title="Admins" back={backHandler} type={ admins.length == 0 ? "none" : "add"} handle={ admins.length == 0 ? undefined : addHandler } />
      <Grid2
        container
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          p: 0,
          mt: admins.length == 0 ? 0: 9,
        }}
      >
        {admins.length == 0 ? (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              m: 0,
              px: 3,
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
            <Box component="img" src="/images/splash_we_admins.png" alt={"splash"} sx={{
              right: "0",
              mt: "24.89vh",
              width: "min(28.23vh, 53.99vw)",
              height: "min(26.06vh, 49.83vw)",
            }} />
            <Typography variant="h2" sx={{ mt: "min(6.63vh, 12.67vw)" }}>
              Add Admins
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Admins manage the day-to-day of the World Enterprise.
            </Typography>
            <Container sx={{
              position: "absolute",
              bottom: "7vh",
              px: 3,
            }}>
              <Button fullWidth onClick={addHandler}>Add Admins</Button>              
            </Container>
          </Container>
        ) : (
          <AdminsList/>
        )}
      </Grid2>
      {admins.length != 0 && stepState==STEP.CREATE_ADMINS_VIEW && (
        <Box sx={{ mt: 4, mb: 3, px: 3 }}>
          <Button fullWidth onClick={continueHandler}>Create World Enterprise</Button>
        </Box>
      )}
    </>
  )
}

export default AdminsView