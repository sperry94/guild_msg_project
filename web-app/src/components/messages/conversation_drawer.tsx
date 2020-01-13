import React, { useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Button, Drawer, IconButton, Typography } from "@material-ui/core"
import Add from "@material-ui/icons/Add"
import Menu from "@material-ui/icons/Menu"
import ConversationAddDialog from "./conversation_add_dialog"
import ConversationList from "./conversation_list"

const useStyles = makeStyles(theme => ({
  toolbarOffset: {
    ...theme.mixins.toolbar,
  },
  drawer: {
    position: "relative",
    zIndex: 2,
    width: "300px",
    height: "100vh",
  },
  drawerPaper: {
    width: "300px",
    height: "100vh",
  },
  addNewBtn: {
    backgroundColor: theme.palette.grey[900],
    borderRadius: 0,
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
    position: "absolute",
    height: "73px",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
  },
  backBtn: {
    position: "absolute",
    zIndex: 4,
  },
}))

export type ConversationDrawerProps = {
  conversationId?: string
}

const ConversationDrawer = (props: ConversationDrawerProps) => {
  const { conversationId } = props

  const [open, setOpen] = useState(true)

  const classes = useStyles()

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  const [addingConversation, setAddingConversation] = useState(false)

  return (
    <>
      {isSmall && (
        <div className={classes.backBtn}>
          <IconButton onClick={() => setOpen(true)}>
            <Menu />
          </IconButton>
        </div>
      )}
      <Drawer
        className={classes.drawer}
        variant={isSmall ? "temporary" : "persistent"}
        anchor="left"
        open={!isSmall || open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {!isSmall && <div className={classes.toolbarOffset} />}
        <ConversationList
          conversationId={conversationId}
          onItemSelect={() => setOpen(false)}
        />

        <Button
          className={classes.addNewBtn}
          variant="outlined"
          onClick={() => setAddingConversation(true)}
        >
          <Add />
          <Typography>New Conversation</Typography>
        </Button>

        <ConversationAddDialog
          open={addingConversation}
          onClose={() => setAddingConversation(false)}
        />
      </Drawer>
    </>
  )
}

export default ConversationDrawer
