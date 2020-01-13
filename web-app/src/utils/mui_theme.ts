import { teal } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {
      main: teal[700],
    },
  },
})

export default theme
