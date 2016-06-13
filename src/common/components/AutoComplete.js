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
            textField: '',
            itemsSelected: []
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

    onChipTap(index) {
        const {onMultipleUpdate} = this.props;
        const {itemsSelected} = this.state;
        itemsSelected.splice(index, 1);
        onMultipleUpdate(itemsSelected);
        this.setState({itemsSelected: itemsSelected});
    }

    onItemSelected(item) {
        const {onMultipleUpdate, selectionMode, displaySelectedItemInField, onItemClicked} = this.props;
        const {itemsSelected} = this.state;
        itemsSelected.push(item);
        if (selectionMode) {
            onItemClicked(item);
        } else {
            onMultipleUpdate(itemsSelected);
        }
        this.setState({
            itemSelected: selectionMode ? true : false,
            textField: selectionMode ? displaySelectedItemInField(item) : '',
            searchEntry: '',
            itemsSelected: itemsSelected,
        });
    }

    render () {
        const {selectionMode, textFieldLabel, filter, displayContentItem, onClearButtonClicked, displaySelectedItemInField} = this.props;
        const {itemsSelected} = this.state;
        let filteredItems = filter(this.state.searchEntry);
        return (
          <div >
            <div style={autoCompleteStyle.autocomplete}>
              <TextField
                  value={this.state.textField}
                  floatingLabelText={textFieldLabel}
                  disabled={ selectionMode && this.state.itemSelected }
                  onChange={this.onEntry.bind(this)}
              />
              {
                  selectionMode && this.state.itemSelected &&
                  <IconButton
                    onTouchTap={() => {this.onClearInput(); onClearButtonClicked();}}
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
                            onTouchTap={this.onItemSelected.bind(this, item, index)}
                            />)}
                    </Menu>
              }
            </div>
            <div>
                {
                    !selectionMode &&
                    itemsSelected.map((item, index) => (
                        <div key={index} onClick={this.onChipTap.bind(this, index)}>
                          <span>{displaySelectedItemInField(item)}</span>
                          <span>x</span>
                        </div>
                    ))
                }
            </div>
          </div>
        );
    }
}

AutoComplete.propTypes = {
    textFieldLabel: PropTypes.string.isRequired,
    displayContentItem: PropTypes.func.isRequired,
    displayContentItem: PropTypes.func.isRequired,
    onItemClicked: PropTypes.func,
    onMultipleUpdate: PropTypes.func,
    displaySelectedItemInField: PropTypes.func.isRequired,
    filter:PropTypes.func.isRequired,
    selectionMode: PropTypes.bool
}
