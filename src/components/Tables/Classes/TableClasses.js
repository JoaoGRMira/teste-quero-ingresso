import React, { useState } from 'react';
import './tableClasses.css';
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

  return (
    <thead>
      <tr>
      <th className="classes-cabecalho"></th>
        <SortableTableCell
          label={<b>Classe</b>}
          numeric={false}
          order={orderBy === 'classe' ? order : false}
          onRequestSort={createSortHandler('classe')}
        />
        <SortableTableCell
          label={<b>Vendas (Qtde)</b>}
          numeric={true}
          order={orderBy === 'vendas' ? order : false}
          onRequestSort={createSortHandler('vendas')}
        />
        <SortableTableCell
          label={<b>Cortesia (Qtde)</b>}
          numeric={true}
          order={orderBy === 'cortesia' ? order : false}
          onRequestSort={createSortHandler('cortesia')}
        />
        <SortableTableCell
          label={<b>Total (Qtde)</b>}
          numeric={true}
          order={orderBy === 'qtde' ? order : false}
          onRequestSort={createSortHandler('qtde')}
        />
        <SortableTableCell
          label={<b>Valor</b>}
          numeric={false}
          order={orderBy === 'valor' ? order : false}
          onRequestSort={createSortHandler('valor')}
        />
      </tr>
    </thead>
  );
};

// Componente TableCell que suporta ordenação
const SortableTableCell = (props) => {
  const { label, numeric, order, onRequestSort } = props;

  return (
    <TableCell className="classes-cabecalho" align={numeric ? 'center' : 'center'}>
      <TableSortLabel
        active={order !== false}
        direction={order === 'asc' ? 'asc' : 'desc'}
        onClick={onRequestSort}
      >
        {label}
        {order !== false ? (
          <span style={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
};

const TableClasses = () => {
  const [tabelaData, setTabelaData] = useState([
    { id: 1, classe: 'CAMAROTE', vendas: 10, cortesia: 0, qtde: 10, valor: 'R$500,00' },
    { id: 2, classe: 'PISTA', vendas: 30, cortesia: 0, qtde: 30, valor: 'R$700,00' },
  ]);

  const [linhaSelecionada, setLinhaSelecionada] = useState(-1);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('classe');
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

  return (
    <TableContainer>
      <table className="classes-tabela">
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
                <tr className={index % 2 === 0 ? 'classes-linha-branca' : 'classes-linha-cinza'}>
                  <td className="classes-celula">
                    <button className="classes-botao-expandir" onClick={() => expandirLinha(item.id)}>
                      {item.expandir ? '-' : '+'}
                    </button>
                  </td>
                  <td className="classes-celula">{item.classe}</td>
                  <td className="classes-celula">{item.vendas}</td>
                  <td className="classes-celula">{item.cortesia}</td>
                  <td className="classes-celula">{item.qtde}</td>
                  <td className="classes-celula">{item.valor}</td>
                </tr>
                {item.expandir && (
                  <>
                    <tr>
                      <td className="classes-linha-azul">Classe</td>
                      <td className="classes-linha-azul">Valor</td>
                      <td className="classes-linha-azul">Vendido</td>
                      <td className="classes-linha-azul">Cortesia</td>
                      <td className="classes-linha-azul">Total</td>
                      <td className="classes-linha-azul">Valor Total</td>
                    </tr>
                    <tr>
                      <td className="classes-conteudo-expandido">{item.classe}</td>
                      <td className="classes-conteudo-expandido">{item.valor}</td>
                      <td className="classes-conteudo-expandido">{item.vendas}</td>
                      <td className="classes-conteudo-expandido">{item.cortesia}</td>
                      <td className="classes-conteudo-expandido">{item.qtde}</td>
                      <td className="classes-conteudo-expandido">{item.valor}</td>
                    </tr>
                  </>
                )}
              </React.Fragment>
            ))}
            <tr>
            <td className="classes-rodape"></td>
            <td className="classes-rodape">Total (Vendas + Cortesia)</td>
            <td className="classes-rodape">0</td>
            <td className="classes-rodape">0</td>
            <td className="classes-rodape">0</td>
            <td className="classes-rodape">R$ 0,00</td>
          </tr>
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

export default TableClasses;
