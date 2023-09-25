import React, { useState } from 'react';
import './tableNumerados.css';
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
          label="Classe"
          numeric={false}
          order={orderBy === 'classe' ? order : false}
          onRequestSort={createSortHandler('classe')}
        />
        <SortableTableCell
          label="Disponibilidade"
          numeric={false}
          order={orderBy === 'disponibilidade' ? order : false}
          onRequestSort={createSortHandler('disponibilidade')}
        />
        <SortableTableCell
          label="Estoque inicial"
          numeric={true}
          order={orderBy === 'estoque' ? order : false}
          onRequestSort={createSortHandler('estoque')}
        />
        <SortableTableCell
          label="Vendidos(%)"
          numeric={false}
          order={orderBy === 'vendidos' ? order : false}
          onRequestSort={createSortHandler('vendidos')}
        />
        <SortableTableCell
          label="Qtde (Total)"
          numeric={true}
          order={orderBy === 'vendidosporcentagem' ? order : false}
          onRequestSort={createSortHandler('vendidosporcentagem')}
        />
        <SortableTableCell
          label="Saldo(%)"
          numeric={false}
          order={orderBy === 'saldo' ? order : false}
          onRequestSort={createSortHandler('saldo')}
        />
        <SortableTableCell
          label="Saldo"
          numeric={false}
          order={orderBy === 'saldoporcentagem' ? order : false}
          onRequestSort={createSortHandler('saldoporcentagem')}
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

