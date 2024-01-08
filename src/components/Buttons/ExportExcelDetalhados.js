import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import DescriptionIcon from '@mui/icons-material/Description';
import Connection from '../../model';

const ExportExcelDetalhados = ({ columnHeaders }) => {
  const [excel, setExcel] = useState([]);
  const [dataLoadedExcel, setDataLoadedExcel] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const selectedEventCodeJSON = localStorage.getItem("selectedEvent");
  const selectedEventCode = JSON.parse(selectedEventCodeJSON);
  
  const conn = Connection();

  const fetchExcel = async () => {
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
        setIsButtonDisabled(false);
      } else {
        console.log('Erro na resposta da API:', response);
      }
    } catch (error) {
      console.error('Erro na solicitação POST (Excel):', error);
    }
  };

  useEffect(() => {
    if (selectedEventCode && !dataLoadedExcel) {
      fetchExcel();
    }
  }, [selectedEventCode, dataLoadedExcel]);

  //console.log(excel)

  const handleDownload = () => {
    if (!dataLoadedExcel) {
      return;
    }
  
    // Formatando os dados para a planilha Excel
    const formattedData = excel.map(row => [
      row.data_compra,
      row.pdv,
      row.pos,
      row.pedido,
      row.cod_barras,
      row.situacao,
      row.ing,
      row.ing_num,
      row.valor,
      row.pagamento,
      row.cod_pagseguro
    ]);

    // Criando uma planilha Excel
    const ws = XLSX.utils.aoa_to_sheet([columnHeaders, ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Detalhados');

    // Calculando largura máxima para cada coluna
    const columnWidths = formattedData[0].map((col, i) => ({
      wch: Math.max(...formattedData.map(row => row[i]?.toString().length || 0)) + 2,
    }));

    // Aplicando larguras calculadas
    ws['!cols'] = columnWidths;

    // Salvando a planilha como um arquivo Excel
    XLSX.writeFile(wb, 'detalhados.xlsx');
  }

  return (
    <Button
      component="label"
      variant="contained"
      color="success"
      onClick={handleDownload}
      startIcon={<DescriptionIcon />}
      disabled={isButtonDisabled}
    >
      Exportar Excel
    </Button>
  );
}

export default ExportExcelDetalhados;
