import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Card, Typography, CardContent } from "@material-ui/core"
import { Message } from "@material-ui/icons"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { signIn, useAuthContext } from "../services/auth"

const useStyles = makeStyles({
  content: {
    padding: "0 24px",
  },
  tagline: {
    display: "flex",
    justifyContent: "center",
    margin: "15vh auto",
  },
  messageIcon: {
    fontSize: "12em",
    marginRight: "24px",
  },
  textContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: "column",
  },
  details: {
    display: "flex",
    justifyContent: "space-around",
  },
})

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
            <Button variant="contained" color="primary" onClick={signIn}>
              <Typography variant="h6" component="span">
                Sign in
              </Typography>
            </Button>
          )}
          {auth && (
            <Button
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
