export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/vecod23' },
    { label: 'X', href: 'https://x.com/cerody7' },
    { label: 'Discord', href: '#' },
    { label: 'Email', href: 'mailto:rodye7@cyrody.com' },
  ];

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Contact', target: 'contact' },
  ];

  const scrollTo = (target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative mt-20 py-8 px-4"
      style={{
        borderTop: '1px solid rgba(0, 255, 156, 0.1)',
        background: 'rgba(5, 5, 5, 0.8)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span style={{ color: '#00ff9c', textShadow: '0 0 10px #00ff9c' }}>◈</span>
            <span className="text-sm font-bold" style={{ color: '#00ff9c' }}>CyberXMjed</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-all duration-200 hover:underline"
                style={{ color: '#666' }}
                onMouseOver={(e) => (e.target.style.color = '#00ff9c')}
                onMouseOut={(e) => (e.target.style.color = '#666')}
              >
                [{link.label}]
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="text-xs cursor-pointer transition-all duration-200"
              style={{ color: '#555', background: 'none', border: 'none' }}
              onMouseOver={(e) => (e.target.style.color = '#00d9ff')}
              onMouseOut={(e) => (e.target.style.color = '#555')}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px]" style={{ color: '#444' }}>
          <span>cyRody © {currentYear} — All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
