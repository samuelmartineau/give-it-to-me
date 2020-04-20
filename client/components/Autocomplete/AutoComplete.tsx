import React from 'react';
import Autosuggest from 'react-autosuggest';
import { utils } from '~/config';
import fuzzy from 'fuzzy';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { TextField } from '~/client/components/Toolkit';

declare module 'fuzzy' {
  function filter<T>(
    pattern: string,
    arr: T[],
    opts?: FilterOptions<T>
  ): ReturnType<FilterOptions<T>['extract']>[];
}

const classNames = {
  container: 'react-autosuggest__container',
  containerOpen: 'react-autosuggest__container--open',
  input: 'react-autosuggest__input',
  inputOpen: 'react-autosuggest__input--open',
  inputFocused: 'react-autosuggest__input--focused',
  suggestionsContainer: 'react-autosuggest__suggestions-container',
  suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
  suggestionsList: 'react-autosuggest__suggestions-list',
  suggestion: 'react-autosuggest__suggestion',
  suggestionFirst: 'react-autosuggest__suggestion--first',
  suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
  sectionContainer: 'react-autosuggest__section-container',
  sectionContainerFirst: 'react-autosuggest__section-container--first',
  sectionTitle: 'react-autosuggest__section-title',
};

const AutosuggestWrapper = styled.div.attrs(classNames)`
  .${classNames.container} {
    position: relative;
  }
  .${classNames.suggestionsContainerOpen} {
    display: block;
    background: #dedede;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .${classNames.suggestion} {
    padding: 1em;
  }
  .${classNames.suggestionsList} {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .${classNames.suggestionHighlighted} {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onSecondary};
  }
  .${classNames.suggestion} {
    cusor: pointer;
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

function getSuggestionValue() {
  return '';
}

type Props<T> = {
  datas: T[];
  extract: (item: T) => string;
  onSuggestionSelected: Function;
  placeholder: string;
};

type State = {
  suggestions: string[];
  value: string;
};

export class AutoComplete<T> extends React.Component<Props<T>, State> {
  debouncedLoadSuggestions: Function;

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
    };

    this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 300); // 1000ms is chosen for demo purposes only.
  }

  loadSuggestions = (value) => {
    const { datas, extract } = this.props;
    const inputValue = utils.cleanString(value);
    const inputLength = inputValue.length;
    const suggestions =
      inputLength === 0
        ? []
        : fuzzy
            .filter<T>(inputValue, datas, {
              pre: '<b>',
              post: '</b>',
              extract,
            })
            .slice(0, 5);
    this.setState({
      suggestions,
    });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.debouncedLoadSuggestions(value);
  };

  onSelect = () => {};

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
            onChange: this.onChange,
          }}
        />
      </AutosuggestWrapper>
    );
  }
}
