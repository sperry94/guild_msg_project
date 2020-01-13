import React from "react"
import cn from "classnames"
import { firestore } from "firebase/app"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  content: {
    padding: "24px",
    "& + &": {
      marginTop: "48px",
    },
  },
  fromCurrentUser: {
    backgroundColor: theme.palette.primary.dark,
  },
  fromOtherUser: {
    backgroundColor: theme.palette.secondary.dark,
  },
  time: {
    color: theme.palette.grey[400],
  },
}))

export type MessageProps = {
  fromCurrentUser: boolean
  time: firestore.Timestamp
  message: string
}

const Message = (props: MessageProps) => {
  const { fromCurrentUser, message, time } = props

  const classes = useStyles()

  const style = {
    textAlign: fromCurrentUser ? "right" : "left",
    marginLeft: fromCurrentUser ? "auto" : "24px",
    marginRight: fromCurrentUser ? "24px" : "auto",
  }

  return (
    <div style={style}>
      <Typography className={classes.time} variant="caption">
        {time.toDate().toLocaleString()}
      </Typography>
      <Paper
        className={cn(classes.content, {
          [classes.fromCurrentUser]: fromCurrentUser,
          [classes.fromOtherUser]: !fromCurrentUser,
        })}
        elevation={3}
      >
        <Typography>{message}</Typography>
      </Paper>
    </div>
  )
}

export default Message
