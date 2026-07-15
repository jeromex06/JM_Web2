import React from 'react';
import ImageSequenceHero from '../components/about/ImageSequenceHero';
//  import ExperienceManager from '../components/about/ExperienceManager';
import VisionMission from '../components/about/VisionMission';
import Founders from '../components/about/Founders';
// import ManufacturingProcess from '../components/about/ManufacturingProcess';
import AboutCTA from '../components/about/AboutCTA';

export default function About() {
  return (
    <div className="bg-black min-h-screen text-white">
      <ImageSequenceHero />
      {/* <ExperienceManager /> */}
      <VisionMission />
      <Founders />
      {/* <ManufacturingProcess /> */}
      <AboutCTA />
    </div>
  );
}
