import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALERT_MESSAGES, getAlertColor, getAlertLabel } from '../utils/notifications';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(() => {
    const alert = ALERT_MESSAGES[Math.floor(Math.random() * ALERT_MESSAGES.length)];
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev.slice(-2), { ...alert, id }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 6000);
  }, []);

  useEffect(() => {
    const initialTimeout = setTimeout(addNotification, 5000);
    const interval = setInterval(addNotification, 12000 + Math.random() * 8000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [addNotification]);

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notif) => {
          const colors = getAlertColor(notif.type);
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="rounded-lg p-3 backdrop-blur-md cursor-pointer"
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}44`,
                boxShadow: `0 0 15px ${colors.border}22`,
              }}
              onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notif.id))}
            >
              <div className="flex items-start gap-2">
                <span className="text-sm mt-0.5">{notif.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        background: `${colors.border}22`,
                        color: colors.text,
                      }}
                    >
                      {getAlertLabel(notif.type)}
                    </span>
                    <span className="text-[9px]" style={{ color: '#555' }}>
                      {new Date().toLocaleTimeString('en-US', { hour12: false })}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: colors.text }}>
                    {notif.message}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
