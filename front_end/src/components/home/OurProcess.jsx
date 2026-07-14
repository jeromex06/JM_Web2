import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: '01',
    title: 'Consultation',
    desc: 'Understanding your needs and project goals.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    )
  },
  {
    id: '02',
    title: 'Engineering Design',
    desc: 'Detailed planning and 3D modeling for accurate results.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    )
  },
  {
    id: '03',
    title: 'Precision Manufacturing',
    desc: 'High-precision manufacturing using advanced technology.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>
    )
  },
  {
    id: '04',
    title: 'Quality Inspection',
    desc: 'Rigorous quality checks to ensure superior standards.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    )
  },
  {
    id: '05',
    title: 'Installation',
    desc: 'Professional installation and timely project completion.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
    )
  }
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '15+', label: 'Years of Experience' },
  { value: '250+', label: 'Skilled Professionals' },
  { value: '25+', label: 'Industries Served' },
  { value: '1M+', label: 'Sq. Ft. Fabricated' },
  { value: '98%', label: 'Client Satisfaction' }
];

const OurProcess = () => {
  const containerRef = useRef(null);
  const processLineRef = useRef(null);
  
  useGSAP(() => {
    // Parallax on title
    gsap.fromTo(".process-title", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    // Draw the process line as we scroll
    gsap.fromTo(processLineRef.current,
      { width: "0%" },
      {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      }
    );

    // Fade in process steps with a scrub
    gsap.fromTo(".process-step",
      { opacity: 0.2, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#ffffff] text-white pt-20 border-t border-white/5 flex flex-col font-sans">

      {/* Top Section: Process Timeline */}
      <div className="max-w-[1500px] mx-auto w-full px-6 lg:px-12 flex flex-col xl:flex-row gap-12 xl:gap-8 items-start justify-between mb-24">

        {/* Left Title */}
        <div className="process-title flex flex-col items-start w-full xl:w-[25%] flex-shrink-0">
          <span className="text-[#ff6b00] font-bold text-[11px] tracking-widest uppercase mb-4 block">
            OUR PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-black">
            From Concept<br />
            To <span className="text-[#ff6b00]">Creation</span>
          </h2>
        </div>

        {/* Right Timeline */}
        <div className="w-full xl:w-[75%] relative mt-8 xl:mt-0 overflow-hidden">
          <div className="w-full flex pb-8">
            <div className="flex-shrink-0 relative px-4 w-full">
              {/* Connecting Line */}
              <div className="absolute top-[40px] left-[5%] right-[5%] h-[2px] bg-[#e5e5e5]">
                <div
                  ref={processLineRef}
                  className="h-full bg-[#ff6b00] transition-all duration-300 shadow-[0_0_15px_rgba(255,107,0,0.5)]"
                ></div>
              </div>
              <div className="flex flex-row justify-between gap-4 relative z-10 w-full">
                {processSteps.map((step) => (
                  <div
                    key={`process-${step.id}`}
                    className="process-step flex flex-col items-center text-center w-[180px] md:w-[200px]"
                  >
                    <div className="w-[80px] h-[80px] rounded-full border border-black bg-[#ffffff] flex items-center justify-center mb-5 shadow-lg text-black">
                      {step.icon}
                    </div>
                    <span className="text-sm font-bold mb-2 tracking-widest text-[#ff6b00]">{step.id}</span>
                    <h3 className="text-[13px] font-semibold mb-2 text-black">{step.title}</h3>
                    <p className="text-[11px] leading-[1.6] max-w-[150px] text-gray-500">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Stats Bar */}
      <div className="w-full bg-[#111111] border-y border-white/5 py-1">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 divide-x-0 lg:divide-x divide-white/10 py-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center lg:justify-start gap-4 px-4">
                <div className="flex flex-col">
                  <span className="text-[#ff6b00] font-bold text-xl md:text-2xl">
                    {stat.value}
                  </span>
                  <span className="text-[#aaaaaa] text-[11px] uppercase tracking-wider">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default OurProcess;
