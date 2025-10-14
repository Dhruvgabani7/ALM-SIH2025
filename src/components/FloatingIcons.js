import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaVolumeUp, FaBrain } from 'react-icons/fa';

const FloatingIcons = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  const icons = [
    { 
      Icon: FaMicrophone, 
      label: 'Speech Detection', 
      description: 'Advanced neural networks that accurately transcribe spoken words with 99.7% precision',
      position: 'top-20 left-20',
      color: 'text-primary-green',
      movement: 'circular'
    },
    { 
      Icon: FaVolumeUp, 
      label: 'Sound Analysis', 
      description: 'Identifies and categorizes environmental sounds, music, and other audio elements',
      position: 'top-40 right-32',
      color: 'text-secondary-cyan',
      movement: 'vertical'
    },
    { 
      Icon: FaBrain, 
      label: 'Contextual Reasoning', 
      description: 'AI-powered understanding of conversation flow, intent, and situational context',
      position: 'bottom-32 left-32',
      color: 'text-accent-pink',
      movement: 'figure8'
    },
  ];

  const getMovementAnimation = (movement, index) => {
    switch (movement) {
      case 'circular':
        return {
          x: [0, 30, 0, -30, 0],
          y: [0, -30, 0, 30, 0],
          rotate: [0, 90, 180, 270, 360],
        };
      case 'vertical':
        return {
          y: [0, -40, 0],
          x: [0, 10, -10, 0],
        };
      case 'figure8':
        return {
          x: [0, 20, 0, -20, 0],
          y: [0, -20, 0, 20, 0],
          rotate: [0, 45, 0, -45, 0],
        };
      default:
        return {
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        };
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      {icons.map(({ Icon, label, description, position, color, movement }, index) => (
        <motion.div
          key={label}
          className={`absolute ${position} w-16 h-16 ${color} opacity-80 pointer-events-auto cursor-pointer`}
          animate={getMovementAnimation(movement, index)}
          transition={{
            duration: 6 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
          whileHover={{
            scale: 1.3,
            opacity: 1,
            transition: { duration: 0.3 }
          }}
          onHoverStart={() => setHoveredIcon(label)}
          onHoverEnd={() => setHoveredIcon(null)}
        >
          <Icon className="w-full h-full drop-shadow-lg" />
          <div className={`absolute inset-0 rounded-full bg-current opacity-20 animate-pulse`}></div>
          
          {/* Tooltip */}
          {hoveredIcon === label && (
            <motion.div
              className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg border border-primary/30 max-w-xs"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-semibold text-primary mb-1">{label}</div>
              <div className="text-xs text-gray-300">{description}</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
