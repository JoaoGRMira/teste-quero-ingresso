import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function createData(pedido, data, hora, status, comprador, rg, nominado, email, telefone, qtde, ingresso, valor) {
    return { pedido, data, hora, status, comprador, rg, nominado, email, telefone, qtde, ingresso, valor };
}

const rows = [
    createData('10001', '10/02/2023', '10:02:23', 'APROVADO', 'Comprador 1', '100011111', 'Comprador 1', 'comprador1@gmail.com',910000001, 2, '2X PISTA', 'R$ 200,00'),
    createData('10002', '20/03/2023', '20:03:27', 'APROVADO', 'Comprador 2', '200022222', 'Comprador 2', 'comprador2@gmail.com',920000002, 3, '3X CAMAROTE', 'R$ 400,00'),
];

export default function TableSite() {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell><strong>Pedido</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Data</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Status</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Comprador</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Nominado</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Email</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Telefone</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Qtde</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Ingresso</strong></StyledTableCell>
                        <StyledTableCell align="left"><strong>Valor</strong></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <React.Fragment key={row.tipo}>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row"></StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.pedido}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.data} <br /> {row.hora}</StyledTableCell>
                                <StyledTableCell align="left">{row.status}</StyledTableCell>
                                <StyledTableCell align="left">{row.comprador} <br /> RG:{row.rg}</StyledTableCell>
                                <StyledTableCell align="left">{row.nominado}</StyledTableCell>
                                <StyledTableCell align="left">{row.email}</StyledTableCell>
                                <StyledTableCell align="left">{row.telefone}</StyledTableCell>
                                <StyledTableCell align="left">{row.qtde}</StyledTableCell>
                                <StyledTableCell align="left">{row.ingresso}</StyledTableCell>
                                <StyledTableCell align="left">{row.valor}</StyledTableCell>
                            </StyledTableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}