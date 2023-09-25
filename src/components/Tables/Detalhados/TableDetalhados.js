import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Connection from '../../../model';
import { Container, Divider, Grid } from '@mui/material';
import DownloadButton from '../../Buttons/DownloadButton';
import FilterButtonTipo from '../../Buttons/FilterButtonTipo';
import FilterButtonSituacao from '../../Buttons/FilterButtonSituacao';
import FilterButtonPos from '../../Buttons/FilterButtonPos';
import FilterButtonPdv from '../../Buttons/FilterButtonPdv';
import SearchBar from '../../Outros/SearchBar';
import TableSortLabel from '@mui/material/TableSortLabel';

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

export default function TableDetalhados() {
  const [orderBy, setOrderBy] = useState('data_compra');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [detalhes, setDetalhes] = useState([]);
  const [filtro, setFiltro] = useState([]);

  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON);

  const handleRequestSort = (property) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    if (selectedEventCode && !dataLoaded) {
      const conn = Connection();

      const fetchDetalhes = async () => {
        try {
          const response = await conn.post(
            'eventos/detalhados',
            {
              evento: selectedEventCode.eve_cod,
            },
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            }
          );

          if (response.status === 200) {
            setDetalhes(response.data.data);
            setDataLoaded(true);
          } else {
            console.log('Erro na resposta da API:', response);
          }
        } catch (error) {
          console.error('Erro na solicitação GET:', error);
        }
      };

      const fetchFiltro = async () => {
        try {
          const response = await conn.get(
            'eventos/detalhados/filtros?evento=' +
            selectedEventCode.eve_cod,
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            }
          );

          if (response.status === 200) {
            setFiltro(response.data);
          } else {
            console.log('Erro na resposta da API (Filtro):', response);
          }
        } catch (error) {
          console.error('Erro na solicitação GET (Filtro):', error);
        }
      };

      fetchDetalhes();
      fetchFiltro();
    }
  }, [selectedEventCode, dataLoaded]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, detalhes.length - page * rowsPerPage);

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ m: 2, backgroundColor: 'white', borderRadius: 1, boxShadow: 2 }}>
        <Grid container spacing={3} sx={{ py: 2, flexWrap: 'wrap' }}>
          <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }}>
            <SearchBar label="Informe o nome do PDV, o POS série" />
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <FilterButtonPdv />
            <FilterButtonPos />
            <FilterButtonSituacao />
            <FilterButtonTipo />
            <DownloadButton />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1, mx: -2, backgroundColor: 'var(--grey-shadow)' }} />
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'data_compra'}
                        direction={orderBy === 'data_compra' ? order : 'asc'}
                        onClick={handleRequestSort('data_compra')}
                      >
                        <strong>Data da Compra</strong>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'pdv'}
                        direction={orderBy === 'pdv' ? order : 'asc'}
                        onClick={handleRequestSort('pdv')}
                      >
                        <strong>Pdv</strong>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'pos'}
                        direction={orderBy === 'pos' ? order : 'asc'}
                        onClick={handleRequestSort('pos')}
                      >
                        <strong>Pos</strong>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'numero_pedido'}
                        direction={orderBy === 'numero_pedido' ? order : 'asc'}
                        onClick={handleRequestSort('numero_pedido')}
                      >
                        <strong>Número do Pedido</strong>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'codigo_barras'}
                        direction={orderBy === 'codigo_barras' ? order : 'asc'}
                        onClick={handleRequestSort('codigo_barras')}
                      >
                        <strong>Código de Barras</strong>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'situacao'}
                        direction={orderBy === 'situacao' ? order : 'asc'}
                        onClick={handleRequestSort('situacao')}
                      >
                        <strong>Situação</strong>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'ingresso'}
                        direction={orderBy === 'ingresso' ? order : 'asc'}
                        onClick={handleRequestSort('ingresso')}
                      >
                        <strong>Ingresso</strong>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'ingresso_numerado'}
                        direction={orderBy === 'ingresso_numerado' ? order : 'asc'}
                        onClick={handleRequestSort('ingresso_numerado')}
                      >
                        <strong>Ingresso Numerado</strong>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'valor'}
                        direction={orderBy === 'valor' ? order : 'asc'}
                        onClick={handleRequestSort('valor')}
                      >
                        <strong>Valor</strong>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align='center'>
                      <TableSortLabel
                        active={orderBy === 'forma_pagamento'}
                        direction={orderBy === 'forma_pagamento' ? order : 'asc'}
                        onClick={handleRequestSort('forma_pagamento')}
                      >
                        <strong>Forma de Pagamento</strong>
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? stableSort(detalhes, (a, b) => {
                        const isAsc = order === 'asc';
                        return isAsc ? (a[orderBy] > b[orderBy] ? 1 : -1) : (b[orderBy] > a[orderBy] ? 1 : -1);
                      }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : detalhes
                  ).map((row) => (
                    <TableRow key={row.tipo}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell component="th" scope="row">
                        {row.data_compra}
                      </TableCell>
                      <TableCell align='center'>{row.pdv}</TableCell>
                      <TableCell align='center'>{row.pos}</TableCell>
                      <TableCell align='center'>{row.pedido}</TableCell>
                      <TableCell align='center'>{row.cod_barras}</TableCell>
                      <TableCell align='center'>{row.situacao}</TableCell>
                      <TableCell align='center'>{row.ing}</TableCell>
                      <TableCell align='center'>{row.ing_num}</TableCell>
                      <TableCell align='center'>{row.valor}</TableCell>
                      <TableCell align='center'>{row.pagamento}</TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage="Linhas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={detalhes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
