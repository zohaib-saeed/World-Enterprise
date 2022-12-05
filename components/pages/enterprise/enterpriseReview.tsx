import React from "react";
import { Avatar, IconButton, InputLabel, Unstable_Grid2 as Grid2, Box,  MenuItem, Button } from "@mui/material"
import { Person } from "@mui/icons-material";
import { HelpOutlineOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { CreateAppBar } from "../../Appbar"
import { EnterpriseInfo } from "../../../store/types";
import { Input, Select } from "../../input";
import { selectTempEnterpriseInfoState } from "../../../store/enterprisesSlice";
import { selectStepState, setStepState } from "../../../store/stepSlice";
import { STEP } from "../../../store/types";

const DetailCreate: React.FC = () => {
  const enterpriseInfo: EnterpriseInfo = useSelector(selectTempEnterpriseInfoState)
  const step: STEP = useSelector(selectStepState)
  const dispatch = useDispatch()

  const closeHandler = () => {
    switch (step) {
      case STEP.SETTING_COMPANY_REVIEW:
        dispatch(setStepState(STEP.INDEX))
        break;
    
      default:
        break;
    }
  }

  return (
    <>
      <CreateAppBar title="Review Company Details" close={closeHandler} helpEnabled={false} />
      <Grid2
        container
        component="main"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          px: 3,
          mt: 5,
        }}
      >
        <Avatar sx={{ width: "111px", height: "111px" }} >
          {enterpriseInfo.logo != "" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="logo" src={enterpriseInfo.logo} style={{width: "58px"}} />
          ) : (
            <Person sx={{ width: "70px", height: "70px" }}  htmlColor="#4B4749"/>           
          )}
        </Avatar>
        <Box width="100%" mt={6}>
          <InputLabel shrink htmlFor="name">
            Enterprise Name
          </InputLabel>
          <Input id="name" value={enterpriseInfo.name} fullWidth sx={{ mt: 1, }} disabled />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="tokenName">
            Token Name 
            <IconButton
              size="small"
              color="inherit"
            >
              <HelpOutlineOutlined fontSize="small" color="inherit"/>
            </IconButton>
          </InputLabel>
          <Input id="tokenName" value={enterpriseInfo.tokenName} fullWidth sx={{ mt: 1 }} disabled/>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="description">
            Enterprise Description
          </InputLabel>
          <Input id="description" value={enterpriseInfo.description} fullWidth sx={{ mt: 1 }} multiline rows={4} disabled/>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="isRegisterd">
            Is this an existing company registered with a government?
          </InputLabel>
          <Select id="isRegisterd" value={enterpriseInfo.isRegisterd ? "Yes" : "No"} fullWidth sx={{  mt: 1 }} itemType="select" disabled>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="type">
            Type of Company
          </InputLabel>
          <Select id="type" value={enterpriseInfo.type} fullWidth sx={{  mt: 1 }} disabled>
            <MenuItem value="LLC">LLC</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="address1">
            Address Line 1 (optional)
          </InputLabel>
          <Input id="address1" value={enterpriseInfo.address1} fullWidth sx={{ mt: 1 }} disabled/>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="address2">
            Address Line 2 (optional)
          </InputLabel>
          <Input id="address2" value={enterpriseInfo.address2} fullWidth sx={{ mt: 1 }} disabled/>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="country">
            Country (optional)
          </InputLabel>
          <Select id="country" value={enterpriseInfo.country} fullWidth sx={{  mt: 1 }} disabled>
            <MenuItem value="United States">United States</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="state">
            State (optional)
          </InputLabel>
          <Select id="state" value={enterpriseInfo.state} fullWidth sx={{  mt: 1 }} disabled>
            <MenuItem value="Illinois">Illinois</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="city">
            City (optional)
          </InputLabel>
          <Select id="city" value={enterpriseInfo.city} fullWidth sx={{  mt: 1 }} disabled>
            <MenuItem value="Chicago">Chicago</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="zip">
            ZIP (optional)
          </InputLabel>
          <Input id="zip" value={enterpriseInfo.zip} fullWidth sx={{ mt: 1 }} disabled/>
        </Box>
      </Grid2>
    </>
  )
}

export default DetailCreate