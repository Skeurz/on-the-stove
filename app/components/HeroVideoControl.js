'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroVideoControl() {
  const [playing, setPlaying] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current = document.querySelector('.hero-bg-video')
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (playing) {
      video.pause()
    } else {
      video.play()
    }
    setPlaying(!playing)
  }

  return (
    <button
  onClick={toggle}
  aria-label={playing ? 'Pause video' : 'Play video'}
  style={{
    position: 'absolute',
    bottom: '1.5rem',
    left: '1.5rem',
    zIndex: 4,
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  }}
>
  {playing ? (
    // Pause icon
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <rect x="5" y="3" width="4" height="18" rx="1" />
      <rect x="15" y="3" width="4" height="18" rx="1" />
    </svg>
  ) : (
    // Play icon
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  )}
</button>
  )
}