import React from 'react';
import { Lightbulb, Cpu, Layers, Factory, ShieldCheck, Truck } from 'lucide-react';

const processSteps = [
  {
    id: '01',
    title: 'Research & Planning',
    description: 'Understanding needs and market research.',
    Icon: Lightbulb
  },
  {
    id: '02',
    title: 'Design & Engineering',
    description: 'Precision engineering and product design.',
    Icon: Cpu
  },
  {
    id: '03',
    title: 'Material Selection',
    description: 'Selecting the best quality raw materials.',
    Icon: Layers
  },
  {
    id: '04',
    title: 'Precision Manufacturing',
    description: 'Advanced machinery and skilled experts.',
    Icon: Factory
  },
  {
    id: '05',
    title: 'Quality Inspection',
    description: 'Rigorous testing at every production stage.',
    Icon: ShieldCheck
  },
  {
    id: '06',
    title: 'Packaging & Delivery',
    description: 'Safe packaging and timely global delivery.',
    Icon: Truck
  }
];

export default function ManufacturingProcess() {
  return (
    <section className="w-full bg-[#111315] py-24 px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <h4 className="text-orange-500 font-semibold tracking-wider text-sm uppercase mb-3">
            OUR MANUFACTURING PROCESS
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            From Concept to <span className="text-orange-500">Completion</span>
          </h2>
        </div>

        {/* Process Timeline */}
        <div className="relative w-full">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[180px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-gray-800 via-orange-500/50 to-gray-800 z-0"></div>

          <div className="flex flex-nowrap lg:grid lg:grid-cols-6 gap-6 lg:gap-4 overflow-x-auto pb-12 snap-x hide-scrollbar relative z-10">
            {processSteps.map((step, index) => (
              <div key={step.id} className="min-w-[280px] lg:min-w-0 flex flex-col items-center text-center group snap-center">
                
                {/* 3D-like Icon Podium */}
                <div className="mb-10 relative">
                  {/* Base of podium */}
                  <div className="w-32 h-32 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-xl border-t border-gray-700 shadow-2xl flex items-center justify-center relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <step.Icon size={48} className="text-gray-400 group-hover:text-orange-500 transition-colors duration-500 relative z-20" strokeWidth={1.5} />
                  </div>
                  {/* Podium shadow/reflection */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Number Badge */}
                <div className="w-12 h-12 rounded-full bg-[#111] border-2 border-gray-800 text-orange-500 font-bold flex items-center justify-center mb-6 relative z-10 group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-colors duration-300 shadow-[0_0_15px_rgba(249,115,22,0)] group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  {step.id}
                </div>

                {/* Text Content */}
                <h3 className="text-white font-bold text-lg mb-3 px-2 group-hover:text-orange-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed px-4 max-w-[250px]">
                  {step.description}
                </p>

              </div>
            ))}
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="lg:hidden flex flex-col items-center mt-4">
            <p className="text-gray-500 text-xs mb-3">Scroll to see the process in action</p>
            <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
