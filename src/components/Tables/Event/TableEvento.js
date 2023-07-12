import React from "react";
import { useNavigate } from "react-router-dom";
import "./tableStyle.css";

const dados = [
  {
    nome: "Evento 1",
    local: "Local 1 - cidade",
    data: "01/01/2023",
    dias: 10,
    vendidosHoje: 100,
    receitaHoje: 1000,
    cortesiasTotal: 10,
    vendidosTotal: 1000,
    receitaTotal: 10000,
    taxaTotal: 10
  },
  {
    nome: "Evento 2",
    local: "Local 2 - cidade",
    data: "02/02/2023",
    dias: 20,
    vendidosHoje: 150,
    receitaHoje: 1500,
    cortesiasTotal: 5,
    vendidosTotal: 2000,
    receitaTotal: 20000,
    taxaTotal: 20
  },
  {
    nome: "Evento 3",
    local: "Local 3 - cidade",
    data: "03/03/2023",
    dias: 30,
    vendidosHoje: 200,
    receitaHoje: 2000,
    cortesiasTotal: 3,
    vendidosTotal: 3000,
    receitaTotal: 30000,
    taxaTotal: 30
  },
];

const Table = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/home");
  };

  return (
    <div className="table-responsive">
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
          {dados.map((evento, index) => (
            <tr key={index} role="row" onClick={redirectToHome}>
              <td className="nome">
                {evento.nome} <br />
                <span className="local">{evento.local}</span>
              </td>
              <td className="data">
                {evento.data} <br />
                <span className="dias">Faltam {evento.dias} dias</span>
              </td>
              <td className="vendidos">{evento.vendidosHoje}</td>
              <td className="receita">R$ {evento.receitaHoje}</td>
              <td className="cortesias">{evento.cortesiasTotal}</td>
              <td className="vendidos">{evento.vendidosTotal}</td>
              <td className="receita">R$ {evento.receitaTotal}</td>
              <td className="taxa">R$ {evento.taxaTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
