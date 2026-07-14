import React, { useState, useEffect, useRef } from 'react';

const ImageSequence = ({ 
  folder, 
  prefix, 
  suffix = '.jpg', 
  startFrame, 
  endFrame, 
  fps = 24, 
  className = "", 
  onFrameChange 
}) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  const totalFrames = endFrame - startFrame + 1;

  // Intersection Observer to detect when the sequence is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // Pause when out of view
          setIsInView(false);
        }
      },
      { rootMargin: '200px' } // Preload slightly before it comes into view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Animation Loop
  useEffect(() => {
    let interval;
    if (isInView) {
      interval = setInterval(() => {
        setCurrentFrameIndex((prev) => {
          const next = (prev + 1) % totalFrames;
          if (onFrameChange) onFrameChange(next, totalFrames);
          return next;
        });
      }, 1000 / fps);
    }
    return () => clearInterval(interval);
  }, [isInView, totalFrames, fps, onFrameChange]);

  const frameNumber = (startFrame + currentFrameIndex).toString().padStart(8, '0');
  const currentSrc = `/${folder}/${prefix}${frameNumber}${suffix}`;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading Spinner */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#111315] z-10">
          <div className="w-10 h-10 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Image */}
      {isInView && (
        <img
          src={currentSrc}
          alt="Animation Sequence"
          className="w-full h-full object-cover object-center"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default ImageSequence;
