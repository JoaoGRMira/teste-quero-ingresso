import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import ExpandableButton from '../../Buttons/Accordion';

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
    return (
        <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell><strong>Pdv</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Qtde (Hoje)</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Valor (Hoje)</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Qtde (Total)</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Valor (Total)</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Cortesia</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Total</strong></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <React.Fragment key={row.tipo}>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row"></StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.pdv}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.qtdehoje}</StyledTableCell>
                                <StyledTableCell align="left">{row.valorhoje}</StyledTableCell>
                                <StyledTableCell align="left">{row.qtdetotal}</StyledTableCell>
                                <StyledTableCell align="left">{row.valortotal}</StyledTableCell>
                                <StyledTableCell align="left">{row.cortesia}</StyledTableCell>
                                <StyledTableCell align="left">{<Checkbox />}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell colSpan={12}>
                                    {/* Detalhes */}
                                    <ExpandableButton title='Mais Detalhes'>
                                        <TableContainer>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                    <StyledTableCell2 align='center'>Classe</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Valor</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Vendido</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Cortesia</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Total</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Valor Total</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Total</StyledTableCell2>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {camarote.map((camarote) => (
                                                        <StyledTableRow>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                {camarote.classe}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">{camarote.valor}</StyledTableCell>
                                                            <StyledTableCell align="center">{camarote.vendido}</StyledTableCell>
                                                            <StyledTableCell align="center">{camarote.cortesia}</StyledTableCell>
                                                            <StyledTableCell align="center">{camarote.total}</StyledTableCell>
                                                            <StyledTableCell align="center">{camarote.valorTotal}</StyledTableCell>
                                                            <StyledTableCell align="center">{<Checkbox />}</StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </ExpandableButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}