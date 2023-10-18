import React, { useEffect, useState } from 'react';
import './tableSangria.css';
import { TableContainer } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TablePagination from '@mui/material/TablePagination';
import Connection from '../../../model';
import { format } from 'date-fns';

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
    <TableCell className="pdv-cabecalho" align={numeric ? 'center' : 'center'}>
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
  const [sangria, setSangria] = useState([]); // Estado para armazenar dados da rota
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para controlar se os dados foram carregados

  // Recupera o objeto do evento selecionado do localStorage
  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON); // Converte a string JSON em um objeto

  //console.log(selectedEventCode);
  //console.log(selectedEventCode.eve_cod);
  const [tabelaData, setTabelaData] = useState([
    { id: 1, pdv: 'Loja Virtual', vendas: 'R$ 850,00', sangrias: 'R$ 0,00', saldo: 'R$ 850,00' },
    { id: 2, pdv: 'Loja Física', vendas: 'R$ 1.350,00', sangrias: 'R$ 0,00', saldo: 'R$ 1.350,00' },
  ]);

  useEffect(() => {
    if (selectedEventCode && !dataLoaded) {
      const conn = Connection();
  
      // Acessa o endpoint de tipo de ingresso
      const fetchSangria = async () => {
        try {
          const response = await conn.get(
            'eventos/sangrias?evento=' +
              selectedEventCode.eve_cod,
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            }
          );
  
          // Se der certo, salva os dados no estado de tipo de ingresso
          if (response.status === 200) {
            setSangria(response.data);
            setDataLoaded(true)
          } else {
            console.log('Erro na resposta da API (Tipo Ingresso):', response);
          }
        } catch (error) {
          console.error('Erro na solicitação GET (Tipo Ingresso):', error);
        }
      };

      fetchSangria();
    }
  }, [selectedEventCode, dataLoaded]);

  const [linhaSelecionada, setLinhaSelecionada] = useState(-1);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nome');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const expandirLinha = (nome) => {
    setLinhaSelecionada(nome === linhaSelecionada ? -1 : nome);
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
          {stableSort(sangria, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <React.Fragment key={item.nome}>
                <tr className={index % 2 === 0 ? 'sangria-linha-branca' : 'sangria-linha-cinza'}>
                  <td className="sangria-celula">
                    <button
                      className="sangria-botao-expandir"
                      onClick={() => expandirLinha(item.nome)}
                    >
                      {item.nome === linhaSelecionada ? '-' : '+'}
                    </button>
                  </td>
                  <td className="sangria-celula">{item.nome}</td>
                  <td className="sangria-celula">{item.valor_vendas}</td>
                  <td className="sangria-celula">{item.valor_sangrias}</td>
                  <td className="sangria-celula">{item.valor_saldo}</td>
                </tr>
                {item.nome === linhaSelecionada && (
                  <>
                    <tr>
                      <td className="sangria-linha-azul"></td>
                      <td className="sangria-linha-azul">Data</td>
                      <td className="sangria-linha-azul">Usuário</td>
                      <td className="sangria-linha-azul">Valor</td>
                      <td className="sangria-linha-azul"></td>
                    </tr>
                    {item.sangrias.map((row) => (
                      <tr key={row.data}>
                        <td className="sangria-conteudo-expandido"></td>
                        <td className="sangria-conteudo-expandido">{format(new Date(row.data), 'dd/MM/yyyy HH:mm')}</td>
                        <td className="sangria-conteudo-expandido">{row.usuario}</td>
                        <td className="sangria-conteudo-expandido">{row.valor}</td>
                        <td className="sangria-conteudo-expandido"></td>
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
        count={sangria.length}
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
