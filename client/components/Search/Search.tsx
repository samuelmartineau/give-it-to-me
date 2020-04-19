import React from 'react';
import queryString from 'query-string';
import { connect, ConnectedProps } from 'react-redux';
import Router from 'next/router';
import WinesList from './WinesList';
import { syncUrlParams, getWinesFiltered, RootState } from '~/client/store';
import SearchFiltersButton from './Filters/SearchFiltersButton';
import EmptyResults from './EmptyResults';

type Props = PropsFromRedux;

export class Search extends React.Component<Props> {
  componentDidMount() {
    const { onBeforeState } = this.props;
    Router.beforePopState(({ url }) => {
      const index = url.indexOf('?');
      const asParams = index > -1;
      let params = {};
      if (asParams) {
        const paramsString = url.slice(url.indexOf('?') + 1);
        params = queryString.parse(paramsString);
      }

      onBeforeState(params);
      return true;
    });
  }
  render() {
    const { count } = this.props;
    return (
      <div>
        <SearchFiltersButton />
        <h2>
          {count} vin{count > 1 && 's'}
        </h2>
        <WinesList />
        <EmptyResults />
      </div>
    );
  }
}

const connector = connect(
  (state: RootState) => ({
    count: getWinesFiltered(state).length,
  }),
  (dispatch) => ({
    onBeforeState(params) {
      dispatch(syncUrlParams(params));
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Search);
