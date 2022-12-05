import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button, Container, Grid, IconButton, InputAdornment, InputLabel, MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import { Search, QrCode, CurrencyExchange, SyncAlt } from '@mui/icons-material'
import { CreateAppBar } from '../../components/Appbar'
import { Input, Select } from '../../components/input'

const Send: NextPage = () => {
  const router = useRouter()
  const {
    query: { wepID }
  } = router

  const [toAddr, setToAddr] = useState("9f24ac3f8ad5f0738ad5f5e0e441")
  const [numOfShare, setNumOfShare] = useState(200)
  // price in USD (token to USD)
  const [price, setPrice] = useState(21)
  const [balance, setBalance] = useState(875)
  const [shareUnit, setShareUnit] = useState("ABC")
  const [moneyUnit, setMoneyUnit] = useState("USDC")
  const [moneyLst, setMoneyLst] = useState<string[]>(["USDC"])
  const [type, setType] = useState<"share"|"money">("share")

  const handleInputChange = (type: string): React.ChangeEventHandler<HTMLInputElement> => (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value
    switch (type) {
      case "walletAddr":
        setToAddr(value)
        break;
      case "numOfShare":
        setNumOfShare(Number(value))
        break;
      default:
        break;
    }
  }

  const handleSelectChange = (type: string) => (evt: SelectChangeEvent<unknown>) => {
    const value = evt.target.value as string
    switch (type) {
      case "type":
        if (value == "share" || value == "money") setType (value)
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


  const transferHandler = () => { }

  return (
    <>
      <CreateAppBar
        title={(() => {
          if (type == "share") return "Transfer Shares"
          if (type == "money") return "Send Money"
          return ""
        })()}
        close={closeHandler}
        helpEnabled={false}
      />
      <Grid container component="main" spacing={2} direction="row" sx={{ px: 3, mt: 5 }}>
        <Grid item xs={12}>
          <InputLabel shrink htmlFor="sendTo">
            Send to
          </InputLabel>
          <Input id="sendTo" value={toAddr} fullWidth sx={{ mt: 1 }} onChange={handleInputChange("walletAddr")} endAdornment={
            <IconButton
              onClick={handleClickShowQR}
              edge="end"
            >
              <QrCode htmlColor='#3D61B0'/>
            </IconButton>
          } />
        </Grid>
        <Grid item xs={12} mt={2}>
          <InputLabel shrink htmlFor="type">
            Type
          </InputLabel>
          <Select id="type" value={type} onChange={handleSelectChange("type")}
            sx={{
              mt: 1,
              backgroundColor: "#3D61B0",
              color: "#FFFFFF",
              "& .MuiSvgIcon-root": {
                color: "#FFFFFF"
              }
            }}
          >
            <MenuItem value="share">Transfer Shares</MenuItem>
            <MenuItem value="money">Send Money</MenuItem>
          </Select>
        </Grid>
        {type == "money" && (
        <Grid item xs={12} mt={2}>
          <InputLabel shrink htmlFor="moneyType">
            Money Type
          </InputLabel>
          <Select id="moneyType" value={moneyUnit} onChange={handleSelectChange("moneyType")}
            sx={{
              mt: 1,
              backgroundColor: "#3D61B0",
              color: "#FFFFFF",
              "& .MuiSvgIcon-root": {
                color: "#FFFFFF"
              }
            }}
          >
            {moneyLst.map((moneyType, idx) => {
              return (
                <MenuItem key={idx} value={moneyType}>{ moneyType }</MenuItem>
              )
            })}
          </Select>
        </Grid>
        )}
        <Grid item xs={12} mt={2}>
          <InputLabel shrink htmlFor="amount">
            { type == "share" && ("Number of Shares") }
            { type == "money" && ("Amount") }
          </InputLabel>
          <Container sx={{ display: "flex", p: 0, mt: 1, justifyContent: "center", alignItems: "center" }}>
            <Input id="amount" type="number" fullWidth onChange={handleInputChange("numOfShare")}
              value={ numOfShare.toFixed(2) }
            />
            <SyncAlt htmlColor='#3D61B0'/>
            <Input id="amount1" type="number" fullWidth onChange={handleInputChange("numOfShare")} disabled
              value={ (numOfShare * price).toFixed(2)}
              endAdornment={ <InputAdornment position="end">$</InputAdornment>}
             />
          </Container>
        </Grid> 
        <Grid item xs={12} mt={2}>
          <Typography variant='body1' sx={{
            fontWeight: "500",
            fontSize: "15px",
            lineHeight: "18px",
            textAlign: "center",
          }}>Balance: {balance - numOfShare} {type == "money" && (moneyUnit)}{type == "share" && (shareUnit)}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2, mb: 3, }}>
          <Button fullWidth onClick={transferHandler}>Transfer</Button>
        </Grid>
        {type == "share" && (
        <Grid item xs={12} mt={2}>
          <Typography variant='body1' px={5} sx={{
            fontWeight: "400",
            fontSize: "13px",
            lineHeight: "20px",
            textAlign: "center",
          }}>Your shareholding will reduce to {"X"}% after this transfer is approved</Typography>
        </Grid>
        )}
      </Grid>
    </>
  )
}

export default Send