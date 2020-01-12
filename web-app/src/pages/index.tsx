import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Card, Typography, CardContent } from "@material-ui/core"
import { Message } from "@material-ui/icons"
import Layout from "../components/layout"
import SEO from "../components/seo"

const useStyles = makeStyles({
  content: {
    padding: "0 24px",
  },
  tagline: {
    display: "flex",
    justifyContent: "center",
    margin: "10vh auto",
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
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
          >
            <Typography variant="h6" component="span">
              Sign in
            </Typography>
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className={classes.details}>
          <span>Image 1</span>
          <span>Image 2</span>
          <span>Image 3</span>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default IndexPage
