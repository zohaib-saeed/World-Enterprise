import React, { useEffect } from "react";
import { Grid, Typography, Box } from '@mui/material'
import { Container } from "@mui/system";
import { PropagateLoader } from 'react-spinners'
import { useDispatch } from "react-redux";
import { setStepState } from "../../../store/stepSlice";
import { STEP } from "../../../store/types";

const Confirm: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(setStepState(STEP.CREATE_SUCCESSED))
    }, 5000)
  }, [])
  
  return (
    <Container sx={{
      height: "100vh",
      padding: "20px",
    }}>
      <Grid
        container
        direction="row"
        component="main"
        spacing={2}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid item container alignContent="center" justifyContent="center">
          <Box component="img" src="/images/Briefcase.png" />
        </Grid>
        <Grid item container alignContent="center" justifyContent="center" mb={1}>
          <PropagateLoader color="#FFDB0A" loading/>
        </Grid>
        <Grid item container alignContent="center" justifyContent="center">
          <Typography variant="body2">creating the world enterprise on the blockchain</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Confirm