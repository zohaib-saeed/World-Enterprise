import React, { useEffect, useState } from "react";
import {
  InputLabel,
  Grid as Grid2,
  // Unstable_Grid2 as Grid2,
  Button,
  IconButton,
} from "@mui/material"
import { QrCode, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppBar } from "../../Appbar"
import {  Admin } from "../../../store/types";
import { Input } from "../../input";
import { replaceAdminState, selectAdminsState, selectToEditAdminState, addAdminState } from "../../../store/enterprisesSlice";
import { setStepState, selectStepState } from "../../../store/stepSlice";
import { STEP } from "../../../store/types";
import { QRScanModal } from "../../dialog";


const AdminAdd: React.FC = () => {
  const dispatch = useDispatch()
  const stepState = useSelector(selectStepState)
  const adminsState = useSelector(selectAdminsState)
  const toEditState = useSelector(selectToEditAdminState)

  const [admin, setAdmin] = useState<Admin>({
    walletAddr: "",
    isActive: true,
    fullName: "",
    email: "",
    phone: "",
  })
  const [qrScanOpen, setQrScanOpen] = useState(false)
  
  const handleInputChange = (type: string): React.ChangeEventHandler<HTMLInputElement> => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value
    switch (type) {
      case "walletAddr":
        setAdmin((prev: Admin) => {
          return {
            ...prev,
            walletAddr: value
          }
        })
        break;
      case "fullName":
        setAdmin((prev: Admin) => {
          return {
            ...prev,
            fullName: value
          }
        })
        break;
      case "email": 
        setAdmin((prev: Admin) => {
          return {
            ...prev,
            email: value
          }
        })
        break;
      case "phone":
        setAdmin((prev: Admin) => {
          return {
            ...prev,
            phone: value
          }
        })
        break;
      default:
        break;
    }
  }

  const continueHandler = (info: Admin) => () => {
    switch (stepState) {
      case STEP.CREATE_ADMIN_ADD:
        dispatch(addAdminState(info))
        dispatch(setStepState(STEP.CREATE_ADMINS_VIEW))
        break;
      case STEP.CREATE_ADMIN_EDIT:
        dispatch(replaceAdminState(info))
        dispatch(setStepState(STEP.CREATE_ADMINS_VIEW))
        break;
      case STEP.ADMIN_ADD:
        dispatch(addAdminState(info))
        dispatch(setStepState(STEP.INDEX))
        break;
      case STEP.ADMIN_EDIT:
        dispatch(replaceAdminState(info))
        dispatch(setStepState(STEP.INDEX))
      case STEP.PROPOSAL_ADMIN:
        // TODO: add new admin proposal on the redux store
        dispatch(setStepState(STEP.INDEX))
        break;
      case STEP.DASHBOARD_ADMIN_EDIT:
        dispatch(replaceAdminState(info))
        dispatch(setStepState(STEP.INDEX))
        break;
      case STEP.DASHBOARD_MEMBERS_ADMIN_EDIT:
        dispatch(replaceAdminState(info))
        dispatch(setStepState(STEP.DASHBOARD_MEMBERS))
        break;
      default:
        break;
    }
  }

  const backHandler = () => {
    switch (stepState) {
      case STEP.CREATE_ADMIN_ADD:
      case STEP.CREATE_ADMIN_EDIT:
        dispatch(setStepState(STEP.CREATE_ADMINS_VIEW))
        break;
      case STEP.ADMIN_ADD:
      case STEP.ADMIN_EDIT:
      case STEP.PROPOSAL_ADMIN:
      case STEP.DASHBOARD_ADMIN_EDIT:
        dispatch(setStepState(STEP.INDEX))
        break;
      case STEP.DASHBOARD_MEMBERS_ADMIN_EDIT:
        dispatch(setStepState(STEP.DASHBOARD_MEMBERS))
        break;
      default:
        break;
    }
  }

  const handleClickShowQR = () => {
    setQrScanOpen(true)
  }

  const closeQRScaner = () => {
    setQrScanOpen(false)
  }

  const qrHandler = (addr: string) => {
    setAdmin((prev: Admin) => {
      return {
        ...prev,
        walletAddr: addr
      }
    })
  }


  const handleSearchShareholder = () => {

  }

  useEffect(() => {
    switch (stepState) {
      case STEP.CREATE_ADMIN_EDIT:
      case STEP.ADMIN_EDIT:
      case STEP.DASHBOARD_ADMIN_EDIT:
      case STEP.DASHBOARD_MEMBERS_ADMIN_EDIT:
        const original = adminsState.at(toEditState)
        if (original) {
          setAdmin(original)
        }
        break;
      default:
        break;
    }
  }, [])

  return (
    <>
      <AppBar position="sticky" title={(() => {
        switch (stepState) {
          case STEP.CREATE_ADMIN_ADD:
          case STEP.ADMIN_ADD:
          case STEP.PROPOSAL_ADMIN:
            return "Add Admin"
          case STEP.CREATE_ADMIN_EDIT:
          case STEP.ADMIN_EDIT:
          case STEP.DASHBOARD_ADMIN_EDIT:
          case STEP.DASHBOARD_MEMBERS_ADMIN_EDIT:
            return "Replace Admin"
          default:
            return ""
        }
      })()} back={backHandler} handle={() => { }} type="help" />
      <Grid2
        container
        component="main"
        spacing={2}
        direction="row"
        sx={{
          px: 3,
          mt: 5,
        }}
      >
        <Grid2 item xs={12}>
          <InputLabel shrink htmlFor="walletAddr">
            Wallet Address
            <Button variant="outlined" size="small" startIcon={<Search sx={{ marginRight: "-5px" }} />} sx={{
              color: "#3D61B0",
              float: "right",
              fontFamily: "Montserrat",
              fontSize: "14px",
              p: 0,
              backgroundColor: "#ffffff",
              ":hover": {
                backgroundColor: "#ffffff"
              }
            }} onClick={handleSearchShareholder}
            >
              Shareholders
            </Button>
          </InputLabel>
          <Input id="walletAddr" value={admin.walletAddr} fullWidth sx={{ mt: 1 }} onChange={handleInputChange("walletAddr")} endAdornment={
            <IconButton
              onClick={handleClickShowQR}
              edge="end"
            >
              <QrCode/>
            </IconButton>
          } />
        </Grid2>
        <Grid2 item xs={12} mt={2}>
          <InputLabel shrink htmlFor="fullName">
            Full Name (optional)
          </InputLabel>
          <Input id="fullName" value={admin.fullName} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("fullName") } />
        </Grid2> 
        <Grid2 item xs={12} mt={2}>
          <InputLabel shrink htmlFor="email">
            Email (optional)
          </InputLabel>
          <Input id="email" value={admin.email} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("email") } />
        </Grid2> 
        <Grid2 item xs={12} mt={2}>
          <InputLabel shrink htmlFor="phone">
            Phone (optional)
          </InputLabel>
          <Input id="phone" value={admin.phone} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("phone") } />
        </Grid2> 
        <Grid2 item xs={12}>
          <Button fullWidth sx={{ mt: 2, mb: 3, }} onClick={continueHandler(admin)}>
            {(stepState == STEP.CREATE_ADMIN_ADD || stepState == STEP.ADMIN_ADD || stepState == STEP.PROPOSAL_ADMIN) && ("Add Admin")}
            {(stepState == STEP.CREATE_ADMIN_EDIT || stepState == STEP.ADMIN_EDIT || stepState == STEP.DASHBOARD_ADMIN_EDIT || stepState == STEP.DASHBOARD_MEMBERS_ADMIN_EDIT) && ("Replace Admin")}
          </Button>
        </Grid2>
      </Grid2>
      <QRScanModal open={ qrScanOpen } onClose={closeQRScaner} qrHandler={qrHandler} />
    </>
  )
}

export default AdminAdd