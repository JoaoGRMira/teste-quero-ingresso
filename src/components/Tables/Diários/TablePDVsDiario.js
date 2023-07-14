import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
        backgroundColor: '#BDBDBD',
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(data, prazo, venda, cortesia, valor) {
    return { data, prazo, venda, cortesia, valor };
}

const rows = [
    createData('03/07/2023 - Segunda-feira', 5, 24, 0, 'R$ 800,00'),
    createData('02/07/2023 - Domingo', 6, 27, 0, 'R$ 1.000,00'),
    createData('01/07/2023 - Sábado', 7, 29, 0, 'R$ 1.250,00'),
];

function createPDVs(pdv, ingresso, cortesia, total) {
    return { pdv, ingresso, cortesia, total };
}

const pdvs = [
    createPDVs('Internet', 12, 0, '400,00'),
    createPDVs('Loja 1', 2, 0, '80,00'),
    createPDVs('Loja 2', 3, 0, '100,00'),
];

export default function TablePDVsDiario() {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Data</StyledTableCell>
                        <StyledTableCell align="center">Prazo p/ evento</StyledTableCell>
                        <StyledTableCell align="center">Venda</StyledTableCell>
                        <StyledTableCell align="center">Cortesia</StyledTableCell>
                        <StyledTableCell align="center">Valor</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <React.Fragment key={row.tipo}>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row"></StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.data}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.prazo} dias</StyledTableCell>
                                <StyledTableCell align="center">{row.venda}</StyledTableCell>
                                <StyledTableCell align="center">{row.cortesia}</StyledTableCell>
                                <StyledTableCell align="center">{row.valor}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell colSpan={6}>
                                    {/* Detalhes */}
                                    <ExpandableButton title='Mais Detalhes'>
                                        <TableContainer>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell2>PDV</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Ingressos Vendidos</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Cortesias Emitidas</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Total Vendidas (R$)</StyledTableCell2>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {pdvs.map((pdv) => (
                                                        <StyledTableRow>
                                                            <StyledTableCell component="th" scope="row">
                                                                {pdv.pdv}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">{pdv.ingresso}</StyledTableCell>
                                                            <StyledTableCell align="center">{pdv.cortesia}</StyledTableCell>
                                                            <StyledTableCell align="center">{pdv.total}</StyledTableCell>
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