import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', target: 'hero' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Contact', target: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map((l) => l.target);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5, 5, 5, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0, 255, 156, 0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="text-sm font-bold cursor-pointer flex items-center gap-2"
            style={{ color: '#00ff9c', background: 'none', border: 'none' }}
          >
            <span className="text-base" style={{ textShadow: '0 0 10px #00ff9c' }}>◈</span>
            <span className="neon-text">cyRody7</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="px-3 py-1.5 text-xs rounded transition-all duration-200 cursor-pointer"
                style={{
                  color: activeSection === link.target ? '#00ff9c' : '#666',
                  background: activeSection === link.target ? 'rgba(0, 255, 156, 0.08)' : 'transparent',
                  border: 'none',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-sm cursor-pointer"
            style={{ color: '#00ff9c', background: 'none', border: 'none' }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t"
            style={{
              background: 'rgba(5, 5, 5, 0.95)',
              borderColor: 'rgba(0, 255, 156, 0.1)',
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="block w-full text-left px-6 py-3 text-xs cursor-pointer transition-colors"
                style={{
                  color: activeSection === link.target ? '#00ff9c' : '#666',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                }}
              >
                {'> '}{link.label}
              </button>
            ))}
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
