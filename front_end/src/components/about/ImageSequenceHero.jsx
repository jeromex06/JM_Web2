import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Use Vite's glob import to get all images
const modules = import.meta.glob('../../assets/frames1.1/*.jpg', { eager: true });
const images = Object.keys(modules).sort().map((key) => modules[key].default || modules[key]);

export default function ImageSequenceHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const playhead = useRef({ frame: 0 });

  useEffect(() => {
    // Preload images dynamically
    const loadImages = async () => {
      const loaded = [];
      let loadedCount = 0;
      
      const promises = images.map((src, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loaded[index] = img;
            loadedCount++;
            setProgress(Math.round((loadedCount / images.length) * 100));
            if (loadedCount === images.length) {
              setLoadedImages(loaded);
              setImagesLoaded(true);
            }
            resolve();
          };
          img.onerror = () => {
             loaded[index] = null;
             loadedCount++;
             setProgress(Math.round((loadedCount / images.length) * 100));
             if (loadedCount === images.length) {
                setLoadedImages(loaded);
                setImagesLoaded(true);
             }
             resolve();
          };
        });
      });
      
      await Promise.all(promises);
    };
    
    loadImages();
  }, []);

  useGSAP(() => {
    if (!imagesLoaded || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    
    const render = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = loadedImages[Math.round(playhead.current.frame)];
      
      if (img) {
        // Calculate dimensions to cover the canvas (like object-fit: cover)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };
    
    // Initial render
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Setup GSAP ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=400%', // Adjust scroll length here
      pin: true,
      animation: gsap.to(playhead.current, {
        frame: loadedImages.length - 1,
        ease: 'none',
        onUpdate: render
      }),
      scrub: 0.5, // Smooth scrubbing
    });
    
    // Fade out text on scroll
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=50%',
          scrub: true,
        }
      });
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, { scope: containerRef, dependencies: [imagesLoaded, loadedImages] });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050B16] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      
      {/* Overlay Content */}
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div className="hero-animate inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-950/20 text-[#3BA7FF] text-xs font-mono font-medium tracking-wider mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(59,167,255,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          VISUALIZATION_ENGINE
        </div>
        
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 drop-shadow-lg text-center font-sans">
          Engineering <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-[#3BA7FF]">
            Excellence.
          </span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl text-center drop-shadow-md font-light">
          Scroll to explore the evolution of our architectural facades through precision and innovation.
        </p>
      </div>

      {/* Loading State */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050B16] z-20 transition-opacity duration-500">
          <div className="text-sky-400 font-mono text-sm mb-4">LOADING SEQUENCE... {progress}%</div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-sky-500 shadow-[0_0_10px_#3BA7FF] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Scroll Indicator */}
      {imagesLoaded && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none animate-bounce z-10 text-white/50">
          <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  );
}
