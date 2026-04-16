import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { theme } from './theme'
import { WelcomeScreen } from './components/WelcomeScreen'
import { PoematonProvider } from './context/PoematonContext'
import { PoematonSectionList } from './components/PoematonSectionList'
import { RetroBackground } from './components/RetroBackground'
import { Gallery } from './components/Gallery'
import { PoemView } from './components/PoemView'
import { enterFullscreen } from './utils/fullscreen'

function MainApp() {
  const [showWelcome, setShowWelcome] = useState(true)

  const handleStart = () => {
    enterFullscreen()

    setTimeout(() => {
      setShowWelcome(false)
    }, 500)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!showWelcome && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            zIndex: 9999,
            cursor: 'none',
          }}
        />
      )}
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <RetroBackground>
          <WelcomeScreen open={showWelcome} onStart={handleStart} />

          {!showWelcome && (
            <PoematonProvider>
              <PoematonSectionList />
            </PoematonProvider>
          )}
        </RetroBackground>
      </Box>
    </ThemeProvider>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<PoemView />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
