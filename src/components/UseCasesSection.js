import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPlay, FaVolumeUp, FaBrain } from 'react-icons/fa';

const UseCasesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const useCases = [
    {
      title: 'Airport Security Analysis',
      description: 'Real-time monitoring of airport terminals for security threats and emergency situations',
      audioType: 'Mixed Audio',
      detectedSounds: ['Airplane engines', 'Announcements', 'Crowd noise', 'Footsteps'],
      analysis: 'Detected normal airport operations with standard passenger flow. No security threats identified.',
      scenario: 'Airport Terminal',
      confidence: '98.5%'
    },
    {
      title: 'Emergency Response',
      description: 'Analyzing emergency calls and dispatch audio for faster response times',
      audioType: 'Emergency Call',
      detectedSounds: ['Sirens', 'Radio chatter', 'Background noise', 'Voice stress'],
      analysis: 'High-stress situation detected. Emergency services dispatched. Location triangulated successfully.',
      scenario: 'Emergency Dispatch',
      confidence: '99.2%'
    },
    {
      title: 'Smart City Monitoring',
      description: 'Urban soundscape analysis for traffic management and city planning',
      audioType: 'Urban Audio',
      detectedSounds: ['Traffic flow', 'Construction', 'Pedestrian movement', 'Weather'],
      analysis: 'Heavy traffic detected on main artery. Suggesting alternative routes for optimization.',
      scenario: 'City Center',
      confidence: '96.8%'
    },
    {
      title: 'Healthcare Monitoring',
      description: 'Patient monitoring through audio analysis for early warning systems',
      audioType: 'Medical Audio',
      detectedSounds: ['Breathing patterns', 'Heart rate', 'Medical equipment', 'Patient speech'],
      analysis: 'Patient vitals stable. Breathing pattern normal. No immediate medical attention required.',
      scenario: 'Hospital Ward',
      confidence: '97.3%'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % useCases.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-orbitron font-black mb-6 gradient-text"
            variants={itemVariants}
          >
            Real-World Applications
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            See how ALM transforms audio data into actionable insights across various industries
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="glassmorphism rounded-3xl p-8 min-h-[600px] relative overflow-hidden">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-primary/20 hover:bg-primary/40 rounded-full flex items-center justify-center transition-colors"
            >
              <FaChevronLeft className="w-6 h-6 text-primary" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-primary/20 hover:bg-primary/40 rounded-full flex items-center justify-center transition-colors"
            >
              <FaChevronRight className="w-6 h-6 text-primary" />
            </button>

            {/* Slide Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid lg:grid-cols-2 gap-8 items-center"
              >
                {/* Left Side - Audio Visualization */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {useCases[currentSlide].title}
                    </h3>
                    <p className="text-gray-300">
                      {useCases[currentSlide].description}
                    </p>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="bg-dark-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaVolumeUp className="w-5 h-5 text-secondary" />
                      <span className="text-lg font-semibold">Audio Analysis</span>
                      <span className="ml-auto text-sm text-gray-400">
                        {useCases[currentSlide].audioType}
                      </span>
                    </div>
                    
                    <div className="h-24 bg-dark-100 rounded-xl p-4 flex items-end gap-1 mb-4">
                      {Array.from({ length: 40 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="bg-gradient-to-t from-primary to-secondary rounded-sm opacity-70"
                          style={{
                            width: '6px',
                            height: `${Math.random() * 60 + 20}px`
                          }}
                          animate={{
                            height: [`${Math.random() * 60 + 20}px`, `${Math.random() * 60 + 20}px`],
                          }}
                          transition={{
                            duration: 0.5 + Math.random() * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaPlay className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-400">Live Analysis</span>
                      </div>
                      <div className="text-sm text-primary font-semibold">
                        Confidence: {useCases[currentSlide].confidence}
                      </div>
                    </div>
                  </div>

                  {/* Detected Sounds */}
                  <div className="bg-dark-200 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold mb-4 text-secondary">Detected Sounds</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {useCases[currentSlide].detectedSounds.map((sound, index) => (
                        <motion.div
                          key={sound}
                          className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {sound}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Analysis Results */}
                <div className="space-y-6">
                  <div className="bg-dark-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FaBrain className="w-5 h-5 text-accent" />
                      <span className="text-lg font-semibold">ALM Analysis</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/30">
                      <p className="text-gray-300 leading-relaxed">
                        {useCases[currentSlide].analysis}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-200 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">Scenario</div>
                      <div className="text-sm text-gray-300">{useCases[currentSlide].scenario}</div>
                    </div>
                    <div className="bg-dark-200 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-secondary mb-1">Accuracy</div>
                      <div className="text-sm text-gray-300">{useCases[currentSlide].confidence}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