const TableNumerados = () => {
  const [tabelaData, setTabelaData] = useState([
    {
        id: 1,
        classe: 'PRIVATIVO AZUL',
        disponibilidade: 'Parcial',
        estoque: 300,
        vendidos: 100,
        vendidosporcentagem: '40%',
        saldo: 10,
        saldoporcentagem: '10%',
        expandir: false,
        subTable: [
          {
            id: 1,
            grupo: 'Privativo 1',
            disponibilidade: 'Disponível',
            estoque: 200,
            vendidos: 0,
            vendidosporcentagem: '25%',
            saldo: 5,
            saldoporcentagem: '5%',
            expandir: false,
            subSubTable: [
              {
                id: 1,
                numeracao: 'Priv 1 - Ing 1',
                situacao: 'Disponível',
                vendido: 'Não',
                codbarras: '-',
                qtdevendidos: 0,
                valorvenda: 3,
                tipoingresso: 'Inteira',
                pdv: '-',
              },
              {
                id: 2,
                numeracao: 'Priv 1 - Ing 2',
                situacao: 'Disponível',
                vendido: 'Não',
                codbarras: '-',
                qtdevendidos: 0,
                valorvenda: 3,
                tipoingresso: 'Inteira',
                pdv: '-',
              },
              {
                id: 3,
                numeracao: 'Priv 1 - Ing 3',
                situacao: 'Disponível',
                vendido: 'Não',
                codbarras: '-',
                qtdevendidos: 0,
                valorvenda: 3,
                tipoingresso: 'Inteira',
                pdv: '-',
              },
            ],
          },
          {
            id: 2,
            grupo: 'Privativo 2',
            disponibilidade: 'Disponível',
            estoque: 250,
            vendidos: 0,
            vendidosporcentagem: '30%',
            saldo: 7,
            saldoporcentagem: '10%',
            expandir: false,
            subSubTable: [
              {
                id: 1,
                numeracao: 'Priv 2 - Ing 1',
                situacao: 'Disponível',
                vendido: 'Não',
                codbarras: '-',
                qtdevendidos: 0,
                valorvenda: 3,
                tipoingresso: 'Inteira',
                pdv: '-',
              },
              {
                id: 2,
                numeracao: 'Priv 2 - Ing 2',
                situacao: 'Disponível',
                vendido: 'Não',
                codbarras: '-',
                qtdevendidos: 0,
                valorvenda: 3,
                tipoingresso: 'Inteira',
                pdv: '-',
              },
              {
                id: 3,
                numeracao: 'Priv 2 - Ing 3',
                situacao: 'Disponível',
                vendido: 'Não',
                codbarras: '-',
                qtdevendidos: 0,
                valorvenda: 3,
                tipoingresso: 'Inteira',
                pdv: '-',
              },
            ],
          },
          {
            id: 3,
            grupo: 'Privativo 3',
            disponibilidade: 'Vendido',
            estoque: 180,
            vendidos: 0,
            vendidosporcentagem: '33%',
            saldo: 8,
            saldoporcentagem: '20%',
            expandir: false,
            subSubTable: [
              {
                id: 1,
                numeracao: 'Priv 3 - Ing 1',
                situacao: 'Disponível',
                vendido: 'Não',
                codbarras: '-',
                qtdevendidos: 0,
                valorvenda: 3,
                tipoingresso: 'Inteira',
                pdv: '-',
              },
              {
                id: 2,
                numeracao: 'Priv 3 - Ing 2',
                situacao: 'Disponível',
                vendido: 'Não',
                codbarras: '-',
                qtdevendidos: 0,
                valorvenda: 3,
                tipoingresso: 'Inteira',
                pdv: '-',
              },
              {
                id: 3,
                numeracao: 'Priv 3 - Ing 3',
                situacao: 'Disponível',
                vendido: 'Não',
                codbarras: '-',
                qtdevendidos: 0,
                valorvenda: 3,
                tipoingresso: 'Inteira',
                pdv: '-',
            },
        ],
      },
    ],
  },
      
  {
    id: 2,
    classe: 'PRIVATIVO ROSA',
    disponibilidade: 'Parcial',
    estoque: 500,
    vendidos: 30,
    vendidosporcentagem: '70%',
    saldo: 10,
    saldoporcentagem: '10%',
    expandir: false,
    subTable: [
      {
        id: 1,
        grupo: 'Privativo 1',
        disponibilidade: 'Disponível',
        estoque: 300,
        vendidos: 0,
        vendidosporcentagem: '40%',
        saldo: 10,
        saldoporcentagem: '10%',
        expandir: false,
        subSubTable: [
          {
            id: 1,
            numeracao: 'Priv 1 - Ing 1',
            situacao: 'Disponível',
            vendido: 'Não',
            codbarras: '-',
            qtdevendidos: 0,
            valorvenda: 3,
            tipoingresso: 'Inteira',
            pdv: '-',
          },
          {
            id: 2,
            numeracao: 'Priv 1 - Ing 2',
            situacao: 'Disponível',
            vendido: 'Não',
            codbarras: '-',
            qtdevendidos: 0,
            valorvenda: 3,
            tipoingresso: 'Inteira',
            pdv: '-',
          },
          {
            id: 3,
            numeracao: 'Priv 1 - Ing 3',
            situacao: 'Disponível',
            vendido: 'Não',
            codbarras: '-',
            qtdevendidos: 0,
            valorvenda: 3,
            tipoingresso: 'Inteira',
            pdv: '-',
          },
        ],
      },
      {
        id: 2,
        grupo: 'Privativo 2',
        disponibilidade: 'Vendido',
        estoque: 150,
        vendidos: 0,
        vendidosporcentagem: '50%',
        saldo: 5,
        saldoporcentagem: '10%',
        expandir: false,
        subSubTable: [
          {
            id: 1,
            numeracao: 'Priv 2 - Ing 1',
            situacao: 'Disponível',
            vendido: 'Não',
            codbarras: '-',
            qtdevendidos: 0,
            valorvenda: 3,
            tipoingresso: 'Inteira',
            pdv: '-',
          },
          {
            id: 2,
            numeracao: 'Priv 2 - Ing 2',
            situacao: 'Disponível',
            vendido: 'Não',
            codbarras: '-',
            qtdevendidos: 0,
            valorvenda: 3,
            tipoingresso: 'Inteira',
            pdv: '-',
          },
          {
            id: 3,
            numeracao: 'Priv 2 - Ing 3',
            situacao: 'Disponível',
            vendido: 'Não',
            codbarras: '-',
            qtdevendidos: 0,
            valorvenda: 3,
            tipoingresso: 'Inteira',
            pdv: '-',
          },
        ],
      },
      {
        id: 3,
        grupo: 'Privativo 3',
        disponibilidade: 'Disponível',
        estoque: 50,
        vendidos: 0,
        vendidosporcentagem: '30%',
        saldo: 5,
        saldoporcentagem: '10%',
        expandir: false,
        subSubTable: [
          {
            id: 1,
            numeracao: 'Priv 3 - Ing 1',
            situacao: 'Disponível',
            vendido: 'Não',
            codbarras: '-',
            qtdevendidos: 0,
            valorvenda: 3,
            tipoingresso: 'Inteira',
            pdv: '-',
          },
          {
            id: 2,
            numeracao: 'Priv 3 - Ing 2',
            situacao: 'Disponível',
            vendido: 'Não',
            codbarras: '-',
            qtdevendidos: 0,
            valorvenda: 3,
            tipoingresso: 'Inteira',
            pdv: '-',
          },
          {
            id: 3,
            numeracao: 'Priv 3 - Ing 3',
            situacao: 'Disponível',
            vendido: 'Não',
            codbarras: '-',
            qtdevendidos: 0,
            valorvenda: 3,
            tipoingresso: 'Inteira',
            pdv: '-',
          },
        ],
      },
    ],
  }  
  ]);

  const [linhaSelecionada, setLinhaSelecionada] = useState(-1);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('pdv');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const expandirLinha = (id, subId, subSubId) => {
    setTabelaData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          if (!subId) {
            return { ...item, expandir: !item.expandir };
          }

          return {
            ...item,
            subTable: item.subTable.map((subItem) => {
              if (subItem.id === subId) {
                if (!subSubId) {
                  return { ...subItem, expandir: !subItem.expandir };
                }

                return {
                  ...subItem,
                  subSubTable: subItem.subSubTable.map((subSubItem) => {
                    if (subSubItem.id === subSubId) {
                      return { ...subSubItem, expandir: !subSubItem.expandir };
                    }
                    return subSubItem;
                  }),
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      })
    );
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
      <table className="numerados-tabela">
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
                <tr className={index % 2 === 0 ? 'numerados-linha-branca' : 'numerados-linha-cinza'}>
                  <td className="numerados-celula">
                    <button
                      className="numerados-botao-expandir"
                      onClick={() => expandirLinha(item.id)}
                    >
                      {item.expandir ? '-' : '+'}
                    </button>
                  </td>
                  <td className="numerados-celula">{item.classe}</td>
                  <td className={`numerados-celula ${item.disponibilidade === 'Disponível' ? 'disponivel-cell' : ''} ${item.disponibilidade === 'Parcial' ? 'parcial-cell' : ''} ${item.disponibilidade === 'Vendido' ? 'vendido-cell' : ''}`}>
                    {item.disponibilidade}
                  </td>
                  <td className="numerados-celula">{item.estoque}</td>
                  <td className="numerados-celula">{item.vendidos}</td>
                  <td className="numerados-celula">{item.vendidosporcentagem}</td>
                  <td className="numerados-celula">{item.saldo}</td>
                  <td className="numerados-celula">{item.saldoporcentagem}</td>
                </tr>
                {item.expandir && (
                  <>
                    <tr>
                      <td className="numerados-linha-azul"></td>
                      <td className="numerados-linha-azul">Grupo</td>
                      <td className="numerados-linha-azul">Disponibilidade</td>
                      <td className="numerados-linha-azul">Estoque Inicial</td>
                      <td className="numerados-linha-azul">Vendidos</td>
                      <td className="numerados-linha-azul">Vendidos (%)</td>
                      <td className="numerados-linha-azul">Saldo</td>
                      <td className="numerados-linha-azul">Saldo (%)</td>
                    </tr>
                    {item.subTable.map((subItem) => (
                      <React.Fragment key={subItem.id}>
                        <tr>
                          <td className="numerados-celula">
                            <button
                              className="numerados-botao-expandir2"
                              onClick={() => expandirLinha(item.id, subItem.id)}
                            >
                              {subItem.expandir ? '-' : '+'}
                            </button>
                          </td>
                          <td className="numerados-conteudo-expandido">{subItem.grupo}</td>
                          <td className={`numerados-conteudo-expandido ${subItem.disponibilidade === 'Disponível' ? 'disponivel-cell' : ''} ${subItem.disponibilidade === 'Parcial' ? 'parcial-cell' : ''} ${subItem.disponibilidade === 'Vendido' ? 'vendido-cell' : ''}`}>
                            {subItem.disponibilidade}
                          </td>
                          <td className="numerados-conteudo-expandido">{subItem.estoque}</td>
                          <td className="numerados-conteudo-expandido">{subItem.vendidos}</td>
                          <td className="numerados-conteudo-expandido">{subItem.vendidosporcentagem}</td>
                          <td className="numerados-conteudo-expandido">{subItem.saldo}</td>
                          <td className="numerados-conteudo-expandido">{subItem.saldoporcentagem}</td>
                        </tr>
                        {subItem.expandir && (
                          <>
                            <tr>
                              <td className="numerados-linha-azul">Numeração</td>
                              <td className="numerados-linha-azul">Situação</td>
                              <td className="numerados-linha-azul">Vendido ?</td>
                              <td className="numerados-linha-azul">Cód de Barras</td>
                              <td className="numerados-linha-azul">Qtde. Vendidos</td>
                              <td className="numerados-linha-azul">Valor de Venda</td>
                              <td className="numerados-linha-azul">Tipo de Ingresso</td>
                              <td className="numerados-linha-azul">Pdv</td>
                            </tr>
                            {subItem.subSubTable.map((subSubItem) => (
                              <tr key={subSubItem.id}>
                                <td className="numerados-conteudo-expandido">{subSubItem.numeracao}</td>
                                <td className={`numerados-conteudo-expandido ${subSubItem.situacao === 'Disponível' ? 'disponivel-cell' : ''} ${subSubItem.situacao === 'Parcial' ? 'parcial-cell' : ''} ${subSubItem.situacao === 'Vendido' ? 'vendido-cell' : ''}`}>
                                  {subSubItem.situacao}
                                </td>
                                <td className="numerados-conteudo-expandido">{subSubItem.vendido}</td>
                                <td className="numerados-conteudo-expandido">{subSubItem.codbarras}</td>
                                <td className="numerados-conteudo-expandido">{subSubItem.qtdevendidos}</td>
                                <td className="numerados-conteudo-expandido">{subSubItem.valorvenda}</td>
                                <td className="numerados-conteudo-expandido">{subSubItem.tipoingresso}</td>
                                <td className="numerados-conteudo-expandido">{subSubItem.pdv}</td>
                              </tr>
                            ))}
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          <tr>
            <td className="numerados-rodape">Total</td>
            <td className="numerados-rodape"></td>
            <td className="numerados-rodape"></td>
            <td className="numerados-rodape">800</td>
            <td className="numerados-rodape">130</td>
            <td className="numerados-rodape">55%</td>
            <td className="numerados-rodape">20</td>
            <td className="numerados-rodape">20%</td>
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

export default TableNumerados;
