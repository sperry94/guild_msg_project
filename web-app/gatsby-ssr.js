import React from "react"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import AuthProvider from "./src/components/providers/auth_provider"
import theme from "./src/utils/mui_theme"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <CssBaseline />
      {element}
    </AuthProvider>
  </ThemeProvider>
)
