import React, { useEffect, useState } from "react";
import {
  InputLabel,
  Grid as Grid2,
  // Unstable_Grid2 as Grid2,
  Button,
  IconButton,
} from "@mui/material"
import { AppBar } from "../../Appbar"
import {  Shareholder } from "../../../store/types";
import { Input } from "../../input";
import { addShareholderState, replaceShareholderState, selectShareholdersState, selectToEditShareholderState } from "../../../store/enterprisesSlice";
import { selectStepState, setStepState } from "../../../store/stepSlice";
import { useDispatch, useSelector } from "react-redux";
import { STEP } from "../../../store/types";
import { QrCode } from "@mui/icons-material";
import { QRScanModal } from "../../dialog";


const ShareholderAdd: React.FC = () => {
  const dispatch = useDispatch()
  const stepState = useSelector(selectStepState)
  const shareholdersState = useSelector(selectShareholdersState)
  const toEditState = useSelector(selectToEditShareholderState)


  const [shareholder, setShareholder] = useState<Shareholder>({
    walletAddr: "",
    numOfShare: 0,
    firstName: "",
    lastName: "",
  })

  // QR code
  const [qrScanOpen, setQrScanOpen] = useState(false)

  const handleClickShowQR = () => {
    setQrScanOpen(true)
  }

  const closeQRScaner = () => {
    setQrScanOpen(false)
  }

  const qrHandler = (addr: string) => {
    setShareholder((prev: Shareholder) => {
      return {
        ...prev,
        walletAddr: addr
      }
    })
  }

  
  const handleInputChange = (type: string): React.ChangeEventHandler<HTMLInputElement> => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value
    switch (type) {
      case "walletAddr":
        setShareholder((prev: Shareholder) => {
          return {
            ...prev,
            walletAddr: value
          }
        })
        break;
      case "numOfShare":
        setShareholder((prev: Shareholder) => {
          return {
            ...prev,
            numOfShare: Number(value)
          }
        })
        break;
      case "firstName": 
        setShareholder((prev: Shareholder) => {
          return {
            ...prev,
            firstName: value
          }
        })
        break;
      case "lastName":
        setShareholder((prev: Shareholder) => {
          return {
            ...prev,
            lastName: value
          }
        })
        break;
      default:
        break;
    }
  }

  const continueHandler = (info: Shareholder) => () => {
    switch (stepState) {
      case STEP.CREATE_SHAREHOLDER_ADD:
        dispatch(addShareholderState(info))
        dispatch(setStepState(STEP.CREATE_SHAREHOLDERS_VIEW))
        break;
      case STEP.CREATE_SHAREHOLDER_EDIT:
        dispatch(replaceShareholderState(info))
        dispatch(setStepState(STEP.CREATE_SHAREHOLDERS_VIEW))
        break;
      case STEP.PROPOSAL_SHAREHOLDER:
        // TODO: store new shareholder proposal in the redux store.
        dispatch(setStepState(STEP.INDEX))
        break;
      case STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT:
        dispatch(replaceShareholderState(info))
        dispatch(setStepState(STEP.DASHBOARD_MEMBERS))
        break;
      default:
        break;
    }
  }

  const backHandler = () => {
    switch (stepState) {
      case STEP.CREATE_SHAREHOLDER_ADD:
      case STEP.CREATE_SHAREHOLDER_EDIT:
        dispatch(setStepState(STEP.CREATE_SHAREHOLDERS_VIEW))
        break;
      case STEP.PROPOSAL_SHAREHOLDER:
        dispatch(setStepState(STEP.INDEX))
        break;
      case STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT:
        dispatch(setStepState(STEP.DASHBOARD_MEMBERS))
        break;
      default:
        break;
    }
    if (stepState == STEP.CREATE_SHAREHOLDER_ADD || stepState == STEP.CREATE_SHAREHOLDER_EDIT) dispatch(setStepState(STEP.CREATE_SHAREHOLDERS_VIEW))
  }

  useEffect(() => {
    console.log(toEditState)
    if (stepState == STEP.CREATE_SHAREHOLDER_EDIT || stepState == STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT) {
      const original = shareholdersState.at(toEditState)
      if (original) {
        setShareholder(original)
      }
    }
  }, [])
  

  return (
    <>
      <AppBar position="sticky" title={(() => {
        switch (stepState) {
          case STEP.CREATE_SHAREHOLDER_ADD:
          case STEP.PROPOSAL_SHAREHOLDER:
            return "Add Shareholder"
          case STEP.CREATE_SHAREHOLDER_EDIT:
          case STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT:
            return "Replace Shareholder"
          default: return "Shareholder"
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
          </InputLabel>
          <Input id="walletAddr" value={shareholder.walletAddr} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("walletAddr") } endAdornment={
            <IconButton
              onClick={handleClickShowQR}
              edge="end"
            >
              <QrCode/>
            </IconButton>
          } />
        </Grid2>
        <Grid2 item xs={12} mt={4}>
          <InputLabel shrink htmlFor="numOfShare">
            Number of Shares
          </InputLabel>
          <Input id="numOfShare" value={shareholder.numOfShare.toString()} type="number" fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("numOfShare") } />
        </Grid2> 
        <Grid2 item xs={6} mt={7}>
          <InputLabel shrink htmlFor="firstName">
            First Name (optional)
          </InputLabel>
          <Input id="firstName" value={shareholder.firstName} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("firstName") } />
        </Grid2> 
        <Grid2 item xs={6} mt={7}>
          <InputLabel shrink htmlFor="lastName">
            Last Name (optional)
          </InputLabel>
          <Input id="lastName" value={shareholder.lastName} fullWidth sx={{ mt: 1 }} onChange={ handleInputChange("lastName") } />
        </Grid2> 
        <Grid2 item xs={12}>
          <Button fullWidth sx={{ mt: 7, mb: 3, }} onClick={continueHandler(shareholder)}>{(() => { 
            switch (stepState) {
              case STEP.CREATE_SHAREHOLDER_ADD:
              case STEP.PROPOSAL_SHAREHOLDER:
                return "Add Shareholder"
              case STEP.CREATE_SHAREHOLDER_EDIT:
              case STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT:
                return "Replace Shareholder"
              default: return "Shareholder"
            }
          })()}</Button>
        </Grid2>
      </Grid2>
      <QRScanModal open={ qrScanOpen } onClose={closeQRScaner} qrHandler={qrHandler} />
    </>
  )
}

export default ShareholderAdd