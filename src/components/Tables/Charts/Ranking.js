import React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Connection from '../../../model';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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

function createData(name, qtde, valor, totalQtde, totalValor) {
  return {
    name,
    qtde,
    valor,
    totalQtde,
    totalValor,
  };
}

const rows = [
  createData('Loja1', 305, 3.7, 67, 4.3),
  createData('Loja2', 452, 25.0, 51, 4.9),
  createData('Loja3', 262, 16.0, 24, 6.0),
  createData('Loja4', 159, 6.0, 24, 4.0),
  createData('Loja5', 356, 16.0, 49, 3.9),
  createData('Loja6', 408, 3.2, 87, 6.5),
  createData('Loja7', 237, 9.0, 37, 4.3),
  createData('Loja8', 375, 0.0, 94, 0.0),
  createData('Loja9', 518, 26.0, 65, 7.0),
  createData('Loja10', 392, 0.2, 98, 0.0),
  createData('Loja11', 318, 0, 81, 2.0),
  createData('Loja12', 360, 19.0, 9, 37.0),
  createData('Loja13', 437, 18.0, 63, 4.0),
];

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'PDV',
  },
  {
    id: 'qtde',
    numeric: true,
    disablePadding: false,
    label: 'Hoje (Qtde)',
  },
  {
    id: 'valor',
    numeric: true,
    disablePadding: false,
    label: 'Hoje (Valor)',
  },
  {
    id: 'totalQtde',
    numeric: true,
    disablePadding: false,
    label: 'Total (Qtde)',
  },
  {
    id: 'totalValor',
    numeric: true,
    disablePadding: false,
    label: 'Total (Valor)',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} selected
      </Typography>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function Ranking() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ranking, setRanking] = React.useState([]); // Estado para armazenar dados da rota
  const [dataLoaded, setDataLoaded] = React.useState(false); // Estado para controlar se os dados foram carregados

  // Recupera o objeto do evento selecionado do localStorage
  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON); // Converte a string JSON em um objeto

  console.log(selectedEventCode);
  console.log(selectedEventCode.eve_cod);

  React.useEffect(() => {
      if (selectedEventCode && !dataLoaded) {
          const conn = Connection();

          // Acessa o endpoint de tipo de ingresso
          const fetchRanking = async () => {
              try {
                  const response = await conn.get(
                      'metrics/pdvs?evento=' +
                      selectedEventCode.eve_cod,
                      {
                          headers: {
                              'token': localStorage.getItem('token')
                          }
                      }
                  );

                  // Se der certo, salva os dados no estado de tipo de ingresso
                  if (response.status === 200) {
                      setRanking(response.data);
                      setDataLoaded(true)
                  } else {
                      console.log('Erro na resposta da API (Tipo Ingresso):', response);
                  }
              } catch (error) {
                  console.error('Erro na solicitação GET (Tipo Ingresso):', error);
              }
          };

          fetchRanking();
      }
  }, [selectedEventCode, dataLoaded]);

  console.log('Ranking: ' + ranking)

  const rankingPdvs = ranking.map(item => ({
      pdv: item.nome,
      quantidade: item.quant,
      valor: item.valor,
      quantidade_hoje: item.quant_hoje,
      valor_hoje: item.valor_hoje,
      percentagem: item.perc
  }))

  console.log('Ranking: ' + rankingPdvs.pdv)
  console.log('Ranking: ' + ranking)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%', ml: 1 }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
        <Typography
          sx={{ flex: '1 1 100%', mt: 10 }}
          variant="h6"
          id="tableTitle"
          component="div"
          fontSize="14px"
          fontWeight="bold"
        >
          Ranking de PDVs (Com movimentação) <a href='/'>[Detalhes]</a>
        </Typography>
        <TableContainer>
          <Table
            sx={{ ml: 2, mr: 2, minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.qtde}</TableCell>
                    <TableCell align="right">{row.valor}</TableCell>
                    <TableCell align="right">{row.totalQtde}</TableCell>
                    <TableCell align="right">{row.totalValor}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}
        />
      </Paper>
    </Box>
  );
}
