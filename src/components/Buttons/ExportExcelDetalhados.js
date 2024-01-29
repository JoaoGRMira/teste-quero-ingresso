import React, { useState } from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import DescriptionIcon from '@mui/icons-material/Description';
import Connection from '../../model';

const ExportExcelDetalhados = ({ columnHeaders }) => {
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
        'eventos/detalhados',
        {
          evento: selectedEventCode.eve_cod,
        },
        {
          headers: {
            'token': localStorage.getItem('token')
          }
        }
      );

      if (response.status === 200) {
        setExcel(response.data.data);
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

      // Gerar Excel automaticamente após a conclusão da requisição
      if (dataLoadedExcel && !error) {
        generateExcelFile();
      }
    }
  };

  const generateExcelFile = () => {
    const formattedData = excel.map(row => [
      row.data_compra,
      row.pdv,
      row.pos,
      row.pedido,
      row.cod_barras,
      row.situacao,
      row.ing,
      row.ing_num,
      // Configurando a coluna "valor" como formato de moeda
      { v: row.valor, t: 'n', z: 'R$#,##0.00' },
      row.pagamento,
      row.cod_pagseguro,
      row.taxa
    ]);
    
    const ws = XLSX.utils.aoa_to_sheet([columnHeaders, ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Detalhados');
  
    // Define a largura mínima desejada para cada coluna
    const minColumnWidths = [14, 5, 5, 16, 15, 8, 8, 17, 5, 18, 16, 6];
  
    const columnWidths = formattedData[0].map((col, i) => ({
      wch: Math.max(minColumnWidths[i], Math.max(...formattedData.map(row => (row[i] ? row[i].toString().length : 0))) + 2),
    }));
  
    ws['!cols'] = columnWidths;
  
    XLSX.writeFile(wb, 'detalhados.xlsx');
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

export default ExportExcelDetalhados;