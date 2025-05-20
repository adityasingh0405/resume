import { useState } from 'react'
import Hero from './Components/Hero'
import About from './Components/About'
import Projects from './Components/Contact'
import Navbar from './Components/Navbar'

function App() {
  const [page, setPage] = useState('hero')

  const handleSetPage = (newPage) => {
    setPage(newPage)
  }

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      <Navbar setPage={handleSetPage} />
      {page === 'hero' && <Hero />}
      {page === 'about' && <About />}
      {page === 'projects' && <Projects />}
    </div>
  )
}

export default App
