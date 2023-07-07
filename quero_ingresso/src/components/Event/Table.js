import React, { useState } from "react";

const data = [
  {
    nome: "Evento 1",
    data: "01/01/2023",
    vendidosHoje: 100,
    receitaHoje: 1000,
    cortesiasTotal: 10,
    vendidosTotal: 1000,
    receitaTotal: 10000,
    taxaTotal: 10
  },
  {
    nome: "Evento 2",
    data: "02/01/2023",
    vendidosHoje: 150,
    receitaHoje: 1500,
    cortesiasTotal: 5,
    vendidosTotal: 2000,
    receitaTotal: 20000,
    taxaTotal: 20
  },
];

const Table = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (event, index) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    }
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      const allRows = data.map((_, index) => index);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered" role="table" aria-label="TABLE">
            <thead role="rowgroup">
              <tr role="row">
                <td role="cell">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      aria-label="ALL CHECKBOX"
                      aria-checked="false"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </div>
                </td>
                <th role="columnheader" scope="col">Nome</th>
                <th role="columnheader" scope="col">Data do Evento</th>
                <th role="columnheader" scope="col">Vendidos Hoje</th>
                <th role="columnheader" scope="col">Receita Hoje</th>
                <th role="columnheader" scope="col">Cortesias Total</th>
                <th role="columnheader" scope="col">Vendidos Total</th>
                <th role="columnheader" scope="col">Receita Total</th>
                <th role="columnheader" scope="col">Taxa Total</th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {data.map((evento, index) => (
                <tr key={index} role="row">
                  <td role="cell">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        aria-label={`CHECKBOX-${index}`}
                        checked={selectedRows.includes(index)}
                        onChange={(event) => handleCheckboxChange(event, index)}
                      />
                    </div>
                  </td>
                  <td>{evento.nome}</td>
                  <td>{evento.data}</td>
                  <td>{evento.vendidosHoje}</td>
                  <td>{evento.receitaHoje}</td>
                  <td>{evento.cortesiasTotal}</td>
                  <td>{evento.vendidosTotal}</td>
                  <td>{evento.receitaTotal}</td>
                  <td>{evento.taxaTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;