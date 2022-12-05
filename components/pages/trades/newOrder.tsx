import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button, Container, Grid, IconButton, InputAdornment, InputLabel, Link, MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import { Search, QrCode, CurrencyExchange, SyncAlt } from '@mui/icons-material'
import { CreateAppBar } from '../../Appbar'
import { Input, Select } from '../../input'
import { useDispatch } from 'react-redux'
import { setStepState } from '../../../store/stepSlice'
import { Order, STEP } from '../../../store/types'
import { setOrderState } from '../../../store/enterprisesSlice'
import { useWeb3React } from '@web3-react/core'

const NewOrder = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    query: { wepID }
  } = router

  const { account } = useWeb3React()

  // price in USD (token to USD)
  const [price, setPrice] = useState(0)
  const [balance, setBalance] = useState(875)
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState<"buy"|"sell">("buy")

  const handleInputChange = (type: string): React.ChangeEventHandler<HTMLInputElement> => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value
    switch (type) {
      case "amount":
        setAmount(Math.round(Number(value)))
        break;
      case "price":
        setPrice(Number(value))
        break;
      default:
        break;
    }
  }

  const handleSelectChange = (type: string) => (evt: SelectChangeEvent<unknown>) => {
    const value = evt.target.value as string
    switch (type) {
      case "type":
        if (value == "buy" || value == "sell") setType (value)
        break;
      case "moneyType":
        break;

      default:
        break;
    }
  }

  const handleClickShowQR = () => {}

  const closeHandler = () => {
    router.push(`/${wepID}/dashboard`)
  }

  const transferHandler = () => {
    const order: Order = {
      id: Date.now(),
      orderType: type,
      amount: amount,
      price: price,
      date: new Date(),
      maker: account || "",
    } 
    dispatch(setOrderState(order))
    dispatch(setStepState(STEP.DASHBOARD_TRADE_ORDERBOOK))
  }

  const orderBookHandler = () => {
    dispatch(setStepState(STEP.DASHBOARD_TRADE_ORDERBOOK))
  }

  return (
    <>
      <CreateAppBar title="Transfer Shares" close={closeHandler} helpEnabled={false} />
      <Grid container component="main" spacing={2} direction="row" sx={{ px: 3, mt: 2 }}>
        <Grid item xs={6} mt={0}>
          <Select id="type" value={type} fullWidth onChange={handleSelectChange("type")}
            sx={{
              mt: 1,
              backgroundColor: "#3D61B0",
              color: "#FFFFFF",
              "& .MuiSvgIcon-root": {
                color: "#FFFFFF"
              }
            }}
          >
            <MenuItem value="buy">Buy</MenuItem>
            <MenuItem value="sell">Sell</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6} mt={0}>
          <Link onClick={orderBookHandler} sx={{
            display: "block",
            color: "#4B4749",
            fontFamily: 'Montserrat',
            textDecoration: "underline",
            fontWeight: 500,
            fontSize: "15px",
            textAlign: "center",
            py: 2.5,
          }}>View Order Book</Link>
        </Grid>
        <Grid item xs={12} mt={2}>
          <InputLabel shrink htmlFor="amount">Amount of Shares</InputLabel>
          <Input id="amount" type="number" fullWidth onChange={handleInputChange("amount")}
            value={ amount.toFixed() }
          />
          <Typography variant='body1' px={5} sx={{
            fontWeight: "400",
            fontSize: "13px",
            lineHeight: "20px",
            textAlign: "center",
          }}>Balance: { type=="sell" ? balance-amount : balance }</Typography>

        </Grid>
        <Grid item xs={12} mt={2}>
          <InputLabel shrink htmlFor="amount">Price</InputLabel>
          <Input id="amount" type="number" fullWidth onChange={handleInputChange("price")}
            value={price.toFixed(2)}
            startAdornment={<InputAdornment position="start" sx={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "15px",
            }}>$</InputAdornment>}
          />
          <Typography variant='body1' px={5} sx={{
            fontWeight: "400",
            fontSize: "13px",
            lineHeight: "20px",
            textAlign: "center",
          }}>Total to { type == "buy" ? "Send" : "Receive" }: ${(amount*price).toFixed(2)} </Typography>
        </Grid> 
        <Grid item xs={12} sx={{ mt: 2, mb: 3, }}>
          <Button fullWidth onClick={transferHandler}>Transfer</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default NewOrder