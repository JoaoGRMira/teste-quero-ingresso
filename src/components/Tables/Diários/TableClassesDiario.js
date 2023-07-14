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
    createData('03/07/2023 - Segunda-feira', 5, 24, 0, 'R$ 880,00'),
    createData('02/07/2023 - Domingo', 6, 27, 0, 'R$ 1.070,00'),
    createData('01/07/2023 - Sábado', 7, 29, 0, 'R$ 1.150,00'),
];

function createClasses(classe, vendas, cortesia, qtde, valor) {
    return { classe, vendas, cortesia, qtde, valor };
}

const classes = [
    createClasses('CAMAROTE', 80, 0, 80, 'R$ 4.000,00'),
    createClasses('PISTA', 168, 0, 168, 'R$ 5.040,00'),
];

export default function TableClassesDiario() {
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
                                                        <StyledTableCell2>Classe</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Valor</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Vendido</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Cortesia</StyledTableCell2>
                                                        <StyledTableCell2 align="center">Total</StyledTableCell2>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {classes.map((classe) => (
                                                        <StyledTableRow>
                                                            <StyledTableCell component="th" scope="row">
                                                                {classe.classe}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">{classe.vendas}</StyledTableCell>
                                                            <StyledTableCell align="center">{classe.cortesia}</StyledTableCell>
                                                            <StyledTableCell align="center">{classe.qtde}</StyledTableCell>
                                                            <StyledTableCell align="center">{classe.valor}</StyledTableCell>
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