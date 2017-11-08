import CellarSchema from "./CellarSchema";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";

export default compose(
  connect(state => ({
    bottles: state.bottles.all
  })),
  withProps({
    viewMode: true,
    isBoxClickable: () => false,
    selectedCells: {}
  })
)(CellarSchema);
