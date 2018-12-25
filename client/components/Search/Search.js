// @flow
import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import Router from 'next/router';
import WinesList from './WinesList';
import { syncUrlParams } from '~/client/store';
import SearchFiltersButton from './Filters/SearchFiltersButton';
import EmptyResults from './EmptyResults';

type Props = {
  onBeforeState: Function
};

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
    return (
      <div>
        <SearchFiltersButton />
        <WinesList />
        <EmptyResults />
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    onBeforeState(params) {
      dispatch(syncUrlParams(params));
    }
  })
)(Search);
