import { Container, Divider, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { CreateAppBar } from '../../Appbar'
import OrderList from './orderList'

const OrderBook = () => {
  const router = useRouter()
  const {
    query: { wepID }
  } = router

  const [category, setCategory] = useState<"buy" | "sell">("buy")

  const backHandler = () => {
    router.push(`/${wepID}/dashboard`)
  }
  const switchHandler = () => {
    switch (category) {
      case "buy":
        setCategory("sell")
        break;
      case "sell":
        setCategory("buy")
        break;
      default:
        break;
    }
  }
  return (
    <>
      <CreateAppBar title={'Order Book'} close={backHandler} helpEnabled={false} />
      <Container sx={{ position: "relative", py: 2 }}>
        <Grid component="h2" container onClick={switchHandler}
          sx={{
            width: "100%",
            lineHeight: "40px",
            py: 0,
            my: 0,
            mr: 2,
            ml: 0,
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '15px',
            textAlign: 'center',
            borderRadius: "8px",
            border: "1px solid #E3E8EB",
            cursor: "pointer",
          }}
        >
          <Grid item xs={6} component="div" style={{
            display: "inline-block",
            borderRadius: "8px",
            backgroundColor: category=="buy" ? "#3D61B0" : "#ffffff",
            color: category=="buy" ? "#ffffff" : "#96A3AA",
          }}>
            Buy Orders
          </Grid>
          <Grid item xs={6} component="div" style={{
            display: "inline-block",
            borderRadius: "8px",
            backgroundColor: category=="sell" ? "#3D61B0" : "#ffffff",
            color: category=="sell" ? "#ffffff" : "#96A3AA",
          }}>
            Sell Orders
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container>
        <OrderList type={ category } />
      </Container>
    </>
  )
}

export default OrderBook