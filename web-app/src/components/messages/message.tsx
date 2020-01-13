import React from "react"
import cn from "classnames"
import { firestore } from "firebase/app"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  outerContent: {
    display: "flex",
    flexDirection: "column",
    "& + &": {
      marginTop: "48px",
    },
  },
  content: {
    padding: "24px",
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
    alignItems: fromCurrentUser ? ("end" as const) : ("start" as const),
    marginLeft: fromCurrentUser ? "auto" : "24px",
    marginRight: fromCurrentUser ? "24px" : "auto",
  }

  return (
    <div className={classes.outerContent} style={style}>
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
