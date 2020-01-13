import { teal } from "@material-ui/core/colors"
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      secondary: {
        main: teal[700],
      },
    },
  })
)

export default theme
