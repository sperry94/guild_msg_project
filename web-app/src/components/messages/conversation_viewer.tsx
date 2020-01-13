import React from "react"
import cn from "classnames"
import { makeStyles } from "@material-ui/core/styles"
import MessageInput from "./message_input"
import MessageList from "./message_list"

const useStyles = makeStyles({
  content: {
    position: "relative",
  },
})

export type ConversationViewerProps = {
  className?: string
  conversationId?: string
  onBackPressed?: () => undefined
}

const ConversationViewer = (props: ConversationViewerProps) => {
  const { className, conversationId } = props

  const classes = useStyles()

  return (
    <div className={cn(className, classes.content)}>
      <MessageList conversationId={conversationId} />
      <MessageInput
        disabled={!conversationId}
        conversationId={conversationId}
      />
    </div>
  )
}

export default ConversationViewer
