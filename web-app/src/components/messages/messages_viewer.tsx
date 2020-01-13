import React from "react"
import { RouteComponentProps } from "@reach/router"
import { makeStyles } from "@material-ui/core/styles"
import ConversationDrawer from "./conversation_drawer"
import ConversationViewer from "./conversation_viewer"

const useStyles = makeStyles({
  content: {
    display: "flex",
    height: "calc(100vh - 64px)",
  },
  activeConversation: {
    position: "relative",
    flexGrow: 1,
  },
})

export type MessagesViewerProps = RouteComponentProps<{
  conversationId?: string
}>

const MessagesViewer = (props: MessagesViewerProps) => {
  const { conversationId } = props

  const classes = useStyles()

  return (
    <div className={classes.content}>
      <ConversationDrawer conversationId={conversationId} />
      <ConversationViewer
        className={classes.activeConversation}
        conversationId={conversationId}
      />
    </div>
  )
}

export default MessagesViewer
