import React from 'react';
import { ArrowRight, Layers, Sparkles, Grid, LayoutPanelTop, Grid2X2, PenTool } from 'lucide-react';

const products = [
  {
    id: '01',
    title: 'Solid Alu Sheets',
    description: 'High strength aluminium sheets for structural and industrial applications.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    icon: <Layers className="w-5 h-5 text-[#ff5c00]" />
  },
  {
    id: '02',
    title: 'Mill Finish Alu Sheet',
    description: 'Smooth mill finish surface with excellent formability and corrosion resistance.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    icon: <Sparkles className="w-5 h-5 text-[#ff5c00]" />
  },
  {
    id: '03',
    title: 'ACP (Alu Composite Panels)',
    description: 'Lightweight, flat and durable panels for modern signage and facade applications.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    icon: <Grid className="w-5 h-5 text-[#ff5c00]" />
  },
  {
    id: '04',
    title: 'Alu Wall Cladding',
    description: 'Stylish and durable cladding solutions that elevate exterior design and performance.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    icon: <LayoutPanelTop className="w-5 h-5 text-[#ff5c00]" />
  },
  {
    id: '05',
    title: 'Glass Facade Systems',
    description: 'High performance facade systems that combine aesthetics with energy efficiency.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    icon: <Grid2X2 className="w-5 h-5 text-[#ff5c00]" />
  },
  {
    id: '06',
    title: 'Custom Architectural Panels',
    description: 'Bespoke panels crafted to match unique design visions and project requirements.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    icon: <PenTool className="w-5 h-5 text-[#ff5c00]" />
  }
];

const ProductRange = () => {
  return (
    <section className="w-full bg-[#ffffff] py-20 px-6 sm:px-12 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-[1px] w-8 bg-[#ff5c00]"></div>
          <span className="text-[#ff5c00] font-bold tracking-widest text-xs sm:text-sm uppercase">Our Product Range</span>
          <div className="h-[1px] w-8 bg-[#ff5c00]"></div>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
          Built for <span className="text-[#ff5c00]">Strength.</span> Designed for <span className="text-[#ff5c00]">Beauty.</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group bg-[#111111] hover:bg-white rounded-2xl overflow-hidden border border-white/5 hover:border-[#ff5c00]/30 transition-all duration-300 flex flex-col">

            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />

              {/* Overlays on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] group-hover:from-white via-transparent to-transparent transition-colors duration-300"></div>

              {/* Number Badge */}
              <div className="absolute top-4 left-4 bg-[#ff5c00] text-white text-xs font-bold px-3 py-1.5 rounded">
                {product.id}
              </div>

            </div>

            {/* Content Container */}
            <div className="p-8 pt-10 flex flex-col flex-grow relative">
              {/* Icon Badge */}
              <div className="absolute -top-6 right-6 w-12 h-12 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center justify-center z-10 group-hover:bg-white group-hover:border-[#ff5c00]/50 transition-colors duration-300">
                {product.icon}
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#ff5c00] mb-3 transition-colors duration-300">{product.title}</h3>
              <p className="text-gray-400 group-hover:text-black text-sm leading-relaxed mb-6 transition-colors duration-300">
                {product.description}
              </p>

              {/* Arrow Button */}
              <div className="mt-auto flex justify-end">
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ff5c00] transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductRange;
