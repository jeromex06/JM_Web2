import React, { useState, useCallback } from 'react';
import ImageSequence from '../common/ImageSequence';
import { ScrollReveal } from './ScrollReveal';

const industries = [
  {
    name: 'Commercial',
    badge: '0',
    icon: (
      <svg className="w-8 h-8 text-[#FF6B00] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" /></svg>
    )
  },
  {
    name: 'Industrial',
    badge: '2',
    icon: (
      <svg className="w-8 h-8 text-[#FF6B00] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" /></svg>
    )
  },
  {
    name: 'Infrastructure',
    badge: '3',
    icon: (
      <svg className="w-8 h-8 text-[#FF6B00] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
    )
  }
];

const technologies = [
  "CNC Machining Centers",
  "Laser Cutting Technology",
  "Robotic Welding",
  "Powder Coating Plant",
  "Advanced Quality Testing",
  "CAD / CAM Design"
];

const IndustriesAndTech = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFrameChange = useCallback((frameIndex, totalFrames) => {
    setActiveIndex(Math.floor((frameIndex / totalFrames) * technologies.length));
  }, []);

  return (
    <section className="bg-[#111315] text-white border-t border-gray-900 border-b mt-10">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row border-b border-gray-800 my-10 items-stretch">

          {/* Left Column - Industries */}
          <div className="lg:w-[35%] xl:w-[25%] p-6 lg:p-8 lg:border-r border-gray-800 flex flex-col">
            <ScrollReveal delay={0.1}>
              <h4 className="text-[#FF6B00] font-semibold tracking-wider uppercase text-xs mb-8 flex-shrink-0">Industries We Serve</h4>
            </ScrollReveal>
            <div className="flex flex-col gap-3 max-w-full lg:max-w-md flex-1">
              {industries.map((industry, index) => (
                <ScrollReveal key={index} delay={0.2 + (index * 0.1)}>
                  <div
                    className="bg-gradient-to-b from-[#2a2a2a] to-[#111111] rounded-lg p-3 lg:p-4 flex flex-row items-center justify-start border border-gray-600/30 hover:border-[#FF6B00]/50 hover:from-[#333333] hover:to-[#1a1a1a] transition-all duration-300 relative group cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.2)] gap-3 flex-1"
                  >
                    <div className="absolute top-3 right-3">
                      <span className="text-[#FF6B00] text-[10px] font-bold">{industry.badge}</span>
                    </div>
                    <div className="group-hover:scale-110 transition-transform duration-300 flex-shrink-0 mb-0">
                      {/* Ensure icon has no bottom margin in row layout */}
                      {React.cloneElement(industry.icon, { className: 'w-6 h-6 lg:w-7 lg:h-7 text-[#FF6B00]' })}
                    </div>
                    <span className="text-xs lg:text-sm font-medium text-gray-300 text-left w-full break-words leading-tight">{industry.name}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Column - Technology & Innovation */}
          <div className="lg:w-[65%] xl:w-[75%] flex flex-col xl:flex-row bg-[#111] min-w-0">

            {/* 1. Text Section */}
            <div className="p-8 flex-1 flex flex-col justify-center z-20 min-w-0 xl:w-[30%]">
              <ScrollReveal delay={0.1}>
                <h4 className="text-[#FF6B00] font-semibold tracking-wider uppercase text-xs mb-6">Technology & Innovation</h4>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-[1.1] tracking-tight">
                  Powered By Technology.<br />Driven By Innovation.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-gray-400 mb-8 text-xs lg:text-sm leading-relaxed">
                  Our advanced machinery and innovative processes enable us to deliver precision, quality, and efficiency in every project.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <button className="border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-6 py-3 rounded-md uppercase tracking-widest text-[10px] font-bold transition-colors duration-300 flex items-center gap-2 w-fit">
                  Explore Technology
                  <span className="text-lg leading-none">&rarr;</span>
                </button>
              </ScrollReveal>
            </div>

            {/* 2. Separate Image Section */}
            <div className="relative w-full xl:w-[45%] flex-shrink-0 h-48 sm:h-64 xl:h-auto overflow-hidden bg-black">
              <ScrollReveal delay={0.3} className="w-full h-full">
                {/* Fade gradients on edges to blend smoothly */}
                <div className="absolute inset-y-0 left-0 w-16 xl:w-24 bg-gradient-to-r from-[#111] to-transparent z-20"></div>
                <div className="absolute inset-y-0 right-0 w-16 xl:w-24 bg-gradient-to-l from-[#111] to-transparent z-20"></div>
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#111] to-transparent z-20"></div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111] to-transparent z-20"></div>

                <ImageSequence 
                  folder="frame_3"
                  prefix="Timeline 1_"
                  startFrame={86400}
                  endFrame={86639}
                  fps={24}
                  className="w-full h-full opacity-80"
                  onFrameChange={handleFrameChange}
                />
              </ScrollReveal>
            </div>

            {/* 3. List Section */}
            <div className="w-full xl:w-[25%] flex-shrink-0 flex flex-col justify-center min-w-0">
              <ScrollReveal delay={0.4} className="h-full">
                <div className="h-full flex flex-col justify-center py-8 px-6 bg-[#111] xl:border-l border-gray-800/40 relative z-20">
                  <ul className="flex flex-col w-full">
                    {technologies.map((tech, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <li key={idx} className={`flex items-center gap-3 py-3 lg:py-4 border-b border-gray-700/50 last:border-b-0 cursor-pointer transition-all duration-500 ${isActive ? 'border-[#FF6B00]/50 bg-white/5 pl-4' : 'hover:border-[#FF6B00]/30'}`}>
                          <div className={`w-2 h-2 rounded-full border border-[#FF6B00] flex items-center justify-center p-[2px] transition-colors flex-shrink-0 ${isActive ? 'bg-[#FF6B00] shadow-[0_0_10px_2px_rgba(255,107,0,0.5)]' : 'group-hover:bg-[#FF6B00]'}`}>
                            <div className={`w-1 h-1 rounded-full transition-colors ${isActive ? 'bg-white' : 'bg-[#FF6B00] group-hover:bg-white'}`}></div>
                          </div>
                          <span className={`text-xs font-medium transition-all duration-500 truncate ${isActive ? 'text-white scale-105 origin-left' : 'text-gray-300 group-hover:text-white'}`}>{tech}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustriesAndTech;
