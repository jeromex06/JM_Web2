import React from 'react';
import ServiceHero from '../components/services/ServiceHero';
import ServiceTicker from '../components/services/ServiceTicker';
import ServiceStats from '../components/services/ServiceStats';
import ServiceGrid from '../components/services/ServiceGrid';

const Services = () => {
  return (
    <div className="bg-white min-h-screen">
      <ServiceHero />
      <ServiceTicker />
      <ServiceStats />
      <ServiceGrid />
    </div>
  );
};

export default Services;
