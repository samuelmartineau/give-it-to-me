import React, {PropTypes} from 'react'
import {select} from 'd3-selection'
import {arc, pie} from 'd3-shape'
import ReactFauxDOM from 'react-faux-dom'

import {WINE_TYPES} from '../constants/WineTypes'

const width = 500
const height = 500
const radius = Math.min(width, height) / 2

const svgArc = arc()
    .outerRadius(radius - 10)
    .innerRadius(0)

const labelArc = arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40)

const svgPie = pie()
    .sort(null)
    .value(d => d.count)

const PieChart = ({wines}) => {
  let svgContainer = ReactFauxDOM.createElement('svg')

  const container = select(svgContainer)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const winesByType = wines.reduce((acc, wine) => {
    if (acc[wine.wineType]) {
      acc[wine.wineType] += 1
    } else {
      acc[wine.wineType] = 1
    }
    return acc
  }, {})

  const dataset = Object.keys(winesByType).map(key => {
    return {
      type: key,
      count: winesByType[key]
    }
  })

  const g = container
    .selectAll('.arc')
    .data(svgPie(dataset))
    .enter()
    .append('g')

  g.append('path')
    .attr('d', svgArc)
    .style('fill', d => WINE_TYPES[d.data.type].color)

  g.append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .style('fill', 'white')
      .text(d => d.data.count)

  return (
    <div style={{flex: 1}}>
      <h2>Vins par type</h2>
      <div style={{maxWidth: '300px', margin: 'auto'}}>
        {svgContainer.toReact()}
      </div>
    </div>
  )
}

PieChart.propTypes = {
  wines: PropTypes.array.isRequired
}

export default PieChart
