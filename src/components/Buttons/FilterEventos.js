import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterEventos() {
  const [eventos, setEventos] = React.useState('');

  const handleChange = (event) => {
    setEventos(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 220, marginRight:'7px' }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Eventos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={eventos}
          label="Eventos"
          onChange={handleChange}
          sx={{ height: '39px'}}
        >
          <MenuItem value={10}>Eventos ativos</MenuItem>
          <MenuItem value={20}>Eventos encerrados</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
