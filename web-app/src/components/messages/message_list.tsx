import React, { useLayoutEffect, useRef } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress, Typography } from "@material-ui/core"
import { useAuthContext } from "../../services/auth"
import { useMessages } from "../../services/messages"
import Message from "./message"

const useStyles = makeStyles({
  content: {
    height: "calc(100% - 72px)",
    overflowY: "auto",
  },
  innerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    padding: "24px",
    minHeight: "100%",
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

export type MessageListProps = {
  className?: string
  conversationId?: string
}

const MessageList = (props: MessageListProps) => {
  const { conversationId } = props

  const listRef = useRef<HTMLDivElement | null>(null)

  const classes = useStyles()

  const auth = useAuthContext()

  const messages = useMessages(conversationId)

  useLayoutEffect(() => {
    if (!messages || !listRef.current) return

    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, listRef.current])

  if (!auth) {
    return null
  }

  if (!conversationId) {
    return (
      <Typography
        className={classes.noConversationText}
        variant="h6"
        component="p"
      >
        Please select a conversation from the list on the left or start a new
        one!
      </Typography>
    )
  }

  if (!messages) {
    return <CircularProgress className={classes.spinner} />
  }

  if (messages.length === 0) {
    return (
      <Typography
        className={classes.noConversationText}
        variant="h6"
        component="p"
      >
        Send a message!
      </Typography>
    )
  }

  return (
    <div className={classes.content} ref={lRef => (listRef.current = lRef)}>
      <div className={classes.innerContent}>
        {messages.map((msg, index) => (
          <Message
            key={index}
            fromCurrentUser={msg.senderId === auth.uid}
            time={msg.time}
            message={msg.message}
          />
        ))}
      </div>
    </div>
  )
}

export default MessageList
