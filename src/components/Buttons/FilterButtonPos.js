import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterButtonPos() {
  const [pos, setPos] = React.useState('');

  const handleChange = (event) => {
    setPos(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginRight:'7px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pos}
          label="Pos"
          onChange={handleChange}
        >
          <MenuItem value={10}>000-000-002</MenuItem>
          <MenuItem value={20}>1171649445</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
