import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    props.onSearch(searchText);
  };

  return (
    <div>
      <TextField
        label={props.label}
        variant="outlined"
        value={searchText}
        onChange={handleChange}
        size='small'
        placeholder="Buscar…"
        sx={{ width: '24ch' }}
      />
      <Button variant="contained" onClick={handleSearch} sx={{ width: '2ch', height: '39px', borderRadius: 0 }}>
        <SearchIcon />
      </Button>
    </div>
  );
}

export default SearchBar;
