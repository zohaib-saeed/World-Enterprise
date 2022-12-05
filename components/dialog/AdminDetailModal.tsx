import { Close } from "@mui/icons-material"
import { DialogTitle, IconButton, Divider, DialogContent, DialogActions } from "@mui/material"
import React from "react"
import DetailDialog, { InfoAddr, BtnCancel, Info } from "./DetailDialog"
import Transition from "./Transition"

const AdminDetailModal = ({ open, onClose, email, phone, walletAddr, replace, remove }: { open: boolean, onClose: Function, email: string, phone: string, walletAddr: string, replace: Function, remove: Function }) => {
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
        <span>{"Admin"}</span>
        <IconButton size="small" sx={{ position: "absolute", right: "12px" }} onClick={() => onClose()}>
          <Close htmlColor="#99A7C7" />
        </IconButton>
      </DialogTitle>
      <Divider/>
      <DialogContent>
        <Info label='Email' value={email} />
        <Info label='Phone' value={phone} />
        <InfoAddr label='Wallet' value={walletAddr} />
      </DialogContent>
      <Divider/>
      <DialogActions>
        <BtnCancel onClick={()=>replace()}>Replace</BtnCancel>
        <BtnCancel onClick={()=>remove()}>Remove</BtnCancel>
      </DialogActions>
    </DetailDialog>
  )
}

export default AdminDetailModal