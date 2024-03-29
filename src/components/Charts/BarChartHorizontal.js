import { Typography } from '@mui/material';
import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Connection from '../../model';

const BarChartHorizontal = () => {
    const [classes, setClasses] = React.useState([]); // Estado para armazenar dados da rota
    const [dataLoaded, setDataLoaded] = React.useState(false); // Estado para controlar se os dados foram carregados
    const selectedEventCodeJSON = localStorage.getItem("selectedEvent"); // Recupera o objeto do evento selecionado do localStorage
    const selectedEventCode = JSON.parse(selectedEventCodeJSON); // Converte a string JSON em um objeto

    //console.log(selectedEventCode);
    //console.log(selectedEventCode.eve_cod);

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

    //console.log('Classes: ' + classes)

    // Cria a variável que irá mapear os dados retornados pelo endpoint
    const classeIngressos = classes.map(item => ({
        tipo: item.tipo,
        quantidade: item.total
    }))

    return (
        <React.Fragment>
            <Typography component='h2' variant="subtitle1" sx={{ p: 1, mb: 2, mt: 5, fontSize: '14px' }} align='center' fontWeight="bold" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
                Classes
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={classeIngressos} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 10 }} /> {/* Eixo x do gráfico (valores) */}
                    <YAxis dataKey="tipo" type="category" tick={{ fontSize: 8 }} /> {/* Eixo y do gráfico (tipos) */}
                    <Tooltip
                        labelStyle={{ fontSize: 12 }}
                        itemStyle={{ fontSize: 12 }}
                    />
                    {classeIngressos.length > 0 && Object.keys(classeIngressos[0]).map((tipo, index) => (
                        <Bar key={index} dataKey={tipo} fill={`var(--blue)`} />
                    ))} {/* Gera as barras do gráfico de acordo com os dados */}
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default BarChartHorizontal;