import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterButtonPdv() {
  const [pdv, setPdv] = React.useState('');

  const handleChange = (event) => {
    setPdv(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginRight:'7px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pdv</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pdv}
          label="Pdv"
          onChange={handleChange}
        >
          <MenuItem value={10}>Copiadora Nanquim</MenuItem>
          <MenuItem value={20}>Quero Ingresso - Internet</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
