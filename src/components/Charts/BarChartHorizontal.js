import { Typography } from '@mui/material';
import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Connection from '../../model';

const BarChartHorizontal = () => {
    const [classes, setClasses] = React.useState([]); // Estado para armazenar dados da rota
    const [dataLoaded, setDataLoaded] = React.useState(false); // Estado para controlar se os dados foram carregados

    // Recupera o objeto do evento selecionado do localStorage
    const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
    const selectedEventCode = JSON.parse(selectedEventCodeJSON); // Converte a string JSON em um objeto

    console.log(selectedEventCode);
    console.log(selectedEventCode.eve_cod);

    React.useEffect(() => {
        if (selectedEventCode && !dataLoaded) {
            const conn = Connection();

            // Acessa o endpoint de tipo de ingresso
            const fetchClasses = async () => {
                try {
                    const response = await conn.get(
                        'metrics/classes?evento=' +
                        selectedEventCode.eve_cod,
                        {
                            headers: {
                                'token': localStorage.getItem('token')
                            }
                        }
                    );

                    // Se der certo, salva os dados no estado de tipo de ingresso
                    if (response.status === 200) {
                        setClasses(response.data);
                        setDataLoaded(true)
                    } else {
                        console.log('Erro na resposta da API (Tipo Ingresso):', response);
                    }
                } catch (error) {
                    console.error('Erro na solicitação GET (Tipo Ingresso):', error);
                }
            };

            fetchClasses();
        }
    }, [selectedEventCode, dataLoaded]);

    console.log(classes)

    const classeIngressos = classes.map(item => ({
        tipo: item.tipo,
        quantidade: item.total
    }))

    const tipoIngressos = [
        { tipo: 'Camarote', Camarote: 100 },
        { tipo: 'Pista', Pista: 50 },
    ];

    return (
        <React.Fragment>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5, fontSize: '14px' }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Classes <a href='/'>[Detalhes]</a>
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={classeIngressos} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="tipo" type="category" tick={{ fontSize: 12 }} />
                    <Tooltip
                        labelStyle={{ fontSize: 14 }}
                        itemStyle={{ fontSize: 14 }}
                    />
                    {classeIngressos.length > 0 && Object.keys(classeIngressos[0]).map((tipo, index) => (

                        <Bar key={index} dataKey={tipo} fill={`var(--blue)`} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default BarChartHorizontal;
