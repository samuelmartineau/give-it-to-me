import React from 'react'
import { connect } from 'react-redux'

import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'

class Welcome extends React.Component {
  render () {
    const {wines} = this.props
    return (
      <div>
        {wines.length} bouteilles
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
  return {wines: state.cellar.wines}
}
export default connect(mapStateToProps)(Welcome)
