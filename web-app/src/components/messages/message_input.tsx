import React, { useEffect, useRef, useState, useLayoutEffect } from "react"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { makeStyles } from "@material-ui/core/styles"
import { Button, CircularProgress, Paper, TextField } from "@material-ui/core"
import { sendMessage } from "../../services/messages"

const useStyles = makeStyles(theme => ({
  content: {
    position: "absolute",
    backgroundColor: theme.palette.grey[900],
    width: "100%",
    minHeight: "72px",
    padding: "8px 24px",
    bottom: 0,
    left: 0,
    right: 0,
  },
  form: {
    display: "flex",
    alignItems: "center",
    minHeight: "52px",
  },
  input: {
    flex: 1,
    marginRight: "24px",
  },
  spinner: {
    color: "white",
  },
}))

const validationSchema = yup.object({
  message: yup.string().required(),
})

export type MessageFormData = {
  message: string
}

export type MessageInputProps = {
  conversationId: string | undefined
  disabled?: boolean
}

const MessageInput = (props: MessageInputProps) => {
  const { disabled = false, conversationId } = props

  const classes = useStyles()

  const resetFormRef = useRef<null | (() => void)>(null)

  useEffect(() => {
    const resetFn = resetFormRef.current || (() => undefined)
    resetFn()
  }, [conversationId])

  return (
    <Paper className={classes.content} elevation={5} square>
      <Formik
        enableReinitialize
        initialValues={{ message: "" }}
        validationSchema={validationSchema}
        onSubmit={async (val, helpers) => {
          if (!conversationId) return

          helpers.resetForm()
          helpers.setSubmitting(true)

          try {
            await sendMessage(conversationId, val.message)
          } catch (err) {
            console.error(`An error occurred trying to send the message`, err)
            helpers.setFieldValue("message", val.message)
          }

          helpers.setSubmitting(false)
        }}
      >
        {({ handleBlur, handleChange, isSubmitting, resetForm, values }) => {
          useEffect(() => {
            resetFormRef.current = resetFormRef.current || resetForm
          }, [])

          return (
            <Form className={classes.form}>
              <TextField
                autoFocus
                disabled={disabled || isSubmitting}
                inputProps={{
                  "aria-label": "Message",
                }}
                className={classes.input}
                variant="outlined"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                inputRef={el => {
                  if (!el) return

                  el.focus()
                }}
              />
              <Button
                disabled={disabled || isSubmitting || !values.message}
                type="submit"
                color="primary"
                variant="contained"
              >
                {!isSubmitting && "Send"}
                {isSubmitting && (
                  <CircularProgress className={classes.spinner} size="1.5rem" />
                )}
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Paper>
  )
}

export default MessageInput
