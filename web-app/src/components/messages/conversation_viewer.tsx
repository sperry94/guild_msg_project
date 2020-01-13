import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import MessageInput from "./message_input"
import MessageList from "./message_list"

export type ConversationViewerProps = {
  className?: string
  conversationId?: string
}

const ConversationViewer = (props: ConversationViewerProps) => {
  const { className, conversationId } = props

  return (
    <div className={className}>
      <MessageList conversationId={conversationId} />
      <MessageInput
        disabled={!conversationId}
        conversationId={conversationId}
      />
    </div>
  )
}

export default ConversationViewer
