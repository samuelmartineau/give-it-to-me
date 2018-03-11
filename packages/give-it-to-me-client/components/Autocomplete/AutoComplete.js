import React from 'react';
import { compose } from 'recompose';
import Autosuggest from 'react-autosuggest';
import { utils } from 'give-it-to-me-config';
import fuzzy from 'fuzzy';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import debounce from 'lodash.debounce';

function renderInput({ classes, autoFocus, value, ref, ...other }) {
  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input
        },
        ...other
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  return (
    <MenuItem selected={isHighlighted} component="div">
      <span dangerouslySetInnerHTML={{ __html: suggestion.string }} />
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.original.label;
}
const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit
  }
});

class AutoComplete extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };

    this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 300); // 1000ms is chosen for demo purposes only.
  }

  loadSuggestions = value => {
    const { datas } = this.props;
    const inputValue = utils.cleanString(value);
    const inputLength = inputValue.length;
    const suggestions =
      inputLength === 0
        ? []
        : fuzzy
            .filter(inputValue, datas, {
              pre: '<b>',
              post: '</b>',
              extract: el => el.searchKey
            })
            .slice(0, 5);
    this.setState({
      isLoading: false,
      suggestions
    });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.debouncedLoadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { suggestions, value } = this.state;
    const { classes, onSuggestionSelected } = this.props;
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onSuggestionSelected}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: 'Search a country (start with a)',
          value: value,
          onChange: this.onChange
        }}
      />
    );
  }
}

export default compose(withStyles(styles))(AutoComplete);
