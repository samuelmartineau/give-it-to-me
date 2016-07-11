import React, {PropTypes} from 'react'
import {select} from 'd3-selection'
import {scaleBand, scaleLinear} from 'd3-scale'
import {max} from 'd3-array'
import {axisBottom, axisLeft} from 'd3-axis'
import ReactFauxDOM from 'react-faux-dom'

function range (begin, end, interval = 1) {
  let result = []
  for (let i = begin; i < end; i += interval) {
    result.push(i)
  }
  return result
}

const margin = {top: 20, right: 20, bottom: 30, left: 40}
const width = 960 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom

const x = scaleBand()
    .range([0, width])

const y = scaleLinear()
    .range([height, 0])

const xAxis = axisBottom(x)

const yAxis = axisLeft(y)
  .tickFormat(e => {
    if (Math.floor(e) !== e) {
      return
    }
    return e
  })

const BarChart = ({wines}) => {
  let svgContainer = ReactFauxDOM.createElement('svg')

  const container = select(svgContainer)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${width + margin.left + margin.right}`)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
  const winesByYear = wines.reduce((acc, wine) => {
    const numberOfBottle = wine.isInBoxes ? wine.bottles.length : wine.count
    if (acc[wine.year]) {
      acc[wine.year] += numberOfBottle
    } else {
      acc[wine.year] = numberOfBottle
    }
    return acc
  }, {})
  const years = Object.keys(winesByYear).map(year => parseInt(year))
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)

  const dataset = range(minYear, maxYear + 1).map(year => {
    return {
      year,
      count: winesByYear[year] || 0
    }
  })

  x.domain(dataset.map(d => d.year))
  y.domain([0, max(dataset, d => d.count)])

  container
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  container
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Frequency')

  container
     .selectAll('.bar')
     .data(dataset)
     .enter()
     .append('rect')
     .attr('fill', 'steelblue')
     .attr('class', 'bar')
     .attr('x', d => x(d.year))
     .attr('width', x.bandwidth())
     .attr('y', d => y(d.count))
     .attr('height', d => height - y(d.count))

  return (
    <div>
      {svgContainer.toReact()}
    </div>
  )
}

BarChart.propTypes = {
  wines: PropTypes.array.isRequired
}

export default BarChart
