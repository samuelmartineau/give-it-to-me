// @flow
import React from 'react';
import range from 'lodash/range';
import config from '~/config';
import styled from 'styled-components';

const { WINE_TYPES } = config.wineTypes;
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 1rem;
`;

export const YearsChart = ({ wines }) => {
  const years = new Set();
  wines.forEach(wine => years.add(wine.year));
  const yearsSorted = [...years].sort();
  const extendedYears = range(
    yearsSorted[0],
    yearsSorted[yearsSorted.length - 1] + 1,
    1
  );
  const initialMap = extendedYears.reduce(
    (acc, year) => ({
      ...acc,
      [year]: {
        year,
        RED: 0,
        WHITE: 0,
        CHAMPAGNE: 0
      }
    }),
    {}
  );
  const map = wines.reduce((acc, wine) => {
    acc[wine.year][wine.wineType] += wine.bottlesCount;
    return acc;
  }, initialMap);
  const data = Object.keys(map).map(year => map[year]);

  return (
    <>
      <Title>Distribution des bouteilles par année</Title>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          name={WINE_TYPES.RED.label}
          dataKey="RED"
          stackId="a"
          fill={WINE_TYPES.RED.color}
        />
        <Bar
          name={WINE_TYPES.WHITE.label}
          dataKey="WHITE"
          stackId="a"
          fill={WINE_TYPES.WHITE.color}
        />
        <Bar
          name={WINE_TYPES.CHAMPAGNE.label}
          dataKey="CHAMPAGNE"
          stackId="a"
          fill={WINE_TYPES.CHAMPAGNE.color}
        />
      </BarChart>
    </>
  );
};
