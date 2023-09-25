import React, { useState } from 'react';
import './tablePDV.css';
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
        <th className="pdv-cabecalho"></th>
        <SortableTableCell
          label="PDV"
          numeric={false}
          order={orderBy === 'pdv' ? order : false}
          onRequestSort={createSortHandler('pdv')}
        />
        <SortableTableCell
          label="Qtde (Hoje)"
          numeric={true}
          order={orderBy === 'qtdeHoje' ? order : false}
          onRequestSort={createSortHandler('qtdeHoje')}
        />
        <SortableTableCell
          label="Valor (Hoje)"
          numeric={false}
          order={orderBy === 'valorHoje' ? order : false}
          onRequestSort={createSortHandler('valorHoje')}
        />
        <SortableTableCell
          label="Qtde (Total)"
          numeric={true}
          order={orderBy === 'qtdeTotal' ? order : false}
          onRequestSort={createSortHandler('qtdeTotal')}
        />
        <SortableTableCell
          label="Valor (Total)"
          numeric={false}
          order={orderBy === 'valorTotal' ? order : false}
          onRequestSort={createSortHandler('valorTotal')}
        />
        <SortableTableCell
          label="Cortesia"
          numeric={false}
          order={orderBy === 'cortesia' ? order : false}
          onRequestSort={createSortHandler('cortesia')}
        />
        <SortableTableCell
          label="Pgto"
          numeric={false}
          order={orderBy === 'pgto' ? order : false}
          onRequestSort={createSortHandler('pgto')}
        />
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
          <span style={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
};

const TablePDV = () => {
  const [tabelaData, setTabelaData] = useState([
    { id: 1, pdv: 'Loja A', qtdeHoje: 10, valorHoje: 'R$ 500,00', qtdeTotal: 100, valorTotal: 'R$ 5000,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 2, pdv: 'Loja B', qtdeHoje: 5, valorHoje: 'R$ 250,00', qtdeTotal: 50, valorTotal: 'R$ 2500,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 3, pdv: 'Loja C', qtdeHoje: 8, valorHoje: 'R$ 400,00', qtdeTotal: 80, valorTotal: 'R$ 4000,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 4, pdv: 'Loja D', qtdeHoje: 3, valorHoje: 'R$ 150,00', qtdeTotal: 30, valorTotal: 'R$ 1500,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 5, pdv: 'Loja E', qtdeHoje: 6, valorHoje: 'R$ 300,00', qtdeTotal: 60, valorTotal: 'R$ 3000,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 6, pdv: 'Loja F', qtdeHoje: 4, valorHoje: 'R$ 200,00', qtdeTotal: 40, valorTotal: 'R$ 2000,00', cortesia: 0, pgto: 'R$ 0,00' }
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

  function createData(pdv, vendas, cortesias, impressos, cancelados, pgto, valor) {
    return { pdv, vendas, cortesias, impressos, cancelados, pgto, valor };
  }
  
  const rows = [
    createData('PDV', '7', 0, 0, 0, 0, 'R$ 1.680,00'),
    createData('PDV2', '5', 0, 0, 0, 0, 'R$ 1.350,00'),
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
                <tr
                  className={index % 2 === 0 ? 'pdv-linha-branca' : 'pdv-linha-cinza'}
                >
                  <td className="pdv-celula">
                    <button
                      className="pdv-botao-expandir"
                      onClick={() => expandirLinha(item.id)}
                    >
                      {item.expandir ? '-' : '+'}
                    </button>
                  </td>
                  <td className="pdv-celula">{item.pdv}</td>
                  <td className="pdv-celula">{item.qtdeHoje}</td>
                  <td className="pdv-celula">{item.valorHoje}</td>
                  <td className="pdv-celula">{item.qtdeTotal}</td>
                  <td className="pdv-celula">{item.valorTotal}</td>
                  <td className="pdv-celula">{item.cortesia}</td>
                  <td className="pdv-celula-pgto">
                    <span className="pdv-celula-span">DIN</span>{item.pgto}<br/>
                    <span className="pdv-celula-span">CCR</span>{item.pgto}<br/>
                    <span className="pdv-celula-span">DEB</span>{item.pgto}<br/>
                    <span className="pdv-celula-span">BOL</span>{item.pgto}<br/>
                    <span className="pdv-celula-span">PIX</span>{item.pgto}
                  </td>
                </tr>
                {item.expandir && (
                  <>
                    <tr>
                      <td className="pdv-linha-azul"></td>
                      <td className="pdv-linha-azul">Ponto de Venda</td>
                      <td className="pdv-linha-azul">Vendas</td>
                      <td className="pdv-linha-azul">Cortesias</td>
                      <td className="pdv-linha-azul">Impressos</td>
                      <td className="pdv-linha-azul">Cancelados</td>
                      <td className="pdv-linha-azul">PGTO</td>
                      <td className="pdv-linha-azul">Valor</td>
                    </tr>
                    {rows.map((row) => (
                      <tr key={row.pdv}>
                        <td className="pdv-conteudo-expandido"></td>
                        <td className="pdv-conteudo-expandido">{row.pdv}</td>
                        <td className="pdv-conteudo-expandido">{row.vendas}</td>
                        <td className="pdv-conteudo-expandido">{row.cortesias}</td>
                        <td className="pdv-conteudo-expandido">{row.impressos}</td>
                        <td className="pdv-conteudo-expandido">{row.cancelados}</td>
                        <td className="pdv-conteudo-expandido">{row.pgto}</td>
                        <td className="pdv-conteudo-expandido">{row.valor}</td>
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

export default TablePDV;
