import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { TextField } from '~/client/components/Toolkit';
import { setRemoveCount, RootState } from '~/client/store';
import { WineEnhanced } from '~/client/Cellar.type';

const Wrapper = styled.div``;

const Label = styled.label`
  display: block;
  margin: 1em auto;
`;
const Text = styled.span`
  font-style: italic;
`;

type RawProps = {
  wine: WineEnhanced;
};

type Props = RawProps & PropsFromRedux;

const RemoveOutsideBottleForm: FC<Props> = ({ wine, count, updateCount }) => {
  return (
    <Wrapper>
      <h2>
        Ce vin à {wine.bottlesCount} bouteille{wine.bottlesCount > 1 && 's'}
      </h2>
      <Label>
        <Text>Combien voulez-vous supprimer de bouteille?</Text>
        <TextField onChange={updateCount} type="number" value={count} />
      </Label>
    </Wrapper>
  );
};

const connector = connect(
  (state: RootState) => ({
    count: state.remove.count,
  }),
  (dispatch, { wine }: RawProps) => ({
    updateCount(evt) {
      const { value } = evt.target;
      if (!value || (value > 0 && value <= wine.bottlesCount)) {
        dispatch(setRemoveCount(value));
      }
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RemoveOutsideBottleForm);
