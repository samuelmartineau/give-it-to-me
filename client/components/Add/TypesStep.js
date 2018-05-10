import React from 'react';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

import config from '~/config';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
const { BOTTLE_TYPES, DEFAULT_TYPE } = config.bottleTypes;

const wineTypes = Object.keys(WINE_TYPES).map(key => ({
  id: key,
  ...WINE_TYPES[key]
}));
const bottleTypes = Object.keys(BOTTLE_TYPES).map(key => ({
  id: key,
  ...BOTTLE_TYPES[key]
}));

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class TypesStep extends React.Component {
  state = {
    wineType: wineTypes[0].id,
    wineCategory: wineTypes[0].categories[0],
    bottleType: DEFAULT_TYPE
  };
  handleChange = (evt, value) => {
    const newState = {
      ...this.state
    };
    if (evt.target.name === 'wineType') {
      newState.wineType = value;
      newState.wineCategory = WINE_TYPES[value].categories[0];
    } else {
      newState[evt.target.name] = value;
    }
    this.setState(newState);
  };

  render() {
    const { classes } = this.props;
    const { wineType, wineCategory, bottleType } = this.state;

    return (
      <div>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">Famille</FormLabel>
          <RadioGroup
            aria-label="wine type"
            name="wineType"
            className={classes.group}
            onChange={this.handleChange}
            value={wineType}
          >
            {wineTypes.map(wineType => (
              <FormControlLabel
                key={wineType.id}
                value={wineType.id}
                control={<Radio style={{ color: wineType.color }} />}
                label={wineType.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            aria-label="wine category"
            name="wineCategory"
            className={classes.group}
            onChange={this.handleChange}
            value={wineCategory}
          >
            {WINE_TYPES[wineType].categories.map(wineCategory => (
              <FormControlLabel
                key={wineCategory}
                value={wineCategory}
                control={<Radio />}
                label={WINE_CATEGORIES[wineCategory].label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">Taille de la bouteille</FormLabel>
          <RadioGroup
            aria-label="bottle type"
            name="bottleType"
            className={classes.group}
            onChange={this.handleChange}
            value={bottleType}
          >
            {bottleTypes.map(bottleType => (
              <FormControlLabel
                key={bottleType.id}
                value={bottleType.id}
                control={<Radio />}
                label={bottleType.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(TypesStep);
