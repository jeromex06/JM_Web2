import React, { useState, useRef, useEffect } from 'react';
import steelImage from '../../assets/steel_fabrication.png';
import ActiveCardDetails from './ActiveCardDetails';
import { ScrollReveal } from './ScrollReveal';

const capabilities = [
  {
    title: 'Steel Fabrication',
    image: steelImage,
  },
  {
    title: 'PVR Coating',
    image: steelImage,
  },
  {
    title: 'Colour Coating',
    image: steelImage,
  },
  {
    title: 'Facade Solutions',
    image: steelImage,
  },
  {
    title: 'Facade Solutions',
    image: steelImage,
  }
];

// Spark particle component
const Sparks = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
      {[...Array(80)].map((_, i) => {
        const angle = (i * 4.5) * Math.PI / 180; // 360 / 80 = 4.5 degrees
        // Increase spread distance to form a large background field around the card
        const distance = 160 + Math.random() * 140;
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * (distance * 0.85) + 'px';
        const twinkleDelay = 0.6 + Math.random() * 2 + 's'; // Start twinkling after burst
        const size = Math.random() > 0.5 ? 'w-1 h-1' : 'w-1.5 h-1.5';

        return (
          <div
            key={i}
            className={`absolute ${size} bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047] spark`}
            style={{
              '--tx': tx,
              '--ty': ty,
              '--twinkle-delay': twinkleDelay
            }}
          />
        );
      })}
    </div>
  );
};

