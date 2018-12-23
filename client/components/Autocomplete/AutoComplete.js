import React from 'react';
import Autosuggest from 'react-autosuggest';
import { utils } from '~/config';
import fuzzy from 'fuzzy';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { TextField } from '~/client/components/Toolkit';

const classNames = {
  // container: 'react-autosuggest__container',
  // containerOpen: 'react-autosuggest__input'
};

// container: classes.container,
//   suggestionsContainerOpen: classes.suggestionsContainerOpen,
//     suggestionsList: classes.suggestionsList,
//       suggestion: classes.suggestion

const AutosuggestWrapper = styled.div.attrs(classNames)`
  .${classNames.container} {
    // Some styles here
  }
  .${classNames.input} {
    // Some styles here
  }
}
`;

function renderInput(inputProps) {
  return <TextField {...inputProps} />;
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: suggestion.string }} />
    </div>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return <div {...containerProps}>{children}</div>;
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

  render() {
    const { suggestions, value } = this.state;
    const { onSuggestionSelected, placeholder } = this.props;
    return (
      <AutosuggestWrapper>
        <Autosuggest
          theme={classNames}
          alwaysRenderSuggestions={true}
          focusInputOnSuggestionClick={false}
          renderInputComponent={renderInput}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          onSuggestionSelected={onSuggestionSelected}
          renderSuggestion={renderSuggestion}
          inputProps={{
            type: 'text',
            placeholder,
            value,
            onChange: this.onChange
          }}
        />
      </AutosuggestWrapper>
    );
  }
}

export default AutoComplete;
