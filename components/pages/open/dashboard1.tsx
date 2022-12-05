import React from "react";
import { useRouter } from 'next/router'
import { Unstable_Grid2 as Grid2, Typography, Button } from '@mui/material'
import { BusinessCenterOutlined, PeopleOutlined, TrendingUp } from '@mui/icons-material';
import LandingInfo from "../../landingInfo";
import { useDispatch } from "react-redux";
import { setJoinState } from "../../../store/enterprisesSlice";

const Dashboard1: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const newHandler = () => {
    router.push("/create")
  }

  const joinHandler = () => {
    dispatch(setJoinState(true))
  }

  return (
    <Grid2
      container
      component="main"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: "0px 27px"
      }}
    >
      <Typography variant="h1" mt={1} textAlign="center">
        World Enterprise
      </Typography>
      <Typography
        variant="h2"
        sx={{
          marginTop: "44px",
          fontSize: "18px",
          lineHeight: "22px",
        }}
      >
        Transform your company into a World Enterprise
      </Typography>
      <Grid2 sx={{
        marginTop: "30px",
      }}>
        <LandingInfo
          Icon={BusinessCenterOutlined}
          title="Add a Company"
          content="Create a new World Enterprise or Transform your existing company into a World Enterprise"
          sx={{}}
          color="#4B4749"
        />
        <LandingInfo
          Icon={PeopleOutlined}
          title="Invite Shareholders"
          content="Invite shareholders to become member of the World Enterprise"
          sx={{ marginTop: "26px" }}
          color="#FF6142"
        />
        <LandingInfo
          Icon={TrendingUp}
          title="Add a Company"
          content="Issue or transfer your custom Enterprise ERC20 tokens to other shareholders"
          sx={{ marginTop: "26px" }}
          color="#3D61B0"
        />
      </Grid2>
      <Button
        fullWidth
        sx={{
          marginTop: "54px",
        }}
        onClick={newHandler}
      >
        Create a World Enterprise
      </Button>
      <Button
        fullWidth
        sx={{ mt: 3 }}
        onClick={joinHandler}
        variant="outlined"
      >
        Join a World Enterprise
      </Button>
    </Grid2>
  )
}

export default Dashboard1