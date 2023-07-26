import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

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

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(data, hora, pdv, pos, npedido, cod, situacao, ingresso, ingressonumerado, valor, formapagamento) {
  return { data, hora, pdv, pos, npedido, cod, situacao, ingresso, ingressonumerado, valor, formapagamento};
}

const rows = [
  createData('10/02/2023', '10:02:23', 'PDV 1', '', '63853', '7269635501', 'APROVADO', '', '-', 'R$ 100,00', 'CARTÃO DE CRÉDITO'),
  createData('20/03/2023', '20:08:37', 'PDV 2', '202-532-087', '09723', '2742836562', 'APROVADO', '', '-', 'R$ 200,00', 'PIX'),
  createData('30/04/2023', '14:09:20', 'PDV 3', '', '74593', '7269635501', 'CANCELADO', '', '-', 'R$ 50,00', 'CARTÃO DE CRÉDITO'),
  createData('11/05/2023', '23:03:28', 'PDV 4', '200-532-087', '26440', '7365836022', 'APROVADO', '', '-', 'R$ 200,00', 'DINHEIRO'),
  createData('05/06/2023', '12:02:23', 'PDV 5', '', '75586', '589635501', 'NÃO APROVADO', '', '-', 'R$ 70,00', 'CARTÃO DE DÉBITO'),
  createData('02/07/2023', '22:04:27', 'PDV 6', '200-532-087', '32948', '9034236562', 'APROVADO', '', '-', 'R$ 200,00', 'PIX'),
  createData('19/08/2023', '10:02:23', 'PDV 7', '', '74536', '7269635501', 'APROVADO', '', '-', 'R$ 90,00', 'CARTÃO DE CRÉDITO'),
  createData('27/09/2023', '20:06:52', 'PDV 8', '204-532-087', '39285', '8293836562', 'APROVADO', '', '-', 'R$ 250,00', 'DINHEIRO'),
  createData('13/10/2023', '17:07:23', 'PDV 9', '', '47539', '7269635501', 'CANCELADO', '', '-', 'R$ 50,00', 'CARTÃO DE DÉBITO'),
  createData('24/11/2023', '25:05:27', 'PDV 10', '202-532-087', '47356', '093636562', 'NÃO APROVADO', '', '-', 'R$ 55,00', 'PIX'),
];

export default function TableSite() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>
                <strong>Data da Compra</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>Pdv</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>Pos</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>Nº Pedido</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>Cód. de Barras</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>Situação</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>Ingresso</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>Ingresso Numerado</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>Valor</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>Forma de Pagamento</strong>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.tipo}>
                <StyledTableCell component="th" scope="row"></StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.data} <br /> {row.hora}
                </StyledTableCell>
                <StyledTableCell align="left">{row.pdv}</StyledTableCell>
                <StyledTableCell align="left">{row.pos}</StyledTableCell>
                <StyledTableCell align="left">{row.npedido}</StyledTableCell>
                <StyledTableCell align="left">{row.cod}</StyledTableCell>
                <StyledTableCell align="left">{row.situacao}</StyledTableCell>
                <StyledTableCell align="left">{row.ingresso}</StyledTableCell>
                <StyledTableCell align="left">{row.ingressonumerado}</StyledTableCell>
                <StyledTableCell align="left">{row.valor}</StyledTableCell>
                <StyledTableCell align="left">{row.formapagamento}</StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}
      />
    </React.Fragment>
  );
}
