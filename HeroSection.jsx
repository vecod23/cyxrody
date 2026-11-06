import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Terminal from './Terminal';

const TITLES = [
  'Cybersecurity Student',
  'Penetration Testing Enthusiast',
  'Ethical Hacker in Training',
  'Digital Forensics Learner',
];

export default function HeroSection({ onTerminalAction }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = TITLES[titleIndex];
    let timeout;

    if (!isDeleting && displayText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length - 1));
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      {/* Glowing title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1
          className="text-5xl md:text-7xl font-bold mb-4 neon-text"
          style={{ color: '#00ff9c', letterSpacing: '4px' }}
        >
          CyberXMjed
        </h1>

        <div className="text-lg md:text-xl h-8 flex items-center justify-center gap-1" style={{ color: '#00d9ff' }}>
          <span style={{ color: '#666' }}>&gt;</span>
          <span>{displayText}</span>
          <span
            className="terminal-cursor inline-block w-2 ml-1"
            style={{
              height: '20px',
              background: '#00d9ff',
            }}
          />
        </div>
      </motion.div>


      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full max-w-4xl"
      >
        <Terminal onAction={onTerminalAction} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs" style={{ color: '#666' }}>SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: '#00ff9c', fontSize: '18px' }}
        >
          ▼
        </motion.div>
      </motion.div>
    </section>
  );
}
