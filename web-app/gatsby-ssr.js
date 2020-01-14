import React from "react"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { SnackbarProvider } from "notistack"
import AuthProvider from "./src/components/providers/auth_provider"
import theme from "./src/utils/mui_theme"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <SnackbarProvider>
        <CssBaseline />
        {element}
      </SnackbarProvider>
    </AuthProvider>
  </ThemeProvider>
)