const CoreCapabilities = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCap, setSelectedCap] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const detailsRef = useRef(null);
  const timeoutRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = 350;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const handleCloseDetails = () => {
    setActiveCard(null);
    setShowDetails(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (idx) => {
    const isActivating = activeCard !== idx;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isActivating) {
      setActiveCard(idx);
      setSelectedCap(capabilities[idx]);
      setShowDetails(true);
      setActiveIndex(idx); // Update the pagination dot highlight
      setAnimKey(prev => prev + 1); // Force remount to replay animations

      // Delay scrolling to let the sparkle burst animation finish (burst is 0.6s)
      timeoutRef.current = setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 800);
    } else {
      setActiveCard(null);
      setShowDetails(false);
      // We don't reset selectedCap here so the close animation can use the existing data
    }
  };

  return (
    <section ref={sectionRef} id="core-capabilities" className="bg-[#111315] py-24 px-8 text-white w-full overflow-hidden relative">
      <style>{`
        @keyframes spark-burst {
          0% { transform: translate(0, 0) scale(0); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.8; }
        }
        @keyframes spark-twinkle {
          0%, 100% { opacity: 0.8; transform: translate(var(--tx), var(--ty)) scale(1); }
          50% { opacity: 0.1; transform: translate(var(--tx), var(--ty)) scale(0.4); }
        }
        .spark {
          animation: 
            spark-burst 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards,
            spark-twinkle 3s ease-in-out var(--twinkle-delay) infinite;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <ScrollReveal delay={0.1}>
          <div className="flex justify-between items-end mb-12">
            <div
              className="transition-all duration-1000 transform"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <h4 className="text-[#FF6B00] text-sm font-bold uppercase tracking-wider mb-2">
                Lenis Smooth Scroll
              </h4>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
                Core Capabilities
              </h2>
            </div>
            <button
              className="hidden md:flex items-center space-x-2 border border-gray-500 rounded-full py-2 px-6 hover:bg-white hover:text-black transition-all duration-1000 text-sm font-semibold"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '200ms'
              }}
            >
              <span>Learn More</span>
              <span>&rarr;</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Horizontal scroll container */}
        <ScrollReveal delay={0.3} className="w-full">
          <div className="relative w-full flex items-center">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex space-x-8 overflow-x-auto pb-16 snap-x snap-mandatory hide-scroll items-center px-4 pt-10 perspective-1000 w-full"
            >
              {capabilities.map((cap, idx) => {
                const isActive = activeCard === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleCardClick(idx)}
                    className={`relative snap-center shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer w-72 md:w-80 group
                    ${isActive ? 'z-20' : 'z-10'}
                  `}
                    style={{
                      transitionDelay: `${isVisible ? idx * 150 : 0}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)'
                        : 'perspective(1200px) rotateY(180deg) translateY(50px) scale(0.8)'
                    }}
                  >
                    {/* Sparks bursting outside into the page background */}
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                        <Sparks />
                      </div>
                    )}

                    {/* The card itself */}
                    <div
                      className={`
                      bg-[#1C1F22] rounded-2xl overflow-hidden flex flex-col h-[400px] relative z-10
                      transition-all duration-700 ease-out transform-gpu origin-center
                      ${isActive
                          ? 'border border-gray-600/30'
                          : 'border-2 border-transparent hover:border-[#FF6B00]/50 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,107,0,0.15)]'
                        }
                    `}
                      style={isActive ? {
                        transform: 'perspective(1000px) rotateY(-15deg) rotateX(10deg) scale(1.05)',
                        boxShadow: '10px 10px 0px #FF6B00',
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                      } : {
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      {/* Image container */}
                      <div className="absolute inset-0">
                        <img
                          src={cap.image}
                          alt={cap.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Dark gradient overlay so text is readable if no glass */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-[#1C1F22] via-[#1C1F22]/80 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-100'}`}></div>
                      </div>

                      {/* Normal content - fades out when active */}
                      <div className={`absolute bottom-0 w-full p-6 flex flex-col justify-end transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <div>
                          <p className="text-[#FF6B00] text-xs font-bold uppercase mb-2">Premium</p>
                          <h3 className="text-xl font-bold mb-6">{cap.title}</h3>
                        </div>
                        <div className="flex justify-between items-center border border-gray-600 rounded-full py-2 px-4 group-hover:border-[#FF6B00] transition-colors">
                          <span className="text-sm text-gray-300">Read in more</span>
                          <span className="text-gray-300">&rarr;</span>
                        </div>
                      </div>

                      {/* Expanding Glass Circle */}
                      <div
                        className={`absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square rounded-full glass-panel transition-all duration-1000 ease-out z-10
                      ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}
                        style={{ transformOrigin: 'center center' }}
                      ></div>

                      {/* Active state text content */}
                      <div className={`absolute inset-0 p-6 flex flex-col justify-end relative z-20 transition-all duration-700 delay-200 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <p className="text-[#FF6B00] text-xs font-bold uppercase mb-2">Premium</p>
                        <h3 className="text-2xl font-bold mb-6 leading-tight">
                          Premium Industrial <br /> {cap.title}
                        </h3>

                        <div className="flex relative items-center cursor-pointer group/btn">
                          <div className="border border-white/40 rounded-full py-3 px-6 w-full flex justify-between items-center bg-black/20 backdrop-blur-md hover:bg-black/40 transition-colors">
                            <span className="text-sm font-medium">Premium micro scroll</span>
                            <span className="w-8"></span> {/* Space for the arrow circle */}
                          </div>
                          {/* Right side overlapping circle for the arrow */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg group-hover/btn:bg-white/30 transition-colors">
                            <span>&rarr;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left Navigation Arrow */}
            <button
              onClick={scrollLeft}
              className="flex absolute left-0 lg:-left-6 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#ff6b00] items-center justify-center text-[#ff6b00] hover:bg-[#ff6b00]/10 transition-all bg-[#080808]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={scrollRight}
              className="flex absolute right-0 lg:-right-6 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#ff6b00] items-center justify-center text-[#ff6b00] hover:bg-[#ff6b00]/10 transition-all bg-[#080808]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </ScrollReveal>

        {/* Pagination Indicators */}
        <ScrollReveal delay={0.4}>
          <div className="flex items-center justify-center gap-2 mt-4 lg:mt-2">
            {capabilities.map((_, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({ left: idx * 350, behavior: 'smooth' });
                    setActiveIndex(idx);
                  }
                }}
                className={`cursor-pointer h-1.5 w-6 rounded-full transition-colors duration-300 ${activeIndex === idx ? 'bg-[#ff6b00]' : 'bg-white/30'}`}
              ></div>
            ))}
          </div>
        </ScrollReveal>

        {/* Detailed Statistics Section */}
        <div ref={detailsRef} className={`transition-all duration-700 ease-in-out overflow-hidden w-full ${showDetails ? 'max-h-[2500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="w-full min-h-screen flex flex-col justify-center">
            <ActiveCardDetails key={animKey} cap={selectedCap} onClose={handleCloseDetails} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
