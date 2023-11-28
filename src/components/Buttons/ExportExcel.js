import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';
import DescriptionIcon from '@mui/icons-material/Description';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ExportExcel = ({ data }) => {
    const handleDownload = () => {
        // Formatando os dados para a planilha Excel (exemplo)
        const formattedData = data.map(row => [
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
        const ws = XLSX.utils.aoa_to_sheet([['Data da Compra', 'PDV', 'POS', 'Número do Pedido', 'Código de Barras', 'Situação', 'Ingresso', 'Ingresso Numerado', 'Valor', 'Forma de Pagamento', 'Código da Transação'], ...formattedData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Detalhados');

        // Salvando a planilha como um arquivo Excel
        XLSX.writeFile(wb, 'detalhados.xlsx');
    };

    return (
        <Button component="label" variant="contained" color='success' onClick={handleDownload} startIcon={<DescriptionIcon />}>
            Exportar Excel
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}

export default ExportExcel;