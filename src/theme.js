import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    typography: {
        fontFamily: 'PokemonPixel, monospace',
        fontSize: 18, 
        h1: { fontSize: '2.5rem' },
        h2: { fontSize: '2rem' },
        body1: { fontSize: '1.125rem' }, 
        button: { fontSize: '1rem' }
    },
});

export default theme;
