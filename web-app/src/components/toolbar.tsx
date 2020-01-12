import React from "react"
import { Link } from "gatsby"
import {
  AppBar,
  Link as MuiLink,
  Toolbar as MuiToolbar,
  Typography,
} from "@material-ui/core"

const Toolbar = () => {
  return (
    <AppBar color="default">
      <MuiToolbar>
        <nav>
          <MuiLink component={Link} to="/" color="inherit" underline="none">
            <Typography component="h1" variant="h6" color="inherit">
              Guild Chat
            </Typography>
          </MuiLink>
        </nav>
      </MuiToolbar>
    </AppBar>
  )
}

export default Toolbar
