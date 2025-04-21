import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const types = [
  'grass', 'fire', 'water', 'electric', 'psychic',
  'normal', 'fighting', 'flying', 'poison', 'ground',
  'rock', 'bug', 'ghost', 'steel', 'ice', 'dragon',
  'dark', 'fairy'
];

function PokemonTypeSelection({ selectedType, selectType }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Type</InputLabel>
      <Select
        value={selectedType || ''}
        label="Type"
        onChange={(e) => selectType(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        {types.map((type) => (
          <MenuItem key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PokemonTypeSelection;
