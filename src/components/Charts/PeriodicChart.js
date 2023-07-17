import { Typography } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PeriodicChart = ({ data }) => {
  return (
    <React.Fragment>
      <Typography component="h2" variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5 }} align="center" fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
        Gráfico Periódico
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="periodo" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 17 }}/>
          <Line type="monotone" dataKey="Venda" stroke="purple" />
          <Line type="monotone" dataKey="Cortesia" stroke="blue" />
          <Line type="monotone" dataKey="Total" stroke="green" />
          <Line type="monotone" dataKey="Acumulado" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default PeriodicChart;