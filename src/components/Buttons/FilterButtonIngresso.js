import * as React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function FilterButtonIngresso({ ingressoOptions, selectedIngresso, onIngressoFilterChange }) {

  const handleChange = (event) => { // Função de selecionar filtro
    const selectedValue = event.target.value; // Define o valor da variável como a opção atual
    onIngressoFilterChange(selectedValue); // Passa variável como parâmetro da função
  };

  return (
    <Box sx={{ minWidth: 250, maxWidth: 250, marginRight: '7px' }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Ingresso</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedIngresso} // Define o valor como o filtro selecionado
          label="Ingresso"
          onChange={handleChange} // Função de seleção
          sx={{ height: '39px' }}
        >
          <MenuItem>Selecione...</MenuItem>
          {ingressoOptions.map((option) => ( // Mapeamento das opções
            <MenuItem key={option.value} value={option.value}> {/* Define os valores das opções */}
              {option.label} {/* Define o texto da opção */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}