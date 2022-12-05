import { Close } from "@mui/icons-material"
import { DialogTitle, IconButton, Divider, DialogContent, DialogActions } from "@mui/material"
import React from "react"
import DetailDialog, { InfoAddr, BtnCancel, Info } from "./DetailDialog"
import Transition from "./Transition"

const ShareholderDetailModal = ({ open, onClose, firstName, lastName, numOfShares, walletAddr, replace, remove }: { open: boolean, onClose: Function, firstName: string, lastName: string, numOfShares: number, walletAddr: string, replace: Function, remove: Function }) => {
  console.log(numOfShares)
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
        <span>{"Shareholder"}</span>
        <IconButton size="small" sx={{ position: "absolute", right: "12px" }} onClick={() => onClose()}>
          <Close htmlColor="#99A7C7" />
        </IconButton>
      </DialogTitle>
      <Divider/>
      <DialogContent>
        <InfoAddr label='Wallet' value={walletAddr} />
        <Info label='Number of Shares' value={(numOfShares+0).toString()} />
        <Info label='Name' value={`${firstName} ${lastName}`} />
      </DialogContent>
      <Divider/>
      <DialogActions>
        <BtnCancel onClick={()=>replace()}>Replace</BtnCancel>
        <BtnCancel onClick={()=>remove()}>Remove</BtnCancel>
      </DialogActions>
    </DetailDialog>
  )
}

export default ShareholderDetailModal