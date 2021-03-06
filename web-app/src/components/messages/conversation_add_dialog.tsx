import React from "react"
import { Formik, Form } from "formik"
import { useSnackbar } from "notistack"
import * as yup from "yup"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core"
import { addConversation } from "../../services/conversations"

const useStyles = makeStyles(theme => ({
  dialog: {
    [theme.breakpoints.up("md")]: {
      minWidth: "600px",
    },
  },
  input: {
    marginTop: "24px",
    width: "100%",
  },
  inputActions: {
    paddingBottom: 0,
    paddingRight: 0,
    marginBottom: "16px",
    marginRight: "24px",
  },
  spinner: {
    color: "white",
  },
}))

const validationSchema = yup.object({
  email: yup.string().required(),
})

export type ConversationAddDialogProps = {
  open: boolean
  onClose: () => void
}

const ConversationAddDialog = ({
  open,
  onClose,
}: ConversationAddDialogProps) => {
  const classes = useStyles()

  const { enqueueSnackbar } = useSnackbar()

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialog }}
      fullScreen={isSmall}
    >
      <DialogTitle disableTypography>
        <Typography variant="h5" component="h2">
          Start a conversation
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={async (val, helpers) => {
          helpers.setSubmitting(true)

          let docId: string = ""
          try {
            docId = await addConversation(val.email)
            helpers.resetForm()
          } catch (err) {
            console.error(
              `An error occurred trying to create the conversation`,
              err
            )
            enqueueSnackbar(
              err?.message ||
                `An error occurred trying to create the conversation`,
              {
                variant: "error",
              }
            )
          }
          helpers.setSubmitting(false)

          if (docId) {
            onClose()
          }
        }}
      >
        {({ handleBlur, handleChange, isSubmitting, values }) => (
          <Form>
            <DialogContent>
              <Typography variant="body1" component="p">
                Enter the email of a user you would like to chat with:
              </Typography>
              <TextField
                autoFocus
                disabled={isSubmitting}
                inputProps={{
                  "aria-label": "Email",
                }}
                className={classes.input}
                variant="outlined"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </DialogContent>
            <DialogActions className={classes.inputActions}>
              <Button
                color="default"
                variant="contained"
                disabled={isSubmitting}
                onClick={e => {
                  e.preventDefault()

                  onClose()
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting || !values.email}
              >
                {!isSubmitting && "Add"}
                {isSubmitting && (
                  <CircularProgress className={classes.spinner} size="1.5rem" />
                )}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default ConversationAddDialog
