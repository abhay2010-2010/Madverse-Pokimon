import { useEffect, useState } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress, 
  Chip,
  Grid,
  Fade,
  useTheme,
  alpha,
  Container,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import PokedexTable from './PokedexTable';

// Type color mapping for visual enhancement
const TYPE_COLORS = {
  'Grass': '#78C850',
  'Fire': '#F08030',
  'Water': '#6890F0',
  'Electric': '#F8D030',
  'Poison': '#A040A0',
  'Flying': '#A890F0',
  'Bug': '#A8B820',
  'Normal': '#A8A878',
  'Ground': '#E0C068',
  'Fairy': '#EE99AC',
  'Fighting': '#C03028',
  'Psychic': '#F85888',
  'Rock': '#B8A038',
  'Ghost': '#705898',
  'Ice': '#98D8D8',
  'Dragon': '#7038F8',
  'Dark': '#705848',
  'Steel': '#B8B8D0'
};

const ALL_TYPES = Object.keys(TYPE_COLORS);

function FilterablePokedexTable() {
  const theme = useTheme();
  const [allPokemons, setAllPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [typeCounts, setTypeCounts] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5050/api/pokemons')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        return res.json();
      })
      .then(data => {
        setAllPokemons(data);
        
        // Calculate type counts for the dashboard
        const counts = {};
        ALL_TYPES.forEach(type => {
          counts[type] = data.filter(p => p.types.includes(type)).length;
        });
        setTypeCounts(counts);
        
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleFilter = () => {
    if (!selectedType) return;
    
    setSearching(true);
    // Simulate search delay for better UX
    setTimeout(() => {
      const filtered = allPokemons.filter(p => p.types.includes(selectedType));
      setFilteredPokemons(filtered);
      setSearching(false);
    }, 600);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    // Auto-filter when clicking on type chip
    setTimeout(() => {
      const filtered = allPokemons.filter(p => p.types.includes(type));
      setFilteredPokemons(filtered);
    }, 300);
  };

  if (error) {
    return (
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 4, 
            textAlign: 'center',
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`
          }}
        >
          <Typography color="error" variant="h6">
            Error: {error}
          </Typography>
          <Typography mt={2}>
            Please check your API connection and try again later.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper 
        elevation={4} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.9) 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          position: 'relative',
          mb: 6,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            background: `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(theme.palette.secondary.main, 0.8)} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.05" fill-rule="evenodd"%3E%3Ccircle cx="20" cy="20" r="10"/%3E%3C/g%3E%3C/svg%3E") repeat',
              zIndex: 0,
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CatchingPokemonIcon sx={{ fontSize: 36, mr: 2 }} />
              <Typography variant="h4" component="h1" fontWeight="bold">
                Pokémon Type Explorer
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ maxWidth: 600, mb: 2, opacity: 0.9 }}>
              Search and filter Pokémon by their elemental types. Discover which creatures share the same powers and abilities!
            </Typography>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <>
              {/* Type Dashboard */}
              <Card 
                elevation={2} 
                sx={{ 
                  mb: 4, 
                  borderRadius: 2,
                  background: alpha(theme.palette.background.default, 0.5),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <FilterAltIcon sx={{ mr: 1 }} /> Popular Pokémon Types
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={2}>
                    {ALL_TYPES.map(type => (
                      <Grid item key={type}>
                        <Chip
                          label={`${type} (${typeCounts[type] || 0})`}
                          onClick={() => handleTypeClick(type)}
                          sx={{
                            bgcolor: TYPE_COLORS[type] || theme.palette.grey[300],
                            color: ['Electric', 'Normal', 'Ground', 'Ice'].includes(type) ? 'rgba(0,0,0,0.8)' : 'white',
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: alpha(TYPE_COLORS[type] || theme.palette.grey[300], 0.8),
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              {/* Search Form */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={8} md={9}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="type-select-label">Select Pokémon Type</InputLabel>
                    <Select
                      labelId="type-select-label"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      label="Select Pokémon Type"
                      sx={{
                        height: '56px',
                        borderRadius: '28px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.primary.main, 0.5),
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        }
                      }}
                    >
                      {ALL_TYPES.map(type => (
                        <MenuItem key={type} value={type}>
                          <Box 
                            component="span" 
                            sx={{ 
                              display: 'inline-block', 
                              width: 16, 
                              height: 16, 
                              borderRadius: '50%', 
                              mr: 1, 
                              backgroundColor: TYPE_COLORS[type] || 'grey' 
                            }} 
                          />
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleFilter}
                    disabled={!selectedType || searching}
                    startIcon={searching ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                    sx={{
                      height: '56px',
                      borderRadius: '28px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      background: selectedType ? `linear-gradient(45deg, ${TYPE_COLORS[selectedType]} 0%, ${alpha(TYPE_COLORS[selectedType], 0.8)} 100%)` : undefined,
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                      },
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {searching ? 'Searching...' : 'Search'}
                  </Button>
                </Grid>
              </Grid>

              {/* Results */}
              {filteredPokemons.length > 0 && (
                <Fade in={filteredPokemons.length > 0} timeout={800}>
                  <Box>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2, 
                        pb: 2, 
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` 
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 36, 
                          height: 36, 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', 
                          mr: 2,
                          background: TYPE_COLORS[selectedType],
                          color: ['Electric', 'Normal', 'Ground', 'Ice'].includes(selectedType) ? 'rgba(0,0,0,0.8)' : 'white',
                        }}
                      >
                        <Typography variant="body1" fontWeight="bold">
                          {filteredPokemons.length}
                        </Typography>
                      </Box>
                      <Typography variant="h6">
                        {selectedType} Type Pokémon Found
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        borderRadius: 3, 
                        overflow: 'hidden',
                        border: `1px solid ${alpha(TYPE_COLORS[selectedType] || theme.palette.primary.main, 0.3)}`,
                        boxShadow: `0 4px 20px ${alpha(TYPE_COLORS[selectedType] || theme.palette.primary.main, 0.1)}`,
                      }}
                    >
                      <PokedexTable pokemons={filteredPokemons} />
                    </Box>
                  </Box>
                </Fade>
              )}

              {selectedType && filteredPokemons.length === 0 && !searching && (
                <Paper 
                  elevation={1}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    borderRadius: 2, 
                    mt: 4,
                    backgroundColor: alpha(theme.palette.warning.light, 0.1),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                  }}
                >
                  <Typography variant="subtitle1">
                    No Pokémon found with the {selectedType} type.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Try selecting a different type from the dropdown.
                  </Typography>
                </Paper>
              )}
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default FilterablePokedexTable;