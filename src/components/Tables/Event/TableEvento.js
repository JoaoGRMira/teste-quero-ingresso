import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./tableStyle.css";
import Connection from '../../../model/index';
import SearchBar from '../../Outros/SearchBar';
import FilterEventos from '../../Buttons/FilterEventos';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const Table = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [selectedEventCode, setSelectedEventCode] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('1');
  const [totalPages, setTotalPages] = useState(0);

  const conn = Connection();
  const fetchEventos = async (page) => {
    try {
      const response = await conn.get(`eventos?p=${page}&busca=${searchQuery}&tipo=${eventFilter}`, {
        headers: {
          'token': localStorage.getItem('token')
        }
      });

      if (response.status === 200) {
        setData(response.data);
        setEventos(response.data.eventos);
        setTotalPages(response.data.total);
        setDataLoaded(true);
      } else {
        console.log('Erro na resposta da API:', response);
      }
    } catch (error) {
      console.error('Erro na solicitação GET:', error);
    }
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchEventos(page);
      console.log('fetch evento')
    }
  }, [page, dataLoaded]);

  const handleEventClick = (eventCode) => {
    const selectedEvent = eventos.find(evento => evento.eve_cod === eventCode);

    if (selectedEvent) {
      setSelectedEventCode(eventCode);
      localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
      navigate('/home');
    }
  };

  const handleIncrement = () => {
    const newPage = page + 1
    setPage(newPage)
    fetchEventos(newPage)
  }

  const handleDecrement = () => {
    const newPage = page - 1
    if (newPage >= 1) {
      setPage(newPage);
      fetchEventos(newPage);
    }
  }

  const handleGoToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
      fetchEventos(pageNumber);
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

  const handleEventFilterChange = (value) => {
    setEventFilter(value);
    setPage(1);
    setDataLoaded(false);
  };

  return (
    <div>
      <Grid container spacing={4} sx={{marginBottom: '20px'}}>
        <Grid item xs={12} md={9} lg={9} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <FilterEventos eventFilter={eventFilter} onEventFilterChange={handleEventFilterChange} />
        </Grid>
        <Grid item xs={12} md={4} lg={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <SearchBar label="Buscar Eventos" onSearch={handleSearch} />
        </Grid>
      </Grid>
      {dataLoaded ? (
        <div>
          <div className="table-responsive">
            {/* Desktop */}
            <table className="table table-bordered table-hover">
              <thead role="rowgroup">
                <tr role="row">
                  <th scope="col" className="title" rowSpan="2">
                    Nome
                  </th>
                  <th scope="col" className="title" rowSpan="2">
                    Data do Evento
                  </th>
                  <th scope="col" colSpan="2" className="title">
                    Hoje
                  </th>
                  <th scope="col" colSpan="4" className="title">
                    Total
                  </th>
                </tr>
                <tr role="row">
                  <th scope="col" className="sub-title">
                    Vendidos
                  </th>
                  <th scope="col" className="sub-title">
                    Receita
                  </th>
                  <th scope="col" className="sub-title">
                    Cortesias
                  </th>
                  <th scope="col" className="sub-title">
                    Vendidos
                  </th>
                  <th scope="col" className="sub-title">
                    Receita
                  </th>
                  <th scope="col" className="sub-title">
                    Taxa
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {eventos.map((evento, index) => (
                  <tr key={index} role="row" onClick={() => handleEventClick(evento.eve_cod)}>
                    <td data-title="Nome">
                      <span className="nome">{evento.eve_nome}</span> <br />
                      <span className="local">{evento.local}</span>
                    </td>
                    <td data-title="Data">
                      {evento.eve_data} <br />
                      <span className="dias">{evento.inicio_evento}</span>
                    </td>
                    <td data-title="Vendidos Hoje" className="vendidos">
                      {evento.vendido_hoje}
                    </td>
                    <td data-title="Receita Hoje" className="receita">
                      {evento.receitas_hoje}
                    </td>
                    <td data-title="Cortesias Total" className="cortesias">
                      {evento.cortesias_pdv_total}
                    </td>
                    <td data-title="Vendidos Total" className="vendidos">
                      {evento.vendido_total}
                    </td>
                    <td data-title="Receita Total" className="receita">
                      {evento.receitas_total}
                    </td>
                    <td data-title="Taxa Total" className="taxa">
                      {evento.taxas_total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile */}
            <div className="table-container">
              <table className="mobile-table">
                <tbody>
                  {eventos.map((evento, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <th></th>
                        <th className="title">Nome</th>
                        <th className="title">Data do Evento</th>
                      </tr>
                      <tr
                        className={`evento-row ${index % 2 === 0 ? "event-odd" : "event-even"}`}
                        onClick={() => handleEventClick(evento.eve_cod)}
                      >
                        <td></td>
                        <td data-title="Nome">
                          <span className="nome">{evento.eve_nome}</span> <br />
                          <span className="local">{evento.local}</span>
                        </td>
                        <td data-title="Data">
                          <span className="data">{evento.eve_data}</span> <br />
                          <span className="dias"> {evento.inicio_evento}</span>
                        </td>
                      </tr>
                      <tr
                        className={`evento-row ${index % 2 === 0 ? "event-odd" : "event-even"}`}
                        onClick={() => handleEventClick(evento.eve_cod)}
                      >
                        <th className="title" rowspan="2" scope="rowgroup">
                          Hoje
                        </th>
                        <th className="sub-title" scope="row">
                          Vendidos
                        </th>
                        <td data-title="Vendidos Hoje" className="vendidos">
                          {evento.vendido_hoje}
                        </td>
                      </tr>
                      <tr
                        className={`evento-row ${index % 2 === 0 ? "event-odd" : "event-even"}`}
                        onClick={() => handleEventClick(evento.eve_cod)}
                      >
                        <th className="sub-title" scope="row">
                          Receita
                        </th>
                        <td data-title="Receita Hoje" className="receita">
                          {evento.receitas_hoje}
                        </td>
                      </tr>
                      <tr
                        className={`evento-row ${index % 2 === 0 ? "event-odd" : "event-even"}`}
                        onClick={() => handleEventClick(evento.eve_cod)}
                      >
                        <th className="title" rowspan="4" scope="rowgroup">
                          Total
                        </th>
                        <th className="sub-title" scope="row">
                          Cortesias
                        </th>
                        <td data-title="Cortesias Total" className="cortesias">
                          {evento.cortesias_pdv_total}
                        </td>
                      </tr>
                      <tr
                        className={`evento-row ${index % 2 === 0 ? "event-odd" : "event-even"}`}
                        onClick={() => handleEventClick(evento.eve_cod)}
                      >
                        <th className="sub-title" scope="row">
                          Vendidos
                        </th>
                        <td data-title="Vendidos Total" className="vendidos">
                          {evento.vendido_total}
                        </td>
                      </tr>
                      <tr
                        className={`evento-row ${index % 2 === 0 ? "event-odd" : "event-even"}`}
                        onClick={() => handleEventClick(evento.eve_cod)}
                      >
                        <th className="sub-title" scope="row">
                          Receita
                        </th>
                        <td data-title="Receita Total" className="receita">
                          {evento.receitas_total}
                        </td>
                      </tr>
                      <tr
                        className={`evento-row ${index % 2 === 0 ? "event-odd" : "event-even"}`}
                        onClick={() => handleEventClick(evento.eve_cod)}
                      >
                        <th className="sub-title" scope="row">
                          Taxa
                        </th>
                        <td data-title="Taxa Total" className="taxa">
                          {evento.taxas_total}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
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
          </div>
        </div>
      ) : (
        // Renderizar um indicador de carregamento enquanto os dados são buscados
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Table;
