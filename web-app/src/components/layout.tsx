import React from "react"
import Toolbar from "./toolbar"
import { makeStyles } from "@material-ui/core/styles"

import "./global.css"

const useStyles = makeStyles(theme => ({
  mainInner: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    paddingTop: "64px",
    height: "100vh",
  },
}))

export type LayoutProps = {
  classes?: {
    main?: string
  }
  children: React.ReactNode | React.ReactNodeArray
}

const Layout = ({ classes: propClasses = {}, children }: LayoutProps) => {
  const innerClasses = useStyles()

  const classes = { ...propClasses, ...innerClasses }

  return (
    <div className={classes.mainInner}>
      <Toolbar />
      <main className={classes.main}>{children}</main>
    </div>
  )
}

export default Layout
