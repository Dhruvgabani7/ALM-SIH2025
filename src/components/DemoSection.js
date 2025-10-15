import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaMicrophone, FaPlay, FaPause, FaWaveSquare } from 'react-icons/fa';

const DemoSection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [waveformData, setWaveformData] = useState([]);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const mockAnalysisResults = [
    {
      type: 'speech',
      content: 'Detected speech in English with 95% confidence',
      details: 'Speaker appears to be discussing travel plans with emotional undertones'
    },
    {
      type: 'environment',
      content: 'Background noise: Airport terminal sounds',
      details: 'Detected airplane engines, announcements, and crowd noise'
    },
    {
      type: 'reasoning',
      content: 'Contextual Analysis Complete',
      details: 'Person is likely at an airport terminal, possibly waiting for a flight. Emotional state suggests excitement or anxiety about travel.'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Simulate analysis after upload
      setTimeout(() => {
        setAnalysisResult(mockAnalysisResults);
      }, 2000);
    }
  };

  // Enhanced waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerY = canvas.height / 2;
      const amplitude = isRecording ? 40 : 20;
      const frequency = 0.02;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#38BDF8');
      gradient.addColorStop(0.5, '#8B5CF6');
      gradient.addColorStop(1, '#FACC15');
      
      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(43,156,255,0.8)';
      ctx.shadowBlur = 10;
      
      for (let x = 0; x < canvas.width; x += 2) {
        const y = centerY + Math.sin(x * frequency + time) * amplitude * (isRecording ? 1.5 : 1);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      time += isRecording ? 0.2 : 0.1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isRecording]);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // Simulate recording and analysis
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setAnalysisResult(mockAnalysisResults);
      }, 3000);
    }
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

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
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
            Try ALM Demo
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Upload an audio file or record live to see ALM's capabilities in action
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Input Section */}
          <motion.div
            className="glassmorphism rounded-3xl p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Audio Input</h3>
            
            {/* Upload Area */}
            <div
              className="border-2 border-dashed border-primary rounded-2xl p-8 text-center mb-6 cursor-pointer hover:border-secondary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FaUpload className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-lg mb-2">Click to upload audio file</p>
              <p className="text-sm text-gray-400">Supports MP3, WAV, M4A formats</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Record Button */}
            <motion.button
              className={`w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 ${
                isRecording
                  ? 'bg-accent text-white animate-pulse'
                  : 'bg-gradient-to-r from-primary to-secondary text-white'
              }`}
              onClick={handleRecord}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaMicrophone className="w-6 h-6" />
              {isRecording ? 'Recording...' : 'Record Live Audio'}
            </motion.button>

            {/* Enhanced Waveform Visualization */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaWaveSquare className="text-primary" />
                Audio Waveform
              </h4>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-24 bg-dark-200 rounded-xl border border-primary/30"
                  style={{ width: '100%', height: '96px' }}
                />
                {isRecording && (
                  <motion.div
                    className="absolute top-2 right-2 flex items-center gap-2 text-accent"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm font-semibold">REC</span>
                  </motion.div>
                )}
              </div>
              
              {/* Dynamic Bars for additional visualization */}
              <div className="mt-4 h-16 bg-dark-200 rounded-xl p-4 flex items-end gap-1">
                {Array.from({ length: 64 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-t from-primary to-secondary rounded-sm opacity-70"
                    style={{
                      width: '3px',
                      height: `${Math.random() * 40 + 10}px`
                    }}
                    animate={{
                      height: [
                        `${Math.random() * 40 + 10}px`, 
                        `${Math.random() * 40 + 10}px`
                      ],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 0.3 + Math.random() * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.01
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            className="glassmorphism rounded-3xl p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-6 text-secondary">ALM Analysis</h3>
            
            <AnimatePresence>
              {analysisResult ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {analysisResult.map((result, index) => (
                    <motion.div
                      key={index}
                      className="bg-dark-200 rounded-xl p-6 border border-primary/30 relative overflow-hidden group"
                      initial={{ opacity: 0, x: 20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      whileHover={{ 
                        scale: 1.02, 
                        borderColor: 'rgba(0, 255, 136, 0.5)',
                        boxShadow: '0 10px 30px rgba(0, 255, 136, 0.2)'
                      }}
                    >
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      
                      <div className="flex items-start gap-4 relative z-10">
                        <motion.div 
                          className={`w-4 h-4 rounded-full mt-2 ${
                            result.type === 'speech' ? 'bg-primary' :
                            result.type === 'environment' ? 'bg-secondary' : 'bg-accent'
                          }`}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />
                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-white group-hover:text-primary transition-colors">
                            {result.content}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{result.details}</p>
                          
                          {/* Confidence indicator */}
                          <motion.div
                            className="mt-3 flex items-center gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 + 0.5 }}
                          >
                            <div className="text-xs text-gray-400">Confidence:</div>
                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                              <motion.div
                                className={`h-full rounded-full ${
                                  result.type === 'speech' ? 'bg-primary' :
                                  result.type === 'environment' ? 'bg-secondary' : 'bg-accent'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: '95%' }}
                                transition={{ delay: index * 0.2 + 0.8, duration: 0.8 }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">95%</span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400">Upload or record audio to see ALM analysis</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
