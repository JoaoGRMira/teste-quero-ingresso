import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./tableStyle.css";
import Connection from '../../../model/index';
import { useToken } from '../../../model/tokenContext';
import { useLogin } from '../../../model/loginContext';

const Table = () => {
  const { token } = useToken();
  const { login } = useLogin();
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]); // Estado para armazenar os dados de eventos
  const [selectedEventCode, setSelectedEventCode] = useState(null);

  useEffect(() => {
    const conn = Connection();
    const fetchEventos = async () => {
      try {
        const response = await conn.get('eventos', {
          headers: {
            //'token': token
            'token': localStorage.getItem('token')
          }
        });

        if (response.status === 200) {
          //console.log(response.data)
          setEventos(response.data.eventos);
        } else {
          console.log('Erro na resposta da API:', response);
        }
      } catch (error) {
        console.error('Erro na solicitação GET:', error);
      }
    };

    fetchEventos();
  }, [token]);

  const handleEventClick = (eventCode) => {
    // Encontre o evento selecionado nos dados do estado 'eventos'
    const selectedEvent = eventos.find(evento => evento.eve_cod === eventCode);
  
    // Verifique se encontrou o evento
    if (selectedEvent) {
      setSelectedEventCode(eventCode);
  
      // Salve os dados do evento selecionado no Local Storage
      localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
  
      navigate('/home');
    }
  };  

  //console.log(eventos)
  //console.log(token)
  //console.log(localStorage.getItem('token')) 
  //console.log(localStorage.getItem('login')) 
  //console.log(login)

  return (
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
            <tr>
              <th></th>
              <th className="title">Nome</th>
              <th className="title">Data do Evento</th>
            </tr>
            {eventos.map((evento, index) => (
              <React.Fragment key={index}>
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
    </div>
  );
};

export default Table;
