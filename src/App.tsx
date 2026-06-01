import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import About from './components/About'
import Portfolio from './components/Portfolio'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import AdminPanel from './admin/AdminPanel'
import { getContent } from './data/content'
import type { SiteContent } from './data/content'

function MainSite() {
  const [content, setContent] = useState<SiteContent>(getContent())

  // Re-read content if admin made changes
  useEffect(() => {
    const handler = () => setContent(getContent())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <Header content={content} />
      <main>
        <Hero content={content} />
        <Services content={content} />
        <Stats content={content} />
        <About content={content} />
        <Portfolio content={content} />
        <ContactForm content={content} />
      </main>
      <Footer content={content} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}
