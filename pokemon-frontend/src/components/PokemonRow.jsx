import React from 'react';
import { Card, CardContent, Typography, Box, Chip, useTheme, alpha, Divider, Grid } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

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

function PokemonRow({ pokemon }) {
  const theme = useTheme();
  
  const getTypeColor = (type) => {
    return TYPE_COLORS[type.toLowerCase()] || theme.palette.grey[500];
  };

  const mainTypeColor = getTypeColor(pokemon.types[0]);
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        my: 3,
        perspective: '1000px'
      }}
    >
      <Card 
        sx={{ 
          width: '100%', 
          maxWidth: 500, 
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: `0 12px 24px ${alpha(mainTypeColor, 0.2)}`,
          border: `1px solid ${alpha(mainTypeColor, 0.3)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px) rotateX(2deg)',
            boxShadow: `0 16px 32px ${alpha(mainTypeColor, 0.25)}`,
          },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: `linear-gradient(90deg, ${mainTypeColor} 0%, ${alpha(mainTypeColor, 0.6)} 100%)`,
          }
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Grid container>
            {/* Pokemon Image Section */}
            <Grid 
              item 
              xs={12} 
              md={5}
              sx={{ 
                background: `linear-gradient(135deg, ${alpha(mainTypeColor, 0.8)} 0%, ${alpha(mainTypeColor, 0.4)} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                p: 3,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '140%',
                  height: '140%',
                  top: '-20%',
                  left: '-20%',
                  background: `radial-gradient(circle, ${alpha('#ffffff', 0.1)} 0%, transparent 70%)`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  zIndex: 0,
                }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%'
                }}
              >
                <img 
                  src={pokemon.sprite} 
                  alt={pokemon.name} 
                  style={{ 
                    width: 160, 
                    height: 160,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                    animation: 'float 3s ease-in-out infinite',
                  }}
                />
              </Box>
              
              {/* Pokemon ID Badge */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  backgroundColor: alpha(theme.palette.background.paper, 0.85),
                  borderRadius: '12px',
                  padding: '3px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  border: `1px solid ${alpha(mainTypeColor, 0.3)}`,
                  zIndex: 2,
                }}
              >
                <CatchingPokemonIcon sx={{ fontSize: 16, color: mainTypeColor }} />
                <Typography 
                  variant="body2" 
                  fontWeight="bold"
                  sx={{ 
                    letterSpacing: 0.5,
                    color: theme.palette.text.primary 
                  }}
                >
                  #{String(pokemon.id).padStart(3, '0')}
                </Typography>
              </Box>
            </Grid>
            
            {/* Pokemon Info Section */}
            <Grid item xs={12} md={7}>
              <Box sx={{ p: 3 }}>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 1,
                  }}
                >
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Typography>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1, 
                    mb: 3 
                  }}
                >
                  {pokemon.types.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      sx={{
                        backgroundColor: getTypeColor(type),
                        color: ['electric', 'normal', 'ground', 'ice', 'fairy'].includes(type.toLowerCase()) 
                          ? 'rgba(0,0,0,0.87)' 
                          : 'white',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                      }}
                    />
                  ))}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {pokemon.height && (
                    <Grid item xs={6}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        Height
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {(pokemon.height / 10).toFixed(1)} m
                      </Typography>
                    </Grid>
                  )}
                  
                  {pokemon.weight && (
                    <Grid item xs={6}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        Weight
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {(pokemon.weight / 10).toFixed(1)} kg
                      </Typography>
                    </Grid>
                  )}
                  
                  {pokemon.abilities && (
                    <Grid item xs={12}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        Abilities
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {pokemon.abilities.join(', ')}
                      </Typography>
                    </Grid>
                  )}
                  
                  {pokemon.stats && pokemon.stats.hp && (
                    <Grid item xs={4}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        HP
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight="medium"
                        sx={{ color: '#FF5959' }}
                      >
                        {pokemon.stats.hp}
                      </Typography>
                    </Grid>
                  )}
                  
                  {pokemon.stats && pokemon.stats.attack && (
                    <Grid item xs={4}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        Attack
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight="medium"
                        sx={{ color: '#F5AC78' }}
                      >
                        {pokemon.stats.attack}
                      </Typography>
                    </Grid>
                  )}
                  
                  {pokemon.stats && pokemon.stats.defense && (
                    <Grid item xs={4}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 0.5 }}
                      >
                        Defense
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight="medium"
                        sx={{ color: '#FAE078' }}
                      >
                        {pokemon.stats.defense}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Add floating keyframes for animation */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </Box>
  );
}

export default PokemonRow;