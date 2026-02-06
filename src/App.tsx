import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { theme } from './theme'
import { WelcomeScreen } from './components/WelcomeScreen'
import { enterFullscreen } from './utils/fullscreen'
import backgroundImage from '/background.portada.png'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)

  const handleStart = () => {
    // Enter fullscreen mode
    enterFullscreen()

    // Fade out welcome screen after a short delay
    setTimeout(() => {
      setShowWelcome(false)
      // TODO: Start countdown timer
      // TODO: Begin background music playback
    }, 500)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          background: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'auto',
        }}
      >
        {/* Welcome Screen */}
        <WelcomeScreen open={showWelcome} onStart={handleStart} />

        {/* Main Application - TODO */}
        {!showWelcome && (
          <Box sx={{ padding: 4, color: '#fff' }}>
            <h1>Main Application</h1>
            <p>TODO: Implement main interface</p>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App
