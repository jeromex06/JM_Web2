import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Linkedin = ({ size = 24, fill = "none", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const foundersData = [
  {
    id: 1,
    name: "Arun Mehta",
    role: "Co-Founder & CEO",
    description:
      "Visionary leader with 20+ years of experience in engineering and manufacturing.",
    image: "/images/founder_arun.png",
  },
  {
    id: 2,
    name: "Neha Sharma",
    role: "Co-Founder & COO",
    description:
      "Operations expert focused on process excellence and business growth.",
    image: "/images/founder_neha.png",
  },
  // {
  //   id: 3,
  //   name: "Vikram Patel",
  //   role: "Co-Founder & CTO",
  //   description: "Technology strategist leading innovation and advanced manufacturing.",
  //   image: "/images/founder_vikram.png"
  // }
];

export default function Founders() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % foundersData.length);
    }, 3000); // 3 seconds auto-play
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % foundersData.length);
  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + foundersData.length) % foundersData.length,
    );

  return (
    <section className="w-full bg-[#ffffff] py-20 px-4 md:px-12 relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h4 className="text-orange-500 font-semibold tracking-wider text-sm uppercase mb-3">
          OUR FOUNDERS
        </h4>
        <h2 className="text-4xl md:text-5xl font-bold text-black">
          The People Behind Our <span className="text-orange-500">Success</span>
        </h2>
      </div>

      <div className="flex items-center justify-center gap-4 lg:gap-8 max-w-[1400px] mx-auto w-full relative z-10">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="hidden lg:flex w-12 h-12 rounded-full border border-gray-700 bg-black/50 items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-colors shrink-0 z-40"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel Container */}
        <div
          className="relative w-full max-w-[1100px] h-[450px] mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {foundersData.map((founder, index) => {
            const offset =
              (index - currentIndex + foundersData.length) %
              foundersData.length;
            const normalizedOffset = offset === 2 ? -1 : offset;

            let translation = "translate-x-[-50%]";
            let scale = "scale-100";
            let zIndex = "z-10";
            let opacity = "opacity-100";
            let blur = "blur-none";

            if (normalizedOffset === 0) {
              translation = "translate-x-[-50%]";
              scale = "scale-105";
              zIndex = "z-30";
              opacity = "opacity-100";
              blur = "blur-none";
            } else if (normalizedOffset === -1) {
              translation = "translate-x-[calc(-50%-360px)]";
              scale = "scale-90";
              zIndex = "z-20";
              opacity = "opacity-60";
              blur = "blur-[2px]";
            } else if (normalizedOffset === 1) {
              translation = "translate-x-[calc(-50%+360px)]";
              scale = "scale-90";
              zIndex = "z-20";
              opacity = "opacity-60";
              blur = "blur-[2px]";
            }

            return (
              <div
                key={founder.id}
                onClick={() => setCurrentIndex(index)}
                className={`absolute top-0 left-1/2 w-full max-w-[340px] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer ${translation} ${scale} ${zIndex} ${opacity} ${blur}`}
              >
                <div className="w-full h-full bg-gradient-to-br from-[#181818] to-[#0a0a0a] rounded-3xl overflow-hidden border border-gray-800 relative group shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
                  {/* Subtle orange glow at bottom left */}
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/20 blur-2xl rounded-full transition-opacity group-hover:bg-orange-500/40"></div>

                  <div className="flex flex-col h-[400px]">
                    {/* Image Section */}
                    <div className="w-full h-[200px] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10"></div>
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className={`w-full h-full object-cover object-top transition-all duration-500 ${normalizedOffset === 0 ? "grayscale-0" : "grayscale"}`}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="px-8 pb-8 flex flex-col justify-end relative z-20 w-full flex-grow">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {founder.name}
                      </h3>
                      <p className="text-orange-500 text-sm font-semibold mb-4">
                        {founder.role}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {founder.description}
                      </p>

                      {/* LinkedIn Icon */}
                      <div className="flex justify-end mt-auto">
                        <span className="w-8 h-8 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                          <Linkedin size={14} fill="currentColor" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="hidden lg:flex w-12 h-12 rounded-full border border-gray-700 bg-black/50 items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-colors shrink-0 z-40"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-4 relative z-20">
        {foundersData.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "w-6 h-1.5 bg-orange-500"
                : "w-2 h-2 bg-gray-700 hover:bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
