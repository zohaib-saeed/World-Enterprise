import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
// import SwipeableViews from 'react-swipeable-views';
import SwipeableViews from 'react-swipeable-views'
import { ProfileAppBar } from '../../components/Appbar'
import { useTheme } from '@mui/material/styles'
import { AppBar, Box, Typography, Tabs, Tab, Avatar, Divider, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { a11yProps, TabPanel } from '../../components/Tab'
import { Transaction } from '../../store/types'
import { CreditCard } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { selectTempEnterpriseState } from '../../store/enterprisesSlice'
import { TransactionDetailModal } from '../../components/dialog';
import { Container } from '@mui/system'
import { TransactionList } from './dashboard'


const Transactions: NextPage = () => {
  const router = useRouter()
  const {
    query: { wepID }
  } = router
  const enterprise = useSelector(selectTempEnterpriseState)

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const [logo, setLogo] = useState("/images/ABC_Logo1.png")
  const [name, setName] = useState("ABC Corporation")
  const [ID, setID] = useState("WEp 1452")
  const [transactions, setTrnasactions] = useState<Transaction[]>([])
   
  useEffect(() => {
    setLogo(enterprise.info.logo)
    setName(enterprise.info.name)
    setID(enterprise.info.wepID || "")
    setTrnasactions(enterprise.transactions)
  }, [enterprise])

  const back = () => {
    router.push(`/${wepID}/dashboard`)
  }

  // Tramsaction View Dialog
  const [trxDlgOpen, setTrxDlgOpen] = useState(false)
  const [trxIdx, setTrxIdx] = useState(-1)
  const trxReject = () => {
    setTrxDlgOpen(false)
  }
  const trxAgree = () => {
    setTrxDlgOpen(false)
  }

  const trxClickHandler = (idx: number) => () => {
    setTrxIdx(idx)
    setTrxDlgOpen(true)
  }


  return (
    <>
      <Box sx={{ bgcolor: "#FFFFFF", width: "100%" }}>
        <AppBar position="absolute" sx={{
          color: "#241F21",
          fontFamily: 'Montserrat',
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "14px",
          lineHeight: "17px",
        }}>
          <ProfileAppBar logo={logo} name={name} ID={ID} back={back} />
          <Tabs
            value={value}
            onChange={handleChange}
            // indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{
              mt: -6,
              backgroundColor: "#FFDB0A",
              '& .MuiTabs-indicator': {
                backgroundColor: "#241F21"
              },
            }}
          >
            <Tab label="All" {...a11yProps(0)} sx={{ p: 0, minWidth: 0, textTransform: "none" }} />
            <Tab label="Sent" {...a11yProps(1)} sx={{ p: 0, minWidth: 0, textTransform: "none" }} />
            <Tab label="Received" {...a11yProps(2)} sx={{ p: 0, minWidth: 0, textTransform: "none" }} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{ height: "100vh" }}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Container sx={{ mt: 27, p: 0 }}>
              <TransactionList transactions={transactions} onClickItem={trxClickHandler} />
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Container sx={{ mt: 27, p: 0 }}>
              <TransactionList transactions={transactions.filter((trx)=>trx.isSend)} onClickItem={trxClickHandler} />
            </Container>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Container sx={{ mt: 27, p: 0 }}>
              <TransactionList transactions={transactions.filter((trx)=>!trx.isSend)} onClickItem={trxClickHandler} />
            </Container>
          </TabPanel>
        </SwipeableViews>

      </Box>
      <TransactionDetailModal
        open={trxDlgOpen}
        handleClose={() => setTrxDlgOpen(false)}
        reject={trxReject}
        agree={trxAgree}
        type={enterprise.transactions[trxIdx] && enterprise.transactions[trxIdx].type || ""}
        category={enterprise.transactions[trxIdx] && enterprise.transactions[trxIdx].category || ""}
        amount={enterprise.transactions[trxIdx] && enterprise.transactions[trxIdx].amount}
        date={enterprise.transactions[trxIdx] && enterprise.transactions[trxIdx].date}
        isSend={enterprise.transactions[trxIdx] && enterprise.transactions[trxIdx].isSend}
      />
    </>
  )
}

export default Transactions