import React, { FC } from 'react';
import range from 'lodash/range';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import config from '~/config';
import { WineEnhanced } from '@/Cellar.type';

const { WINE_TYPES } = config.wineTypes;

type Props = { wines: WineEnhanced[] };

export const YearsChart: FC<Props> = ({ wines }) => {
  const years = new Set<number>();
  wines.forEach((wine: WineEnhanced) => years.add(wine.year));
  const yearsSorted = [...Array.from(years)].sort();
  const extendedYears = range(
    yearsSorted[0],
    yearsSorted[yearsSorted.length - 1] + 1,
    1,
  );
  const initialMap = extendedYears.reduce(
    (acc, year) => ({
      ...acc,
      [year]: {
        year,
        RED: 0,
        WHITE: 0,
        CHAMPAGNE: 0,
      },
    }),
    {},
  );
  const map = wines.reduce((acc, wine) => {
    acc[wine.year][wine.wineType] += wine.bottlesCount;
    return acc;
  }, initialMap);
  const data = Object.keys(map).map((year) => map[year]);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 15 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 15 }} />
          <Tooltip />
          <Legend
            wrapperStyle={{ fontSize: 16, paddingTop: 8 }}
            formatter={(value) => (
              <span style={{ color: '#1d1a1b', textTransform: 'capitalize' }}>
                {value}
              </span>
            )}
          />
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
      </ResponsiveContainer>
    </>
  );
};
