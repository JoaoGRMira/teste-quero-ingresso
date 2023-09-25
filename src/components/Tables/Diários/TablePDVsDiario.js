import React, { useState } from 'react';
import './tableDiario.css';
import { TableContainer } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TablePagination from '@mui/material/TablePagination';

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

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        <th className="diario-cabecalho"></th>
        <SortableTableCell
          label="Data"
          numeric={false}
          order={orderBy === 'data' ? order : false}
          onRequestSort={createSortHandler('data')}
        />
        <SortableTableCell
          label="Prazo p/ evento"
          numeric={false}
          order={orderBy === 'prazo' ? order : false}
          onRequestSort={createSortHandler('prazo')}
        />
        <SortableTableCell
          label="Venda"
          numeric={true}
          order={orderBy === 'venda' ? order : false}
          onRequestSort={createSortHandler('venda')}
        />
        <SortableTableCell
          label="Cortesia"
          numeric={true}
          order={orderBy === 'cortesia' ? order : false}
          onRequestSort={createSortHandler('cortesia')}
        />
        <SortableTableCell
          label="Valor"
          numeric={false}
          order={orderBy === 'valor' ? order : false}
          onRequestSort={createSortHandler('valor')}
        />
      </tr>
    </thead>
  );
};

const SortableTableCell = (props) => {
  const { label, numeric, order, onRequestSort } = props;

  return (
    <TableCell className="diario-cabecalho" align={numeric ? 'right' : 'left'}>
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

const TablePDVsDiario = () => {
  const [tabelaData, setTabelaData] = useState([
    { id: 1, data: '03/05/2023', prazo: '29 dias', venda: 31, cortesia: 0, valor: 'R$ 300,00' },
    { id: 2, data: '25/01/2023', prazo: '12 dias', venda: 15, cortesia: 0, valor: 'R$ 200,00' },
  ]);

  const [linhaSelecionada, setLinhaSelecionada] = useState(-1);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('data');
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

  function createData(pdv, vendas, cortesias, total) {
    return { pdv, vendas, cortesias, total };
  }

  const rows = [
    createData('Loja Virtual', 51, 0, 'R$ 680,00'),
    createData('Loja Física', 17, 0, 'R$ 350,00'),
  ];

  return (
    <TableContainer>
      <table className="diario-tabela">
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
                <tr
                  className={index % 2 === 0 ? 'diario-linha-branca' : 'diario-linha-cinza'}
                >
                  <td className="diario-celula">
                    <button
                      className="diario-botao-expandir"
                      onClick={() => expandirLinha(item.id)}
                    >
                      {item.expandir ? '-' : '+'}
                    </button>
                  </td>
                  <td className="diario-celula">{item.data}</td>
                  <td className="diario-celula">{item.prazo}</td>
                  <td className="diario-celula">{item.venda}</td>
                  <td className="diario-celula">{item.cortesia}</td>
                  <td className="diario-celula">{item.valor}</td>
                </tr>
                {item.expandir && (
                  <>
                    <tr>
                      <td className="diario-linha-azul"></td>
                      <td className="diario-linha-azul">PDV</td>
                      <td className="diario-linha-azul">Ingressos Vendidos</td>
                      <td className="diario-linha-azul">Cortesias Emitidas</td>
                      <td className="diario-linha-azul">Total Vendidos (R$)</td>
                      <td className="diario-linha-azul"></td>
                    </tr>
                    {rows.map((row) => (
                      <tr>
                        <td className="diario-conteudo-expandido"></td>
                        <td className="diario-conteudo-expandido">{row.pdv}</td>
                        <td className="diario-conteudo-expandido">{row.vendas}</td>
                        <td className="diario-conteudo-expandido">{row.cortesias}</td>
                        <td className="diario-conteudo-expandido">{row.total}</td>
                        <td className="diario-conteudo-expandido"></td>
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

export default TablePDVsDiario;
