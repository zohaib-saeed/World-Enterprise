import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Box, DialogContent, Divider, Icon } from '@mui/material';
import { useWeb3React } from "@web3-react/core";
import detectEthereumProvider from '@metamask/detect-provider';
import { connectors } from "../../utils/connectors";
import DetailDialog, { BtnCancel, BtnOption } from './DetailDialog';
import { ArrowForward, WindowSharp } from '@mui/icons-material';
import Transition from './Transition';
import { ethers } from 'ethers';


export default function SelectWalletModal({isOpen, closeModal }: {isOpen: boolean, closeModal: Function }) {
  const { activate } = useWeb3React()

  const setProvider = (type: string) => {
    window.localStorage.setItem("provider", type);
  };

  function openUrl(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_self";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  const walletConnectHandler = (type: "coinbase" | "metamask") => async () => {
    const provider = await detectEthereumProvider()
    console.log(provider)
    console.log(`${process.env.NEXT_PUBLIC_APP_SCHEME}://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_APP_DOMAIN}`)

    // var window: any
    console.log(navigator.userAgent, provider)
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) &&
      !provider
    ) {
      
      switch (type) {
        case "coinbase":
          openUrl(`https://go.cb-w.com/dapp?cb_url=${process.env.NEXT_PUBLIC_APP_SCHEME}%3A%2F%2F${process.env.NEXT_PUBLIC_APP_DOMAIN}}%2F`)
          // window.open(`https://go.cb-w.com/dapp?cb_url=${process.env.NEXT_PUBLIC_APP_SCHEME}%3A%2F%2F${process.env.NEXT_PUBLIC_APP_DOMAIN}}%2F`);
          break;
        case "metamask":
          openUrl(`https://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_APP_DOMAIN}/`)
          // window.location.href=`https://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_APP_DOMAIN}/`
          // window.open(`https://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_APP_DOMAIN}/`);
          break;
        default:
          break;
      }
      console.error("Please install metamask")
    } else {
      switch (type) {
        case "coinbase":
          await activate(connectors.coinbaseWallet);
          setProvider("coinbaseWallet")
          break;
        case "metamask":
          await activate(connectors.injected);
          setProvider("injected")
          break;
        default:
          break;
      }
    }
    closeModal()
  }
  
  return (
    <div>
      <DetailDialog
        open={isOpen}
        onClose={() => { closeModal() }}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          <span>{"Select Wallet"}</span>
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <BtnOption onClick={walletConnectHandler("coinbase")}>
            <Avatar variant="square" src="/images/coinbase.png" sx={{ width: 25, height: 25, mr: 1 }} />
            <span>Coinbase Wallet</span>
            <ArrowForward htmlColor='#BCC0C4'/>
          </BtnOption>
          <BtnOption>
            <Avatar variant="square" src="/images/metamask.png" sx={{ width: 25, height: 25, mr: 1 }} />
            <a href={`https://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_APP_DOMAIN}/`}>Metamask Wallet</a>
            <ArrowForward htmlColor='#BCC0C4'/>
          </BtnOption>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <BtnCancel onClick={() => { closeModal() }}>Close</BtnCancel>
        </DialogActions>
      </DetailDialog>
    </div>
  );
}