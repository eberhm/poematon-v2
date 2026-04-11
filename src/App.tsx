import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { theme } from './theme'
import { WelcomeScreen } from './components/WelcomeScreen'
import { PoematonProvider } from './context/PoematonContext'
import { PoematonSectionList } from './components/PoematonSectionList'
import { RetroBackground } from './components/RetroBackground'
import { enterFullscreen } from './utils/fullscreen'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [authorName, setAuthorName] = useState('')

  const handleStart = (name: string) => {
    setAuthorName(name)
    enterFullscreen()

    setTimeout(() => {
      setShowWelcome(false)
    }, 500)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Top overlay to suppress fullscreen exit hint on hover */}
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
          {/* Welcome Screen */}
          <WelcomeScreen open={showWelcome} onStart={handleStart} />

          {/* Main Application */}
          {!showWelcome && (
            <PoematonProvider authorName={authorName}>
              <PoematonSectionList />
            </PoematonProvider>
          )}
        </RetroBackground>
      </Box>
    </ThemeProvider>
  )
}

export default App
