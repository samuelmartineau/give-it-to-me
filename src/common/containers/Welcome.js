import React from 'react'
import { connect } from 'react-redux'

import config from '../../../config'
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import CellarSchema from '../components/CellarSchema'

class Welcome extends React.Component {
  render () {
    const {wines, bottlesCount} = this.props
    return (
      <div>
        <p>Disponible à {window.__CURRENT_IP__}:{config.PORT}</p>
        <CellarSchema
          wines={wines}
          selectedCells={{}}
          selectableCells={{}}
          availableCells={{}}
          isBoxClickable={() => {}}
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
            <div style={{color: 'darkcyan'}}>
              <div style={{margin: '20px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontSize: '80px'}}>{wines.length}</span>
                <span style={{marginLeft: '5px'}}> vins</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontSize: '60px'}}>{bottlesCount}</span>
                <span style={{marginLeft: '5px'}}> bouteilles</span>
              </div>
            </div>
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
