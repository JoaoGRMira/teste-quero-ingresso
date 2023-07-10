import { Typography } from '@mui/material';
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const DonutChart = ({ data }) => {
  const COLORS = ['#8884d8', 'var(--blue)'];

  return (
    <div>
      <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
      Tipos de Ingresso
      </Typography>
      <PieChart width={500} height={250}>
        <Pie
          data={data}
          dataKey="quantidade"
          nameKey="tipo"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="var(--blue)"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default DonutChart;