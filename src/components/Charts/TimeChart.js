import { Typography } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimeChart = ({ data }) => {
  return (
    <React.Fragment>
      <Typography component="h2" variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5 }} align="center" fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
        Horário x Canal de Venda
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="horario" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            labelStyle={{ fontSize: 17 }}
            itemStyle={{ fontSize: 17 }} 
          />
          <Legend wrapperStyle={{ fontSize: 17 }} />
          <Line type="monotone" dataKey="PDV" stroke="#8884d8" name="PDV" />
          <Line type="monotone" dataKey="WEB" stroke="var(--blue)" name="WEB" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default TimeChart;