import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import VoiceDescriptionPage from './components/VoiceDescriptionPage';
import ParticleBackground from './components/ParticleBackground';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToVoiceDemo = () => {
    setCurrentPage('voice-demo');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-dark-100 text-white overflow-x-hidden">
      {/* Particle Background - only show on home page */}
      {currentPage === 'home' && <ParticleBackground />}
      
      {/* Main Content */}
      <ErrorBoundary>
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HomePage onNavigateToVoiceDemo={navigateToVoiceDemo} />
              </motion.div>
            )}
            
            {currentPage === 'voice-demo' && (
              <motion.div
                key="voice-demo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VoiceDescriptionPage onBack={navigateToHome} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
