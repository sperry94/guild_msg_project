import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress, List, Typography } from "@material-ui/core"
import { useConversationList } from "../../services/conversations"
import ConversationItem from "./conversation_item"

const useStyles = makeStyles({
  nav: {
    height: "calc(100% - 136px)",
    overflowY: "auto",
  },
  noConversationText: {
    textAlign: "center",
    marginTop: "48px",
  },
  spinner: {
    display: "block",
    margin: "48px auto",
    color: "white",
  },
})

export type ConversationListProps = {
  conversationId?: string
}

const ConversationList = (props: ConversationListProps) => {
  const { conversationId } = props

  const classes = useStyles()

  const conversations = useConversationList()

  if (!conversations) {
    return <CircularProgress className={classes.spinner} />
  }

  if (conversations.length === 0) {
    return (
      <Typography
        className={classes.noConversationText}
        variant="h6"
        component="p"
      >
        Add a conversation below
      </Typography>
    )
  }

  return (
    <nav className={classes.nav}>
      <List>
        {conversations.map(conversation => (
          <ConversationItem
            key={conversation.id}
            conversationId={conversationId}
            conversation={conversation}
          />
        ))}
      </List>
    </nav>
  )
}

export default ConversationList
