import React, { useEffect } from 'react'
import Head from 'next/head'
import type { NextPage } from "next"
import { Confirm, Final } from '../components/pages/create'
import { EnterpriseCreate, EnterpriseReview } from '../components/pages/enterprise'
import { ShareholderAdd, ShareholdersView } from '../components/pages/shareholders'
import { AdminAdd, AdminsView } from '../components/pages/admins'
import { useDispatch, useSelector } from "react-redux"
import { selectStepState, setStepState } from '../store/stepSlice'
import { STEP } from '../store/types'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const step = useSelector(selectStepState)

  useEffect(() => {
    dispatch(setStepState(STEP.CREATE_ENTERPRISE_INPUT))
  }, [])

  return (
    <>
      <Head>
        <title>Create</title>
        <meta name="description" content="Create" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { step == STEP.CREATE_ENTERPRISE_INPUT && (<EnterpriseCreate/>) }
      { step == STEP.CREATE_SHAREHOLDERS_VIEW && (<ShareholdersView/>) }
      { (step == STEP.CREATE_SHAREHOLDER_ADD || step == STEP.CREATE_SHAREHOLDER_EDIT) && (<ShareholderAdd/>) }
      { step == STEP.CREATE_ADMINS_VIEW && (<AdminsView/>) }
      { (step == STEP.CREATE_ADMIN_ADD || step == STEP.CREATE_ADMIN_EDIT) && (<AdminAdd/>) }
      { step == STEP.CREATE_PROCESSING && (<Confirm/>) }
      { step == STEP.CREATE_SUCCESSED && (<Final/>) }
    </>
  )
}

export default Home