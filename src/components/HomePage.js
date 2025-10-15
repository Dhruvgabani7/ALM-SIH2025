import React from 'react';
import HeroSection from './HeroSection';
import DemoSection from './DemoSection';
import FeaturesSection from './FeaturesSection';
import ModelFlowSection from './ModelFlowSection';
import UseCasesSection from './UseCasesSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';

const HomePage = ({ onNavigateToVoiceDemo }) => {
  return (
    <>
      <HeroSection onNavigateToVoiceDemo={onNavigateToVoiceDemo} />
      <DemoSection />
      <FeaturesSection />
      <ModelFlowSection />
      <UseCasesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
