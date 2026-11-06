import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import CyberBackground from './components/CyberBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';

import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SOCWidgets from './components/SOCWidgets';
import Notifications from './components/Notifications';
import AttackMap from './components/AttackMap';
import MatrixOverlay from './components/MatrixOverlay';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [showAttackMap, setShowAttackMap] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  const handleTerminalAction = useCallback((action) => {
    switch (action) {
      case 'scrollToContact': {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'attackmap':
        setShowAttackMap(true);
        break;
      case 'matrix':
        setShowMatrix(true);
        break;
      default:
        break;
    }
  }, []);

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="relative min-h-screen scanline-overlay" style={{ background: '#050505' }}>
      <CyberBackground />
      <Navbar />
      <SOCWidgets />
      <Notifications />

      <main className="relative z-10">
        <HeroSection onTerminalAction={handleTerminalAction} />
        <AboutSection />
        <SkillsSection />

        <ContactSection />
      </main>

      <Footer />

      <AnimatePresence>
        {showAttackMap && (
          <AttackMap onClose={() => setShowAttackMap(false)} />
        )}
        {showMatrix && (
          <MatrixOverlay onClose={() => setShowMatrix(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
