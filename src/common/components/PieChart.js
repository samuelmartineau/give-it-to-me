import React, {Component, PropTypes} from 'react'
import {select} from 'd3'
import ReactFauxDOM from 'react-faux-dom'

const PieChart = ({wines}) => {
  let svgContainer = ReactFauxDOM.createElement('svg')
  const winesByType = wines.reduce((acc, wine) => {
    if (acc[wine.wineType]) {
      acc[wine.wineType] += 1
    } else {
      acc[wine.wineType] = 1
    }
    return acc
  }, {})

  return (
    <div>
      Pie Chart
    </div>
  )
}

PieChart.propTypes = {
  wines: PropTypes.array.isRequired
}

export default PieChart
