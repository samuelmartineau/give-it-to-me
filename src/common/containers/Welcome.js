import React from 'react'
import { connect } from 'react-redux'

import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import CellarSchema from '../components/CellarSchema'

class Welcome extends React.Component {
  render () {
    const {wines, bottlesCount} = this.props
    return (
      <div>
        <CellarSchema
          wines={wines}
          selectedCells={{}}
          selectableCells={{}}
          availableCells={{}}
          overviewMode />
        <BarChart
          wines={wines}
          />
        <div style={{display: 'flex', textAlign: 'center'}}>
          <PieChart
            wines={wines}
            />
          <div style={{flex: 1}}>
            <h2>Comptabilité</h2>
            <p>{wines.length} vins</p>
            <p>{bottlesCount} bouteilles</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const bottlesCount = state.cellar.wines.reduce((acc, wine) => {
    acc += wine.isInBoxes ? wine.bottles.length : wine.count
    return acc
  }, 0)
  return {
    wines: state.cellar.wines,
    bottlesCount
  }
}
export default connect(mapStateToProps)(Welcome)
