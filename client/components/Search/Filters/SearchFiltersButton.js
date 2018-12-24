// @flow
import React from 'react';
import styled from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import { connect } from 'react-redux';
import { getWinesFiltered } from '~/client/store/';
import SearchFiltersModal from './SearchFiltersModal';

type Props = {
  count: number
};
type State = {
  modalIsOpen: boolean
};

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class SearchFiltersButton extends React.PureComponent<Props, State> {
  state = {
    modalIsOpen: false
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  render() {
    const { count } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <>
        <ButtonStyled onClick={this.openModal}>
          Filtres: {count} résultats
        </ButtonStyled>
        <SearchFiltersModal
          modalIsOpen={modalIsOpen}
          closeModal={this.closeModal}
        />
      </>
    );
  }
}

export default connect(state => ({
  filters: state.search,
  count: getWinesFiltered(state).length
}))(SearchFiltersButton);
