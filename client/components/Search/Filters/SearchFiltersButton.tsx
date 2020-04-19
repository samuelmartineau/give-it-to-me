import React from 'react';
import styled from 'styled-components';
import { Button } from '~/client/components/Toolkit';
import { connect } from 'react-redux';
import { getFiltersCount } from '~/client/store/';
import SearchFiltersModal from './SearchFiltersModal';

type State = {
  modalIsOpen: boolean;
};

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
type Props = {
  filtersCount: number;
};
class SearchFiltersButton extends React.PureComponent<Props, State> {
  state = {
    modalIsOpen: false,
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  render() {
    const { filtersCount } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <>
        <ButtonStyled onClick={this.openModal}>
          Filtres: {filtersCount} sélectionné{filtersCount > 1 && 's'}
        </ButtonStyled>
        <SearchFiltersModal
          modalIsOpen={modalIsOpen}
          closeModal={this.closeModal}
        />
      </>
    );
  }
}

export default connect((state) => ({
  filtersCount: getFiltersCount(state),
}))(SearchFiltersButton);
