import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import {
  AppBar,
  Button,
  Link as MuiLink,
  Toolbar as MuiToolbar,
  Typography,
} from "@material-ui/core"
import { signIn, signOut, useAuthContext } from "../services/auth"

const useStyles = makeStyles({
  appBar: {
    zIndex: 3,
    height: "64px",
  },
  header: {
    display: "flex",
    height: "64px",
  },
  nav: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "24px",
  },
})

const Toolbar = () => {
  const auth = useAuthContext()

  const classes = useStyles()

  return (
    <AppBar color="default" className={classes.appBar}>
      <MuiToolbar className={classes.header}>
        <nav className={classes.nav}>
          <MuiLink component={Link} to="/" color="inherit" underline="none">
            <Typography component="h1" variant="h6" color="inherit">
              Guild Chat
            </Typography>
          </MuiLink>
          {auth && (
            <MuiLink
              component={Link}
              to="/messages"
              color="inherit"
              underline="none"
            >
              <Typography variant="body1" color="inherit">
                My Messages
              </Typography>
            </MuiLink>
          )}
        </nav>
        <div></div>
        {!auth && <Button onClick={() => signIn()}>Log In</Button>}
        {auth && <Button onClick={() => signOut()}>Log Out</Button>}
      </MuiToolbar>
    </AppBar>
  )
}

export default Toolbar
