import React, { useState } from 'react';
import './tableSangria.css';
import { TableContainer } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TablePagination from '@mui/material/TablePagination';

// Funções de ordenação
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

// Componente de cabeçalho de tabela com ordenação
const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headers = [
    { label: 'PDV', id: 'pdv', numeric: false },
    { label: 'Vendas', id: 'vendas', numeric: true },
    { label: 'Sangrias', id: 'sangrias', numeric: false },
    { label: 'Saldo', id: 'saldo', numeric: true },
  ];

  return (
    <thead>
      <tr>
        <th className="sangria-cabecalho"></th>
        {headers.map((header) => (
          <SortableTableCell
            key={header.id}
            label={header.label}
            numeric={header.numeric}
            order={orderBy === header.id ? order : false}
            onRequestSort={createSortHandler(header.id)}
          />
        ))}
      </tr>
    </thead>
  );
};

// Componente TableCell que suporta ordenação
const SortableTableCell = (props) => {
  const { label, numeric, order, onRequestSort } = props;

  return (
    <TableCell className="pdv-cabecalho" align={numeric ? 'right' : 'left'}>
      <TableSortLabel
        active={order !== false}
        direction={order === 'asc' ? 'asc' : 'desc'}
        onClick={onRequestSort}
      >
        {label}
        {order !== false ? (
          <span style={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
};

const TableSangria = () => {
  const [tabelaData, setTabelaData] = useState([
    { id: 1, pdv: 'Loja Virtual', vendas: 'R$ 850,00', sangrias: 'R$ 0,00', saldo: 'R$ 850,00' },
    { id: 2, pdv: 'Loja Física', vendas: 'R$ 1.350,00', sangrias: 'R$ 0,00', saldo: 'R$ 1.350,00' },
  ]);

  const [linhaSelecionada, setLinhaSelecionada] = useState(-1);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('pdv');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const expandirLinha = (id) => {
    setTabelaData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, expandir: !item.expandir };
        }
        return item;
      })
    );

    setLinhaSelecionada(id);
  };

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

  function createData(classe, valor, vendas, cortesia, total, vTotal) {
    return { classe, valor, vendas, cortesia, total, vTotal };
  }

  const rows = [
    createData('CAMAROTE', 'R$70,00', 24, 0, 24, 'R$ 1.680,00'),
    createData('PISTA', 'R$50,00', 27, 0, 27, 'R$ 1.350,00'),
  ];

  return (
    <TableContainer>
      <table className="pdv-tabela">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <tbody>
          {stableSort(tabelaData, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <React.Fragment key={item.id}>
                <tr className={index % 2 === 0 ? 'sangria-linha-branca' : 'sangria-linha-cinza'}>
                  <td className="sangria-celula">
                    <button
                      className="sangria-botao-expandir"
                      onClick={() => expandirLinha(item.id)}
                    >
                      {item.expandir ? '-' : '+'}
                    </button>
                  </td>
                  <td className="sangria-celula">{item.pdv}</td>
                  <td className="sangria-celula">{item.vendas}</td>
                  <td className="sangria-celula">{item.sangrias}</td>
                  <td className="sangria-celula">{item.saldo}</td>
                </tr>
                {item.expandir && (
                  <>
                    <tr>
                      <td className="sangria-linha-azul">Classe</td>
                      <td className="sangria-linha-azul">Valor</td>
                      <td className="sangria-linha-azul">Vendido</td>
                      <td className="sangria-linha-azul">Cortesia</td>
                      <td className="sangria-linha-azul">Valor Total</td>
                    </tr>
                    {rows.map((row) => (
                      <tr key={row.classe}>
                        <td className="sangria-conteudo-expandido">{row.classe}</td>
                        <td className="sangria-conteudo-expandido">{row.valor}</td>
                        <td className="sangria-conteudo-expandido">{row.vendas}</td>
                        <td className="sangria-conteudo-expandido">{row.cortesia}</td>
                        <td className="sangria-conteudo-expandido">{row.vTotal}</td>
                      </tr>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
      <TablePagination
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tabelaData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
      />
    </TableContainer>
  );
};

export default TableSangria;
