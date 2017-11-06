import React from "react";
import { CircularProgress } from "material-ui/Progress";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  spinner: {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    margin: "3em 0"
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  }
});

const Spinner = ({ classes }) => (
  <div className={classes.spinner}>
    <CircularProgress className={classes.progress} size={50} />
  </div>
);

Spinner.propTypes = {
  classes: PropTypes.object.isRequired
};

const SpinnerStyled = withStyles(styles)(Spinner);

export const ApolloSpinner = Component => {
  const ApolloSpinnerSwitch = props => {
    const { loading } = props;
    if (loading) {
      return <SpinnerStyled />;
    }
    return <Component {...props} />;
  };
  ApolloSpinnerSwitch.propTypes = {
    loading: PropTypes.bool
  };
  ApolloSpinnerSwitch.defaultProps = {
    loading: false
  };
  return ApolloSpinnerSwitch;
};

export default SpinnerStyled;
