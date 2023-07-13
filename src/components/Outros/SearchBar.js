import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function SearchBar(props) {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
  };

  return (
    <div>
      <TextField
        label={props.label}
        variant="outlined"
        value={searchText}
        onChange={handleChange}
        size='small'
      />
      <Button variant="contained" onClick={handleSearch} sx={{ height: '39px', borderRadius: 0 }}>
        Buscar
      </Button>
    </div>
  );
}

export default SearchBar;
