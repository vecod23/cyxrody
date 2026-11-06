import { useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';

export default function Terminal({ onAction }) {
  const {
    history,
    inputValue,
    setInputValue,
    handleKeyDown,
    isProcessing,
    suggestions,
    setSuggestions,
  } = useTerminal({ onAction });

  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="terminal-window w-full max-w-4xl mx-auto" onClick={focusInput}>
      {/* Header */}
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: '#ff3b3b' }} />
        <div className="terminal-dot" style={{ background: '#ffcc00' }} />
        <div className="terminal-dot" style={{ background: '#00ff9c' }} />
        <span className="ml-3 text-xs" style={{ color: '#666' }}>
          cyRody7@security-console — bash
        </span>
        <div className="ml-auto flex items-center gap-2 text-xs" style={{ color: '#00ff9c' }}>
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          SECURE
        </div>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="terminal-body" style={{ maxHeight: '450px' }}>
        {history.map((line, i) => (
          <div
            key={i}
            style={{
              color:
                line.type === 'command' ? '#00d9ff' :
                line.type === 'error' ? '#ff3b3b' :
                line.type === 'system' ? '#7a5cff' :
                '#c0c0c0',
              whiteSpace: 'pre',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
            }}
          >
            {line.text}
          </div>
        ))}

        {/* Input line */}
        {!isProcessing && (
          <div className="flex items-center mt-1" style={{ whiteSpace: 'pre', fontSize: '13px' }}>
            <span style={{ color: '#00ff9c' }}>cyRody7</span>
            <span style={{ color: '#666' }}>@</span>
            <span style={{ color: '#00d9ff' }}>security-console</span>
            <span style={{ color: '#666' }}>:~$ </span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setSuggestions([]);
                }}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                className="bg-transparent border-none outline-none w-full"
                style={{
                  color: '#c0c0c0',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  caretColor: '#00ff9c',
                }}
              />
            </div>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 1 && (
          <div className="mt-1 flex flex-wrap gap-3" style={{ fontSize: '12px' }}>
            {suggestions.map((s, i) => (
              <span key={i} style={{ color: '#00ff9c' }}>{s}</span>
            ))}
          </div>
        )}

        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex items-center gap-2 mt-1" style={{ color: '#666', fontSize: '12px' }}>
            <span className="inline-block animate-spin" style={{ fontSize: '10px' }}>◌</span>
            Processing...
          </div>
        )}
      </div>
    </div>
  );
}
