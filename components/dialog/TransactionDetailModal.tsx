import { Close } from '@mui/icons-material'
import { DialogTitle, IconButton, Divider, DialogContent, Container, DialogActions } from '@mui/material'
import React from 'react'
import DetailDialog, { InfoAddr, InfoVote, BtnCancel, BtnOK, Info } from './DetailDialog'
import Transition from './Transition'

const ProposalDetailModal = ({open, handleClose, reject, agree, type, category, amount, date, isSend} : {open: boolean, handleClose: Function, reject: Function, agree: Function, type: string, category: string, amount: number, date: Date, isSend: boolean}) => {
  return (
    <DetailDialog
      open={open}
      onClose={()=>handleClose()}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title">
        <span>{"Transaction Detail"}</span>
        <IconButton size="small" sx={{ position: "absolute", right: "12px" }} onClick={()=>handleClose()}>
          <Close htmlColor="#99A7C7" />
        </IconButton>
      </DialogTitle>
      <Divider/>
      <DialogContent>
        <Info label='Type' value={type} />
        <Info label='Category' value={`${category} (${isSend ? "send": "receive"})`} />
        <Info label='Amount' value={(amount==undefined ? 0 : amount).toString()} />
        <Info label='Date' value={date==undefined ? "" : date.toLocaleString('en-us', {day: 'numeric', month: 'short', year: 'numeric'})} />
      </DialogContent>
      <Divider/>
      <DialogActions>
        <BtnCancel onClick={()=>reject()}>Reject</BtnCancel>
        <BtnOK onClick={()=>agree()}>
          Agree
        </BtnOK>
      </DialogActions>
    </DetailDialog>
  )
}

export default ProposalDetailModal