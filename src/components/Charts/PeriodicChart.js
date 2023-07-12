import { Typography } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PeriodicChart = ({ data }) => {
    return (
        <React.Fragment>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Gráfico Periódico
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey='quantidade' type="number" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="quantidade" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default PeriodicChart;
