import React, { useState } from 'react';
import './tableDiario.css';
import Checkbox from '@mui/material/Checkbox';
import { TableContainer } from '@mui/material';

const TableClassesDiario = () => {
    const [tabelaData, setTabelaData] = useState([
        { id: 1, data: '03/05/2023', prazo: '29 dias', venda: 31, cortesia: 0, valor: 'R$ 300,00'},
        { id: 2, data: '25/01/2023', prazo: '12 dias', venda: 15, cortesia: 0, valor: 'R$ 200,00'},
    ]);

    const [linhaSelecionada, setLinhaSelecionada] = useState(-1);

    const expandirLinha = (id) => {
        setTabelaData((prevData) =>
            prevData.map((item) => {
                if (item.id === id) {
                    return { ...item, expandir: !item.expandir };
                }
                return item;
            })
        );

        setLinhaSelecionada(id);
    };

    function createData(classe, valor, vendas, cortesia, total, vTotal) {
        return { classe, valor, vendas, cortesia, total, vTotal };
    }

    const rows = [
        createData('CAMAROTE', 'R$70,00', 24, 0, 24, 'R$ 1.680,00'),
        createData('PISTA', 'R$50,00', 27, 0, 27, 'R$ 1.350,00'),
    ];

    return (
        <TableContainer>
            <table className="diario-tabela">
                <thead>
                    <tr>
                        <th className="diario-cabecalho"></th>
                        <th className="diario-cabecalho">Data</th>
                        <th className="diario-cabecalho">Prazo p/ evento</th>
                        <th className="diario-cabecalho">Venda</th>
                        <th className="diario-cabecalho">Cortesia</th>
                        <th className="diario-cabecalho">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {tabelaData.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <tr
                                className={index % 2 === 0 ? 'diario-linha-branca' : 'diario-linha-cinza'}
                            >
                                <td className="diario-celula">
                                    <button
                                        className="diario-botao-expandir"
                                        onClick={() => expandirLinha(item.id)}
                                    >
                                        {item.expandir ? '-' : '+'}
                                    </button>
                                </td>
                                <td className="diario-celula">{item.data}</td>
                                <td className="diario-celula">{item.prazo}</td>
                                <td className="diario-celula">{item.venda}</td>
                                <td className="diario-celula">{item.cortesia}</td>
                                <td className="diario-celula">{item.valor}</td>
                            </tr>
                            {item.expandir && (
                                <>
                                    <tr>
                                        <td className="diario-linha-azul">Classe</td>
                                        <td className="diario-linha-azul">Valor</td>
                                        <td className="diario-linha-azul">Vendido</td>
                                        <td className="diario-linha-azul">Cortesia</td>
                                        <td className="diario-linha-azul">Total</td>
                                        <td className="diario-linha-azul">Valor Total</td>
                                    </tr>
                                    {rows.map((row) => (
                                        <tr>
                                            <td className="diario-conteudo-expandido">{row.classe}</td>
                                            <td className="diario-conteudo-expandido">{row.valor}</td>
                                            <td className="diario-conteudo-expandido">{row.vendas}</td>
                                            <td className="diario-conteudo-expandido">{row.cortesia}</td>
                                            <td className="diario-conteudo-expandido">{row.total}</td>
                                            <td className="diario-conteudo-expandido">{row.vTotal}</td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </TableContainer>

    );
};

export default TableClassesDiario;
