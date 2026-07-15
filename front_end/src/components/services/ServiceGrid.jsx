import React from 'react';
import {
  Factory,
  Settings,
  Wrench,
  Building2,
  RefreshCw,
  Ruler,
  HardHat,
  Hammer,
  Truck
} from 'lucide-react';

const servicesList = [
  {
    id: '01',
    title: 'STRUCTURAL STEEL FABRICATION',
    description: 'Precision MS and structural steel fabrication for commercial, industrial and infrastructure projects — built from your drawings to exact specification.',
    icon: <Factory className="w-8 h-8 text-[#E34A12]" />
  },
  {
    id: '02',
    title: 'STRUCTURAL STEEL ERECTION',
    description: 'On-site structural steel erection with experienced crews, coordinated with your project schedule for zero-delay integration.',
    icon: <Settings className="w-8 h-8 text-[#8e95a5]" />
  },
  {
    id: '03',
    title: 'PEB FABRICATION & ERECTION',
    description: 'Complete pre-engineered building fabrication and erection for industrial sheds, warehouses, and commercial structures.',
    icon: <Wrench className="w-8 h-8 text-[#8e95a5]" />
  },
  {
    id: '04',
    title: 'MEZZANINE STEEL FLOORS',
    description: 'Custom designed and fabricated mezzanine floors to maximize your vertical space efficiently and safely.',
    icon: <Building2 className="w-8 h-8 text-[#8e95a5]" />
  },
  {
    id: '05',
    title: 'PEB MODIFICATIONS & ALTERATIONS',
    description: 'Expert modifications, expansions, and structural alterations to existing pre-engineered buildings.',
    icon: <RefreshCw className="w-8 h-8 text-[#3b82f6]" />
  },
  {
    id: '06',
    title: 'SITE BARRICADING',
    description: 'Heavy-duty steel barricading solutions for construction sites, ensuring safety and secure perimeters.',
    icon: <Ruler className="w-8 h-8 text-[#8e95a5]" />
  },
  {
    id: '07',
    title: 'PUF & DECK SHEET INSTALLATION',
    description: 'Professional installation of PUF panels and deck sheets for optimal insulation and structural integrity.',
    icon: <HardHat className="w-8 h-8 text-[#8e95a5]" />
  },
  {
    id: '08',
    title: 'INDUSTRIAL SHEDS',
    description: 'End-to-end construction of robust industrial sheds tailored to your manufacturing or storage needs.',
    icon: <Hammer className="w-8 h-8 text-[#8e95a5]" />
  },
  {
    id: '09',
    title: 'HEAVY MACHINERY PLATFORMS',
    description: 'Engineered steel platforms built to withstand immense weight and vibration of heavy industrial machinery.',
    icon: <Truck className="w-8 h-8 text-[#8e95a5]" />
  }
];

const ServiceGrid = () => {
  return (
    <div className="w-full bg-[#f8f9fa] py-24 px-6 md:px-12 lg:px-24">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-[2px] bg-[#E34A12]"></div>
          <span className="text-[#E34A12] text-sm font-bold tracking-[0.2em] uppercase">WHAT WE DO</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-[#1a1f2c]">
          OUR <span className="text-[#E34A12]">SERVICES</span>
        </h2>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="relative group bg-white p-10 border-r border-b border-gray-200 hover:shadow-2xl hover:z-10 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Background Number */}
              <div className="absolute top-6 right-6 text-7xl md:text-8xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-300 pointer-events-none select-none z-0">
                {service.id}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1a1f2c] mb-4 group-hover:text-[#E34A12] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#64748b] leading-relaxed text-[15px]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;
