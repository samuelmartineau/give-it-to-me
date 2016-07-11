import React from 'react'
import { connect } from 'react-redux'

import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'

class Welcome extends React.Component {
  render () {
    const {wines, bottlesCount} = this.props
    return (
      <div>
        <h2>Comptabilité</h2>
        <p>{wines.length} vins</p>
        <p>{bottlesCount} bouteilles</p>
        <BarChart
          wines={wines}
          />
        <PieChart
          wines={wines}
          />
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
