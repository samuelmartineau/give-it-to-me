import React, {Component, PropTypes} from 'react';
import { TextField, FlatButton } from 'material-ui';

import * as actions from '../actions';
import UploadPicture from '../components/UploadPicture';

export default class WineAddingForm extends Component {
    handleAddWine() {
        const { dispatch } = this.props;
        const wine = { name: this.state.name };
        dispatch(actions.createWine(wine));
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

  render() {
      return (
          <div>
            <TextField
              floatingLabelText="Nom"
              onChange={::this.handleNameChange}
            />
            <FlatButton
              label="Ajouter"
              onClick={this.handleAddWine.bind(this)}
            />
            <UploadPicture {...this.props} />
          </div>
      );
  }
}

WineAddingForm.propTypes = {
    wines: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}
