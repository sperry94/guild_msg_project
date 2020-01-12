import React from "react"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import theme from "./src/utils/mui_theme"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {element}
  </ThemeProvider>
)
