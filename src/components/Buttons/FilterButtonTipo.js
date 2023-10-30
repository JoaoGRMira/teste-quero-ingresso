import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterButtonTipo({ tipoOptions, selectedTipo, onTipoFilterChange }) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onTipoFilterChange(selectedValue);
  };
  return (
    <Box sx={{ minWidth: 120, marginRight: '7px' }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTipo}
          label="Tipo"
          onChange={handleChange}
          sx={{ height: '39px' }}
        >
          {tipoOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}