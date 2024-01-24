import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Container, Divider, Grid } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import Connection from '../../../model';
import { format } from 'date-fns';
import SearchBar from '../../Outros/SearchBar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold',
    textAlign: 'center',
    '&:nth-of-type(1)': {
      minWidth: '150px',
    },
    '&:nth-of-type(2)': {
      minWidth: '100px',
    },
    '&:nth-of-type(3)': {
      minWidth: '100px',
    },
    '&:nth-of-type(4)': {
      minWidth: '200px',
    },
    '&:nth-of-type(5)': {
      minWidth: '200px',
    },
    '&:nth-of-type(9)': {
      minWidth: '100px',
      textAlign: 'left'
    },
    '&:nth-of-type(10)': {
      minWidth: '100px',
      textAlign: 'center'
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    '&:nth-of-type(9)': {
      minWidth: '100px',
      textAlign: 'left'
    },
    '&:nth-of-type(10)': {
      minWidth: '100px',
      textAlign: 'center'
    },
  },
}));

const StyledTableBodyRow = styled(TableRow)(({ theme, index }) => ({
  backgroundColor: theme.palette.mode === 'light' ? (index % 2 === 0 ? 'white' : '#f5f5f5') : '',
}));

export default function TableCancelados() {
  const [orderBy, setOrderBy] = useState('data'); // Defina a coluna padrão para ordenar
  const [order, setOrder] = useState('desc'); // Defina a ordem padrão para ordenar
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false); //estado para controlar se os dados foram carregados ou não
  const [cancelados, setCancelados] = useState([]); //estado para salvar os dados retornados pelo endpoint
  const [searchQuery, setSearchQuery] = useState(''); // Busca

  //recupera e salva os dados do localStorage para preencher dados salvos no login
  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON);

  const conn = Connection(); //conecta com o servidor backend
  const fetchCancelados = async (page) => {
    try {
      const response = await conn.get(
        `eventos/cancelados?evento=${selectedEventCode.eve_cod}&l=${10}&p=${page}&busca=${searchQuery}`, //faz a requisição na rota especificada
        {
          headers: {
            'token': localStorage.getItem('token')
          }
        }
      );

      if (response.status === 200) {
        setCancelados(response.data.data);
        setData(response.data)
        setTotalPages(response.data.total)
        setDataLoaded(true);
      } else {
        console.log('Erro na resposta da API:', response);
      }
    } catch (error) {
      console.error('Erro na solicitação POST:', error);
    }
  };

  useEffect(() => {
    if (selectedEventCode && !dataLoaded) {
      fetchCancelados(page);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEventCode, dataLoaded]);


  //console.log(selectedEventCode.categoria)
  //console.log(cancelados)
  console.log(data)

  const handleIncrement = () => {
    const newPage = page + 1
    setPage(newPage)
    fetchCancelados(newPage)
  }

  const handleDecrement = () => {
    const newPage = page - 1
    if (newPage >= 1) {
      setPage(newPage);
      fetchCancelados(newPage);
    }
  }

  const handleGoToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
      fetchCancelados(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const currentPage = page;
    let startPage = 1;
    const maxPages = Math.min(currentPage + 2, totalPages);

    if (currentPage > totalPages - 2) {
      startPage = totalPages - 2;
    } else {
      startPage = currentPage;
    }

    const pageNumbers = [];
    for (let i = startPage; i <= maxPages; i++) {
      if (i >= 1) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handleGoToPage(i)}
            className={`pagination-number ${page === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }
    }
    return pageNumbers;
  };

  const handleSearch = (query) => {
    const searchQuery = query.trim() === '' ? '' : query;
    setSearchQuery(searchQuery);
    setPage(1);
    setDataLoaded(false);
  };

  const handleRequestSort = (property) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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
    <Container>
      <div>
        {dataLoaded ? (
          <div>
            <Grid container spacing={3} sx={{ py: 2, flexWrap: 'wrap' }}>
              <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }}>
                <SearchBar label="Buscar por Pedido" onSearch={handleSearch} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1, mx: -2, backgroundColor: 'var(--grey-shadow)' }} />
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'data_compra'}
                          direction={orderBy === 'data_compra' ? order : 'asc'}
                          onClick={handleRequestSort('data_compra')}
                        >*/}
                          <strong>Data</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'pdv'}
                          direction={orderBy === 'pdv' ? order : 'asc'}
                          onClick={handleRequestSort('pdv')}
                        >*/}
                          <strong>Pdv</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'pos'}
                          direction={orderBy === 'pos' ? order : 'asc'}
                          onClick={handleRequestSort('pos')}
                        >*/}
                          <strong>Pos</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'pedido'}
                          direction={orderBy === 'pedido' ? order : 'asc'}
                          onClick={handleRequestSort('pedido')}
                        >*/}
                          <strong>Pedido</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'cod_barras'}
                          direction={orderBy === 'cod_barras' ? order : 'asc'}
                          onClick={handleRequestSort('cod_barras')}
                        >*/}
                          <strong>Cód. de Barras</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'situacao'}
                          direction={orderBy === 'situacao' ? order : 'asc'}
                          onClick={handleRequestSort('situacao')}
                        >*/}
                          <strong>Situação</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'ing'}
                          direction={orderBy === 'ing' ? order : 'asc'}
                          onClick={handleRequestSort('ing')}
                        >*/}
                          <strong>Ingresso</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'ing_num'}
                          direction={orderBy === 'ing_num' ? order : 'asc'}
                          onClick={handleRequestSort('ing_num')}
                        >*/}
                          <strong>Número Ingresso</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'valor'}
                          direction={orderBy === 'valor' ? order : 'asc'}
                          onClick={handleRequestSort('valor')}
                        >*/}
                          <strong>Valor</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'pagamento'}
                          direction={orderBy === 'pagamento' ? order : 'asc'}
                          onClick={handleRequestSort('pagamento')}
                        >*/}
                          <strong>Pagamento</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                      <StyledTableCell>
                        {/*<TableSortLabel
                          active={orderBy === 'cod_pagseguro'}
                          direction={orderBy === 'cod_pagseguro' ? order : 'asc'}
                          onClick={handleRequestSort('pagamenatcod_pagseguro')}
                        >*/}
                          <strong>Código PagSeguro</strong>
                        {/*</TableSortLabel>*/}
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {stableSort(cancelados, (a, b) => {
                      const isAsc = order === 'asc';
                      return isAsc ? (a[orderBy] > b[orderBy] ? 1 : -1) : b[orderBy] > a[orderBy] ? 1 : -1;
                    }).map((row, index) => ( */}
                    {cancelados.map((row, index) => (
                      <StyledTableBodyRow key={row.tipo} index={index}>
                        <StyledTableCell component="th" scope="row">
                          {format(new Date(row.data_compra), 'dd/MM/yyyy HH:mm')}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.pdv}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.pos}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.pedido}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.cod_barras}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.situacao}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.ing}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.ing_num}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.valor}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.pagamento}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.cod_pagseguro}
                        </StyledTableCell>
                      </StyledTableBodyRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {data && data.total && (
                <div className="pagination-container">
                  <button onClick={handleDecrement} className="pagination-button" disabled={page === 1}>
                    {"<"}
                  </button>
                  <button
                    onClick={() => handleGoToPage(1)}
                    className="pagination-button"
                    style={{ display: page === 1 ? 'none' : 'inline-block' }}
                  >
                    {"1"}
                  </button>
                  <span style={{ display: (page === 1 || page === 2) ? 'none' : 'inline-block', marginLeft: '5px' }}>
                    ...
                  </span>
                  <span className="pagination-numbers">
                    {renderPageNumbers()}
                  </span>
                  <span style={{ display: (page === totalPages) ? 'none' : 'inline-block', marginRight: '5px', marginLeft: '5px' }}>
                    ...
                  </span>
                  <button onClick={() => handleGoToPage(totalPages)} className="pagination-button" style={{ display: (page === totalPages) ? 'none' : 'inline-block' }}>
                    {totalPages}
                  </button>
                  <button onClick={handleIncrement} className="pagination-button" disabled={page === data.total}>
                    {">"}
                  </button>
                </div>
              )}
            </Grid>
          </div>
        ) : (
          // Renderizar um indicador de carregamento enquanto os dados são buscados
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        )}
      </div>
    </Container>
  );
}
