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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(classe, vendas, cortesia, qtde, valor) {
    return { classe, vendas, cortesia, qtde, valor };
}

const rows = [
    createData('CAMAROTE', 80, 0, 80, 'R$ 4.000,00'),
    createData('PISTA', 168, 0, 168, 'R$ 5.040,00'),
];

function dataTotal(classe, vendas, cortesia, qtde, valor) {
    return { classe, vendas, cortesia, qtde, valor };
}

const total = [
    dataTotal('Total (Vendas + Cortesia)', 248, 0, 248, 'R$ 9.040,00'),
];

function dataCamarote(classe, valor, vendido, cortesia, total, valorTotal) {
    return { classe, valor, vendido, cortesia, total, valorTotal };
}

const camarote = [
    dataCamarote('CAMAROTE', 'R$ 50,00', 80, 0, 80, 'R$4.000,00'),
]

export default function TableClasses() {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Classe</StyledTableCell>
                        <StyledTableCell align="left">Vendas (Qtde)</StyledTableCell>
                        <StyledTableCell align="left">Cortesia (Qtde)</StyledTableCell>
                        <StyledTableCell align="left">Total (Qtde)</StyledTableCell>
                        <StyledTableCell align="left">Valor</StyledTableCell>
                        <StyledTableCell align="left">Total</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <React.Fragment key={row.tipo}>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row"></StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.classe}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.vendas}</StyledTableCell>
                                <StyledTableCell align="left">{row.cortesia}</StyledTableCell>
                                <StyledTableCell align="left">{row.qtde}</StyledTableCell>
                                <StyledTableCell align="left">{row.valor}</StyledTableCell>
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
                                                        <StyledTableCell2>Classe</StyledTableCell2>
                                                        <StyledTableCell2 align="left">Valor</StyledTableCell2>
                                                        <StyledTableCell2 align="left">Vendido</StyledTableCell2>
                                                        <StyledTableCell2 align="left">Cortesia</StyledTableCell2>
                                                        <StyledTableCell2 align="left">Total</StyledTableCell2>
                                                        <StyledTableCell2 align="left">Valor Total</StyledTableCell2>
                                                        <StyledTableCell2 align="left"><Checkbox /></StyledTableCell2>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {camarote.map((camarote) => (
                                                        <StyledTableRow>
                                                            <StyledTableCell component="th" scope="row">
                                                                {camarote.classe}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left">{camarote.valor}</StyledTableCell>
                                                            <StyledTableCell align="left">{camarote.vendido}</StyledTableCell>
                                                            <StyledTableCell align="left">{camarote.cortesia}</StyledTableCell>
                                                            <StyledTableCell align="left">{camarote.total}</StyledTableCell>
                                                            <StyledTableCell align="left">{camarote.valorTotal}</StyledTableCell>
                                                            <StyledTableCell align="left">{<Checkbox />}</StyledTableCell>
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
                    {total.map((total) => (
                        <StyledTableRow>
                            <StyledTableCell2 align="left"></StyledTableCell2>
                            <StyledTableCell2 align="left">{total.classe}</StyledTableCell2>
                            <StyledTableCell2 align="left">{total.vendas}</StyledTableCell2>
                            <StyledTableCell2 align="left">{total.cortesia}</StyledTableCell2>
                            <StyledTableCell2 align="left">{total.qtde}</StyledTableCell2>
                            <StyledTableCell2 align="left">{total.valor}</StyledTableCell2>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}