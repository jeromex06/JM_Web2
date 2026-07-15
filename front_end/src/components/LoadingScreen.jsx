import { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            onComplete && onComplete();
          }, 700);
        }, 400);
      } else {
        setProgress(Math.floor(current));
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      {/* Background glow */}
      <div className="loading-bg-glow" />

      {/* Orbiting circles */}
      <div className="loading-orbit-wrapper">
        {/* Outer orbit ring */}
        <div className="loading-orbit loading-orbit-outer">
          <div className="loading-dot loading-dot-outer" />
        </div>

        {/* Middle orbit ring */}
        <div className="loading-orbit loading-orbit-middle">
          <div className="loading-dot loading-dot-middle" />
        </div>

        {/* Inner orbit ring */}
        <div className="loading-orbit loading-orbit-inner">
          <div className="loading-dot loading-dot-inner" />
        </div>

        {/* Center pulsing circle */}
        <div className="loading-center-circle">
          <div className="loading-center-pulse" />
          <span className="loading-percent">{progress}%</span>
        </div>
      </div>


      {/* Progress bar */}
      <div className="loading-progress-bar-wrapper">
        <div
          className="loading-progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="loading-tagline">Precision Engineered Solutions</p>
    </div>
  );
};

export default LoadingScreen;
