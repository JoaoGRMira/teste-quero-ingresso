import * as React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function FilterButtonSituacao({ situacaoOptions, selectedSituacao, onSituacaoFilterChange }) {

  const handleChange = (event) => { // Função de selecionar filtro
    const selectedValue = event.target.value; // Define o valor da variável como a opção atual
    onSituacaoFilterChange(selectedValue); // Passa variável como parâmetro da função
  };

  return (
    <Box sx={{ minWidth: 123, maxWidth: 250, marginRight: '7px' }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Situacao</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSituacao} // Define o valor como o filtro selecionado
          label="Situacao"
          onChange={handleChange} // Função de seleção
          sx={{ height: '39px' }}
        >
          <MenuItem>Selecione...</MenuItem>
          {situacaoOptions.map((option) => ( // Mapeamento das opções
            <MenuItem key={option.value} value={option.value}> {/* Define os valores das opções */}
              {option.label} {/* Define o texto da opção */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}