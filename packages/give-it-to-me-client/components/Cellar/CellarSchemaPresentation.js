import CellarSchema from "./CellarSchema";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";

const CellarSchemaPresentation = compose(
  connect(state => ({
    bottles: state.bottles.all
  })),
  withProps({})
)(CellarSchema);

export default CellarSchemaPresentation;
