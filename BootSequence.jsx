import { useState, useEffect, useRef } from 'react';

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const BOOT_LINES = [
  { text: '[SYSTEM] Initializing CyberXMjed Security Console...', delay: 800 },
  { text: '[BOOT] Loading kernel modules...', delay: 600 },
  { text: '[OK] Kernel modules loaded successfully', delay: 400 },
  { text: '[SYSTEM] Loading penetration testing modules...', delay: 700 },
  { text: '[OK] Nmap engine initialized', delay: 300 },
  { text: '[OK] Metasploit framework loaded', delay: 300 },
  { text: '[OK] Wireshark capture ready', delay: 300 },
  { text: '[SYSTEM] Connecting to secure node...', delay: 900 },
  { text: '[CRYPTO] Establishing encrypted tunnel...', delay: 600 },
  { text: '[OK] Secure connection established', delay: 400 },
  { text: '[AUTH] Authenticating user...', delay: 800 },
  { text: '[OK] Identity verified: CyberXMjed', delay: 500 },
  { text: '', delay: 300 },
  { text: '═══════════════════════════════════════════', delay: 200 },
  { text: '          ACCESS GRANTED', delay: 600 },
  { text: '═══════════════════════════════════════════', delay: 200 },
];

function MatrixRain({ width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#00ff9c';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx.globalAlpha = 1;

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
}

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [showMatrix, setShowMatrix] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let currentLine = 0;
    let totalDelay = 0;

    const timeouts = BOOT_LINES.map((line, i) => {
      totalDelay += line.delay;
      return setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
        setProgress(((i + 1) / BOOT_LINES.length) * 100);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => onComplete(), 1200);
        }
      }, totalDelay);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      background: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <MatrixRain width={dimensions.width} height={dimensions.height} />
      
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '700px',
        width: '90%',
        padding: '32px',
        background: 'rgba(5, 5, 5, 0.9)',
        border: '1px solid rgba(0, 255, 156, 0.3)',
        borderRadius: '8px',
        boxShadow: '0 0 40px rgba(0, 255, 156, 0.15)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(0, 255, 156, 0.2)',
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff3b3b' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffcc00' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00ff9c' }} />
          <span style={{ color: '#666', fontSize: '12px', marginLeft: '8px' }}>boot_sequence.sh</span>
        </div>

        <div style={{ minHeight: '320px', fontSize: '13px', lineHeight: '1.8' }}>
          {lines.map((line, i) => (
            <div key={i} style={{
              color: line.includes('[OK]') ? '#00ff9c' :
                     line.includes('ACCESS GRANTED') ? '#00ff9c' :
                     line.includes('═') ? '#00ff9c' :
                     line.includes('[SYSTEM]') ? '#00d9ff' :
                     line.includes('[AUTH]') ? '#7a5cff' :
                     line.includes('[CRYPTO]') ? '#7a5cff' :
                     line.includes('[BOOT]') ? '#ffcc00' :
                     '#c0c0c0',
              textShadow: line.includes('ACCESS GRANTED') ? '0 0 10px #00ff9c, 0 0 20px #00ff9c' : 'none',
              fontSize: line.includes('ACCESS GRANTED') ? '18px' : '13px',
              fontWeight: line.includes('ACCESS GRANTED') ? '700' : '400',
              textAlign: line.includes('ACCESS GRANTED') || line.includes('═') ? 'center' : 'left',
              opacity: 0,
              animation: 'fadeInUp 0.3s ease forwards',
            }}>
              {line}
            </div>
          ))}
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '16px',
            background: '#00ff9c',
            animation: 'blink 1s step-end infinite',
            marginLeft: '4px',
          }} />
        </div>

        <div style={{ marginTop: '16px' }}>
          <div style={{
            height: '3px',
            background: 'rgba(0, 255, 156, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00ff9c, #00d9ff)',
              borderRadius: '2px',
              transition: 'width 0.3s ease',
              boxShadow: '0 0 10px #00ff9c',
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '6px',
            fontSize: '10px',
            color: '#666',
          }}>
            <span>BOOT PROGRESS</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
