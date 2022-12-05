import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { wrapper } from "../store/store"
import { ethers } from 'ethers'
import { Web3ReactProvider } from '@web3-react/core'

import '../styles/globals.css'
import '../styles/font.css'
import Head from 'next/head'

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000
  return library
}

export function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        </Head>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
    </ThemeProvider>
  )
}

export default wrapper.withRedux(App)

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#1098FC',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat",
          color: "#ffffff",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "19.5px",
          textTransform: "none",
          paddingTop: "15px",
          paddingBottom: "15px",
          backgroundColor: "#3D61B0",
          ":hover": {
            backgroundColor: "#2F4B87",
          },
        },
        outlined: {
          color: "#3D61B0",
          backgroundColor: "#ffffff",
          border: "solid 1px #3D61B0",
          ":hover": {
            borderColor: "#2F4B87",
            backgroundColor: "#ffffff",  
          },
        }
      },
      defaultProps: {
        variant: "contained",
        size: "medium",
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: 'h3',
          subtitle2: 'h3',
          body1: 'p',
          body2: 'p',
        }
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: "#ffffff",
          color: "#000000",
          width: "55px",
          height: "55px",
          border: "1px solid #E3E8EB",
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#FAFBFC",
          borderColor: "#FFFFFFFF",
          border: "0px",
        }
        // backgroundColor: "#FAFBFC"
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#4B4749",
          transform: "translate(0, -1.5px) scale(1)",
          whiteSpace: "normal",
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        itemType: "select",
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // color: "#4B4749"
        }
      }
    }
  },
  typography: {
    h1: {
      color: "#FF6142",
      fontFamily: "Anurati",
      fontWeight: 400,
      fontSize: "22px",
      lineHeight: "26.4px",
      textTransform: "uppercase",
    },
    // h2: {
    //   color: "#241F21",
    //   fontFamily: 'Montserrat',
    //   fontWeight: 600,
    //   fontSize: "18px",
    //   lineHeight: "22px",
    //   textAlign: "center",
    // },
    h2: {
      color: "#241F21",
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "24.38px",
      textAlign: "center",
    },
    h3: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: "15px",
      lineHeight: "18.29px",
    },
    h4: {
      fontFamily: 'Montserrat',
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "20px",
      color: "#4B4749",
    },
    h5: {
      fontFamily: 'Montserrat',
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "17px",
    },
    body1: {
      fontFamily: "Montserrat",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "14.63px",
      color: "#241F21",
    },
    body2: {
      fontFamily: "Montserrat",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "20px",
      color: "#4B4749"
    },
  },
})