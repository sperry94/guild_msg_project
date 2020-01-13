import React from "react"
import cn from "classnames"
import { Router } from "@reach/router"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"
import Layout from "../components/layout"
import MessagesViewer from "../components/messages/messages_viewer"
import SEO from "../components/seo"
import { signIn, useAuthContext } from "../services/auth"

const useStyles = makeStyles(theme => ({
  toolbarOffset: {
    ...theme.mixins.toolbar,
  },
  unAuthenticatedMain: {
    textAlign: "center",
    "& > *": {
      marginTop: "3em",
    },
  },
  drawer: {
    position: "relative",
    zIndex: 2,
  },
}))

const MessagePage = () => {
  const auth = useAuthContext()

  const classes = useStyles()

  return (
    <Layout
      classes={{
        main: cn({
          [classes.unAuthenticatedMain]: !auth,
        }),
      }}
    >
      <SEO title="Guild Chat" />
      {!auth && (
        <>
          <Typography variant="h5" component="p">
            You must be logged in to view your messages.
          </Typography>
          <Button variant="contained" color="primary" onClick={signIn}>
            <Typography variant="h6" component="span">
              Sign in
            </Typography>
          </Button>
        </>
      )}
      {!!auth && (
        <Router>
          <MessagesViewer path="/messages/:conversationId" />
          <MessagesViewer default />
        </Router>
      )}
    </Layout>
  )
}

export default MessagePage
