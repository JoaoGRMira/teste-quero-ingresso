import React, { useEffect, useState } from 'react';
import './tableClasses.css';
import { TableContainer } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TablePagination from '@mui/material/TablePagination';
import Connection from '../../../model';

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
          label={<b>Categoria</b>}
          numeric={false}
          order={orderBy === 'categoria' ? order : false}
          onRequestSort={createSortHandler('categoria')}
        />
        <SortableTableCell
          label={<b>Vendas (Qtde)</b>}
          numeric={true}
          order={orderBy === 'vendas_quant' ? order : false}
          onRequestSort={createSortHandler('vendas_quant')}
        />
        <SortableTableCell
          label={<b>Cortesias (Qtde)</b>}
          numeric={true}
          order={orderBy === 'cortesias_quant' ? order : false}
          onRequestSort={createSortHandler('cortesias_quant')}
        />
        <SortableTableCell
          label={<b>Total (Qtde)</b>}
          numeric={true}
          order={orderBy === 'total_quant' ? order : false}
          onRequestSort={createSortHandler('total_quant')}
        />
        <SortableTableCell
          label={<b>Valor</b>}
          numeric={false}
          order={orderBy === 'valor_total' ? order : false}
          onRequestSort={createSortHandler('valor_total')}
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
  const [classes, setClasses] = useState([]); // Estado para armazenar dados da rota
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para controlar se os dados foram carregados
  const [linhaSelecionada, setLinhaSelecionada] = useState(-1); // Seleciona a linha da tabela
  const [order, setOrder] = useState('asc'); // Ordenação da tabela (crescente ou decrescente)
  const [orderBy, setOrderBy] = useState('categoria'); // Tipo de ordenação
  const [page, setPage] = useState(0); // Paginação
  const [rowsPerPage, setRowsPerPage] = useState(5); // Número de linhas por página

  // Variáveis para salvar a soma total dos valores
  let totalVendasQuant = 0;
  let totalCortesiasQuant = 0;
  let totalTotalQuant = 0;
  let totalValorTotal = 0;

  // Realiza a soma dos valores para salvar o total
  classes.forEach((item) => {
    totalVendasQuant += item.vendas_quant;
    totalCortesiasQuant += item.cortesias_quant;
    totalTotalQuant += item.total_quant;
    totalValorTotal += item.valor_total;
  });

  // Recupera o objeto do evento selecionado do localStorage
  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON); // Converte a string JSON em um objeto

  //console.log(selectedEventCode);
  //console.log(selectedEventCode.eve_cod);

  useEffect(() => {
    if (selectedEventCode && !dataLoaded) {
      const conn = Connection();

      // Acessa o endpoint de tipo de ingresso
      const fetchClasses = async () => {
        try {
          const response = await conn.get(
            'eventos/classes?evento=' +
            selectedEventCode.eve_cod,
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            }
          );

          // Se der certo, salva os dados no estado de tipo de ingresso
          if (response.status === 200) {
            setClasses(response.data);
            setDataLoaded(true)
          } else {
            console.log('Erro na resposta da API (Tipo Ingresso):', response);
          }
        } catch (error) {
          console.error('Erro na solicitação GET (Tipo Ingresso):', error);
        }
      };

      fetchClasses();
    }
  }, [selectedEventCode, dataLoaded]);

  //console.log(classes)

  const expandirLinha = (categoria) => {
    setLinhaSelecionada(categoria === linhaSelecionada ? -1 : categoria);
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
          {stableSort(classes, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <React.Fragment key={item.categoria}>
                <tr className={index % 2 === 0 ? 'classes-linha-branca' : 'classes-linha-cinza'}>
                  <td className="classes-celula">
                    <button className="classes-botao-expandir" onClick={() => expandirLinha(item.categoria)}>
                      {item.categoria === linhaSelecionada ? '-' : '+'}
                    </button>
                  </td>
                  <td className="classes-celula">{item.categoria}</td>
                  <td className="classes-celula">{item.vendas_quant}</td>
                  <td className="classes-celula">{item.cortesias_quant}</td>
                  <td className="classes-celula">{item.total_quant}</td>
                  <td className="classes-celula">{item.valor_total}</td>
                </tr>
                {item.categoria === linhaSelecionada && (
                  <>
                    <tr>
                      <td className="classes-linha-azul">Classe</td>
                      <td className="classes-linha-azul">Valor</td>
                      <td className="classes-linha-azul">Vendido</td>
                      <td className="classes-linha-azul">Cortesia</td>
                      <td className="classes-linha-azul">Total</td>
                      <td className="classes-linha-azul">Valor Total</td>
                    </tr>
                    {item.classes.map((row) => (
                      <tr key={row.classe}>
                        <td className="classes-conteudo-expandido">{row.classe}</td>
                        <td className="classes-conteudo-expandido">{row.valor_ing}</td>
                        <td className="classes-conteudo-expandido">{row.vendas_quant}</td>
                        <td className="classes-conteudo-expandido">{row.cortesias_quant}</td>
                        <td className="classes-conteudo-expandido">{row.total_quant}</td>
                        <td className="classes-conteudo-expandido">{row.valor_total}</td>
                      </tr>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          <tr>
            <td className="classes-rodape"></td>
            <td className="classes-rodape">Total (Vendas + Cortesia)</td>
            <td className="classes-rodape">{totalVendasQuant}</td>
            <td className="classes-rodape">{totalCortesiasQuant}</td>
            <td className="classes-rodape">{totalTotalQuant}</td>
            <td className="classes-rodape">R$ {totalValorTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <TablePagination
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={classes.length}
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
