import React, { useState } from 'react';
import './tablePDV.css';
import Checkbox from '@mui/material/Checkbox';
import { TableContainer } from '@mui/material';

const TablePDV = () => {
    const [tabelaData, setTabelaData] = useState([
        { id: 1, pdv: 'Loja A', qtdeHoje: 10, valorHoje: 'R$ 500,00', qtdeTotal: 100, valorTotal: 'R$ 5000,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 2, pdv: 'Loja B', qtdeHoje: 5, valorHoje: 'R$ 250,00', qtdeTotal: 50, valorTotal: 'R$ 2500,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 3, pdv: 'Loja C', qtdeHoje: 8, valorHoje: 'R$ 400,00', qtdeTotal: 80, valorTotal: 'R$ 4000,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 4, pdv: 'Loja D', qtdeHoje: 3, valorHoje: 'R$ 150,00', qtdeTotal: 30, valorTotal: 'R$ 1500,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 5, pdv: 'Loja E', qtdeHoje: 6, valorHoje: 'R$ 300,00', qtdeTotal: 60, valorTotal: 'R$ 3000,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 6, pdv: 'Loja F', qtdeHoje: 4, valorHoje: 'R$ 200,00', qtdeTotal: 40, valorTotal: 'R$ 2000,00', cortesia: 0, pgto: 'R$ 0,00' }
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

    function createData(pdv, vendas, cortesias, impressos, cancelados, pgto, valor) {
        return { pdv, vendas, cortesias, impressos, cancelados, pgto, valor };
    }

    const rows = [
        createData('PDV', '7', 0, 0, 0, 0, 'R$ 1.680,00'),
        createData('PDV2', '5', 0, 0, 0, 0, 'R$ 1.350,00'),
    ];

    return (
        <TableContainer>
            <table className="pdv-tabela">
                <thead>
                    <tr>
                        <th className="pdv-cabecalho"></th>
                        <th className="pdv-cabecalho">PDV</th>
                        <th className="pdv-cabecalho">Qtde (Hoje)</th>
                        <th className="pdv-cabecalho">Valor (Hoje)</th>
                        <th className="pdv-cabecalho">Qtde (Total)</th>
                        <th className="pdv-cabecalho">Valor (Total)</th>
                        <th className="pdv-cabecalho">Cortesia</th>
                        <th className="pdv-cabecalho">Pgto</th>
                    </tr>
                </thead>
                <tbody>
                    {tabelaData.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <tr
                                className={index % 2 === 0 ? 'pdv-linha-branca' : 'pdv-linha-cinza'}
                            >
                                <td className="pdv-celula">
                                    <button
                                        className="pdv-botao-expandir"
                                        onClick={() => expandirLinha(item.id)}
                                    >
                                        {item.expandir ? '-' : '+'}
                                    </button>
                                </td>
                                <td className="pdv-celula">{item.pdv}</td>
                                <td className="pdv-celula">{item.qtdeHoje}</td>
                                <td className="pdv-celula">{item.valorHoje}</td>
                                <td className="pdv-celula">{item.qtdeTotal}</td>
                                <td className="pdv-celula">{item.valorTotal}</td>
                                <td className="pdv-celula">{item.cortesia}</td>
                                <td className="pdv-celula-pgto">
                                    <span class="pdv-celula-span">DIN</span>{item.pgto}<br/>
                                    <span class="pdv-celula-span">CCR</span>{item.pgto}<br/>
                                    <span class="pdv-celula-span">DEB</span>{item.pgto}<br/>
                                    <span class="pdv-celula-span">BOL</span>{item.pgto}<br/>
                                    <span class="pdv-celula-span">PIX</span>{item.pgto}
                                </td>
                            </tr>
                            {item.expandir && (
                                <>
                                    <tr>
                                        <td className="pdv-linha-azul"></td>
                                        <td className="pdv-linha-azul">Ponto de Venda</td>
                                        <td className="pdv-linha-azul">Vendas</td>
                                        <td className="pdv-linha-azul">Cortesias</td>
                                        <td className="pdv-linha-azul">Impressos</td>
                                        <td className="pdv-linha-azul">Cancelados</td>
                                        <td className="pdv-linha-azul">PGTO</td>
                                        <td className="pdv-linha-azul">Valor</td>
                                    </tr>
                                    {rows.map((row) => (
                                        <tr>
                                            <td className="pdv-conteudo-expandido"></td>
                                            <td className="pdv-conteudo-expandido">{row.pdv}</td>
                                            <td className="pdv-conteudo-expandido">{row.vendas}</td>
                                            <td className="pdv-conteudo-expandido">{row.cortesias}</td>
                                            <td className="pdv-conteudo-expandido">{row.impressos}</td>
                                            <td className="pdv-conteudo-expandido">{row.cancelados}</td>
                                            <td className="pdv-conteudo-expandido">{row.pgto}</td>
                                            <td className="pdv-conteudo-expandido">{row.valor}</td>
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

export default TablePDV;
