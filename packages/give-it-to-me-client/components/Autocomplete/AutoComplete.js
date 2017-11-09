// @flow
import React from "react";
import IconButton from "material-ui/IconButton/IconButton";
import TextField from "material-ui/TextField";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui-icons/Menu";
import ContentClose from "material-ui-icons/Close";
import Chip from "material-ui/Chip";
import { debounce } from "lodash";

const autoCompleteStyle = {
  autocomplete: {
    position: "relative"
  },
  clearButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    margin: "auto"
  }
};

type AutoCompleteProps = {
  hintText: string,
  textFieldLabel: string,
  displayContentItem: Function,
  onItemClicked: Function,
  onMultipleUpdate: Function,
  displaySelectedItemInField: Function,
  filter: Function,
  selectionMode: boolean,
  defaultSelectedItems: Array
};

export default class AutoComplete extends React.Component<AutoCompleteProps> {
  constructor(props) {
    super(props);
    this.state = {
      searchEntry: "",
      itemSelected: false,
      textField: "",
      filteredItems: [],
      itemsSelected: props.defaultSelectedItems || []
    };
    this.onItemSelected = this.onItemSelected.bind(this);
    this.onClearInput = this.onClearInput.bind(this);
    this.onFilter = debounce(this.onFilter, 600);
    const { defaultItem, selectionMode, displaySelectedItemInField } = props;
    if (defaultItem) {
      this.state = {
        ...this.state,
        ...{
          itemSelected: selectionMode,
          textField: selectionMode
            ? displaySelectedItemInField(defaultItem)
            : "",
          searchEntry: ""
        }
      };
    }
  }

  onFilter = searchEntry => {
    const { filter } = this.props;
    const filteredItems = filter(searchEntry);
    this.setState({ filteredItems: filteredItems });
  };

  onEntry = (evt, value) => {
    this.onFilter(value);
    this.setState({ searchEntry: value, textField: value });
  };

  onClearInput() {
    this.setState({ itemSelected: false, textField: "" });
  }

  onChipTap(index) {
    const { onMultipleUpdate } = this.props;
    const { itemsSelected } = this.state;
    itemsSelected.splice(index, 1);
    onMultipleUpdate(itemsSelected);
    this.setState({ itemsSelected: itemsSelected });
  }

  onItemSelected(item) {
    const {
      onMultipleUpdate,
      selectionMode,
      displaySelectedItemInField,
      onItemClicked
    } = this.props;
    const { itemsSelected } = this.state;
    itemsSelected.push(item);
    if (selectionMode) {
      onItemClicked(item);
    } else {
      onMultipleUpdate(itemsSelected);
    }
    this.setState({
      itemSelected: selectionMode,
      textField: selectionMode ? displaySelectedItemInField(item) : "",
      searchEntry: "",
      filteredItems: [],
      itemsSelected: itemsSelected
    });
  }

  renderChip(data, index) {
    const { displayContentItem } = this.props;
    return (
      <Chip key={index} onRequestDelete={() => this.onChipTap(index)}>
        {displayContentItem(data)}
      </Chip>
    );
  }

  render() {
    const {
      selectionMode,
      textFieldLabel,
      displayContentItem,
      onClearButtonClicked,
      hintText
    } = this.props;
    const { itemsSelected, filteredItems } = this.state;
    return (
      <div>
        <div style={autoCompleteStyle.autocomplete}>
          <TextField
            hintText={hintText}
            value={this.state.textField}
            floatingLabelText={textFieldLabel}
            disabled={selectionMode && this.state.itemSelected}
            onChange={this.onEntry}
          />
          {selectionMode &&
            this.state.itemSelected && (
              <IconButton
                onClick={() => {
                  this.onClearInput();
                  onClearButtonClicked();
                }}
                style={autoCompleteStyle.clearButton}
                touch
              >
                <ContentClose />
              </IconButton>
            )}
          {!!filteredItems.length && (
            <Menu
              disableAutoFocus
              style={{
                overflowY: "scroll",
                maxHeight: "250px",
                background: "rgba(158, 158, 158, 0.3)"
              }}
            >
              {filteredItems.map((item, index) => (
                <MenuItem
                  key={index}
                  children={displayContentItem(item)}
                  onClick={this.onItemSelected.bind(this, item, index)}
                />
              ))}
            </Menu>
          )}
        </div>
        <div>
          {!selectionMode && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap"
              }}
            >
              {itemsSelected.map(this.renderChip, this)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

// AutoComplete.propTypes = {
//   hintText: PropTypes.string,
//   textFieldLabel: PropTypes.string.isRequired,
//   displayContentItem: PropTypes.func.isRequired,
//   onItemClicked: PropTypes.func,
//   onMultipleUpdate: PropTypes.func,
//   displaySelectedItemInField: PropTypes.func.isRequired,
//   filter: PropTypes.func.isRequired,
//   selectionMode: PropTypes.bool,
//   defaultSelectedItems: PropTypes.array
// };
