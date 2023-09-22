import React, { useState } from 'react';
import './tableSangria.css';
import Checkbox from '@mui/material/Checkbox';
import { TableContainer } from '@mui/material';

const TableSangria = () => {
    const [tabelaData, setTabelaData] = useState([
        { id: 1, pdv: 'Loja Virtual', vendas: 'R$ 850,00', sangrias: 'R$ 0,00', saldo: 'R$ 850,00'},
        { id: 2, pdv: 'Loja Física', vendas: 'R$ 1.350,00', sangrias: 'R$ 0,00', saldo: 'R$ 1.350,00'},
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
            <table className="sangria-tabela">
                <thead>
                    <tr>
                        <th className="sangria-cabecalho"></th>
                        <th className="sangria-cabecalho">PDV</th>
                        <th className="sangria-cabecalho">Vendas</th>
                        <th className="sangria-cabecalho">Sangrias</th>
                        <th className="sangria-cabecalho">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {tabelaData.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <tr
                                className={index % 2 === 0 ? 'sangria-linha-branca' : 'sangria-linha-cinza'}
                            >
                                <td className="sangria-celula">
                                    <button
                                        className="sangria-botao-expandir"
                                        onClick={() => expandirLinha(item.id)}
                                    >
                                        {item.expandir ? '-' : '+'}
                                    </button>
                                </td>
                                <td className="sangria-celula">{item.pdv}</td>
                                <td className="sangria-celula">{item.vendas}</td>
                                <td className="sangria-celula">{item.sangrias}</td>
                                <td className="sangria-celula">{item.saldo}</td>
                            </tr>
                            {item.expandir && (
                                <>
                                    <tr>
                                        <td className="sangria-linha-azul">Classe</td>
                                        <td className="sangria-linha-azul">Valor</td>
                                        <td className="sangria-linha-azul">Vendido</td>
                                        <td className="sangria-linha-azul">Cortesia</td>
                                        <td className="sangria-linha-azul">Valor Total</td>
                                    </tr>
                                    {rows.map((row) => (
                                        <tr>
                                            <td className="sangria-conteudo-expandido">{row.classe}</td>
                                            <td className="sangria-conteudo-expandido">{row.valor}</td>
                                            <td className="sangria-conteudo-expandido">{row.vendas}</td>
                                            <td className="sangria-conteudo-expandido">{row.cortesia}</td>
                                            <td className="sangria-conteudo-expandido">{row.vTotal}</td>
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

export default TableSangria;