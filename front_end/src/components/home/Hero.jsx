import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Using Vite's import.meta.glob to load all images in the sequences
const frame1Glob = import.meta.glob('../../assets/frame_1/*.jpg', { eager: true });
const frame1Urls = Object.values(frame1Glob).map(mod => mod.default || mod);

const frameGlob = import.meta.glob('../../assets/frame/*.jpg', { eager: true });
const frameUrls = Object.values(frameGlob).map(mod => mod.default || mod);

const contents = [
  {
    heading: "ENGINEERING THE FUTURE",
    paragraph: "Advancing the future of construction with virtual construction, architectural visualization, and innovative engineering solutions designed to improve efficiency, collaboration, and project performance."
  },
  {
    heading: "DEFINING TOMORROW",
    paragraph: "Driving innovation through advanced construction solutions, precision manufacturing, and modern technologies that deliver sustainable, high-quality outcomes for the built environment."
  },
  {
    heading: "DRIVEN BY INNOVATION",
    paragraph: "Delivering advanced engineering, precision fabrication, and technology-driven solutions designed to meet the evolving needs of modern construction and infrastructure."
  }
];

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showText, setShowText] = useState(false);

  useGSAP(() => {
    if (frame1Urls.length === 0 || frameUrls.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const totalImages = frame1Urls.length + frameUrls.length;
    const allUrls = [...frame1Urls, ...frameUrls];
    const images = [];

    // Preload images
    allUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      images[i] = img;
    });

    const render = (index) => {
      const img = images[index];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else if (img) {
        img.onload = () => render(index);
      }
    };

    // Render first frame immediately
    render(0);

    const sequence = { frame: 0 };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5, // Smooth scrubbing
      animation: gsap.to(sequence, {
        frame: totalImages - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => {
          const currentFrame = Math.round(sequence.frame);
          render(currentFrame);

          // Logic for text updates based on progress
          if (currentFrame < frame1Urls.length) {
            setShowText(false);
            setIsFinished(false);
          } else {
            setShowText(true);
            const frameProgress = (currentFrame - frame1Urls.length) / frameUrls.length;

            if (frameProgress > 0.95) {
              setIsFinished(true);
            } else {
              setIsFinished(false);
              if (frameProgress < 0.33) {
                setActiveTextIndex(0);
              } else if (frameProgress < 0.66) {
                setActiveTextIndex(1);
              } else {
                setActiveTextIndex(2);
              }
            }
          }
        }
      })
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="home" className="relative w-full h-[400vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        ></canvas>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
          <div className="flex flex-col items-center justify-center text-center px-8 py-16 md:px-16 md:py-24 w-full max-w-4xl">
            <div className={`transition-opacity duration-700 ease-in-out flex flex-col items-center text-center ${showText && !isFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-[0.1em] uppercase mb-6 text-[#D4AF37] drop-shadow-lg">
                {contents[activeTextIndex]?.heading}
              </h1>
              <p className="text-xl md:text-3xl font-light tracking-wide text-white drop-shadow-md">
                {contents[activeTextIndex]?.paragraph}
              </p>
            </div>

            <div className="absolute bottom-12 animate-bounce text-white/50 hidden md:block">
              <span className="text-xs uppercase tracking-widest block mb-2">Scroll</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
