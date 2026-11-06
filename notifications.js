export const ALERT_MESSAGES = [
  { type: 'alert', message: 'Suspicious login attempt detected — 203.0.113.45', icon: '⚠' },
  { type: 'info', message: 'Threat database updated — 1,337 new signatures loaded', icon: 'ℹ' },
  { type: 'scan', message: 'Network monitoring active — 0 anomalies', icon: '◉' },
  { type: 'warn', message: 'Port scan detected from 198.51.100.22', icon: '⚡' },
  { type: 'alert', message: 'Brute force attempt blocked — 10.0.0.55', icon: '⚠' },
  { type: 'info', message: 'Firewall rules updated — 42 new rules applied', icon: 'ℹ' },
  { type: 'scan', message: 'Intrusion detection scan complete — clean', icon: '◉' },
  { type: 'warn', message: 'Unusual outbound traffic detected — port 4444', icon: '⚡' },
  { type: 'info', message: 'SSL certificate renewed — valid for 365 days', icon: 'ℹ' },
  { type: 'alert', message: 'Multiple failed SSH attempts — 192.168.1.100', icon: '⚠' },
  { type: 'scan', message: 'Vulnerability scan scheduled — next: 03:00 UTC', icon: '◉' },
  { type: 'warn', message: 'Deprecated TLS version detected on port 8443', icon: '⚡' },
  { type: 'info', message: 'System backup completed — integrity verified', icon: 'ℹ' },
  { type: 'alert', message: 'DDoS mitigation activated — traffic filtered', icon: '⚠' },
];

export const getAlertColor = (type) => {
  switch (type) {
    case 'alert': return { bg: 'rgba(255, 59, 59, 0.1)', border: '#ff3b3b', text: '#ff3b3b' };
    case 'info': return { bg: 'rgba(0, 217, 255, 0.1)', border: '#00d9ff', text: '#00d9ff' };
    case 'scan': return { bg: 'rgba(0, 255, 156, 0.1)', border: '#00ff9c', text: '#00ff9c' };
    case 'warn': return { bg: 'rgba(255, 204, 0, 0.1)', border: '#ffcc00', text: '#ffcc00' };
    default: return { bg: 'rgba(0, 255, 156, 0.1)', border: '#00ff9c', text: '#00ff9c' };
  }
};

export const getAlertLabel = (type) => {
  switch (type) {
    case 'alert': return 'ALERT';
    case 'info': return 'INFO';
    case 'scan': return 'SCAN';
    case 'warn': return 'WARN';
    default: return 'INFO';
  }
};
