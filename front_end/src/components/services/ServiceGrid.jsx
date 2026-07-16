import React from 'react';
import MagicBento from './MagicBento';
import {
  StructuralSteelIcon,
  CraneErectionIcon,
  PebFabricationIcon,
  MezzanineFloorsIcon,
  PebModificationsIcon,
  SiteBarricadingIcon,
  PufInstallationIcon,
  IndustrialShedsIcon,
  MachineryPlatformsIcon
} from './icons/ServiceIllustrations';

const servicesList = [
  {
    id: '01',
    title: 'STRUCTURAL STEEL FABRICATION',
    description: 'Precision MS and structural steel fabrication for commercial, industrial and infrastructure projects — built from your drawings to exact specification.',
    icon: <StructuralSteelIcon />
  },
  {
    id: '02',
    title: 'STRUCTURAL STEEL ERECTION',
    description: 'On-site structural steel erection with experienced crews, coordinated with your project schedule for zero-delay integration.',
    icon: <CraneErectionIcon />
  },
  {
    id: '03',
    title: 'PEB FABRICATION & ERECTION',
    description: 'Complete pre-engineered building fabrication and erection for industrial sheds, warehouses, and commercial structures.',
    icon: <PebFabricationIcon />
  },
  {
    id: '04',
    title: 'MEZZANINE STEEL FLOORS',
    description: 'Custom designed and fabricated mezzanine floors to maximize your vertical space efficiently and safely.',
    icon: <MezzanineFloorsIcon />
  },
  {
    id: '05',
    title: 'PEB MODIFICATIONS & ALTERATIONS',
    description: 'Expert modifications, expansions, and structural alterations to existing pre-engineered buildings.',
    icon: <PebModificationsIcon />
  },
  {
    id: '06',
    title: 'SITE BARRICADING',
    description: 'Heavy-duty steel barricading solutions for construction sites, ensuring safety and secure perimeters.',
    icon: <SiteBarricadingIcon />
  },
  {
    id: '07',
    title: 'PUF & DECK SHEET INSTALLATION',
    description: 'Professional installation of PUF panels and deck sheets for optimal insulation and structural integrity.',
    icon: <PufInstallationIcon />
  },
  {
    id: '08',
    title: 'INDUSTRIAL SHEDS',
    description: 'End-to-end construction of robust industrial sheds tailored to your manufacturing or storage needs.',
    icon: <IndustrialShedsIcon />
  },
  {
    id: '09',
    title: 'HEAVY MACHINERY PLATFORMS',
    description: 'Engineered steel platforms built to withstand immense weight and vibration of heavy industrial machinery.',
    icon: <MachineryPlatformsIcon />
  }
];

const ServiceGrid = () => {
  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E34A12]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#E34A12]/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-24">

          <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-gray-900 tracking-tight mb-8">
            Engineering Excellence. <span className="text-[#E34A12]">Built to Last.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We deliver high-quality steel fabrication, industrial construction, and engineering solutions that ensure durability, safety, and long-term value.
          </p>
        </div>

        {/* Grid Section */}
        <MagicBento
          cards={servicesList}
          textAutoHide={false}
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={280}
          particleCount={10}
          glowColor="227, 74, 18"
        />
      </div>
    </section>
  );
};

export default ServiceGrid;