import { Typography } from '@mui/material';
import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartHorizontal = () => {

    const tipoIngressos = [
        { tipo: 'Camarote', Camarote: 100 },
        { tipo: 'Pista', Pista: 50 },
    ];

    return (
        <React.Fragment>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5 }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Classes <a href='/'>[Detalhes]</a>
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={tipoIngressos} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="tipo" type="category" tick={{ fontSize: 12 }} />
                    <Tooltip
                        labelStyle={{ fontSize: 17 }}
                        itemStyle={{ fontSize: 17 }}
                    />
                        <Bar fill={`var(--blue)`} />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default BarChartHorizontal;
