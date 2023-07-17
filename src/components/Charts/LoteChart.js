import { Typography } from '@mui/material';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid } from '@mui/material';

const LoteChart = ({ data }) => {
    return (
        <React.Fragment>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Vendas por Lote <a href='/'>[Detalhes]</a>
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="tipo" type="category" tick={{ fontSize: 12 }} />
                    <Tooltip
                        labelStyle={{ fontSize: 17 }}
                        itemStyle={{ fontSize: 17 }}
                    />
                    <Bar dataKey="quantidade" fill="#FCA503" />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default LoteChart;
