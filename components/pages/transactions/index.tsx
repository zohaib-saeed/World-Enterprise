
import React, { useState } from "react";
import {
  // Grid as Grid2,
  Unstable_Grid2 as Grid2,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material"
import { ArrowBack, Person } from "@mui/icons-material";


const Transactions: React.FC = () => {
  const [logo, setLogo] = useState("/images/ABC_Logo1.png")
  const [name, setName] = useState("ABC Corporation")
  const [ID, setID] = useState("WEp 1452")

  return (
    <Box component="main" sx={{ backgroundColor: "#F2F2F2" }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ backgroundColor: "#FFDB0A", pt: 6, pb: 10 }}>
        <IconButton sx={{ position: "absolute", left: "10px", top: "40px" }}>
          <ArrowBack/>
        </IconButton>
        <Avatar sx={{ width: "54px", height: "54px" }}>
          {logo != "" ? (
            <Box component="img" src={logo} sx={{ width: "29px" }} />
          ) : (
            <Person sx={{ width: "29px", height: "29px" }} htmlColor="#4B4749"/>
          ) }
        </Avatar>
        <Typography variant="h2" sx={{ fontSize: "16px", lineHeight: "20px", mt: "10px" }}>
          {name}
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "12px", fontWeight: "500", lineHeight: "15px", textAlign: "center", mt: "3px" }}>
          {ID}
        </Typography>
      </Box>
      <Grid2 px={2} pb={3} mt={-9} spacing={5}>

      </Grid2>
    </Box>
  )
}

export default Transactions