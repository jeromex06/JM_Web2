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

  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

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

    // Setup GSAP Timeline and ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', // Adjust scroll length here
        pin: true,
        scrub: 0.5, // Smooth scrubbing
      }
    });

    // Animate playhead
    tl.to(playhead.current, {
      frame: loadedImages.length - 1,
      ease: 'none',
      duration: 1,
      onUpdate: render
    }, 0);

    // Fade out initial text on scroll
    if (textRef.current) {
      tl.to(textRef.current, {
        opacity: 0,
        x: -50,
        ease: 'power2.inOut',
        duration: 0.1
      }, 0);
    }

    // Text 2: Standard Fabrication
    if (text2Ref.current) {
      tl.fromTo(text2Ref.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.1, ease: 'power2.out' },
        0.15
      )
        .to(text2Ref.current, { opacity: 0, x: 50, duration: 0.1, ease: 'power2.in' }, 0.35);
    }

    // Text 3: Premium Coating & Finishing
    if (text3Ref.current) {
      tl.fromTo(text3Ref.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.1, ease: 'power2.out' },
        0.75
      )
        .to(text3Ref.current, { opacity: 0, x: 50, duration: 0.1, ease: 'power2.in' }, 0.95);
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

      {/* Initial Overlay Content */}
      <div ref={textRef} className="absolute inset-y-0 left-[10%] flex flex-col justify-center pointer-events-none z-10">
        <div className="w-12 h-1 bg-[#3BA7FF] mb-6"></div>
        <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase leading-[1.1] font-sans drop-shadow-lg">
          Precision <br />
          Sheet Metal <br />
          & Facades
        </h2>
        <div className="w-12 h-1 bg-[#3BA7FF] mt-6"></div>
      </div>

      {/* Text 2 */}
      <div ref={text2Ref} className="absolute inset-y-0 left-[10%] flex flex-col justify-center pointer-events-none z-10 opacity-0">
        <div className="w-12 h-1 bg-[#3BA7FF] mb-6"></div>
        <h2 className="text-white text-5xl md:text-6xl font-bold tracking-tight uppercase leading-[1.1] font-sans mb-6 drop-shadow-lg">
          Standard <br />
          Fabrication
        </h2>
        <div className="w-12 h-1 bg-[#3BA7FF] mb-8"></div>
        <p className="text-gray-300 text-sm md:text-base mb-8 max-w-md font-light leading-relaxed drop-shadow-md">
          Weider preavandzed dieftech and firtcelore fryee-tiendetalwa, nefite aleges actlacter: featlon corn offecrites, Roren imerloire proleces, inicidider withes rectroptinal and ounmer.
        </p>
        <button className="border border-white/30 bg-black/20 backdrop-blur-sm hover:bg-white/10 text-white px-8 py-3 text-xs tracking-widest uppercase transition-colors pointer-events-auto w-fit flex items-center gap-3">
          READ MORE
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Text 3 */}
      <div ref={text3Ref} className="absolute top-[35%] left-[10%] flex flex-col pointer-events-none z-10 opacity-0">
        <div className="w-12 h-1 bg-[#3BA7FF] mb-6"></div>
        <h2 className="text-white text-5xl md:text-6xl font-bold tracking-tight uppercase leading-[1.1] font-sans mb-6 drop-shadow-lg">
          Premium Coating <br />
          & Finishing
        </h2>
        <p className="text-gray-300 text-sm md:text-base mb-8 max-w-md font-light leading-relaxed drop-shadow-md">
          Prouit craftseface maomize dralye, and eioaroins butyra aind form ha netaog sl morrttons.
        </p>
        <button className="border border-white/30 bg-black/20 backdrop-blur-sm hover:bg-white/10 text-white px-8 py-3 text-xs tracking-widest uppercase transition-colors pointer-events-auto w-fit flex items-center gap-3">
          READ MORE
        </button>
      </div>

      {/* Loading State */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050B16] z-20 transition-opacity duration-500">
          {/* Circle progress ring */}
          <div className="relative mb-5" style={{ width: 90, height: 90 }}>
            <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
              {/* Track */}
              <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,107,0,0.12)" strokeWidth="5" />
              {/* Progress arc */}
              <circle
                cx="45" cy="45" r="38"
                fill="none"
                stroke="#ff6b00"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - progress / 100)}`}
                style={{
                  transition: 'stroke-dashoffset 0.3s ease',
                  filter: 'drop-shadow(0 0 6px rgba(255,107,0,0.7))'
                }}
              />
            </svg>
            {/* Center percent text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{ color: '#ff6b00', fontFamily: 'monospace', fontSize: 15, fontWeight: 700 }}>
                {progress}%
              </span>
            </div>
          </div>
          <div style={{ color: '#ff6b00', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.1em' }}>
            LOADING SEQUENCE...
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
