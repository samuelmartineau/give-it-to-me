import * as Colors from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'
import {spacing, zIndex} from 'material-ui/styles'

export default {
  spacing: spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.teal500,
    primary2Color: Colors.teal700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.redA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.teal500
  }
}
