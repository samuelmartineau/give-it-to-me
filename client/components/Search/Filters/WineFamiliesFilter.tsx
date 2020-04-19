import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { toggleCheckboxFilter } from '~/client/store/';
import { Label, Text } from './FiltersUtils';
import WineFamilyMultipleSelector from '~/client/components/Autocomplete/WineFamilyMultipleSelector';

type Props = {
  updateWineFamilies: Function;
  wineFamilies: Array<any>;
};

class WineFamiliesFilter extends React.Component<Props> {
  selectWineFamily = (evt, item) => {
    const { id } = item.suggestion.original;
    const { updateWineFamilies } = this.props;
    const name = 'wineFamilies';
    const value = id.toString();

    const parsed = queryString.parse(location.search);
    if (parsed[name]) {
      parsed[name] = [].concat(parsed[name]);
      if (parsed[name].includes(value)) {
        parsed[name] = parsed[name].filter((key) => key !== value);
        if (parsed[name].length === 0) {
          delete parsed[name];
        }
      } else {
        parsed[name].push(value);
      }
    } else {
      parsed[name] = [value];
    }
    const url = `/search?${queryString.stringify(parsed)}`;
    Router.push(url, url, { shallow: true });

    updateWineFamilies(id);
  };

  render() {
    const { wineFamilies } = this.props;
    return (
      <Label>
        <Text>Appelation</Text>
        <WineFamilyMultipleSelector
          selectedFamilyIds={wineFamilies}
          onSuggestionSelected={this.selectWineFamily}
        />
      </Label>
    );
  }
}

export default connect(
  (state) => ({
    wineFamilies: state.search.wineFamilies,
  }),
  (dispatch) => ({
    updateWineFamilies(id) {
      dispatch(toggleCheckboxFilter('wineFamilies', id));
    },
  })
)(WineFamiliesFilter);
