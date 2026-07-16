import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const heroImages = [
  '/hero-building.png',
  'https://images.unsplash.com/photo-1541888049103-9d4133496035?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1509391366360-128227b49463?auto=format&fit=crop&q=80&w=1920'
];

const ProductHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationState, setAnimationState] = useState('idle');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState('flipping-out');

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        setAnimationState('snap-back');

        // Small delay to allow the browser to register the snap-back before animating to idle
        setTimeout(() => {
          setAnimationState('idle');
        }, 50);
      }, 600); // Time it takes to flip out

    }, 5000); // Rotate image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  let transform = 'perspective(1000px) rotateY(0deg) scale(1)';
  let transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

  if (animationState === 'flipping-out') {
    transform = 'perspective(1000px) rotateY(90deg) scale(0.9)';
  } else if (animationState === 'snap-back') {
    transform = 'perspective(1000px) rotateY(-90deg) scale(0.9)';
    transition = 'none';
  }

  return (
    <div className="relative w-full min-h-[90vh] md:min-h-screen bg-[#070707] overflow-hidden flex flex-col md:flex-row items-center font-sans">

      {/* Background Pattern on the Left */}
      <div className="absolute top-0 left-0 w-[50%] h-full pointer-events-none opacity-20" style={{
        background: 'radial-gradient(circle at 0% 50%, rgba(255,255,255,0.05) 0%, transparent 50%), repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 11px)'
      }} />

      {/* Left Content Area */}
      <div className="w-full md:w-[50%] lg:w-[45%] h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 z-10 relative pt-20 pb-12 md:py-0">

        {/* Top Tagline */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-[#ff5c00] font-bold tracking-widest text-xs sm:text-sm uppercase">Our Products</span>
          <div className="h-[2px] w-12 bg-[#ff5c00]"></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-[50px] sm:text-6xl md:text-7xl lg:text-[60px] font-bold text-white leading-[1.05] mb-8">
          Transforming raw materials into <br />
          <span className="text-[#ff5c00]">engineered excellence</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-md mb-10 leading-relaxed font-light">
          Behind every great innovation is a material that made it possible — and an engineer who saw that possibility first
        </p>


      </div>

      {/* Right Image Area */}
      <div className="w-full md:w-[50%] lg:w-[55%] h-[40vh] md:h-screen relative mt-4 md:mt-0 md:absolute md:right-0">

        {/* Gradient Overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent z-10 md:hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-transparent to-transparent z-10 hidden md:block pointer-events-none"></div>

        {/* Slanted Image Container */}
        <div className="w-full h-full relative md:-ml-12" style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)'
        }}>
          <img
            src={heroImages[currentIndex]}
            alt="Architectural glass building"
            className="w-full h-full object-cover object-center"
            style={{
              transform,
              transition
            }}
          />
          {/* Subtle orange accent glow on image */}
          <div className="absolute inset-0 bg-[#ff5c00]/5 mix-blend-overlay pointer-events-none"></div>
        </div>

      </div>

    </div>
  );
};

export default ProductHero;