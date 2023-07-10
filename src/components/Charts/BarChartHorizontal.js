import { Typography } from '@mui/material';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartHorizontal = ({ data }) => {
    return (
        <div>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Classes <a href='/'>[Detalhes]</a>
            </Typography>
            <BarChart width={400} height={250} data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{fontSize: 12}} />
                <YAxis dataKey="tipo" type="category" tick={{fontSize: 12}} />
                <Tooltip />

                <Bar dataKey="quantidade" fill="#8884d8" />
            </BarChart>
            
        </div>
    );
};

export default BarChartHorizontal;
