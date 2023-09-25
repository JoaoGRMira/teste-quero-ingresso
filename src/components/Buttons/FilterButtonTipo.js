import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterButtonTipo() {
  const [tipo, setTipo] = React.useState('');

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginRight:'7px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tipo}
          label="Tipo"
          onChange={handleChange}
        >
          <MenuItem value={10}>Are Vip</MenuItem>
          <MenuItem value={20}>Pista</MenuItem>
          <MenuItem value={30}>Cadeira_Lado Esquerdo</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
