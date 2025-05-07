import { useEffect, useRef, useState } from 'react'
import Hero from './Components/Hero'
import About from './Components/About'
import Projects from './Components/Contact'
import Navbar from './Components/Navbar'

import flickerSound from './assets/flicker.mp3'

function App() {
  const [page, setPage] = useState('hero')
  const flickerAudio = useRef(null)

  useEffect(() => {
    // Initialize the audio object once
    flickerAudio.current = new Audio(flickerSound)
    flickerAudio.current.loop = true // Optional: loop sound
  }, [])

  const handleSetPage = (newPage) => {
    if (flickerAudio.current) {
      flickerAudio.current.currentTime = 0
      flickerAudio.current.play().catch((err) => {
        console.log("User interaction required to play audio:", err)
      })
    }

    setPage(newPage)
  }

  return (
    <div
      className="bg-black min-h-screen text-white overflow-hidden"
      onClick={() => {
        // Ensure playback allowed after first user interaction
        if (flickerAudio.current) {
          // flickerAudio.current.play().catch(() => {})
        }
      }}
    >
      <Navbar setPage={handleSetPage} />
      {page === 'hero' && <Hero />}
      {page === 'about' && <About />}
      {page === 'projects' && <Projects />}
    </div>
  )
}

export default App
