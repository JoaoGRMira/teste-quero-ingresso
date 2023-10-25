import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterEventos() {
  const [eventos, setEventos] = React.useState(
    localStorage.getItem('eventoSelecionado') || '2'
  );

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setEventos(selectedValue);

    // Salvar o valor no localStorage.
    localStorage.setItem('eventoSelecionado', selectedValue);
    window.location.reload()
  };

  console.log(localStorage.getItem('eventoSelecionado'))

  return (
    <Box sx={{ width: '250px', marginRight:'7px' }}>
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
          <MenuItem value={1}>Todos</MenuItem>
          <MenuItem value={0}>Eventos ativos</MenuItem>
          <MenuItem value={2}>Eventos encerrados</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
