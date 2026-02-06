import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#cfc140', // Yellow/gold accent
    },
    background: {
      default: '#000', // Black background
      paper: '#333', // Dark gray for containers
    },
    text: {
      primary: '#fff', // White text
      secondary: '#999', // Gray text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '80px',
      fontWeight: 700,
    },
  },
})
