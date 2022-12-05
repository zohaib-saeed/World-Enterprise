import React, { useEffect, useState } from 'react'
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CreateAppBar } from "../../components/Appbar";
import { border, Box, Container } from '@mui/system';
import QRCode from 'react-qr-code';
import { IconButton, Typography } from '@mui/material';
import { ContentCopy, Done } from '@mui/icons-material';
import { useWeb3React } from '@web3-react/core';

const Receive: NextPage = () => {
  const { account } = useWeb3React()
  const router = useRouter()
  const {
    query: { wepID }
  } = router
  const [walletAddr, setWalletAddr] = useState(account || "")
  const [copyed, setCopyed] = useState(false)
  
  const closeHandler = () => [
    router.push(`/${wepID}/dashboard`)
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddr || "")
    setCopyed(true)
  }

  useEffect(() => {
    setWalletAddr(account || "")
  }, [account])
  
  return (
    <>
      <CreateAppBar
        title="Receive"
        close={closeHandler}
        helpEnabled={false}
      />
      <Box mx="26px" mt={10} p="54px" component="main" sx={{
        borderRadius: "12px",
        border: "solid 1px #EEEEEE",
      }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={walletAddr}
          viewBox={`0 0 256 256`}
        />
        <Container sx={{ mt: 3, p: 0, display: "flex" }}>
          <Box sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Typography sx={{
              textAlign: "left",
              fontSize: "calc((100vw - 160px)/100*5.6)",
            }}>
              {walletAddr}
            </Typography>
          </Box>
          <IconButton onClick={copyToClipboard}>
            {!copyed ? (
              <ContentCopy sx={{ fontSize: "calc((100vw - 160px)/100*5.6)" }}/>
            ) : (
              <Done sx={{ fontSize: "calc((100vw - 160px)/100*5.6)" }} htmlColor="green"/>
            )}
          </IconButton>
        </Container>
      </Box>
    </>
  )
}

export default Receive