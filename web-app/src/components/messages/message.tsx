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
    maxWidth: "calc(100% - 48px)",
  },
  content: {
    padding: "24px",
    flex: 0,
  },
  outerFromCurrentUser: {
    alignItems: "end",
    marginLeft: "auto",
    marginRight: "24px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0px",
    },
  },
  outerFromOtherUser: {
    alignItems: "start",
    marginRight: "auto",
    marginLeft: "24px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  fromCurrentUser: {
    backgroundColor: theme.palette.primary.dark,
  },
  fromOtherUser: {
    backgroundColor: theme.palette.secondary.dark,
  },
  time: {
    width: "100%",
    color: theme.palette.grey[400],
  },
  timeFromCurrentUser: {
    textAlign: "right",
  },
  timeFromOtherUser: {
    textAlign: "left",
  },
}))

export type MessageProps = {
  fromCurrentUser: boolean
  time: Date
  message: string
}

const Message = (props: MessageProps) => {
  const { fromCurrentUser, message, time } = props

  const classes = useStyles()

  return (
    <div
      className={cn(classes.outerContent, {
        [classes.outerFromCurrentUser]: fromCurrentUser,
        [classes.outerFromOtherUser]: !fromCurrentUser,
      })}
    >
      <Typography
        className={cn(classes.time, {
          [classes.timeFromCurrentUser]: fromCurrentUser,
          [classes.timeFromOtherUser]: !fromCurrentUser,
        })}
        variant="caption"
      >
        {time.toLocaleString()}
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
