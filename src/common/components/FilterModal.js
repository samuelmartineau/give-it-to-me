import React, {Component, PropTypes} from 'react'
import FilterIcon from 'material-ui/svg-icons/content/sort'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import {debounce} from 'lodash'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import SearchFilter from './SearchFilter'
import {WINE_TYPES, WINE_CATEGORIES} from '../constants/WineTypes'

function getPeriod (type, evt, value) {
  const {filters} = this.props
  const index = filters.period.findIndex(year => year.type === type)
  const newPeriod = [...filters.period]
  const item = {
    type: type,
    value: value,
    label: type === 'max' ? 'x < ' + value : value + ' < x'
  }
  if (index > -1 && !value) {
    newPeriod.splice(index, 1)
  } else if (index > -1) {
    newPeriod[index] = item
  } else {
    newPeriod.push(item)
  }
  this.props.updateFilters({
    period: newPeriod
  })
}

export default class FilterModal extends Component {

  constructor (props) {
    super(props)
    this.handlePeriodMin = debounce(this.handlePeriodMin, 1000)
    this.handlePeriodMax = debounce(this.handlePeriodMax, 1000)
    this.state = {
      openModal: false
    }
  }

  handleOpenModal = () => {
    this.setState({openModal: true})
  }

  handleCloseModal = () => {
    this.setState({openModal: false})
  }

  removeFilter = (item) => {
    if (item.type === 'wineFamily') {
      const {wineFamilies} = this.props.filters
      const index = wineFamilies.map(wineFamily => wineFamily.id).indexOf(item.id)
      wineFamilies.splice(index, 1)
      this.handleWineFamilies(wineFamilies)
    } else if (item.type === 'max') {
      this.handlePeriodMax()
    } else if (item.type === 'min') {
      this.handlePeriodMin()
    } else if (item.type === 'wineType') {
      this.handleWineTypes({target: {value: item.key}}, false)
    } else if (item.type === 'wineCategory') {
      this.handleWineCategories({target: {value: item.key}}, false)
    }
  }

  handleWineFamilies = (wineFamilies) => {
    const newFilters = {
      wineFamilies: wineFamilies.map(wineFamily => ({
        type: 'wineFamily',
        ...wineFamily,
        ...{label: wineFamily.name}
      }))
    }
    this.props.updateFilters(newFilters)
  }

  handleWineTypes = (evt, value) => {
    const wineType = evt.target.value
    const {filters} = this.props
    const wineTypes = [...filters.wineTypes]
    const index = wineTypes.map(wineType => wineType.key).indexOf(wineType)
    if (value) {
      wineTypes.push({
        type: 'wineType',
        ...WINE_TYPES[wineType],
        ...{key: wineType}
      })
    } else if (index > -1) {
      wineTypes.splice(index, 1)
    }
    const newFilters = {
      wineTypes: wineTypes
    }
    this.props.updateFilters(newFilters)
  }

  handleWineCategories = (evt, value) => {
    const wineCategory = evt.target.value
    const {filters} = this.props
    const wineCategories = [...filters.wineCategories]
    const index = wineCategories.map(wineCategory => wineCategory.key).indexOf(wineCategory)
    if (value) {
      wineCategories.push({
        type: 'wineCategory',
        ...WINE_CATEGORIES[wineCategory],
        ...{key: wineCategory}
      })
    } else if (index > -1) {
      wineCategories.splice(index, 1)
    }
    const newFilters = {
      wineCategories: wineCategories
    }
    this.props.updateFilters(newFilters)
  }

  handlePeriodMin = getPeriod.bind(this, 'min')

  handlePeriodMax = getPeriod.bind(this, 'max')

  render () {
    const {filters, total} = this.props
    const actions = [
      <FlatButton
        label='Valider'
        keyboardFocused
        primary
        onTouchTap={this.handleCloseModal}
      />
    ]

    return (
      <div>
        <RaisedButton
          label={`Filtres (${total})`}
          primary
          onTouchTap={this.handleOpenModal}
          icon={<FilterIcon />}
        />
        <div style={{margin: '12px 0px', display: 'flex', flexWrap: 'wrap'}}>
          {Object.keys(filters).map(itemKey => filters[itemKey].map((item, index) => (
            <Chip
              style={{margin: 4}}
              onRequestDelete={() => this.removeFilter(item)}
              key={index}>{item.label}</Chip>
          )))}
        </div>
        {this.state.openModal && (
          <Dialog
            title={`Filtres (${total})`}
            actions={actions}
            modal={false}
            autoScrollBodyContent
            onRequestClose={this.handleCloseModal}
            contentStyle={{
              width: '100%',
              maxWidth: '600px'
            }}
            open={this.state.openModal}
          >
            <SearchFilter
              selectedWineFamilies={filters.wineFamilies}
              handleWineFamilies={this.handleWineFamilies}
              wineTypes={filters.wineTypes.map(wineType => wineType.key)}
              handleWineTypes={this.handleWineTypes}
              wineCategories={filters.wineCategories.map(wineCategory => wineCategory.key)}
              handleWineCategories={this.handleWineCategories}
              handlePeriodMin={this.handlePeriodMin}
              handlePeriodMax={this.handlePeriodMax}
              period={filters.period}
            />
          </Dialog>
      )}
      </div>
    )
  }
}

FilterModal.propTypes = {
  filters: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired
}
