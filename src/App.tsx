import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { theme } from './theme'
import { WelcomeScreen } from './components/WelcomeScreen'
import { PoematonProvider } from './context/PoematonContext'
import { PoematonSectionList } from './components/PoematonSectionList'
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
      // Timer and music are started by PoematonSectionList
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

        {/* Main Application */}
        {!showWelcome && (
          <PoematonProvider>
            <PoematonSectionList />
          </PoematonProvider>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App
