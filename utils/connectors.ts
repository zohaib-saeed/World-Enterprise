import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

const walletConnect = new WalletConnectConnector({
  rpc: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org", 
  qrcode: true,
})

const walletLink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  appName: "world-enterprise",
})

export const connectors = {
  injected: injected,
  walletConnect: walletConnect,
  coinbaseWallet: walletLink,
}