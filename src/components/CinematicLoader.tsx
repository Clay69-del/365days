/// <reference types="node" />
import { useState, useEffect } from 'react';
import './CinematicLoader.css';

interface CinematicLoaderProps {
  onComplete: () => void;
  progressDuration?: number;
  holdAtFullDuration?: number;
}

export const CinematicLoader = ({ 
  onComplete,
  progressDuration = 3000,
  holdAtFullDuration = 500,
}: CinematicLoaderProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const [percent, setPercent] = useState(0);
  const [lines, setLines] = useState<{text: string, tone?: 'white' | 'lav' | 'blue'}[]>([]);

  // Calculate step size based on desired duration
  const totalSteps = progressDuration / 30;
  const stepSize = 100 / totalSteps;

  // Terminal-like typing effect
  useEffect(() => {
    const initialLines = [
      { text: '> Booting Anniversary Experience v1.0.0', tone: 'white' as const },
      { text: '> Initializing core memories...', tone: 'white' as const },
      { text: '> Loading shared moments...', tone: 'white' as const },
      { text: '> Preparing love metrics...', tone: 'white' as const },
    ];

    let currentLine = 0;
    let currentChar = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentLine >= initialLines.length) return;
      
      const currentText = initialLines[currentLine].text;
      
      if (currentChar < currentText.length) {
        setLines(prev => {
          const newLines = [...prev];
          if (!newLines[currentLine]) {
            newLines[currentLine] = { text: '', tone: initialLines[currentLine].tone };
          }
          newLines[currentLine].text = currentText.substring(0, currentChar + 1);
          return newLines;
        });
        
        currentChar++;
        timeoutId = setTimeout(typeNextChar, 10 + Math.random() * 20);
      } else {
        currentLine++;
        currentChar = 0;
        
        if (currentLine < initialLines.length) {
          timeoutId = setTimeout(typeNextChar, 100);
        }
      }
    };

    timeoutId = setTimeout(typeNextChar, 100);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Progress animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const interval = setInterval(() => {
      setPercent(prev => {
        const nextPercent = Math.min(prev + stepSize, 100);
        
        if (nextPercent >= 100) {
          clearInterval(interval);
          timeoutId = setTimeout(() => {
            setIsComplete(true);
            onComplete();
          }, holdAtFullDuration);
          return 100;
        }
        
        return nextPercent;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [stepSize, holdAtFullDuration, onComplete]);

  // Add loading percentage line
  useEffect(() => {
    setLines(prev => {
      const newLines = [...prev];
      const loadingLine = `> Loading: [${'█'.repeat(Math.floor(percent/5))}${'░'.repeat(20 - Math.floor(percent/5))}] ${Math.round(percent)}%`;
      
      // Update or add the loading line
      const loadingIndex = newLines.findIndex(line => line.text.startsWith('> Loading:'));
      if (loadingIndex >= 0) {
        newLines[loadingIndex] = { text: loadingLine, tone: 'lav' };
      } else {
        newLines.push({ text: loadingLine, tone: 'lav' });
      }
      
      return newLines;
    });
  }, [percent]);

  return (
    <div 
      className={`terminal-loader ${isComplete ? 'fade-out' : ''}`}
      aria-busy={!isComplete}
      aria-live="polite"
      aria-label="System initializing"
    >
      <div className="terminal">
        <div className="terminal-header">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
          <span className="terminal-title">root@anniversary: ~/memories</span>
        </div>

        <div className="terminal-body">
          {lines.map((line, i) => (
            <div 
              key={i} 
              className={`terminal-line ${line.tone || ''}`}
            >
              {line.text}
            </div>
          ))}
          
          {!isComplete && (
            <div className="terminal-cursor" />
          )}
        </div>
      </div>
    </div>
  );
};
