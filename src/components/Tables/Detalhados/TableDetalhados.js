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
import FilterButton from '../../Buttons/FilterButton';
import FilterButtonTipo from '../../Buttons/FilterButtonTipo';
import FilterButtonSituacao from '../../Buttons/FilterButtonSituacao';
import FilterButtonPos from '../../Buttons/FilterButtonPos';
import FilterButtonPdv from '../../Buttons/FilterButtonPdv';
import SearchBar from '../../Outros/SearchBar';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para controlar se os dados foram carregados
  const [detalhes, setDetalhes] = useState([]); // Estado para armazenar dados da rota
  const [filtro, setFiltro] = useState([]); // Estado para armazenar dados da rota

  // Recupera o objeto do evento selecionado do localStorage
  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON); // Converte a string JSON em um objeto

  useEffect(() => {
    if (selectedEventCode && !dataLoaded) {
      const conn = Connection();

      // Acessa o endpoint de detalhes do evento
      const fetchDetalhes = async () => {
        try {
          // Acessa a rota adicionando o id do evento, salvos no objeto 'selectedEventCode'
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

          // Se der certo, salva os dados no estado dos detalhes
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

      // Acessa o endpoint de filtro de detalhados
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

          // Se der certo, salva os dados no estado de filtro de detalhados
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

  console.log(detalhes)
  console.log(filtro)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, detalhes.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ m: 2, backgroundColor: 'white', borderRadius: 1 }}>
        <Grid container spacing={3} sx={{ py: 2, flexWrap: 'wrap' }}>
          <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }}>
            <FilterButtonPdv />
            <FilterButtonPos />
            <FilterButtonSituacao />
            <FilterButtonTipo />
            <FilterButton />
            <DownloadButton />
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <SearchBar label="Informe o nome do PDV, o POS série" />
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
                    <TableCell>
                      <strong>Data da Compra</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong>Pdv</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong>Pos</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong>Número do Pedido</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong>Código de Barras</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong>Situação</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong>Ingresso</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong>Ingresso Numerado</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong>Valor</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong>Forma de Pagamento</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? detalhes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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