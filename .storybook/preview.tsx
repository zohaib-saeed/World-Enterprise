import { ThemeProvider } from '@mui/material'
import React from 'react'
import { theme } from '../pages/_app'
import {} from '../pages/_app'
import * as NextImage from 'next/image'
import { store } from "../store/store"
import { Provider } from "react-redux"

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </Provider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized/>
})