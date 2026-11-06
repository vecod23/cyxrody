import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SKILL_CATEGORIES = [
  {
    title: 'CYBERSECURITY',
    icon: '🛡️',
    color: '#00ff9c',
    skills: [
      { name: 'Penetration Testing', level: 80 },
      { name: 'Network Security', level: 70 },
      { name: 'Vulnerability Assessment', level: 80 },
      { name: 'Digital Forensics', level: 60 },
      { name: 'Incident Response', level: 70 },
    ],
  },
  {
    title: 'PROGRAMMING',
    icon: '⌨️',
    color: '#00d9ff',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'C++', level: 65 },
      { name: 'Bash', level: 80 },
    ],
  },
];

const TOOLS = [
  { name: 'Nmap', iconSrc: '/icons/nmap.png' },
  { name: 'Wireshark', iconSrc: '/icons/wireshark.png' },
  { name: 'Burp Suite', iconSrc: '/icons/burpsuite.png' },
  { name: 'Metasploit', iconSrc: '/icons/metasploit.png' },
  { name: 'Wazuh', iconSrc: '/icons/wazuh.png' },
  { name: 'Volatility', iconSrc: '/icons/volatility.png' },
  { name: 'Prodiscover', iconSrc: '/icons/prodiscover.png' },
  { name: 'Autopsy', iconSrc: '/icons/autopsy.png' },
  { name: 'OSForensics', iconSrc: '/icons/osforensics.png' },
  { name: 'FTK Imager', iconSrc: '/icons/ftkimager.png' },
  { name: 'Hex Workshop', iconSrc: '/icons/hexworkshop.png' },
  { name: 'WinHex', iconSrc: '/icons/winhex.png' },
  { name: 'Hydra', iconSrc: '/icons/hydra.png' },
  { name: 'John the Ripper', iconSrc: '/icons/john.png' },
];

function SkillBar({ name, level, color, delay, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay }}
      className="mb-3"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs" style={{ color: '#c0c0c0' }}>{name}</span>
        <span className="text-xs" style={{ color }}>{level}%</span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 10px ${color}44`,
          }}
        >
          <div
            className="absolute right-0 top-0 h-full w-1 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title" style={{ color: '#00ff9c' }}>
          SECURITY TOOLKIT
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.2 + 0.2 }}
              className="glass-card rounded-lg p-6 hover-glow transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: `1px solid ${cat.color}22` }}>
                <span className="text-xl">{cat.icon}</span>
                <h3 className="text-sm font-bold" style={{ color: cat.color }}>{cat.title}</h3>
                <div className="ml-auto text-xs px-2 py-0.5 rounded" style={{
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}33`,
                  color: cat.color,
                }}>
                  {cat.skills.length} modules
                </div>
              </div>

              {cat.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={ci * 0.2 + i * 0.1 + 0.3}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="glass-card rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(122, 92, 255, 0.2)' }}>
            <span className="text-xl">🔧</span>
            <h3 className="text-sm font-bold" style={{ color: '#7a5cff' }}>SECURITY TOOLS</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.08 + 1 }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 0 20px rgba(122, 92, 255, 0.4)',
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg cursor-default transition-all duration-300"
                style={{
                  background: 'rgba(122, 92, 255, 0.05)',
                  border: '1px solid rgba(122, 92, 255, 0.15)',
                }}
              >
                <img src={tool.iconSrc} alt={tool.name} className="w-10 h-10 object-contain mb-1 drop-shadow-[0_0_8px_rgba(122,92,255,0.4)]" />
                <span className="text-xs text-center" style={{ color: '#c0c0c0' }}>{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
