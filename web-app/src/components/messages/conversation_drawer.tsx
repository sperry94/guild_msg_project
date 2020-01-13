import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Drawer, Typography } from "@material-ui/core"
import Add from "@material-ui/icons/Add"
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
  },
  drawerPaper: {
    width: "300px",
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
}))

export type ConversationDrawerProps = {
  conversationId?: string
}

const ConversationDrawer = (props: ConversationDrawerProps) => {
  const { conversationId } = props

  const classes = useStyles()

  const [addingConversation, setAddingConversation] = useState(false)

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbarOffset} />
      <ConversationList conversationId={conversationId} />

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
  )
}

export default ConversationDrawer
