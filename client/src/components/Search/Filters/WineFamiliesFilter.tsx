import React from 'react';
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import queryString from 'query-string';
import { toggleCheckboxFilter, RootState } from '~/client/store/';
import { Label, Text } from './FiltersUtils';
import WineFamilyMultipleSelector from '~/client/components/Autocomplete/WineFamilyMultipleSelector';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type Props = PropsFromRedux;

class WineFamiliesFilter extends React.Component<Props> {
  selectWineFamily = (evt, item) => {
    const { id } = item.suggestion.original;
    const { updateWineFamilies } = this.props;
    const name = 'wineFamilies';
    const value = id.toString();

    const parsed = queryString.parse(location.search);

    let previousFilter = parsed[name];

    if (previousFilter) {
      previousFilter = [].concat(previousFilter);
      if (previousFilter.includes(value)) {
        previousFilter = previousFilter.filter((key) => key !== value);
        if (previousFilter.length === 0) {
          delete parsed[name];
        }
      } else {
        previousFilter.push(value);
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

const connector = connect(
  (state: RootState) => ({
    wineFamilies: state.search.wineFamilies,
  }),
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    updateWineFamilies(id: number) {
      dispatch(toggleCheckboxFilter({ name: 'wineFamilies', value: id }));
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WineFamiliesFilter);
