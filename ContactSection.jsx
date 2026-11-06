import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email required';
    if (!formData.subject.trim()) errs.subject = 'Subject required';
    if (!formData.message.trim()) errs.message = 'Message required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const inputStyle = (field) => ({
    background: 'rgba(5, 5, 5, 0.8)',
    border: `1px solid ${errors[field] ? '#ff3b3b' : 'rgba(0, 255, 156, 0.2)'}`,
    color: '#c0c0c0',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    outline: 'none',
    transition: 'all 0.3s ease',
  });

  return (
    <section id="contact" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title" style={{ color: '#00ff9c' }}>
          SECURE CHANNEL
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-6 pb-3" style={{ borderBottom: '1px solid rgba(0, 255, 156, 0.15)' }}>
              <span style={{ color: '#666' }}>$</span>
              <span className="text-sm" style={{ color: '#00d9ff' }}>init secure_message.sh</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="text-4xl mb-4">✓</div>
                <p className="text-sm mb-2" style={{ color: '#00ff9c' }}>
                  [✓] Message encrypted and transmitted securely.
                </p>
                <p className="text-xs" style={{ color: '#666' }}>
                  CyberXRody will respond soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field}>
                    <label className="text-xs mb-1 block" style={{ color: '#666' }}>
                      {`> ${field.toUpperCase()}:`}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="w-full px-3 py-2 rounded focus:border-green-400 focus:shadow-[0_0_10px_rgba(0,255,156,0.2)]"
                      style={inputStyle(field)}
                      placeholder={`Enter ${field}...`}
                    />
                    {errors[field] && (
                      <span className="text-[10px] mt-1 block" style={{ color: '#ff3b3b' }}>
                        [ERROR] {errors[field]}
                      </span>
                    )}
                  </div>
                ))}
                <div>
                  <label className="text-xs mb-1 block" style={{ color: '#666' }}>
                    {'> MESSAGE:'}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded resize-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(0,255,156,0.2)]"
                    style={inputStyle('message')}
                    placeholder="Enter message..."
                  />
                  {errors.message && (
                    <span className="text-[10px] mt-1 block" style={{ color: '#ff3b3b' }}>
                      [ERROR] {errors.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded text-sm font-bold cursor-pointer transition-all duration-300 hover-glow"
                  style={{
                    background: 'rgba(0, 255, 156, 0.1)',
                    border: '1px solid rgba(0, 255, 156, 0.3)',
                    color: '#00ff9c',
                  }}
                >
                  {'> TRANSMIT MESSAGE'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="glass-card rounded-lg p-6 hover-glow transition-all duration-300">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: '#00d9ff' }}>
                <span style={{ color: '#666' }}>$</span> cat secure_channels.txt
              </h3>
              <div className="space-y-4">
                {[
                  { platform: 'X', value: 'x.com/cyberxRody', href: 'https://x.com/cerody7',
                    icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { platform: 'GitHub', value: 'github.com/cyberxRody', href: 'https://github.com/vecod23',
                    icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
                  { platform: 'Discord', value: 'ocert.elaf', href: '#',
                    icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg> },
                  { platform: 'Email', value: 'rodye7@cyrody.com', href: 'mailto:rodye7@cyrody.com',
                    icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z"/></svg> },
                ].map((link, i) => (
                  <motion.a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.6 }}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group"
                    style={{
                      background: 'rgba(0, 255, 156, 0.03)',
                      border: '1px solid rgba(0, 255, 156, 0.1)',
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded flex items-center justify-center text-sm group-hover:shadow-[0_0_12px_rgba(0,255,156,0.4)] transition-all"
                      style={{
                        background: 'rgba(0, 255, 156, 0.1)',
                        border: '1px solid rgba(0, 255, 156, 0.2)',
                        color: '#00ff9c',
                      }}
                    >
                      {link.icon}
                    </span>
                    <div>
                      <div className="text-xs" style={{ color: '#666' }}>{link.platform}</div>
                      <div className="text-sm group-hover:underline" style={{ color: '#00ff9c' }}>{link.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Encryption info */}
            <div className="glass-card rounded-lg p-4" style={{ borderColor: 'rgba(122, 92, 255, 0.2)' }}>
              <div className="flex items-center gap-2 text-xs" style={{ color: '#7a5cff' }}>
                <span>🔒</span>
                <span>All communications are end-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-xs mt-2" style={{ color: '#555' }}>
                <span>🔑</span>
                <span>PGP Key available upon request</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
