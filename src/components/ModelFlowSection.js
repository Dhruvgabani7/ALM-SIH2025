import React from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaCogs, FaBrain, FaChartLine } from 'react-icons/fa';

const ModelFlowSection = () => {
  const flowSteps = [
    {
      icon: FaMicrophone,
      title: 'Audio Input',
      description: 'Raw audio data from microphones, files, or live streams',
      color: 'primary',
      position: 'left'
    },
    {
      icon: FaCogs,
      title: 'Preprocessing',
      description: 'Noise reduction, normalization, and feature extraction',
      color: 'secondary',
      position: 'center'
    },
    {
      icon: FaBrain,
      title: 'Neural Processing',
      description: 'Multi-modal analysis using transformer architectures',
      color: 'accent',
      position: 'center'
    },
    {
      icon: FaChartLine,
      title: 'Output Generation',
      description: 'Structured insights, transcriptions, and contextual analysis',
      color: 'primary',
      position: 'right'
    }
  ];

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

  const arrowVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
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
            ALM Processing Pipeline
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            How ALM transforms raw audio into intelligent insights
          </motion.p>
        </motion.div>

        {/* Flow Visualization */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* SVG Arrows */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 400"
            fill="none"
          >
            <motion.path
              d="M150 200 L350 200"
              stroke="url(#gradient1)"
              strokeWidth="3"
              strokeLinecap="round"
              variants={arrowVariants}
            />
            <motion.path
              d="M450 200 L650 200"
              stroke="url(#gradient2)"
              strokeWidth="3"
              strokeLinecap="round"
              variants={arrowVariants}
            />
            <motion.path
              d="M750 200 L950 200"
              stroke="url(#gradient3)"
              strokeWidth="3"
              strokeLinecap="round"
              variants={arrowVariants}
            />
            
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FF88" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF0080" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF0080" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00FF88" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Flow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center relative ${
                    step.color === 'primary' ? 'bg-primary/20 text-primary' :
                    step.color === 'secondary' ? 'bg-secondary/20 text-secondary' :
                    'bg-accent/20 text-accent'
                  }`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-10 h-10" />
                  <div className={`absolute inset-0 rounded-full border-2 ${
                    step.color === 'primary' ? 'border-primary' :
                    step.color === 'secondary' ? 'border-secondary' :
                    'border-accent'
                  } opacity-50 animate-pulse`}></div>
                </motion.div>
                
                <h3 className="text-xl font-bold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="glassmorphism rounded-2xl p-6 text-center"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl font-bold text-primary mb-2">Multi-Modal</div>
            <div className="text-gray-300">Processes speech, non-speech, and contextual audio simultaneously</div>
          </motion.div>
          
          <motion.div
            className="glassmorphism rounded-2xl p-6 text-center"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl font-bold text-secondary mb-2">Transformer</div>
            <div className="text-gray-300">Advanced attention mechanisms for contextual understanding</div>
          </motion.div>
          
          <motion.div
            className="glassmorphism rounded-2xl p-6 text-center"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="text-3xl font-bold text-accent mb-2">Real-Time</div>
            <div className="text-gray-300">Optimized for low-latency processing and live analysis</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModelFlowSection;
