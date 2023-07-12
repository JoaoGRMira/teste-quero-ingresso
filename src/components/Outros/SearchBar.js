import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Pesquisar"
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
};

export default SearchBar;
