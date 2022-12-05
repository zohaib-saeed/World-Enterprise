import React, { useEffect } from 'react'
import Head from 'next/head'
import type { NextPage } from "next"
import { useSelector } from "react-redux"
import { selectStepState } from '../../store/stepSlice'
import { STEP } from '../../store/types'
import { AdminAdd, AdminsView } from '../../components/pages/admins'
import { NewOrder, OrderBook } from '../../components/pages/trades'

const Admins: NextPage = () => {
  const stepState = useSelector(selectStepState)
  return (
    <>
      <Head>
        <title>Trades</title>
        <meta name="description" content="Create" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {stepState == STEP.DASHBOARD_TRADE_ADD && (<NewOrder />)}
      {stepState == STEP.DASHBOARD_TRADE_ORDERBOOK && (<OrderBook />)}
    </>
  )
}

export default Admins