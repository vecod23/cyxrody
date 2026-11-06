import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SOCWidgets() {
  const [threatLevel, setThreatLevel] = useState(1);
  const [uptime, setUptime] = useState(99.97);
  const [logs, setLogs] = useState([
    { time: '02:14', msg: 'Auth success - admin', color: '#00ff9c' },
    { time: '02:13', msg: 'Port scan blocked', color: '#ff3b3b' },
    { time: '02:11', msg: 'IDS rule triggered', color: '#ffcc00' },
  ]);
  const [trafficData, setTrafficData] = useState(Array(20).fill(0).map(() => Math.random() * 60 + 20));
  const [isVisible, setIsVisible] = useState(true);

  // Update traffic data
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData((prev) => {
        const next = [...prev.slice(1), Math.random() * 60 + 20];
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Cycle logs
  useEffect(() => {
    const logMessages = [
      { msg: 'Auth success - user01', color: '#00ff9c' },
      { msg: 'Failed login attempt', color: '#ff3b3b' },
      { msg: 'Firewall rule updated', color: '#00d9ff' },
      { msg: 'IDS alert cleared', color: '#00ff9c' },
      { msg: 'New connection: 10.0.0.22', color: '#ffcc00' },
      { msg: 'SSL handshake complete', color: '#00ff9c' },
      { msg: 'Suspicious packet dropped', color: '#ff3b3b' },
      { msg: 'Vulnerability scan queued', color: '#00d9ff' },
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      setLogs((prev) => [{ time, ...randomLog }, ...prev].slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Randomize threat level
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatLevel(Math.floor(Math.random() * 3) + 1);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const threatLabels = ['NONE', 'LOW', 'MODERATE', 'ELEVATED', 'HIGH', 'CRITICAL'];
  const threatColors = ['#00ff9c', '#00ff9c', '#ffcc00', '#ff8800', '#ff3b3b', '#ff0000'];

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded text-xs cursor-pointer transition-all hover-glow"
        style={{
          background: 'rgba(5, 5, 5, 0.9)',
          border: '1px solid rgba(0, 255, 156, 0.3)',
          color: '#00ff9c',
        }}
      >
        SOC ◉
      </button>
    );
  }

  return (
    <div className="fixed right-4 top-20 z-40 w-56 space-y-3 hidden lg:block">
      {/* Minimize button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center cursor-pointer z-50"
        style={{
          background: 'rgba(5, 5, 5, 0.9)',
          border: '1px solid rgba(0, 255, 156, 0.3)',
          color: '#00ff9c',
        }}
      >
        ×
      </button>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-lg p-3"
        style={{ fontSize: '10px' }}
      >
        <div className="font-bold mb-2 pb-1 flex items-center gap-1" style={{ color: '#00ff9c', borderBottom: '1px solid rgba(0,255,156,0.15)' }}>
          <span>◉</span> SYSTEM STATUS
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span style={{ color: '#666' }}>Threat Level</span>
            <span style={{ color: threatColors[threatLevel] }}>
              {'■'.repeat(threatLevel)}{'□'.repeat(5 - threatLevel)} {threatLabels[threatLevel]}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#666' }}>Firewall</span>
            <span style={{ color: '#00ff9c' }}>ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#666' }}>IDS</span>
            <span style={{ color: '#00ff9c' }}>RUNNING</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#666' }}>Uptime</span>
            <span style={{ color: '#00d9ff' }}>{uptime}%</span>
          </div>
        </div>
      </motion.div>

      {/* Network Traffic */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-lg p-3"
        style={{ fontSize: '10px' }}
      >
        <div className="font-bold mb-2 pb-1 flex items-center gap-1" style={{ color: '#00d9ff', borderBottom: '1px solid rgba(0,217,255,0.15)' }}>
          <span>◉</span> NETWORK TRAFFIC
        </div>
        <svg viewBox="0 0 200 50" className="w-full" style={{ height: '40px' }}>
          <polyline
            fill="none"
            stroke="#00d9ff"
            strokeWidth="1.5"
            points={trafficData.map((v, i) => `${i * 10},${50 - v * 0.6}`).join(' ')}
          />
          <polyline
            fill="url(#traffic-gradient)"
            stroke="none"
            points={`0,50 ${trafficData.map((v, i) => `${i * 10},${50 - v * 0.6}`).join(' ')} 190,50`}
          />
          <defs>
            <linearGradient id="traffic-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Security Logs */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-card rounded-lg p-3"
        style={{ fontSize: '10px' }}
      >
        <div className="font-bold mb-2 pb-1 flex items-center gap-1" style={{ color: '#7a5cff', borderBottom: '1px solid rgba(122,92,255,0.15)' }}>
          <span>◉</span> SECURITY LOGS
        </div>
        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {logs.slice(0, 4).map((log, i) => (
              <motion.div
                key={log.time + log.msg + i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                <span style={{ color: '#555' }}>{log.time}</span>
                <span style={{ color: '#444' }}>-</span>
                <span style={{ color: log.color }} className="truncate">{log.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
