import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { TextField } from '~/client/components/Toolkit';
import { setRemoveCount } from '~/client/store';

const Wrapper = styled.div``;

const Label = styled.label`
  display: block;
  margin: 1em auto;
`;
const Text = styled.span`
  font-style: italic;
`;

type Props = {
  wine: {};
  updateCount: Function;
  count: number;
};

class RemoveOutsideBottleForm extends React.PureComponent<Props> {
  render() {
    const { wine, count, updateCount } = this.props;
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
  }
}

export default connect(
  (state) => ({
    count: state.remove.count,
  }),
  (dispatch, { wine }) => ({
    updateCount(evt) {
      const { value } = evt.target;
      if (!value || (value > 0 && value <= wine.bottlesCount)) {
        dispatch(setRemoveCount(value));
      }
    },
  })
)(RemoveOutsideBottleForm);
