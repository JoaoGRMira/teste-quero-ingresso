import React, { useState } from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import DescriptionIcon from '@mui/icons-material/Description';
import Connection from '../../model';

const ExportExcelSite = ({ columnHeaders }) => {
  const [excel, setExcel] = useState([]);
  const [dataLoadedExcel, setDataLoadedExcel] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON);

  const conn = Connection();

  const fetchExcel = async () => {
    setIsLoading(true);

    try {
      const response = await conn.post(
        `eventos/site`,
        {
          cat: selectedEventCode.categoria,
        },
        {
          headers: {
            'token': localStorage.getItem('token')
          }
        }
      );

      if (response.status === 200) {
        setExcel(response.data.ingressos);
        setDataLoadedExcel(true);
        setError(null);
      } else {
        setError('Erro na resposta da API: ' + response.statusText);
      }
    } catch (error) {
      setError('Erro na solicitação POST (Excel): ' + error.message);
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);

      if (dataLoadedExcel && !error) {
        generateExcelFile();
      }
    }
  };

  const generateExcelFile = () => {
    const formattedData = excel.map(row => [
      row.pedido,
      row.data,
      row.status,
      row.comprador,
      row.nominado,
      row.email,
      row.telefone,
      row.quant,
      row.ingressos,
      // Configurando a coluna "valor" como formato de moeda
      { v: row.valor, t: 'n', z: 'R$#,##0.00' },
      row.taxa
    ]);

    const ws = XLSX.utils.aoa_to_sheet([columnHeaders, ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Detalhados');
  
    // Define a largura mínima desejada para cada coluna
    const minColumnWidths = [7, 5, 6, 10, 9, 6, 8, 10, 8, 5, 6];
  
    const columnWidths = formattedData[0].map((col, i) => ({
      wch: Math.max(minColumnWidths[i], Math.max(...formattedData.map(row => (row[i] ? row[i].toString().length : 0))) + 2),
    }));
  
    ws['!cols'] = columnWidths;

    XLSX.writeFile(wb, 'site_detalhados.xlsx');
  };

  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setError(null);
              fetchExcel();
            }}
            style={{ marginLeft: '10px' }}
          >
            Recarregar
          </Button>
        </div>
      )}

      <Button
        component="label"
        variant="contained"
        color="success"
        onClick={fetchExcel}
        startIcon={<DescriptionIcon />}
        disabled={isButtonDisabled || isLoading}
      >
        {isLoading ? 'Carregando...' : 'Exportar Excel'}
      </Button>
    </div>
  );
}

export default ExportExcelSite;
