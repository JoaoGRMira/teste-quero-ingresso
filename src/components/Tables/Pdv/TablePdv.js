import React, { useEffect, useState } from 'react';
import './tablePDV.css';
import { TableContainer } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TablePagination from '@mui/material/TablePagination';
import Connection from '../../../model';

const TablePDV = () => {
  const [pdvs, setPdvs] = useState([]); // Estado para armazenar dados da rota
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para controlar se os dados foram carregados

  // Recupera o objeto do evento selecionado do localStorage
  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON); // Converte a string JSON em um objeto

  //console.log(selectedEventCode);
  //console.log(selectedEventCode.eve_cod);

  useEffect(() => {
    if (selectedEventCode && !dataLoaded) {
      const conn = Connection();
  
      // Acessa o endpoint de tipo de ingresso
      const fetchPdvs = async () => {
        try {
          const response = await conn.get(
            'eventos/pdvs?evento=' +
              selectedEventCode.eve_cod,
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            }
          );
  
          // Se der certo, salva os dados no estado de tipo de ingresso
          if (response.status === 200) {
            setPdvs(response.data);
            setDataLoaded(true)
          } else {
            console.log('Erro na resposta da API (Tipo Ingresso):', response);
          }
        } catch (error) {
          console.error('Erro na solicitação GET (Tipo Ingresso):', error);
        }
      };

      fetchPdvs();
    }
  }, [selectedEventCode, dataLoaded]);

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
          label={<b>PDV</b>}
          numeric={false}
          order={orderBy === 'pdv' ? order : false}
          onRequestSort={createSortHandler('pdv')}
        />
        <SortableTableCell
          label={<b>Qtde (Hoje)</b>}
          numeric={true}
          order={orderBy === 'quant_hoje' ? order : false}
          onRequestSort={createSortHandler('quant_hoje')}
        />
        <SortableTableCell
          label={<b>Valor (Hoje)</b>}
          numeric={false}
          order={orderBy === 'valor_hoje' ? order : false}
          onRequestSort={createSortHandler('valor_hoje')}
        />
        <SortableTableCell
          label={<b>Qtde (Total)</b>}
          numeric={true}
          order={orderBy === 'quant_total' ? order : false}
          onRequestSort={createSortHandler('quant_total')}
        />
        <SortableTableCell
          label={<b>Valor (Total)</b>}
          numeric={false}
          order={orderBy === 'valor_total' ? order : false}
          onRequestSort={createSortHandler('valor_total')}
        />
        <SortableTableCell
          label={<b>Cortesia</b>}
          numeric={false}
          order={orderBy === 'cortesias' ? order : false}
          onRequestSort={createSortHandler('cortesias')}
        />
        <SortableTableCell
          label={<b>Pgto</b>}
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
    <TableCell className="pdv-cabecalho" align={numeric ? 'center' : 'center'}>
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

const [tabelaData, setTabelaData] = useState([])
/*const TablePDV = () => {
    { id: 1, pdv: 'Loja A', qtdeHoje: 10, valorHoje: 'R$ 500,00', qtdeTotal: 100, valorTotal: 'R$ 5000,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 2, pdv: 'Loja B', qtdeHoje: 5, valorHoje: 'R$ 250,00', qtdeTotal: 50, valorTotal: 'R$ 2500,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 3, pdv: 'Loja C', qtdeHoje: 8, valorHoje: 'R$ 400,00', qtdeTotal: 80, valorTotal: 'R$ 4000,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 4, pdv: 'Loja D', qtdeHoje: 3, valorHoje: 'R$ 150,00', qtdeTotal: 30, valorTotal: 'R$ 1500,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 5, pdv: 'Loja E', qtdeHoje: 6, valorHoje: 'R$ 300,00', qtdeTotal: 60, valorTotal: 'R$ 3000,00', cortesia: 0, pgto: 'R$ 0,00' },
    { id: 6, pdv: 'Loja F', qtdeHoje: 4, valorHoje: 'R$ 200,00', qtdeTotal: 40, valorTotal: 'R$ 2000,00', cortesia: 0, pgto: 'R$ 0,00' }
  ]);*/

  const [linhaSelecionada, setLinhaSelecionada] = useState(-1);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('pdv');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const expandirLinha = (pdv) => {
    setLinhaSelecionada(pdv === linhaSelecionada ? -1 : pdv);
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
  
  const [rows, setRows] = useState([])
  /*const rows = [
    createData('PDV', '7', 0, 0, 0, 0, 'R$ 1.680,00'),
    createData('PDV2', '5', 0, 0, 0, 0, 'R$ 1.350,00'),
  ];*/

  return (
    <TableContainer>
      <table className="pdv-tabela">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <tbody> 
          {stableSort(pdvs, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <React.Fragment key={item.pdv}>
                <tr
                  className={index % 2 === 0 ? 'pdvs-linha-branca' : 'pdvs-linha-cinza'}
                >
                  <td className="pdv-celula">
                    <button
                      className="pdv-botao-expandir"
                      onClick={() => expandirLinha(item.pdv)}
                    >
                      {item.pdv === linhaSelecionada ? '-' : '+'}
                    </button>
                  </td>
                  <td className="pdv-celula">{item.pdv}</td>
                  <td className="pdv-celula">{item.quant_hoje}</td>
                  <td className="pdv-celula">{item.valor_hoje}</td>
                  <td className="pdv-celula">{item.quant_total}</td>
                  <td className="pdv-celula">{item.valor_total}</td>
                  <td className="pdv-celula">{item.cortesias}</td>
                  <td className="pdv-celula-pgto">
                    <span className="pdv-celula-span">DIN</span>{item.pgto}<br/>
                    <span className="pdv-celula-span">CCR</span>{item.pgto}<br/>
                    <span className="pdv-celula-span">DEB</span>{item.pgto}<br/>
                    <span className="pdv-celula-span">BOL</span>{item.pgto}<br/>
                    <span className="pdv-celula-span">PIX</span>{item.pgto}
                  </td>
                </tr>
                {item.pdv === linhaSelecionada && (
                  <>
                    <tr>
                      <td className="pdv-linha-azul"></td>
                      <td className="pdv-linha-azul">Classe</td>
                      <td className="pdv-linha-azul">Qtde (Hoje)</td>
                      <td className="pdv-linha-azul">Valor (Hoje)</td>
                      <td className="pdv-linha-azul">Qtde (Total)</td>
                      <td className="pdv-linha-azul">Valor (Total)</td>
                      <td className="pdv-linha-azul">Cortesias</td>
                      <td className="pdv-linha-azul"></td>
                    </tr>
                    {item.classes.map((row) => (
                      <tr key={row.classe}>
                        <td className="pdv-conteudo-expandido"></td>
                        <td className="pdv-conteudo-expandido">{row.classe}</td>
                        <td className="pdv-conteudo-expandido">{row.quant_hoje}</td>
                        <td className="pdv-conteudo-expandido">{row.valor_hoje}</td>
                        <td className="pdv-conteudo-expandido">{row.quant_total}</td>
                        <td className="pdv-conteudo-expandido">{row.valor_total}</td>
                        <td className="pdv-conteudo-expandido">{row.cortesias}</td>
                        <td className="pdv-conteudo-expandido"></td>
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
        count={pdvs.length}
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
