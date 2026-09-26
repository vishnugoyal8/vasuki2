import React from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

export const GovRadarChart = ({
  data = [],
  studentKey = 'studentScore',
  targetKey = 'industryTarget',
  subjectKey = 'skill',
  height = 320,
}) => {
  return (
    <div className="w-full min-w-0 overflow-hidden" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="62%" data={data}>
          <PolarGrid stroke="#DDE3E8" />
          <PolarAngleAxis
            dataKey={subjectKey}
            tick={{ fill: '#222222', fontSize: 10, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#666666', fontSize: 9 }}
            stroke="#DDE3E8"
          />
          <Radar
            name="Trainee Verified Score"
            dataKey={studentKey}
            stroke="#0056A6"
            fill="#0056A6"
            fillOpacity={0.35}
            strokeWidth={2}
          />
          <Radar
            name="Industry Required Benchmark"
            dataKey={targetKey}
            stroke="#F28C28"
            fill="#F28C28"
            fillOpacity={0.2}
            strokeWidth={2}
            strokeDasharray="4 4"
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
          <Legend
            wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GovRadarChart;
