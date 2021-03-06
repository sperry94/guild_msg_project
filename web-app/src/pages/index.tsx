import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"
import { Message } from "@material-ui/icons"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { signIn, useAuthContext } from "../services/auth"

const useStyles = makeStyles(theme => ({
  content: {
    padding: "0 24px",
  },
  tagline: {
    display: "flex",
    justifyContent: "center",
    margin: "15vh auto",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
      alignItems: "center",
    },
  },
  messageIcon: {
    fontSize: "12em",
    [theme.breakpoints.up("md")]: {
      marginRight: "24px",
    },
  },
  textContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  details: {
    display: "flex",
    justifyContent: "space-around",
  },
  btn: {
    marginTop: "24px",
  },
}))

const IndexPage = () => {
  const classes = useStyles()

  const auth = useAuthContext()

  return (
    <Layout classes={{ main: classes.content }}>
      <SEO title="Guild Chat" />
      <div className={classes.tagline}>
        <Message className={classes.messageIcon} />
        <div className={classes.textContent}>
          <Typography variant="h3" component="h2">
            Lightning-fast communication
          </Typography>
          <Typography variant="h5" component="p">
            Connect with your friends at a moment's notice
          </Typography>
          {!auth && (
            <Button
              className={classes.btn}
              data-testid="signin-btn"
              variant="contained"
              color="primary"
              onClick={signIn}
            >
              <Typography variant="h6" component="span">
                Sign in
              </Typography>
            </Button>
          )}
          {auth && (
            <Button
              className={classes.btn}
              data-testid="getstarted-btn"
              variant="contained"
              color="primary"
              component={Link}
              to="/messages"
            >
              <Typography variant="h6" component="span">
                Get started
              </Typography>
            </Button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
