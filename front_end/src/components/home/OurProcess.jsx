import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import GlassIcon from './GlassIcon';

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
  const timelineLineRef = useRef(null);

  useGSAP(() => {
    // Parallax on title
    gsap.fromTo(".process-title",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    // Setup timeline line length
    const lineLength = timelineLineRef.current.getTotalLength();
    gsap.set(timelineLineRef.current, {
      strokeDasharray: lineLength,
      strokeDashoffset: lineLength,
    });

    // Create main sequence timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse"
      }
    });

    // 1. Draw timeline
    tl.to(timelineLineRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      duration: 2
    }, 0);

    const steps = gsap.utils.toArray('.process-step');

    steps.forEach((step, i) => {
      // Sync startTime with the 2s timeline line drawing
      const startTime = (i / (steps.length - 1)) * 2;

      // 2. Glass Circle pops in
      const glassContainer = step.querySelector('.glass-icon-container');
      const glassCircle = step.querySelector('.glass-circle');

      tl.fromTo(glassContainer,
        { scale: 0.3, opacity: 0, rotationY: -15, rotationX: -5 },
        { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, ease: "elastic.out(1, 0.5)", duration: 0.6 },
        startTime
      );

      // 3. Icon draws itself
      const svgPaths = step.querySelectorAll('.icon-svg path, .icon-svg circle, .icon-svg rect, .icon-svg polyline');
      svgPaths.forEach(path => {
        const pathLength = path.getTotalLength ? path.getTotalLength() : 100;
        tl.fromTo(path,
          { strokeDashoffset: pathLength, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          startTime + 0.2
        );
      });

      // 4. Reflection sweeps across
      const reflection = step.querySelector('.reflection-layer');
      tl.fromTo(reflection,
        { x: "-100%", y: "-100%", opacity: 0 },
        { x: "100%", y: "100%", opacity: 0.8, duration: 0.8, ease: "power1.inOut" },
        startTime + 0.3
      );
      // Fade reflection back out slightly
      tl.to(reflection, { opacity: 0, duration: 0.2 }, startTime + 0.9);

      // 5. Text content fades in
      const textContent = step.querySelectorAll('.step-text');
      tl.fromTo(textContent,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" },
        startTime + 0.4
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] text-white pt-20 border-t border-white/5 flex flex-col font-sans overflow-hidden">

      {/* Top Section: Process Timeline */}
      <div className="max-w-[1500px] mx-auto w-full px-6 lg:px-12 flex flex-col xl:flex-row gap-12 xl:gap-8 items-start justify-between mb-24">

        {/* Left Title */}
        <div className="process-title flex flex-col items-start w-full xl:w-[25%] flex-shrink-0 relative z-20">
          <span className="text-[#ff6b00] font-bold text-[11px] tracking-widest uppercase mb-4 block">
            OUR PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white">
            From Concept<br />
            To <span className="text-[#ff6b00]">Creation</span>
          </h2>
        </div>

        {/* Right Timeline */}
        <div className="w-full xl:w-[75%] relative mt-8 xl:mt-0">
          <div className="w-full flex pb-8 relative">

            {/* Animated SVG Timeline Line */}
            <div className="absolute top-[60px] left-[5%] right-[5%] h-[2px] z-0 pointer-events-none hidden md:block">
              <svg width="100%" height="2" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]">
                <line
                  ref={timelineLineRef}
                  x1="0" y1="1" x2="100%" y2="1"
                  stroke="url(#orangeGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,107,0,0.1)" />
                    <stop offset="50%" stopColor="rgba(255,107,0,1)" />
                    <stop offset="100%" stopColor="rgba(255,107,0,0.1)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex-shrink-0 relative px-4 w-full">
              <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10 w-full items-center">
                {processSteps.map((step, index) => (
                  <div
                    key={`process-${step.id}`}
                    className="process-step flex flex-col items-center text-center w-[200px]"
                  >
                    <GlassIcon icon={step.icon} id={step.id} index={index} />

                    <div className="mt-6 flex flex-col items-center">
                      <span className="step-text text-sm font-bold mb-2 tracking-widest text-[#ff6b00]">{step.id}</span>
                      <h3 className="step-text text-[13px] font-semibold mb-2 text-white">{step.title}</h3>
                      <p className="step-text text-[11px] leading-[1.6] max-w-[150px] text-gray-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Stats Bar */}
      <div className="w-full bg-[#111111] border-y border-white/5 py-1 relative z-20">
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