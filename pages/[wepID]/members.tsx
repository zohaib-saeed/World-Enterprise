import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import type { NextPage } from "next"
import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Container, Divider, Grid, Typography, Unstable_Grid2 as Grid2 } from '@mui/material'
import { selectStepState, setStepState } from '../../store/stepSlice'
import { STEP } from '../../store/types'
import { AdminAdd, AdminsList, AdminsView } from '../../components/pages/admins'
import { CreateAppBar } from '../../components/Appbar'
import { useRouter } from 'next/router'
import { ShareholderAdd, ShareholdersList } from '../../components/pages/shareholders'

const Admins: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    query: { wepID }
  } = router
  const stepState = useSelector(selectStepState)

  const [category, setCategory] = useState<"shareholders" | "admins">("shareholders")

  const backHandler = () => {
    router.push(`/${wepID}/dashboard`)
  }

  const switchHandler = () => {
    switch (category) {
      case "admins":
        setCategory("shareholders")
        break;
      case "shareholders":
        setCategory("admins")
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    dispatch(setStepState(STEP.DASHBOARD_MEMBERS))
  }, [])

  return (
    <>
      <Head>
        <title>Members</title>
        <meta name="description" content="Create" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {stepState == STEP.DASHBOARD_MEMBERS && (
        <>
          <CreateAppBar title="Members" close={backHandler} helpEnabled={false} />
          <Container sx={{ position: "relative", py: 2 }}>
            <Grid component="h2" container onClick={switchHandler}
              sx={{
                width: "100%",
                lineHeight: "40px",
                p: 0,
                m: 0,
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '15px',
                textAlign: 'center',
                borderRadius: "8px",
                border: "1px solid #E3E8EB",
                cursor: "pointer",
              }}
            >
              <Grid item xs={6} component="div" style={{
                display: "inline-block",
                borderRadius: "8px",
                backgroundColor: category=="shareholders" ? "#3D61B0" : "#ffffff",
                color: category=="shareholders" ? "#ffffff" : "#96A3AA",
              }}>
                Shareholders
              </Grid>
              <Grid item xs={6} component="div" style={{
                display: "inline-block",
                borderRadius: "8px",
                backgroundColor: category=="admins" ? "#3D61B0" : "#ffffff",
                color: category=="admins" ? "#ffffff" : "#96A3AA",
              }}>
                Admins
              </Grid>
            </Grid>
          </Container>
          <Divider/>
          <Grid2
            container
            component="main"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              px: 1,
              py: 0,
              m: 0,
              // mt: 9,
            }}
          >
            {category == "shareholders" && (
              <ShareholdersList/>
            )}
            {category == "admins" && (
              <AdminsList/>
            )}
          </Grid2>
        </>
      )}
      {stepState == STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT && (
        <ShareholderAdd/>
      )}
      {stepState == STEP.DASHBOARD_MEMBERS_ADMIN_EDIT && (
        <AdminAdd/>
      )}
    </>
  )
}

export default Admins