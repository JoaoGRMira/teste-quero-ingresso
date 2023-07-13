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
import { Checkbox } from '@mui/material';

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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(pdv, vendas, sangrias, saldo, total) {
    return { pdv, vendas, sangrias, saldo, total };
}

const rows = [
    createData('Loja1','R$ 800,00', 'R$ 0,00', 'R$ 800,00' ),
    createData('Loja2','R$ 1000,00', 'R$ 0,00', 'R$ 1000,00' ),
];

function createPDVs(pdv, ingresso, cortesia, total) {
    return { pdv, ingresso, cortesia, total };
}

const pdvs = [
    createPDVs('Internet', 12, 0, '400,00'),
    createPDVs('Loja 1', 2, 0, '80,00'),
    createPDVs('Loja 2', 3, 0, '100,00'),
];

export default function TableSangria() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>PDV</StyledTableCell>
                        <StyledTableCell align="center">Vendas</StyledTableCell>
                        <StyledTableCell align="center">Sangrias</StyledTableCell>
                        <StyledTableCell align="center">Saldo</StyledTableCell>
                        <StyledTableCell align="center">Total</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <React.Fragment key={row.pdv}>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row"></StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.pdv}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.vendas}</StyledTableCell>
                                <StyledTableCell align="center">{row.sangrias}</StyledTableCell>
                                <StyledTableCell align="center">{row.saldo}</StyledTableCell>
                                <StyledTableCell align="center">{<Checkbox />}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell colSpan={6}>
                                    {/* Detalhes */}
                                    <ExpandableButton title='Mais Detalhes'>
                                        <TableContainer component={Paper}>
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