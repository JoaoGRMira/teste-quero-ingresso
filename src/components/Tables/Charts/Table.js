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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(tipo, quantidade, valor, porcentagem) {
  return {tipo, quantidade, valor, porcentagem };
}

const rows = [
  createData('Inteira', 159, 6.0, 24),
  createData('Cortesia', 237, 9.0, 37),
  createData('Total', 262, 16.0, 24),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tipo</StyledTableCell>
            <StyledTableCell align="left">Quantidade</StyledTableCell>
            <StyledTableCell align="left">Valor</StyledTableCell>
            <StyledTableCell align="left">%</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.tipo}>
              <StyledTableCell component="th" scope="row">
                {row.tipo}
              </StyledTableCell>
              <StyledTableCell align="left">{row.quantidade}</StyledTableCell>
              <StyledTableCell align="left">{row.valor}</StyledTableCell>
              <StyledTableCell align="left">{row.porcentagem}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
