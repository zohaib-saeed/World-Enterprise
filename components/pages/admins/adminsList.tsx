import { Divider, List, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAdminsState, setToEditAdminState, removeAdminState } from '../../../store/enterprisesSlice'
import { selectStepState, setStepState } from '../../../store/stepSlice'
import { Admin, STEP } from '../../../store/types'
import { AdminDetailModal } from '../../dialog'

const AdminsList = () => {
  const dispatch = useDispatch()
  const admins: Admin[] = useSelector(selectAdminsState)
  const stepState = useSelector(selectStepState)
  const [idx, setIdx] = useState(-1)

  const [dlgOpened, setDlgOpened] = useState(false)

  const replaceHandler = (idx: number) => () => {
    dispatch(setToEditAdminState(idx))
    switch (stepState) {
      case STEP.CREATE_ADMINS_VIEW:
        dispatch(setStepState(STEP.CREATE_ADMIN_EDIT))
        break;
      
      case STEP.DASHBOARD_MEMBERS:
        dispatch(setStepState(STEP.DASHBOARD_MEMBERS_ADMIN_EDIT))
        break;
    
      default:
        dispatch(setStepState(STEP.ADMIN_EDIT))
        break;
    }
    setDlgOpened(false)
  }

  const removeHandler = (idx: number) => () => {
    switch (stepState) {
      case STEP.CREATE_ADMINS_VIEW:
        dispatch(removeAdminState(idx))
        break;
    
      default:
        dispatch(removeAdminState(idx))
        break;
    }
    setDlgOpened(false)
  }

  return (
    <>
      <List dense={true} sx={{ width: "100%", pt: 2, px: 0 }}>
      {admins.map((s, idx: number) => {
        return (
          <Item key={idx} name={s.fullName || ""} walletAddr={s.walletAddr} isActive={s.isActive} onClick={() => {
            setIdx(idx)
            setDlgOpened(true)
          }} />
        )
      })}
      </List>
      <AdminDetailModal
        open={dlgOpened}
        onClose={() => { setDlgOpened(false) }}
        email={admins[idx] && admins[idx].email || ""}
        phone={admins[idx] && admins[idx].phone || ""}
        walletAddr={admins[idx] && admins[idx].walletAddr || ""}
        replace={replaceHandler(idx)}
        remove={removeHandler(idx)}
      />
    </>
  )
}


export const Item = ({ name, walletAddr, isActive, onClick}: {name: string, walletAddr: string, isActive: boolean, onClick: Function}) => {
  return (
    <>
      <ListItemButton
        component="div"
        sx={{
          px: 3,
          py: 1,
        }}
        onClick={() => { onClick()}}
      >
        <ListItemText
          primary={name}
          secondary={walletAddr}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "18px",
            color: "#241F21",
            textAlign: "left",
          }}
          secondaryTypographyProps={{
            mt: 1,
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            color: "#4B4749",
            textAlign: "left",
            maxWidth: "24ch",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          sx={{
            display: "block",

            width: "100%"
          }}
        />
        <ListItemText
          primary={isActive ? "Active" : "Inactive"}
          secondary={""}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "18px",
            textAlign: "right",
            color: "#4B4749",
          }}
          secondaryTypographyProps={{
            mt: 1,
             fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            textAlign: "right",
            color: "#4B4749"
          }}
          sx={{
            display: "block",
            width: "100%"
          }}
        />
      </ListItemButton>
      <Divider />
    </>
  )
}

export default AdminsList