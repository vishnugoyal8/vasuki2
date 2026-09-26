import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const GovBarChart = ({
  data = [],
  xKey = 'name',
  bars = [
    { key: 'industryDemand', label: 'Industry Demand', color: '#0056A6' },
    { key: 'itiPassouts', label: 'ITI Passouts', color: '#F28C28' },
  ],
  height = 300,
  layout = 'horizontal',
}) => {
  return (
    <div className="w-full min-w-0 overflow-hidden" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#DDE3E8" vertical={false} />
          {layout === 'horizontal' ? (
            <>
              <XAxis
                dataKey={xKey}
                tick={{ fill: '#666666', fontSize: 11 }}
                axisLine={{ stroke: '#DDE3E8' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#666666', fontSize: 10 }}
                axisLine={{ stroke: '#DDE3E8' }}
                tickLine={false}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tick={{ fill: '#666666', fontSize: 10 }}
                axisLine={{ stroke: '#DDE3E8' }}
              />
              <YAxis
                type="category"
                dataKey={xKey}
                tick={{ fill: '#666666', fontSize: 11 }}
                axisLine={{ stroke: '#DDE3E8' }}
                width={120}
              />
            </>
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DDE3E8',
              borderRadius: '0.375rem',
              fontSize: '11px',
              boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.05)',
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }}
          />
          {bars.map(b => (
            <Bar
              key={b.key}
              dataKey={b.key}
              name={b.label}
              fill={b.color}
              radius={[3, 3, 0, 0]}
              maxBarSize={45}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GovBarChart;
