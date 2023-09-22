import { Typography } from '@mui/material';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid } from '@mui/material';

const FaturamentoChart = ({ data }) => {
    return (
        <React.Fragment>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5, fontSize: '14px' }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Faturamento por meio de pagamento <a href='/'>[Detalhes]</a>
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={1000} height={250} data={data} layout="vertical" barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="tipo" type="category" tick={{ fontSize: 12 }} />
                    <Tooltip
                        labelStyle={{ fontSize: 14 }}
                        itemStyle={{ fontSize: 14 }}
                    />
                    <Bar dataKey="Dinheiro" fill="#8884d8" />
                    <Bar dataKey="Crédito" fill="var(--blue)" />
                    <Bar dataKey="Débito" fill="#FCA503" />
                    <Bar dataKey="Pix" fill="#FA6384" />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default FaturamentoChart;
