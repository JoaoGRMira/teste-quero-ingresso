import { Typography } from '@mui/material';
import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartHorizontal = ({ data }) => {
    return (
        <React.Fragment>
                <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                    Classes <a href='/'>[Detalhes]</a>
                </Typography>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="tipo" type="category" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="Camarote" fill="var(--blue)" />
                    <Bar dataKey="Pista" fill="#8884d8" />
                    <Legend wrapperStyle={{ fontSize: 17 }} />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default BarChartHorizontal;
