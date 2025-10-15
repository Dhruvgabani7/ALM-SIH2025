import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMicrophone, 
  FaHeart, 
  FaVolumeUp, 
  FaBrain, 
  FaGlobe,
  FaPlay,
  FaTimes,
  FaCheckCircle
} from 'react-icons/fa';

const FeaturesSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const features = [
    {
      icon: FaMicrophone,
      title: 'Speech Recognition',
      description: 'Advanced neural networks that accurately transcribe spoken words with 99.7% precision across multiple languages and accents.',
      color: 'primary',
      details: 'Our speech recognition engine uses transformer-based architecture with 24 layers and 2.3B parameters, achieving state-of-the-art accuracy across 50+ languages.',
      specs: ['99.7% Accuracy', '50+ Languages', 'Real-time Processing'],
      demoText: 'Try saying "Hello, how are you today?" in any language'
    },
    {
      icon: FaHeart,
      title: 'Paralinguistic Analysis',
      description: 'Deep analysis of tone, emotion, stress patterns, and vocal characteristics to understand the true meaning behind words.',
      color: 'secondary',
      details: 'Advanced emotion detection using multi-modal fusion of acoustic features, achieving 94% accuracy in emotion classification.',
      specs: ['94% Emotion Accuracy', '8 Emotion Categories', 'Cultural Context'],
      demoText: 'Detect emotions like happiness, sadness, anger, or surprise'
    },
    {
      icon: FaVolumeUp,
      title: 'Non-Speech Audio Detection',
      description: 'Identifies and categorizes environmental sounds, music, laughter, and other audio elements that provide crucial context.',
      color: 'accent',
      details: 'Environmental sound classification with 95% accuracy across 200+ sound categories including music, vehicles, and nature sounds.',
      specs: ['95% Sound Accuracy', '200+ Categories', 'Context Awareness'],
      demoText: 'Identify sounds like car engines, music, or bird songs'
    },
    {
      icon: FaBrain,
      title: 'Contextual Reasoning',
      description: 'AI-powered understanding of conversation flow, intent, and situational context to provide meaningful insights.',
      color: 'primary',
      details: 'Contextual understanding using attention mechanisms and memory networks to maintain conversation context over extended periods.',
      specs: ['Context Memory', 'Intent Recognition', 'Conversation Flow'],
      demoText: 'Understand conversation context and user intent'
    },
    {
      icon: FaGlobe,
      title: 'Multilingual Support',
      description: 'Seamlessly processes over 50 languages with native-level understanding of cultural nuances and regional dialects.',
      color: 'secondary',
      details: 'Cross-lingual processing with cultural adaptation, supporting regional dialects and cultural context understanding.',
      specs: ['50+ Languages', 'Cultural Adaptation', 'Dialect Support'],
      demoText: 'Process audio in multiple languages simultaneously'
    }
    ,
    {
      icon: FaHeart,
      title: 'Speech Emotion Detection',
      description: 'Identifies speaker emotions from vocal cues — happiness, sadness, anger, surprise, and more.',
      color: 'accent',
      details: 'State-of-the-art emotion classification using spectral, prosodic and deep-learned features. Accurate across demographics and noisy conditions.',
      specs: ['94% Emotion Accuracy', 'Real-time', '8 Emotion Categories'],
      demoText: 'Detect emotions like happiness, sadness, anger, or surprise in real-time'
    }
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary border-primary',
      secondary: 'text-secondary border-secondary',
      accent: 'text-accent border-accent'
    };
    return colorMap[color] || 'text-primary border-primary';
  };

  const getGlowClasses = (color) => {
    const glowMap = {
      primary: 'shadow-primary/30',
      secondary: 'shadow-secondary/30',
      accent: 'shadow-accent/30'
    };
    return glowMap[color] || 'shadow-primary/30';
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
            Advanced AI Capabilities
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Cutting-edge technology that understands every aspect of audio communication
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glassmorphism rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 ${getColorClasses(feature.color)} mb-6 relative cursor-pointer`}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.6 }
                }}
                onHoverStart={() => setHoveredIcon(feature.title)}
                onHoverEnd={() => setHoveredIcon(null)}
                onClick={() => setExpandedCard(expandedCard === feature.title ? null : feature.title)}
              >
                <motion.div
                  animate={hoveredIcon === feature.title ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <feature.icon className="w-full h-full" />
                </motion.div>
                <div className={`absolute inset-0 rounded-full bg-${feature.color}/20 animate-pulse`}></div>
                
                {/* Icon Glow Effect */}
                {hoveredIcon === feature.title && (
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-${feature.color}/30`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                {/* Demo Button */}
                <motion.button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getColorClasses(feature.color)} bg-transparent hover:bg-${feature.color} hover:text-white transition-all duration-300 text-sm font-medium`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay className="w-3 h-3" />
                  Try Demo
                </motion.button>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedCard === feature.title && (
                  <motion.div
                    className="absolute inset-0 bg-dark-card/95 backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                      onClick={() => setExpandedCard(null)}
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaTimes className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-white mb-4">{feature.title} Details</h4>
                      <p className="text-gray-300 mb-6">{feature.details}</p>
                      
                      <div className="grid grid-cols-1 gap-2 mb-6">
                        {feature.specs.map((spec, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <FaCheckCircle className="text-primary w-4 h-4" />
                            {spec}
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div
                        className="bg-primary/10 border border-primary/30 rounded-lg p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-primary font-semibold mb-2">Demo:</p>
                        <p className="text-gray-300 text-sm">{feature.demoText}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl shadow-2xl ${getGlowClasses(feature.color)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Feature - Full Width */}
        <motion.div
          className="mt-12 glassmorphism rounded-3xl p-8 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">Real-Time Processing</h3>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            ALM processes audio in real-time, providing instant insights and analysis. 
            Our optimized neural networks ensure low latency while maintaining the highest accuracy standards.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99.7%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">&lt;100ms</div>
              <div className="text-sm text-gray-400">Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">50+</div>
              <div className="text-sm text-gray-400">Languages</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
