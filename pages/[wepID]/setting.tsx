import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ProfileAppBar } from '../../components/Appbar'
import { Box, Divider, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import { ArrowForwardIos, CreditCard, EditNotificationsOutlined, NotificationAdd, NotificationAddOutlined, SvgIconComponent, WorkOutline } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { selectStepState, setStepState } from '../../store/stepSlice'
import { STEP } from '../../store/types'
import { EnterpriseReview } from '../../components/pages/enterprise'

const Settings: NextPage = () => {
  const dispatch = useDispatch()
  const step = useSelector(selectStepState)
  const router = useRouter()
  const {
    query: { wepID }
  } = router

  const [logo, setLogo] = useState("/images/ABC_Logo1.png")
  const [name, setName] = useState("ABC Corporation")
  const [ID, setID] = useState("WEp 1452")
     
  const back = () => {
    router.push(`/${wepID}/dashboard`)
  }

  const companyProfile = () => {
    dispatch(setStepState(STEP.SETTING_COMPANY_REVIEW))
  }
  const notificationSetting = () => {}
  const currency = () => {}

  return (
    <>
      {step == STEP.INDEX && (
        <>
          <ProfileAppBar logo={logo} name={name} ID={ID} back={back} />
          <Box mt={-6} px={2} py={3} sx={{ backgroundColor: "#FFFFFF" }}>
            <Typography variant='h5'>Company setting</Typography>
            <Divider sx={{ mt: 1 }} />
            <List dense={true} sx={{ width: "100%", mt: 0, p: 0 }}>
              <Item Icon={WorkOutline} title="Company Profile" onClick={companyProfile} />
              <Item Icon={EditNotificationsOutlined} title="Notification Settings" onClick={notificationSetting} />
              <Item Icon={CreditCard} title="Currency Settings" optional="USD($)" onClick={currency} />
            </List>
          </Box>
        </>
      )}
      {step == STEP.SETTING_COMPANY_REVIEW && (
        <EnterpriseReview/>
      )}
    </>
  )
}

const Item = ({ Icon, title, optional, onClick }: { Icon: SvgIconComponent, title: string, optional?: string, onClick: Function }) => {
  return (
    <>
      <ListItemButton component="div" sx={{ px: 0, py: 1, }} onClick={ () => { onClick() } }>
        <ListItemAvatar sx={{ minWidth: "0px", mr: 2 }}>
          <Icon htmlColor="#241F21"/>
        </ListItemAvatar>
        <ListItemText primary={title} primaryTypographyProps={{
          fontFamily: 'Montserrat',
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "15px",
          lineHeight: "18px",
          color: "#241F21",
        }} />
        {optional && (
          <ListItemText primary={optional} primaryTypographyProps={{
            textAlign: "right",
            fontFamily: 'Montserrat',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "15px",
            lineHeight: "18px",
            color: "#3D61B0",
          }} />
        )}
        <IconButton edge="end" sx={{ mr: 0 }}>
          <ArrowForwardIos fontSize="small"/>
        </IconButton>
      </ListItemButton>
      <Divider />
    </>
  )
}

export default Settings