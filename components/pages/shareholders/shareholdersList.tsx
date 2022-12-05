import React, { useEffect, useState } from 'react'
import { List, Divider, ListItemButton, ListItemText } from '@mui/material'
import { Shareholder, STEP } from '../../../store/types'
import { ShareholderDetailModal } from '../../dialog'
import { useDispatch, useSelector } from 'react-redux'
import { selectShareholdersState, setToEditShareholderState, removeShareholderState } from '../../../store/enterprisesSlice'
import { selectStepState, setStepState } from '../../../store/stepSlice'

const ShareholdersList = () => {
  const dispatch = useDispatch()
  const shareholdersState: Shareholder[] = useSelector(selectShareholdersState)
  const stepState = useSelector(selectStepState)

  const [ totalNum, setTotalNum ] = useState(0)
  const [ totalPercent, setTotalPercent ] = useState(0)
  const [shareholders, setShareholders] = useState<{
    name: string,
    walletAddr: string,
    numOfShare: number,
    percent: number,
  }[]>([])

  const [idx, setIdx] = useState(-1)
  const [dlgOpened, setDlgOpened] = useState(false)

  const replaceHandler = (idx: number) => () => {
    dispatch(setToEditShareholderState(idx))
    switch (stepState) {
      case STEP.CREATE_SHAREHOLDERS_VIEW:
        dispatch(setStepState(STEP.CREATE_SHAREHOLDER_EDIT))    
        break;
      
      case STEP.DASHBOARD_MEMBERS:
        dispatch(setStepState(STEP.DASHBOARD_MEMBERS_SHAREHOLDER_EDIT))    
        break;
    
      default:
        break;
    }
  }

  const removeHandler = (idx: number) => () => {
    dispatch(removeShareholderState(idx))
  }

  
  useEffect(() => {
    let total = 0
    shareholdersState.forEach((s: Shareholder) => {
      total += s.numOfShare
    })
    setTotalNum(total)
    setTotalPercent(100)
    setShareholders([])
    shareholdersState.map((s: Shareholder) => {
      setShareholders((prev) => {
        return [
          ...prev,
          {
            name: s.firstName + " " + s.lastName,
            walletAddr: s.walletAddr,
            numOfShare: s.numOfShare,
            percent: total > 0 ? (s.numOfShare / total) * 100 : 0
          }
        ]
      })
    })
  }, [shareholdersState])

  return (
    <>
      <List dense={true} sx={{ width: "100%", pt: 2, px: 0 }}>
        <Item name="Total Shares" walletAddr="Total Ownership" numOfShare={totalNum} percent={totalPercent} numColor="#3D61B0" percentColor="#42B03D"/>  
        {shareholders.map((s, idx: number) => {
          return (
            <Item key={idx} name={s.name} walletAddr={s.walletAddr} numOfShare={s.numOfShare} percent={s.percent} numColor="#241F21" percentColor="#4B4749" onClick={() => {
              setIdx(idx)
              setDlgOpened(true)
            }} />
          )
        })}
      </List>
      <ShareholderDetailModal
        open={dlgOpened}
        onClose={() => { setDlgOpened(false) }}
        firstName={shareholdersState[idx] && shareholdersState[idx].firstName || ""}
        lastName={shareholdersState[idx] && shareholdersState[idx].lastName || ""}
        numOfShares={shareholdersState[idx] && (shareholdersState[idx].numOfShare == undefined ? 0 : shareholdersState[idx].numOfShare)}
        walletAddr={shareholdersState[idx] && shareholdersState[idx].walletAddr || "" }
        replace={replaceHandler(idx)}
        remove={removeHandler((idx))}
      />
    </>
  )
}

export const Item = ({ name, walletAddr, numOfShare, percent, numColor, percentColor, onClick}: {name: string, walletAddr: string, numOfShare: number, percent: number, numColor: string, percentColor: string, onClick?: Function}) => {
  return (
    <>
      <ListItemButton
        component="div"
        sx={{
          px: 3,
          py: 1,
        }}
        onClick={() => { if (onClick) { onClick() }  }}
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
          primary={numOfShare}
          secondary={percent.toFixed(2) + "%"}
          primaryTypographyProps={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "18px",
            textAlign: "right",
            color: numColor,
          }}
          secondaryTypographyProps={{
            mt: 1,
             fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            textAlign: "right",
            color: percentColor
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

export default ShareholdersList