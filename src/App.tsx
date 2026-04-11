import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { theme } from './theme'
import { WelcomeScreen } from './components/WelcomeScreen'
import { PoematonProvider } from './context/PoematonContext'
import { PoematonSectionList } from './components/PoematonSectionList'
import { enterFullscreen } from './utils/fullscreen'

const retroBackground = `
  linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)),
  repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(207,193,64,0.15) 39px, rgba(207,193,64,0.15) 40px),
  repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(207,193,64,0.15) 39px, rgba(207,193,64,0.15) 40px)
`

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
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          background: retroBackground,
          backgroundColor: '#0a0a0a',
          overflow: 'auto',
        }}
      >
        {/* Welcome Screen */}
        <WelcomeScreen open={showWelcome} onStart={handleStart} />

        {/* Main Application */}
        {!showWelcome && (
          <PoematonProvider authorName={authorName}>
            <PoematonSectionList />
          </PoematonProvider>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App
