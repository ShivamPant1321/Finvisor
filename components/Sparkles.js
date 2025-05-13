import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/sparkles.css';

const generateSparklePosition = () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 10 + 5,
  createdAt: Date.now(),
});

const Sparkles = ({ children, color, size = 'md', className = '' }) => {
  const { theme } = useContext(ThemeContext);
  const [sparkles, setSparkles] = useState(() => 
    Array.from({ length: 3 }).map(() => generateSparklePosition())
  );
  
  // Get theme-appropriate colors
  const sparkleColor = color || (theme === 'dark' ? 'rgba(180, 180, 255, 0.8)' : 'rgba(100, 100, 255, 0.8)');
  const sparkleHighlight = theme === 'dark' ? 'rgba(220, 220, 255, 1)' : 'rgba(255, 255, 255, 1)';
  
  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      const now = Date.now();
      setSparkles(sparkles => 
        sparkles
          .filter(sparkle => now - sparkle.createdAt < 1000)
          .concat(generateSparklePosition())
      );
    }, 1000);
    
    return () => clearInterval(sparkleInterval);
  }, []);
  
  return (
    <span className={`sparkles-container ${className} ${theme === 'dark' ? 'dark-mode' : ''}`}>
      {sparkles.map((props, i) => (
        <Sparkle 
          key={props.createdAt} 
          color={sparkleColor}
          highlight={sparkleHighlight}
          size={props.size}
          style={{
            left: props.left,
            top: props.top,
          }}
          animationClass={`animate-sparkle-${(i % 3) + 1}`}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  );
};

const Sparkle = ({ color, highlight, size, style, animationClass }) => {
  return (
    <span
      className={`sparkle ${animationClass}`}
      style={{
        ...style,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: highlight,
        boxShadow: `0 0 10px ${color}`,
      }}
    />
  );
};

export default Sparkles;