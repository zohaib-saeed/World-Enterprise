import { ListItemButton, ListItemText, Divider, List } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import admins from '../../../pages/[wepID]/admins'
import { removeAdminState, selectOrderState, setToEditAdminState } from '../../../store/enterprisesSlice'
import { selectStepState, setStepState } from '../../../store/stepSlice'
import { Order, STEP } from '../../../store/types'
import { AdminDetailModal, OrderDetailModal } from '../../dialog'

const OrderList = ({ type }: { type: "buy"|"sell" }) => {
  const dispatch = useDispatch()
  const orders: Order[] = useSelector(selectOrderState)
  const stepState = useSelector(selectStepState)
  const [idx, setIdx] = useState(-1)

  const [dlgOpened, setDlgOpened] = useState(false)

  const acceptHandler = () => {

  }

  useEffect(() => {
    console.log(orders)
  }, [orders])

  const onClickItem = (id: number) => () => {
    setIdx(id)
    setDlgOpened(true)
  }

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
        {
          orders
            .filter((order) => order.orderType == type)
            .sort((a, b) => type == "buy" ? (a.price >= b.price ? -1 : 1) : (a.price <= b.price ? -1 : 1))
            .map((order, idx) => {
              return (
                <Item key={idx} price={order.price} type={order.orderType} amount={order.amount} onClick={onClickItem(order.id)} />
              )
            })
        }
      </List>
      <OrderDetailModal
        open={dlgOpened}
        onClose={() => { setDlgOpened(false) }}
        order={orders.find((order) => { console.log(`${idx} ${order.id}`); return order.id == idx})}
        accept={acceptHandler}
      />
    </>
  )
}

export const Item = ({ price, type, amount, onClick}: { price: number, type: "buy" | "sell", amount: number, onClick: Function}) => {
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
          primary={`$${price} per share`}
          secondary={`${(() => {
            switch (type) {
              case "sell": return "Sell";
              case "buy": return "Buy";
              default: return "";
            }
          })()} Order`}
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
          }}
          sx={{
            display: "block",
            width: "100%"
          }}
        />
        <ListItemText
          primary={`${amount} shares`}
          secondary={`$${amount * price}`}
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


export default OrderList