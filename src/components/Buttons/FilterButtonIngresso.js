import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterButtonIngresso() {
  const [ingresso, setIngresso] = React.useState('');

  const handleChange = (event) => {
    setIngresso(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ingresso</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ingresso}
          label="Ingresso"
          onChange={handleChange}
        >
          <MenuItem value={10}>Pista</MenuItem>
          <MenuItem value={20}>Camarote</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
