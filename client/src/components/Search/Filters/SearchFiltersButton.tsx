import React from 'react';
import styled from 'styled-components';
import TuneIcon from '@mui/icons-material/TuneRounded';
import { Button } from '@/components/Toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { getFiltersCount, RootState } from '@/store/';
import SearchFiltersModal from './SearchFiltersModal';

type State = {
  modalIsOpen: boolean;
};

const ButtonStyled = styled(Button)`
  flex: none;
  min-height: 60px;
`;
type Props = PropsFromRedux;

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
        <ButtonStyled type="button" onClick={this.openModal}>
          <TuneIcon />
          Filtres{filtersCount > 0 ? ` (${filtersCount})` : ''}
        </ButtonStyled>
        <SearchFiltersModal
          modalIsOpen={modalIsOpen}
          closeModal={this.closeModal}
        />
      </>
    );
  }
}

const connector = connect((state: RootState) => ({
  filtersCount: getFiltersCount(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SearchFiltersButton);
