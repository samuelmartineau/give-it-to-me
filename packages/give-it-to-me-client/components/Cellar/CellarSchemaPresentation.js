import CellarSchema from "./CellarSchema";
import { connect } from "react-redux";
import { compose } from "recompose";

export default compose(
  connect(state => ({
    bottles: state.bottles.all
  }))
)(CellarSchema);
