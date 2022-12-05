import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar, Badge, IconButton, InputLabel, Unstable_Grid2 as Grid2, Box,  MenuItem, Button, SelectChangeEvent } from "@mui/material"
import { CameraAlt, Person } from "@mui/icons-material";
import { HelpOutlineOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { CreateAppBar } from "../../Appbar"
import { EnterpriseInfo } from "../../../store/types";
import { Input, Select } from "../../input";
import { selectTempEnterpriseInfoState, setEnterpriseInfoState } from "../../../store/enterprisesSlice";
import { setStepState } from "../../../store/stepSlice";
import { STEP } from "../../../store/types";


const DetailCreate: React.FC = () => {
  const dispatch = useDispatch()
  const enterpriseState: EnterpriseInfo = useSelector(selectTempEnterpriseInfoState)

  const router = useRouter()


  const [enterpriseInfo, setEnterpriseInfo] = useState<EnterpriseInfo>({
    ...enterpriseState,
    wepID: Date.now().toString(),
  })
  
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) return
    console.log(fileObj)
    setEnterpriseInfo((prev: EnterpriseInfo) => {
      return {
        ...prev,
        logo: URL.createObjectURL(fileObj)
      }
    })
    console.log(URL.createObjectURL(fileObj))
  }

  const handleInputChange = (type: string): React.ChangeEventHandler<HTMLInputElement> => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value
    switch (type) {
      case "name":
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            name: value
          }
        })
        break;
      case "tokenName":
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            tokenName: value
          }
        })
        break;
      case "description": 
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            description: value
          }
        })
        break;
      case "address1":
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            address1: value
          }
        })
        break;
      case "address2":
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            address2: value
          }
        })
        break;
      case "zip":
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            zip: value
          }
        })
        break;
      default:
        break;
    }
  }

  const handleSelectChange = (type: string) => (evt: SelectChangeEvent<unknown>) => {
    const value = evt.target.value as string
    switch (type) {
      case "isRegisterd":
        let isRegistered = false
        if (value == "Yes") isRegistered = true
        else isRegistered = false
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            isRegisterd: isRegistered
          }
        })
        break;
      case "type":
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            type: value 
          }
        })
        break;
      case "country":
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
           country: value
          }
        })
        break;
      case "state":
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            state: value 
          }
        })
        break;
      case "city":
        setEnterpriseInfo((prev: EnterpriseInfo) => {
          return {
            ...prev,
            city: value
          }
        })
        break;
      default:
        break;
    }
  }

  const continueHandler = (info: EnterpriseInfo) => () => {
    dispatch(setEnterpriseInfoState(info))
    dispatch(setStepState(STEP.CREATE_SHAREHOLDERS_VIEW))
  }

  const closeHandler = () => {
    dispatch(setStepState(STEP.CREATE_ENTERPRISE_INPUT))
    router.push("/")
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <CreateAppBar
        title="Company Details"
        close={closeHandler}
        helpEnabled={false}
      />
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
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          badgeContent={
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" onChange={handleFileChange}/>
              <Avatar sx={{ width: "24px", height: "24px", backgroundColor: "#FF6142"}}>
                <CameraAlt sx={{ width: "16px", color: "#FFFFFF" }} />
              </Avatar>
            </IconButton>
            // <SmallAvatar alt="Remy Sharp" src="/images/ABC_Logo1.png" />
          }
        >
          <Avatar sx={{ width: "111px", height: "111px" }} >
            {enterpriseInfo.logo != "" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="logo" src={enterpriseInfo.logo} style={{width: "58px"}} />
            ) : (
              <Person sx={{ width: "70px", height: "70px" }}  htmlColor="#4B4749"/>           
            )}
          </Avatar>
        </Badge>
        <Box width="100%" mt={6}>
          <InputLabel shrink htmlFor="name">
            Enterprise Name
          </InputLabel>
          <Input id="name" value={enterpriseInfo.name} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("name") } />
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
          <Input id="tokenName" value={enterpriseInfo.tokenName} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("tokenName") } />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="description">
            Enterprise Description
          </InputLabel>
          <Input id="description" value={enterpriseInfo.description} fullWidth sx={{ mt: 1 }} multiline rows={4} onChange={ handleInputChange("description") } />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="isRegisterd">
            Is this an existing company registered with a government?
          </InputLabel>
          <Select id="isRegisterd" value={enterpriseInfo.isRegisterd ? "Yes" : "No"} fullWidth sx={{  mt: 1 }} itemType="select" onChange={handleSelectChange("isRegisterd")}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="type">
            Type of Company
          </InputLabel>
          <Select id="type" value={enterpriseInfo.type} fullWidth sx={{  mt: 1 }} onChange={handleSelectChange("type")}>
            <MenuItem value="LLC">LLC</MenuItem>
            <MenuItem value="c-corp">c-corp</MenuItem>
            <MenuItem value="s-corp">s-corp</MenuItem>
            <MenuItem value="non-profit">non-profit</MenuItem>
            <MenuItem value="other">other</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="address1">
            Address Line 1 (optional)
          </InputLabel>
          <Input id="address1" value={enterpriseInfo.address1} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("address1") } />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="address2">
            Address Line 2 (optional)
          </InputLabel>
          <Input id="address2" value={enterpriseInfo.address2} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("address2") } />
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="country">
            Country (optional)
          </InputLabel>
          <Select id="country" value={enterpriseInfo.country} fullWidth sx={{  mt: 1 }} onChange={handleSelectChange("country")}>
            <MenuItem value="United States">United States</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="state">
            State (optional)
          </InputLabel>
          <Select id="state" value={enterpriseInfo.state} fullWidth sx={{  mt: 1 }} onChange={handleSelectChange("state")}>
            <MenuItem value="Illinois">Illinois</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="city">
            City (optional)
          </InputLabel>
          <Select id="city" value={enterpriseInfo.city} fullWidth sx={{  mt: 1 }} onChange={handleSelectChange("city")}>
            <MenuItem value="Chicago">Chicago</MenuItem>
          </Select>
        </Box>
        <Box width="100%" mt={3}>
          <InputLabel shrink htmlFor="zip">
            ZIP (optional)
          </InputLabel>
          <Input id="zip" value={enterpriseInfo.zip} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("zip") } />
        </Box>
        
        <Button fullWidth sx={{ mt: 2, mb: 3, }} onClick={continueHandler(enterpriseInfo)}>Continue</Button>
      </Grid2>
    </>
  )
}

export default DetailCreate