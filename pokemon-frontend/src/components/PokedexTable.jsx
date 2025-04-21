import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  useTheme, 
  alpha,
  Grow,
  IconButton,
  Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Type color mapping for visual enhancement
const TYPE_COLORS = {
  'grass': '#78C850',
  'fire': '#F08030',
  'water': '#6890F0',
  'electric': '#F8D030',
  'poison': '#A040A0',
  'flying': '#A890F0',
  'bug': '#A8B820',
  'normal': '#A8A878',
  'ground': '#E0C068',
  'fairy': '#EE99AC',
  'fighting': '#C03028',
  'psychic': '#F85888',
  'rock': '#B8A038',
  'ghost': '#705898',
  'ice': '#98D8D8',
  'dragon': '#7038F8',
  'dark': '#705848',
  'steel': '#B8B8D0'
};

function PokedexTable({ pokemons }) {
  const theme = useTheme();

  const getTypeColor = (type) => {
    return TYPE_COLORS[type.toLowerCase()] || theme.palette.grey[500];
  };

  const getBackgroundGradient = (types) => {
    if (types.length === 1) {
      const color = getTypeColor(types[0]);
      return `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`;
    } else if (types.length >= 2) {
      const color1 = getTypeColor(types[0]);
      const color2 = getTypeColor(types[1]);
      return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    }
    return theme.palette.grey[300];
  };

  const getTextColor = (types) => {
    const mainType = types[0].toLowerCase();
    return ['electric', 'normal', 'ground', 'ice', 'fairy'].includes(mainType) ? 'rgba(0,0,0,0.87)' : 'white';
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, pb: 4 }}>
      {pokemons.map((pokemon, index) => (
        <Grid 
          item 
          key={pokemon.id} 
          xs={12} 
          sm={6} 
          md={4} 
          lg={3}
          component={Grow}
          in={true}
          timeout={300 + index * 100}
        >
          <Card
            sx={{
              height: '100%',
              borderRadius: 4,
              position: 'relative',
              overflow: 'visible',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: `0 12px 28px ${alpha(getTypeColor(pokemon.types[0]), 0.3)}`,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '35%',
                background: getBackgroundGradient(pokemon.types),
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                zIndex: 0,
              }
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -15,
                right: 15,
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: theme.shadows[2],
                border: `2px solid ${getTypeColor(pokemon.types[0])}`,
                color: theme.palette.text.secondary,
                fontWeight: 'bold',
                zIndex: 2,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                #{String(pokemon.id).padStart(3, '0')}
              </Typography>
            </Box>

            <CardContent sx={{ position: 'relative', zIndex: 1, pt: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: getTextColor(pokemon.types),
                  mb: 0.5,
                  textShadow: getTextColor(pokemon.types) === 'white' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                  letterSpacing: 0.5,
                }}
              >
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Typography>

              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  flexWrap: 'wrap', 
                  gap: 1, 
                  mb: 2
                }}
              >
                {pokemon.types.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    size="small"
                    sx={{
                      backgroundColor: alpha(getTypeColor(type), 0.85),
                      color: ['electric', 'normal', 'ground', 'ice', 'fairy'].includes(type.toLowerCase()) 
                        ? 'rgba(0,0,0,0.87)' 
                        : 'white',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 1.5,
                  mb: 1,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 110,
                    height: 110,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(getTypeColor(pokemon.types[0]), 0.15)} 0%, ${alpha(getTypeColor(pokemon.types[0]), 0)} 70%)`,
                    zIndex: -1,
                  }
                }}
              >
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  style={{ 
                    width: 120, 
                    height: 120,
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(-15px)',
                  }}
                />
              </Box>

              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2,
                  pt: 2,
                  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {pokemon.height && `${pokemon.height / 10}m`} 
                  {pokemon.weight && pokemon.height && ' · '}
                  {pokemon.weight && `${pokemon.weight / 10}kg`}
                </Typography>
                
                <Box>
                  <Tooltip title="Details">
                    <IconButton 
                      size="small" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        '&:hover': { color: theme.palette.primary.main }
                      }}
                    >
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add to favorites">
                    <IconButton 
                      size="small" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        '&:hover': { color: theme.palette.error.main }
                      }}
                    >
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PokedexTable;