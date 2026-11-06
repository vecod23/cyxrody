import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function RadarSweep() {
  return (
    <div className="absolute top-4 right-4 w-20 h-20 md:w-28 md:h-28 opacity-30">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#00ff9c" strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#00ff9c" strokeWidth="0.5" opacity="0.2" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#00ff9c" strokeWidth="0.5" opacity="0.1" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="#00ff9c" strokeWidth="0.3" opacity="0.2" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="#00ff9c" strokeWidth="0.3" opacity="0.2" />
        <line
          x1="50" y1="50" x2="50" y2="5"
          stroke="#00ff9c" strokeWidth="1.5"
          style={{
            transformOrigin: '50px 50px',
            animation: 'radar-sweep 3s linear infinite',
          }}
        />
        <circle cx="65" cy="35" r="2" fill="#00ff9c" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="35" cy="60" r="1.5" fill="#00d9ff" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const profileFields = [
    { label: 'Username', value: 'ocert.elaf', color: '#00ff9c' },
    { label: 'Role', value: 'Cybersecurity Student', color: '#00d9ff' },
    { label: 'Specialization', value: 'Penetration Testing', color: '#7a5cff' },
    { label: 'Status', value: 'ACTIVE', color: '#00ff9c' },
  ];

  const focusAreas = [
    'Digital Forensics',
    'Threat Detection',
    'Network Security',
    'Ethical Hacking',
    'Incident Response',
    'Vulnerability Assessment',
  ];

  return (
    <section id="about" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title" style={{ color: '#00ff9c' }}>
          SYSTEM PROFILE
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div
            className="glass-card rounded-lg p-6 relative overflow-hidden hover-glow transition-all duration-300"
          >
            <RadarSweep />

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  background: 'rgba(0, 255, 156, 0.1)',
                  border: '2px solid rgba(0, 255, 156, 0.3)',
                  color: '#00ff9c',
                  overflow: 'hidden',
                }}
              >
                <img src="/icons/profile.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: '#00ff9c' }}>ocert.elaf</h3>
                <span className="text-xs" style={{ color: '#666' }}>ID: CXM-2026-SEC</span>
              </div>
            </div>

            <div className="space-y-3">
              {profileFields.map((field, i) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span style={{ color: '#666', minWidth: '120px' }}>{field.label}:</span>
                  <span style={{ color: field.color }}>{field.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative corner */}
            <div className="absolute bottom-0 left-0 w-16 h-16 opacity-20"
              style={{
                borderLeft: '2px solid #00ff9c',
                borderBottom: '2px solid #00ff9c',
              }}
            />
          </div>

          {/* Bio & Focus Areas */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-lg p-6 hover-glow transition-all duration-300"
            >
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#00d9ff' }}>
                <span style={{ color: '#666' }}>$</span> cat biography.txt
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#999' }}>
                Passionate cybersecurity student focused on penetration testing and ethical hacking.
                Currently studying network security, digital forensics, and incident response.
                Dedicated to building a career in cybersecurity through hands-on learning,
                CTF competitions, and real-world security projects. Always exploring new attack
                vectors and defense mechanisms to stay ahead in the ever-evolving threat landscape.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-lg p-6 hover-glow transition-all duration-300"
            >
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: '#00d9ff' }}>
                <span style={{ color: '#666' }}>$</span> ls focus_areas/
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {focusAreas.map((area, i) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.08 + 0.7 }}
                    className="flex items-center gap-2 text-xs px-3 py-2 rounded"
                    style={{
                      background: 'rgba(0, 255, 156, 0.05)',
                      border: '1px solid rgba(0, 255, 156, 0.15)',
                      color: '#00ff9c',
                    }}
                  >
                    <span style={{ color: '#666' }}>├──</span>
                    {area}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
