import { useState } from 'react';
import PokemonRow from './components/PokemonRow';
import PokedexTable from './components/PokedexTable';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Divider,
  InputAdornment,
  useTheme,
  ThemeProvider,
  createTheme,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CategoryIcon from '@mui/icons-material/Category';

// Create a custom Pokémon-themed palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#EE4035', // Pokéball red
      light: '#FF5A51',
      dark: '#C7302A',
    },
    secondary: {
      main: '#3B4CCA', // Pokémon blue
      light: '#5A6BD8',
      dark: '#2A3A9D',
    },
    success: {
      main: '#4DAD5B', // Grass type green
      light: '#6BC779',
      dark: '#3C874A',
    },
    background: {
      default: '#f5f7fa',
    },
    info: {
      main: '#FFD74D', // Pikachu yellow
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '10px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 30,
          },
        },
      },
    },
  },
});

const DB_URI="http://localhost:5050/api/"

function App() {
  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [namesInput, setNamesInput] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [type, setType] = useState('');
  const [typeFilteredList, setTypeFilteredList] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await fetch(`${DB_URI}pokemons/${name.toLowerCase().trim()}`);
      const data = await res.json();
      if (res.ok) {
        setPokemon(data);
      } else {
        alert(data.message || 'Pokémon not found');
        setPokemon(null);
      }
    } catch (error) {
      alert('Error connecting to the Pokémon database');
      console.error(error);
    }
  };

  const handleMultipleSubmit = async (e) => {
    e.preventDefault();
    if (!namesInput.trim()) return;
    try {
      const names = namesInput.split(',').map((n) => n.trim()).filter(n => n);
      const res = await fetch(`${DB_URI}pokemon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names }),
      });
      const data = await res.json();
      if (res.ok) {
        setPokemonList(data);
      } else {
        alert(data.message || 'Pokémon not found');
        setPokemonList([]);
      }
    } catch (error) {
      alert('Error connecting to the Pokémon database');
      console.error(error);
    }
  };

  const handleTypeSubmit = async (e) => {
    e.preventDefault();
    if (!type.trim()) return;
  

  
    try {
      const res = await fetch(`${DB_URI}pokemons/type/${type.toLowerCase().trim()}`);
      const data = await res.json();
      if (res.ok) {
        setTypeFilteredList(data);
      } else {
        // setError(data.message || 'No Pokémon found');
        setTypeFilteredList([]);
      }
    } catch (err) {
      // setError("Error fetching data");
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Box
              component="form"
              onSubmit={handleSingleSubmit}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mb: 3,
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                label="Enter Pokémon name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Pikachu, Charizard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CatchingPokemonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ 
                  minWidth: { xs: '100%', sm: '180px' },
                  height: 56
                }}
                startIcon={<SearchIcon />}
              >
                Find Pokémon
              </Button>
            </Box>
            
            {pokemon && (
              <Paper elevation={2} sx={{ p: 3, mt: 3, borderRadius: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>
                <PokemonRow pokemon={pokemon} />
              </Paper>
            )}
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Box
              component="form"
              onSubmit={handleMultipleSubmit}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mb: 3,
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                label="Enter multiple Pokémon names"
                value={namesInput}
                onChange={(e) => setNamesInput(e.target.value)}
                placeholder="e.g., Pikachu, Bulbasaur, Charmander"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FormatListBulletedIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ 
                  minWidth: { xs: '100%', sm: '180px' },
                  height: 56
                }}
                startIcon={<SearchIcon />}
              >
                Search All
              </Button>
            </Box>
            
            {pokemonList.length > 0 && (
              <Paper elevation={2} sx={{ mt: 3, overflow: 'hidden', borderRadius: 3, border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}` }}>
                <PokedexTable pokemons={pokemonList} />
              </Paper>
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Box
              component="form"
              onSubmit={handleTypeSubmit}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mb: 3,
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                label="Enter Pokémon type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g., grass, fire, water, electric"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon color="success" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ 
                  minWidth: { xs: '100%', sm: '180px' },
                  height: 56
                }}
                startIcon={<SearchIcon />}
              >
                Find by Type
              </Button>
            </Box>
            
            {typeFilteredList.length > 0 && (
              <Paper elevation={2} sx={{ mt: 3, overflow: 'hidden', borderRadius: 3, border: `1px solid ${alpha(theme.palette.success.main, 0.2)}` }}>
                <PokedexTable pokemons={typeFilteredList} />
              </Paper>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 5,
          backgroundColor: theme.palette.background.default,
          backgroundImage: `
            radial-gradient(circle at 25px 25px, ${alpha(theme.palette.primary.light, 0.15)} 2px, transparent 0),
            radial-gradient(circle at 75px 75px, ${alpha(theme.palette.secondary.light, 0.1)} 2px, transparent 0)
          `,
          backgroundSize: '100px 100px',
          backgroundPosition: '0 0',
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={4}
            sx={{
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {/* Top Header with background */}
            <Box
              sx={{
                height: { xs: 120, sm: 160 },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '200%',
                  height: '200%',
                  top: -100,
                  left: -100,
                  background: `
                    radial-gradient(circle at 50% 40%, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%),
                    radial-gradient(circle at 80% 10%, transparent 30%, rgba(255,255,255,0.05) 40%, transparent 50%)
                  `,
                  transform: 'rotate(10deg)',
                },
              }}
            >
              <Typography 
                variant="h4" 
                component="h1"
                color="white"
                sx={{ 
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 2,
                  letterSpacing: 1,
                  fontWeight: 800,
                  px: 2,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5
                }}
              >
                <CatchingPokemonIcon fontSize="large" /> 
                Pokémon Finder
              </Typography>
            </Box>

            <Box sx={{ p: { xs: 3, sm: 4 } }}>
              {/* Navigation buttons */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mb: 4,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <Button
                  variant={activeTab === 0 ? "contained" : "text"}
                  onClick={() => setActiveTab(0)}
                  sx={{ 
                    flex: 1, 
                    py: 1, 
                    borderRadius: 0,
                    color: activeTab === 0 ? 'white' : theme.palette.primary.main,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                    }
                  }}
                  startIcon={<CatchingPokemonIcon />}
                >
                  Single Pokémon
                </Button>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                <Divider orientation="horizontal" flexItem sx={{ display: { xs: 'block', sm: 'none' } }} />
                <Button
                  variant={activeTab === 1 ? "contained" : "text"}
                  color="secondary"
                  onClick={() => setActiveTab(1)}
                  sx={{ 
                    flex: 1, 
                    py: 1, 
                    borderRadius: 0,
                    color: activeTab === 1 ? 'white' : theme.palette.secondary.main,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                    }
                  }}
                  startIcon={<FormatListBulletedIcon />}
                >
                  Multiple Pokémon
                </Button>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                <Divider orientation="horizontal" flexItem sx={{ display: { xs: 'block', sm: 'none' } }} />
                <Button
                  variant={activeTab === 2 ? "contained" : "text"}
                  color="success"
                  onClick={() => setActiveTab(2)}
                  sx={{ 
                    flex: 1, 
                    py: 1, 
                    borderRadius: 0,
                    color: activeTab === 2 ? 'white' : theme.palette.success.main,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                    }
                  }}
                  startIcon={<CategoryIcon />}
                >
                  Search by Type
                </Button>
              </Box>

              {renderActiveTab()}

            </Box>
          </Paper>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" 
            sx={{ mt: 3, opacity: 0.7 }}
          >
            Data provided by the Pokémon API
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;