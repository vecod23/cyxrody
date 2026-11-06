import { useState, useCallback, useRef } from 'react';
import {
  COMMANDS,
  EASTER_EGGS,
  SCAN_SIMULATION,
  PENTEST_SIMULATION,
  PROJECT_DETAILS,
  ALL_COMMANDS,
} from '../utils/terminalCommands';

const INITIAL_OUTPUT = [
  { text: '  Welcome to CyRody Security Console v2.0', type: 'system' },
  { text: '  Type "help" to see available commands.', type: 'system' },
  { text: '', type: 'normal' },
];

export function useTerminal({ onAction }) {
  const [history, setHistory] = useState(INITIAL_OUTPUT);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const processingRef = useRef(false);

  const addOutput = useCallback((lines) => {
    setHistory((prev) => [
      ...prev,
      ...lines.map((text) => ({ text, type: 'normal' })),
    ]);
  }, []);

  const addLine = useCallback((text, type = 'normal') => {
    setHistory((prev) => [...prev, { text, type }]);
  }, []);

  const simulateTyping = useCallback(async (lines) => {
    processingRef.current = true;
    setIsProcessing(true);
    for (const line of lines) {
      if (!processingRef.current) break;
      await new Promise((r) => setTimeout(r, line.delay || 100));
      setHistory((prev) => [...prev, { text: line.text, type: 'normal' }]);
    }
    setIsProcessing(false);
    processingRef.current = false;
  }, []);

  const handleTabComplete = useCallback(() => {
    if (!inputValue.trim()) return;
    const matches = ALL_COMMANDS.filter((cmd) =>
      cmd.startsWith(inputValue.toLowerCase())
    );
    if (matches.length === 1) {
      setInputValue(matches[0]);
      setSuggestions([]);
    } else if (matches.length > 1) {
      setSuggestions(matches);
    }
  }, [inputValue]);

  const processCommand = useCallback(
    async (rawInput) => {
      const input = rawInput.trim().toLowerCase();
      if (!input) return;

      setCommandHistory((prev) => [...prev, rawInput]);
      setHistoryIndex(-1);
      addLine(`  CyRody@security-console:~$ ${rawInput}`, 'command');
      setSuggestions([]);

      // Easter eggs
      if (EASTER_EGGS[input]) {
        addOutput(EASTER_EGGS[input]);
        return;
      }

      // Scan command
      if (input.startsWith('scan ')) {
        const ip = input.replace('scan ', '').trim();
        if (!ip || !/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) {
          addLine('  Usage: scan [ip]  (e.g., scan 192.168.1.1)', 'error');
          return;
        }
        await simulateTyping(SCAN_SIMULATION(ip));
        return;
      }

      // Start pentest
      if (input === 'start pentest') {
        await simulateTyping(PENTEST_SIMULATION);
        return;
      }

      // Open project
      if (input.startsWith('open ')) {
        const num = parseInt(input.replace('open ', ''), 10);
        if (PROJECT_DETAILS[num]) {
          addOutput(PROJECT_DETAILS[num]);
        } else {
          addLine('  Project not found. Type "projects" to see available projects.', 'error');
        }
        return;
      }

      // Standard commands
      if (COMMANDS[input]) {
        const cmd = COMMANDS[input];
        if (cmd.action === 'clear') {
          setHistory(INITIAL_OUTPUT);
          return;
        }
        if (cmd.output) {
          addOutput(cmd.output);
        }
        if (cmd.action && onAction) {
          onAction(cmd.action);
        }
        return;
      }

      // Unknown command
      addLine(`  Command not found: ${rawInput}`, 'error');
      addLine('  Type "help" for available commands.', 'system');
    },
    [addLine, addOutput, simulateTyping, onAction]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (isProcessing) return;

      if (e.key === 'Tab') {
        e.preventDefault();
        handleTabComplete();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputValue('');
        } else {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        processCommand(inputValue);
        setInputValue('');
      }
    },
    [
      inputValue,
      commandHistory,
      historyIndex,
      isProcessing,
      processCommand,
      handleTabComplete,
    ]
  );

  return {
    history,
    inputValue,
    setInputValue,
    handleKeyDown,
    isProcessing,
    suggestions,
    setSuggestions,
  };
}
