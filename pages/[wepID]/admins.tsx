import React, { useEffect } from 'react'
import Head from 'next/head'
import type { NextPage } from "next"
import { useSelector } from "react-redux"
import { selectStepState } from '../../store/stepSlice'
import { STEP } from '../../store/types'
import { AdminAdd, AdminsView } from '../../components/pages/admins'

const Admins: NextPage = () => {
  const stepState = useSelector(selectStepState)
  return (
    <>
      <Head>
        <title>Admins</title>
        <meta name="description" content="Create" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(stepState == STEP.ADMIN_ADD || stepState == STEP.ADMIN_EDIT || stepState == STEP.DASHBOARD_ADMIN_EDIT) ? (
        <AdminAdd/>
      ) : (
        <AdminsView/>
      )}
    </>
  )
}

export default Admins