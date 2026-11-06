import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

export default function MatrixOverlay({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const brightness = Math.random();
        
        if (brightness > 0.95) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 156, ${brightness * 0.8 + 0.2})`;
          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        }
        
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);

    const handleKeyDown = () => onClose();
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] cursor-pointer"
      style={{ background: '#050505' }}
      onClick={onClose}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs px-4 py-2 rounded"
        style={{
          background: 'rgba(5, 5, 5, 0.8)',
          border: '1px solid rgba(0, 255, 156, 0.3)',
          color: '#00ff9c',
        }}
      >
        Press any key or click to return
      </div>
    </motion.div>
  );
}
