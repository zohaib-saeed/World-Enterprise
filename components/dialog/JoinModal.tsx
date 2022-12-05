import { Close } from "@mui/icons-material"
import { DialogTitle, IconButton, Divider, DialogContent, DialogActions } from "@mui/material"
import React, { useState } from "react"
import DetailDialog, { InfoAddr, BtnCancel, Info, InfoInput } from "./DetailDialog"
import Transition from "./Transition"

const JoinModal = ({ open, onClose, name, shareToBuy, offerPrice, request }: { open: boolean, onClose: Function, name: string, shareToBuy: number, offerPrice: number, request: Function }) => {
  const [toBuy, SetToBuy] = useState(0)
  const handleInputChange = (type: string): React.ChangeEventHandler<HTMLInputElement> => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value
    switch (type) {
      case "toBuy":
        SetToBuy(Number(value))
        break;
      default:
        break;
    }
  }
  return (
    <DetailDialog
      open={open}
      onClose={() => onClose()}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title">
        <span>{"Join World Enterprise"}</span>
        <IconButton size="small" sx={{ position: "absolute", right: "12px" }} onClick={() => onClose()}>
          <Close htmlColor="#99A7C7" />
        </IconButton>
      </DialogTitle>
      <Divider/>
      <DialogContent>
        <Info label='Enterprise Name' value={name} />
        <InfoInput label="Shares To Buy" type="number" value={toBuy.toFixed()} onChange={handleInputChange("toBuy")} />
        <Info label='Offer Price' value={`$${offerPrice.toFixed(2)}`} />
        <Info label='Total' value={`$${(toBuy*offerPrice).toFixed(2)}`} />
      </DialogContent>
      <Divider/>
      <DialogActions>
        <BtnCancel onClick={()=>request()}>Send Request</BtnCancel>
      </DialogActions>
    </DetailDialog>
  )
}

export default JoinModal