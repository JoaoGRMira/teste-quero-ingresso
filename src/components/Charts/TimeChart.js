import { Typography } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TimeChart = ({ data }) => {
    return (
        <div>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Horário x Canal de Venda
            </Typography>
            <LineChart width={1000} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="horario" tick={{ fontSize: 12 }} />
                <YAxis dataKey='quantidade' type="number" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="quantidade" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default TimeChart;
