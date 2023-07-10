import { Typography } from '@mui/material';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Grid } from '@mui/material';

const VpTChart = ({ data }) => {
    return (
        <div style={{justify:'center'}}>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Vendas por Tipo de Ingresso <a href='/'>[Detalhes]</a>
            </Typography>
            <BarChart width={1000} height={250} data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{fontSize: 12}} />
                <YAxis dataKey="tipo" type="category" tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="quantidade" fill="pink" />
            </BarChart>
        </div>
    );
};

export default VpTChart;
