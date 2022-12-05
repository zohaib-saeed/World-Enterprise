import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { NextPage } from "next"
import { useDispatch, useSelector } from "react-redux"
import { selectStepState, setStepState } from '../../store/stepSlice'
import { STEP } from '../../store/types'
import { ShareholdersView } from '../../components/pages/shareholders'

const Home: NextPage = () => {
  const router = useRouter()
  const {
    query: { wepID }
  } = router
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
      <ShareholdersView/>
    </>
  )
}

export default Home