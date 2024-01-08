import * as React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function FilterEventos({ eventFilter, onEventFilterChange }) {

  const handleChange = (event) => { // Função de selecionar filtro
    const selectedValue = event.target.value; // Define o valor da variável como a opção atual
    onEventFilterChange(selectedValue); // Passa variável como parâmetro da função
  };

  return (
    <Box sx={{ width: '250px', marginRight: '7px' }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Eventos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={eventFilter}
          label="Eventos"
          onChange={handleChange}
          sx={{ height: '39px' }}
        >
          {/* Opções de filtro */}
          <MenuItem value={1}>Todos</MenuItem>
          <MenuItem value={0}>Eventos ativos</MenuItem>
          <MenuItem value={2}>Eventos encerrados</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}