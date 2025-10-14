import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import DemoSection from './components/DemoSection';
import FeaturesSection from './components/FeaturesSection';
import ModelFlowSection from './components/ModelFlowSection';
import UseCasesSection from './components/UseCasesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="min-h-screen bg-dark-100 text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
        <ModelFlowSection />
        <UseCasesSection />
        <AboutSection />
        <ContactSection />
      </div>
    </div>
  );
}

export default App;
