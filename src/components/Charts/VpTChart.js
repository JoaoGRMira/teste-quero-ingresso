import { Typography } from '@mui/material';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VpTChart = ({ data }) => {
    return (
        <React.Fragment>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5, fontSize: '14px' }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Vendas por Tipo de Ingresso <a href='/'>[Detalhes]</a>
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart width={1000} height={250} data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="tipo" type="category" tick={{ fontSize: 12 }} />
                    <Tooltip
                        labelStyle={{ fontSize: 14 }}
                        itemStyle={{ fontSize: 14 }}
                    />
                    <Bar dataKey="Vendas" fill="#FA6384" />
                    <Bar dataKey="Cortesias" fill="#FA6384" />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default VpTChart;
