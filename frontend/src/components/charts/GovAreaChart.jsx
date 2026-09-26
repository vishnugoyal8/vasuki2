import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const GovAreaChart = ({
  data = [],
  xKey = 'quarter',
  areas = [
    { key: 'evAutomotive', label: 'EV & Automotive', stroke: '#003B70', fill: '#003B70' },
    { key: 'precisionEng', label: 'Precision Engineering', stroke: '#0056A6', fill: '#0056A6' },
    { key: 'renewables', label: 'Renewable Energy', stroke: '#F28C28', fill: '#F28C28' },
    { key: 'industry4', label: 'Industry 4.0 & PLC', stroke: '#198754', fill: '#198754' },
  ],
  height = 300,
}) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DDE3E8" vertical={false} />
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
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DDE3E8',
              borderRadius: '0.375rem',
              fontSize: '11px',
              boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.05)',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }} />
          {areas.map(a => (
            <Area
              key={a.key}
              type="monotone"
              dataKey={a.key}
              name={a.label}
              stroke={a.stroke}
              fill={a.fill}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GovAreaChart;
