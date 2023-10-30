import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterButtonStatus({ statusOptions, selectedStatus, onStatusFilterChange }) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onStatusFilterChange(selectedValue);
  };
  return (
    <Box sx={{ minWidth: 120, maxWidth: 120, marginRight: '7px' }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedStatus}
          label="Status"
          onChange={handleChange}
          sx={{ height: '39px' }}
        >
          <MenuItem>Selecione...</MenuItem>
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}