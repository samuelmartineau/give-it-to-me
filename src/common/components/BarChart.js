import React, {Component, PropTypes} from 'react'
import {select} from 'd3'
import ReactFauxDOM from 'react-faux-dom'

function range(begin, end, interval = 1) {
  let result = []
  for (let i = begin; i < end; i += interval) {
    result.push(i)
  }
  return result
}


const BarChart = ({wines}) => {
  let svgContainer = ReactFauxDOM.createElement('svg')
  const winesByYear = wines.reduce((acc, wine) => {
    if (acc[wine.year]) {
      acc[wine.year] += 1
    } else {
      acc[wine.year] = 1
    }
    return acc
  }, {})
  const years = Object.keys(winesByYear).map(year => parseInt(year))
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)

  const datas = range(minYear, maxYear).map(year => {
    return {
      year,
      count: winesByYear[year] || 0
    }
  })

  return (
    <div>
      Bar Chart
    </div>
  )
}

BarChart.propTypes = {
  wines: PropTypes.array.isRequired
}

export default BarChart
