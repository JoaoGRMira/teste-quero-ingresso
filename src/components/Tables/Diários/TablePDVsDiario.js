import React, { useState } from 'react';
import './tableDiario.css';
import Checkbox from '@mui/material/Checkbox';
import { TableContainer } from '@mui/material';

const TablePDVsDiario = () => {
    const [tabelaData, setTabelaData] = useState([
        { id: 1, data: '03/05/2023', prazo: '29 dias', venda: 31, cortesia: 0, valor: 'R$ 300,00' },
        { id: 2, data: '25/01/2023', prazo: '12 dias', venda: 15, cortesia: 0, valor: 'R$ 200,00' },
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

    function createData(pdv, vendas, cortesias, total) {
        return { pdv, vendas, cortesias, total };
    }

    const rows = [
        createData('Loja Virtual', 51, 0, 'R$ 680,00'),
        createData('Loja Física', 17, 0, 'R$ 350,00'),
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
                                        <td className="diario-linha-azul"></td>
                                        <td className="diario-linha-azul">PDV</td>
                                        <td className="diario-linha-azul">Ingressos Vendidos</td>
                                        <td className="diario-linha-azul">Cortesias Emitidas</td>
                                        <td className="diario-linha-azul">Total Vendidos (R$)</td>
                                        <td className="diario-linha-azul"></td>
                                    </tr>
                                    {rows.map((row) => (
                                        <tr>
                                            <td className="diario-conteudo-expandido"></td>
                                            <td className="diario-conteudo-expandido">{row.pdv}</td>
                                            <td className="diario-conteudo-expandido">{row.vendas}</td>
                                            <td className="diario-conteudo-expandido">{row.cortesias}</td>
                                            <td className="diario-conteudo-expandido">{row.total}</td>
                                            <td className="diario-conteudo-expandido"></td>
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

export default TablePDVsDiario;
