import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroV2 from './components/HeroV2'
import AdvantagesTriple from './components/AdvantagesTriple'
import PromoBanner from './components/PromoBanner'
import Services from './components/Services'
import GalleryGrid from './components/GalleryGrid'
import VideoSection from './components/VideoSection'
import SocialCTA from './components/SocialCTA'
import PriceTable from './components/PriceTable'
import Calculator from './components/Calculator'
import About from './components/About'
import Production from './components/Production'
import KeyAdvantages from './components/KeyAdvantages'
import Guarantees from './components/Guarantees'
import FiveAdvantages from './components/FiveAdvantages'
import FAQ from './components/FAQ'
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
        {/* 1. Hero */}
        <HeroV2 content={content} />
        {/* 2. Три преимущества */}
        <AdvantagesTriple content={content} />
        {/* 3. Акция */}
        <PromoBanner content={content} />
        {/* 4. Услуги */}
        <section id="services">
          <Services content={content} />
        </section>
        {/* 5. Галерея */}
        <GalleryGrid content={content} />
        {/* 6. Видео */}
        <VideoSection content={content} />
        {/* 7. Соцсети */}
        <SocialCTA content={content} />
        {/* 8. Прайс */}
        <PriceTable content={content} />
        {/* 9. Калькулятор */}
        <Calculator content={content} />
        {/* 10. О компании */}
        <About content={content} />
        {/* 11. Производство */}
        <Production content={content} />
        {/* 12. Ключевые преимущества */}
        <KeyAdvantages content={content} />
        {/* 13. Гарантии */}
        <Guarantees content={content} />
        {/* 14. Ещё 5 преимуществ */}
        <FiveAdvantages content={content} />
        {/* 15. FAQ */}
        <section id="faq">
          <FAQ content={content} />
        </section>
        {/* 16. Контакты */}
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
