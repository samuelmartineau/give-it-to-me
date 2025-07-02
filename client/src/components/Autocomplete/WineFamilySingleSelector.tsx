import React, { FC } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { WineFamilySuggestion } from './WineFamilySuggestion';
import WineFamilyFormater from './WineFamilyFormater';
import { Button } from '@/components/Toolkit';
import { RootState } from '@/store';

const ButtonStyled = styled(Button)`
  margin: auto 1em;
`;
const SelectedFamily = styled.span`
  font-weight: bold;
`;

type RawProps = {
  selected?: number;
};

type Props = RawProps &
  PropsFromRedux & {
    onSuggestionSelected: Function;
    onClear: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };

const WineFamilySingleSelector: FC<Props> = ({
  selectedFamily,
  onClear,
  onSuggestionSelected,
}) => {
  return (
    <>
      {selectedFamily && (
        <div>
          <SelectedFamily>{selectedFamily.name}</SelectedFamily>
          <ButtonStyled type="button" primary onClick={onClear}>
            changer
          </ButtonStyled>
        </div>
      )}
      {!selectedFamily && (
        <WineFamilyFormater>
          {(wineFamilies) => (
            <WineFamilySuggestion
              onSuggestionSelected={onSuggestionSelected}
              wineFamilies={wineFamilies}
            />
          )}
        </WineFamilyFormater>
      )}
    </>
  );
};

const connector = connect((state: RootState, { selected }: RawProps) => ({
  selectedFamily: state.wineFamilies.map[selected],
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WineFamilySingleSelector);
