import React, { useState } from 'react';
import './tablePDV.css';
import { TableContainer } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { TableRow, TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'lightblue',
        color: theme.palette.common.black,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(pdv, qtdehoje, valorhoje, qtdetotal, valortotal, cortesia) {
    return { pdv, qtdehoje, valorhoje, qtdetotal, valortotal, cortesia };
}

const rows = [
    createData('PONTO DE VENDA 1', 10, 100, 50, 'R$ 1.000,00', 0),
    createData('PONTO DE VENDA 2', 20, 200, 60, 'R$ 2.000,00', 0),
];

function dataTotal(classe, vendas, cortesia, qtde, valor) {
    return { classe, vendas, cortesia, qtde, valor };
}

function dataCamarote(classe, valor, vendido, cortesia, total, valorTotal) {
    return { classe, valor, vendido, cortesia, total, valorTotal };
}

const camarote = [
    dataCamarote('CAMAROTE', 'R$ 50,00', 80, 0, 80, 'R$4.000,00'),
]

export default function TablePdv() {
    const [linhaSelecionada, setLinhaSelecionada] = useState(-1);

    const [tabelaData, setTabelaData] = useState([
        { id: 1, pdv: 'Loja A', qtdeHoje: 10, valorHoje: 'R$ 500,00', qtdeTotal: 100, valorTotal: 'R$ 5000,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 2, pdv: 'Loja B', qtdeHoje: 5, valorHoje: 'R$ 250,00', qtdeTotal: 50, valorTotal: 'R$ 2500,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 3, pdv: 'Loja C', qtdeHoje: 8, valorHoje: 'R$ 400,00', qtdeTotal: 80, valorTotal: 'R$ 4000,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 4, pdv: 'Loja D', qtdeHoje: 3, valorHoje: 'R$ 150,00', qtdeTotal: 30, valorTotal: 'R$ 1500,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 5, pdv: 'Loja E', qtdeHoje: 6, valorHoje: 'R$ 300,00', qtdeTotal: 60, valorTotal: 'R$ 3000,00', cortesia: 0, pgto: 'R$ 0,00' },
        { id: 6, pdv: 'Loja F', qtdeHoje: 4, valorHoje: 'R$ 200,00', qtdeTotal: 40, valorTotal: 'R$ 2000,00', cortesia: 0, pgto: 'R$ 0,00' }
    ]);

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
                                    <span class="pdv-celula-span">DIN</span> {item.pgto}<br/>
                                    <span class="pdv-celula-span">CCR</span> {item.pgto}<br/>
                                    <span class="pdv-celula-span">DEB</span> {item.pgto}<br/>
                                    <span class="pdv-celula-span">BOL</span> {item.pgto}<br/>
                                    <span class="pdv-celula-span">PIX</span> {item.pgto}
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
}