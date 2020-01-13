import React from "react"
import { Link } from "gatsby"
import { ListItem, Typography, makeStyles, Avatar } from "@material-ui/core"
import { Conversation } from "../../services/conversations"

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    width: "100%",
    height: "100%",
  },
  avatar: {
    color: "white",
    marginRight: "8px",
  },
})

export type ConversationItemProps = {
  conversationId?: string
  conversation: Conversation
  onSelect?: () => void
}

const ConversationItem = (props: ConversationItemProps) => {
  const { conversationId, conversation, onSelect = () => undefined } = props

  const classes = useStyles()

  return (
    <li>
      <ListItem
        className={classes.link}
        selected={conversationId === conversation.id}
        button
        divider
        component={Link}
        to={`/messages/${conversation.id}`}
        onClick={onSelect}
      >
        {conversation.users.length > 0 && (
          <Avatar
            className={classes.avatar}
            alt={conversation.users[0].displayName}
            src={conversation.users[0].photoUrl}
          >
            {conversation.users[0].displayName.substr(0, 1)}
          </Avatar>
        )}
        <Typography color="inherit">
          {conversation.users.map(u => u.displayName).join(", ")}
        </Typography>
      </ListItem>
    </li>
  )
}

export default ConversationItem
