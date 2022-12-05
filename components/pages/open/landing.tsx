import React, { useEffect, useState } from "react";
import { Button, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useDispatch } from "react-redux";
import SelectWalletModal from "../../dialog/SelectWalletModal";


const Landing: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const connectHandler = () => {
    setIsOpen(true)
  }

  const Close = () => {
    setIsOpen(false);
  }

  return (
    <Grid
      container
      px={4}
      sx={{
        backgroundColor: "#FFDB0A",
        width: "100vw",
        height: "100vh",
      }}
      alignItems="center"
      justifyContent="center"
      component="main"
    >
      <Box component="img" src="/images/Splash_Element1.png" alt={"SP1"} style={{
        position: "absolute",
        left: "0",
        top: "3.53vh",
        width: "9.65vh",
        height: "30vh"
      }} />
      <Box component="img" src="/images/Splash_Element2.png" alt={"SP2"} style={{
        position: "absolute",
        left: "0",
        top: "27.72vh",
        width: "4.42vh",
        height: "8.83vh",
      }} />
      <Box component="img" src="/images/Splash_Element3.png" alt={"SP3"} style={{
        position: "absolute",
        right: "0",
        top: "0",
        width: "13.4vw",
        height: "9.6vw"
      }} />
      <Box component="img" src="/images/Splash_Element4.png" alt={"SP4"} style={{
        position: "absolute",
        right: "0",
        bottom: "15.83vh",
        width: "8.83vh",
        height: "8.83vh",
      }} />
      <Box component="img" src="/images/Splash_Element5.png" alt={"SP5"} style={{
        position: "absolute",
        right: "0",
        bottom: "7vh",
        width: "8.83vh",
        height: "8.83vh",
      }} />
      <Box component="img" src="/images/WC.png" alt={"WC"} style={{
        marginBottom: "-50vh",
        width: "50vw",
        height: "20.8vw",
      }} />
      <Button
        sx={{
          borderRadius: "75px",
          marginTop: "-15vh",
          backgroundColor: "#1098FC",
          ":hover": {
            backgroundColor: "#0B74BF"
          }
        }}
        fullWidth
        onClick={connectHandler}
      >
        Connect to MetaMask
      </Button>
      <SelectWalletModal isOpen={isOpen} closeModal={Close} />
    </Grid>
  )
}

export default Landing