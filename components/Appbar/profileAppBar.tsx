import { ArrowBack, Person, Settings } from "@mui/icons-material";
import { Box, IconButton, Avatar, Typography } from "@mui/material";
import React from "react";

const ProfileAppBar = ({
  logo,
  name,
  ID,
  back,
  setting,
}: {
  logo: string;
  name: string;
  ID: string;
  back: Function;
  setting?: Function;
}) => {
  return (
    <Box
      component="header"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#FFDB0A", pt: 6, pb: 10 }}
    >
      <IconButton
        sx={{ position: "absolute", left: "10px", top: "40px" }}
        onClick={() => {
          back();
        }}
      >
        <ArrowBack />
      </IconButton>
      {setting && (
        <IconButton
          sx={{ position: "absolute", right: "10px", top: "40px" }}
          onClick={() => {
            setting();
          }}
        >
          <Settings />
        </IconButton>
      )}
      <Avatar sx={{ width: "54px", height: "54px" }}>
        {logo != "" ? (
          <Box component="img" src={logo} sx={{ width: "29px" }} />
        ) : (
          <Person sx={{ width: "29px", height: "29px" }} htmlColor="#4B4749" />
        )}
      </Avatar>
      <Typography
        variant="h2"
        sx={{ fontSize: "16px", lineHeight: "20px", mt: "10px" }}
      >
        {name}
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontSize: "12px",
          fontWeight: "500",
          lineHeight: "15px",
          textAlign: "center",
          mt: "3px",
        }}
      >
        {`Wep ${ID}`}
      </Typography>
    </Box>
  );
};

export default ProfileAppBar;
