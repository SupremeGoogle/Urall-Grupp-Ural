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
import PrivacyPolicy from './components/PrivacyPolicy'
import { getCachedContent, loadContent } from './data/content'
import type { SiteContent } from './data/content'
import ErrorBoundary from './components/ErrorBoundary'

function MainSite() {
  const [content, setContent] = useState<SiteContent>(getCachedContent())

  useEffect(() => {
    loadContent().then(setContent).catch(console.error)
    const handler = () => loadContent().then(setContent).catch(console.error)
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
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
