import React from 'react';
import Autosuggest from 'react-autosuggest';
import config from '~/config';
import fuzzy, { FilterResult } from 'fuzzy';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { TextField } from '@/components/Toolkit';

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

const AutosuggestWrapper = styled.div`
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
  const { key, ...rest } = inputProps;
  return <TextField key={key} {...rest} />;
}

function renderSuggestion<T>(suggestion: FilterResult<T>) {
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: suggestion.string }} />
    </div>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
  const { key, ...rest } = containerProps;

  return (
    <div key={key} {...rest}>
      {children}
    </div>
  );
}

function getSuggestionValue() {
  return '';
}

type Props<T> = {
  name: string;
  datas: T[];
  formatDisplay: (item: FilterResult<T>) => string;
  extract: (item: T) => string;
  onSuggestionSelected: (evt: Event, data: FilterResult<T>) => void;
  placeholder: string;
};

type State<T> = {
  suggestions: FilterResult<T>[];
  value: string;
};

export class AutoComplete<T> extends React.Component<Props<T>, State<T>> {
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
    const { datas, formatDisplay, extract } = this.props;
    const inputValue = config.utils.cleanString(value);
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
    const { onSuggestionSelected, placeholder, name } = this.props;
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
          renderSuggestion={renderSuggestion<T>}
          inputProps={{
            name,
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
