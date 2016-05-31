import React, {Component, PropTypes} from 'react';
import {Menu, MenuItem, TextField, IconButton, FontIcon} from 'material-ui';
import ContentClose from 'material-ui/svg-icons/navigation/close';

import * as autoCompleteStyle from '../styles/AutoComplete';

export default class AutoComplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchEntry: '',
            itemSelected: false,
            textField: ''
        };
        this.onItemSelected = this.onItemSelected.bind(this);
        this.onClearInput = this.onClearInput.bind(this);
        const {defaultItem, onItemClicked, selectionMode, displaySelectedItemInField} = props;
        if (defaultItem) {
            this.state = {...this.state, ...{
                itemSelected: selectionMode ? true : false,
                textField: selectionMode ? displaySelectedItemInField(defaultItem) : '',
                searchEntry: ''
            }};
        }
    }

    onEntry(e) {
        this.setState({
            searchEntry: e.target.value,
            textField: e.target.value
        });
    }

    onClearInput() {
        this.setState({itemSelected: false, textField: ''});
    }

    onItemSelected(item) {
        const {selectionMode, displaySelectedItemInField, onItemClicked} = this.props;
        onItemClicked(item);
        this.setState({
            itemSelected: selectionMode ? true : false,
            textField: selectionMode ? displaySelectedItemInField(item) : '',
            searchEntry: '',
        });
    }

    render () {
        const {selectionMode = false, filter, displayContentItem, onClearButtonClicked} = this.props;
        let filteredItems = filter(this.state.searchEntry);
        return (
          <div style={autoCompleteStyle.autocomplete}>
              <TextField
                  value={this.state.textField}
                  floatingLabelText="Sélectionnez l'AOC"
                  disabled={ selectionMode && this.state.itemSelected }
                  onChange={this.onEntry.bind(this)}
              />
              {
                  selectionMode && this.state.itemSelected &&
                  <IconButton
                    onClick={() => {this.onClearInput(); onClearButtonClicked();}}
                    style={autoCompleteStyle.clearButton}
                    touch={true}>
                    <ContentClose />
                  </IconButton>
              }
              {
                !!filteredItems.length &&
                    <Menu disableAutoFocus={true} style={{overflowY: 'scroll', maxHeight: '250px', background: 'rgba(158, 158, 158, 0.3)'}}>
                        {filteredItems.map((item, index) => <MenuItem
                            key={index}
                            children={displayContentItem(item)}
                            onClick={this.onItemSelected.bind(this, item, index)}
                            />)}
                    </Menu>
              }
          </div>
        );
    }
}

AutoComplete.propTypes = {
    displayContentItem: PropTypes.func.isRequired,
    onItemClicked: PropTypes.func.isRequired,
    displaySelectedItemInField: PropTypes.func.isRequired,
    filter:PropTypes.func.isRequired,
    selectionMode: PropTypes.bool
}
