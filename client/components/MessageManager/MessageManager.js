import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose, pure } from 'recompose';

const styleSheet = theme => ({
  root: {
    textAlign: 'center',
    flex: 1,
    color: theme.palette.secondary[500]
  },
  title: { fontSize: '30px' },
  message: { fontSize: '20px', maxWidth: '400px', display: 'inline-block' }
});

const MessageManager = ({ icon, classes, title, message }) => {
  const iconStylized = React.cloneElement(icon, {
    style: {
      width: '200px',
      height: '200px'
    }
  });
  return (
    <div className={classes.root}>
      <div>{iconStylized}</div>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.message}>{message}</p>
    </div>
  );
};

const Layout = compose(withStyles(styleSheet), pure)(MessageManager);

export default Layout;
