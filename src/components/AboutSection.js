import React from 'react';
import { motion } from 'framer-motion';
import { FaMicrochip, FaNetworkWired, FaDatabase, FaShieldAlt, FaRocket } from 'react-icons/fa';

const AboutSection = () => {
  const technologies = [
    {
      icon: FaMicrochip,
      title: 'Neural Architecture',
      description: 'Advanced transformer-based models optimized for multi-modal audio processing',
      specs: ['Transformer Layers: 24', 'Parameters: 2.3B', 'Attention Heads: 16']
    },
    {
      icon: FaNetworkWired,
      title: 'Multi-Modal Fusion',
      description: 'Seamless integration of speech, non-speech, and contextual audio analysis',
      specs: ['Fusion Layers: 8', 'Cross-Attention: Enabled', 'Context Window: 30s']
    },
    {
      icon: FaDatabase,
      title: 'Training Data',
      description: 'Extensive datasets covering diverse languages, accents, and audio scenarios',
      specs: ['Languages: 50+', 'Hours: 100K+', 'Scenarios: 1000+']
    },
    {
      icon: FaShieldAlt,
      title: 'Privacy & Security',
      description: 'End-to-end encryption and privacy-preserving processing techniques',
      specs: ['Encryption: AES-256', 'Privacy: Differential', 'Compliance: GDPR']
    }
  ];

  const milestones = [
    { year: '2020', event: 'Initial Research & Development' },
    { year: '2021', event: 'First Neural Architecture Prototype' },
    { year: '2022', event: 'Multi-Modal Fusion Implementation' },
    { year: '2023', event: 'Real-Time Processing Optimization' },
    { year: '2024', event: 'Production Deployment & Scaling' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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
            Technology & Innovation
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Cutting-edge AI technology powering the future of audio understanding
          </motion.p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              className="glassmorphism rounded-3xl p-8 group hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-6">
                <motion.div
                  className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/30 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <tech.icon className="w-8 h-8" />
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    {tech.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {tech.description}
                  </p>
                  
                  <div className="space-y-2">
                    {tech.specs.map((spec, specIndex) => (
                      <motion.div
                        key={spec}
                        className="text-sm text-primary/80 font-mono"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: specIndex * 0.1 }}
                      >
                        {spec}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Neural Network Visualization */}
        <motion.div
          className="glassmorphism rounded-3xl p-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">
            Neural Network Architecture
          </h3>
          
          <div className="relative h-64 flex items-center justify-center">
            {/* Simplified Neural Network Visualization */}
            <div className="flex items-center gap-8">
              {/* Input Layer */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center text-sm text-gray-400 mb-2">Input</div>
                {Array.from({ length: 3 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>

              {/* Hidden Layers */}
              {Array.from({ length: 3 }, (_, layerIndex) => (
                <motion.div
                  key={layerIndex}
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: layerIndex * 0.2 }}
                >
                  <div className="text-center text-xs text-gray-400 mb-2">
                    Layer {layerIndex + 1}
                  </div>
                  {Array.from({ length: 4 }, (_, i) => (
                    <motion.div
                      key={i}
                      className={`w-6 h-6 rounded-full ${
                        layerIndex === 1 ? 'bg-secondary' : 'bg-accent'
                      }`}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </motion.div>
              ))}

              {/* Output Layer */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center text-sm text-gray-400 mb-2">Output</div>
                {Array.from({ length: 2 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {Array.from({ length: 12 }, (_, i) => (
                <motion.line
                  key={i}
                  x1="20%"
                  y1={`${20 + (i * 5)}%`}
                  x2="80%"
                  y2={`${30 + (i * 3)}%`}
                  stroke="url(#neuralGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                />
              ))}
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF0080" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="glassmorphism rounded-3xl p-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-secondary">
            Development Timeline
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-dark-200 rounded-xl p-4 inline-block">
                      <div className="text-lg font-bold text-primary mb-1">
                        {milestone.year}
                      </div>
                      <div className="text-gray-300">
                        {milestone.event}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-dark-100 relative z-10"></div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
