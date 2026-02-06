export function enterFullscreen(): void {
  const elem = document.documentElement

  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch((err) => {
      console.warn('Failed to enter fullscreen mode:', err)
    })
  }
}

export function exitFullscreen(): void {
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch((err) => {
      console.warn('Failed to exit fullscreen mode:', err)
    })
  }
}

export function isFullscreen(): boolean {
  return document.fullscreenElement !== null
}
