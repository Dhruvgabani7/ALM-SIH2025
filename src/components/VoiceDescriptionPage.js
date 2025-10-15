import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUpload, FaFileAudio, FaCheck } from 'react-icons/fa';

// Modern mic icon with animated gradients and internal waveform
const ModernMicIcon = ({ size = 48, isActive = false }) => {
  const glow = isActive ? '0 0 25px rgba(236,72,153,0.55), 0 0 45px rgba(59,130,246,0.45)' : '0 0 15px rgba(148,163,184,0.35)';
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(${glow})` }}
      initial={false}
      animate={{ scale: isActive ? [1, 1.06, 1] : 1 }}
      transition={isActive ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      {/* defs */}
      <defs>
        <linearGradient id="micBodyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isActive ? '#ec4899' : '#94a3b8'} />
          <stop offset="100%" stopColor={isActive ? '#3b82f6' : '#e2e8f0'} />
        </linearGradient>
        <linearGradient id="micShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* stem */}
      <motion.rect x="29" y="40" width="6" height="10" rx="3" fill="url(#micBodyGrad)" />
      {/* base */}
      <motion.rect x="20" y="50" width="24" height="6" rx="3" fill="url(#micBodyGrad)" />

      {/* capsule */}
      <motion.rect
        x="20"
        y="8"
        width="24"
        height="34"
        rx="12"
        stroke="url(#micBodyGrad)"
        strokeWidth="2.5"
        fill="rgba(255,255,255,0.06)"
      />

      {/* internal moving waveform lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={i}
          x1={24}
          x2={40}
          y1={16 + i * 6}
          y2={16 + i * 6}
          stroke={isActive ? '#ffffff' : '#e5e7eb'}
          strokeOpacity={isActive ? 0.9 : 0.5}
          strokeWidth={1.8}
          initial={false}
          animate={isActive ? { x1: [24, 28, 24], x2: [40, 36, 40] } : { x1: 24, x2: 40 }}
          transition={isActive ? { duration: 0.9 + i * 0.05, repeat: Infinity, ease: 'easeInOut' } : {}}
        />
      ))}

      {/* highlight shine */}
      <motion.rect x="22" y="10" width="8" height="30" rx="4" fill="url(#micShine)" opacity={0.35} />

      {/* bottom arc glow when active */}
      {isActive && (
        <motion.path
          d="M16 40c0 8.837 7.163 16 16 16s16-7.163 16-16"
          stroke="#ec4899"
          strokeOpacity={0.65}
          strokeWidth={2}
          fill="none"
          animate={{ pathLength: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.svg>
  );
};

const VoiceDescriptionPage = ({ onBack }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (window.recordingInterval) {
        clearInterval(window.recordingInterval);
        window.recordingInterval = null;
      }
    };
  }, []);

  const [showShards, setShowShards] = useState(false);
  const [shardKey, setShardKey] = useState(0);

  const handleStartRecording = async () => {
    setIsRecording(true);
    // One-time unique shard burst
    setShowShards(true);
    setShardKey((k) => k + 1);
    setTimeout(() => setShowShards(false), 900);
    setRecordingDuration(0);

    // Start MediaRecorder
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : undefined });
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(blob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
    } catch (err) {
      console.error('Microphone access error:', err);
      setAnalysisError('Microphone access denied. Please enable mic permissions.');
      setIsRecording(false);
      return;
    }
    
    // Simulate recording duration counter
    const interval = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
    
    // Store interval ID for cleanup
    window.recordingInterval = interval;
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (window.recordingInterval) {
      clearInterval(window.recordingInterval);
      window.recordingInterval = null;
    }
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
      }
    } catch (e) {
      // no-op
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setIsUploading(true);
      setUploadedFile(file);
      
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        setShowUploadSuccess(true);
        setTimeout(() => setShowUploadSuccess(false), 2000);
      }, 1500);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCreateVoice = async () => {
    setAnalysisError(null);
    setAnalysisResult(null);
    const sourceFile = uploadedFile || recordedBlob;
    if (!sourceFile) return;
    setIsCreating(true);
    try {
      const apiBase = process.env.REACT_APP_API_BASE || '';
      const endpoint = `${apiBase}/api/alm/analyze`;
      const form = new FormData();
      form.append('audio', sourceFile, uploadedFile ? uploadedFile.name : 'recording.webm');
      // You can append additional params if needed, e.g. language, model, etc.
      // form.append('language', 'en');

      const res = await fetch(endpoint, {
        method: 'POST',
        body: form,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }
      const json = await res.json().catch(() => ({}));
      setAnalysisResult(json);
    } catch (err) {
      console.error('Analyze error:', err);
      setAnalysisError('Failed to analyze audio. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      className="flex overflow-hidden relative justify-center items-center p-4 min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background Video */}
      <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="object-cover w-full h-full"
          style={{
            filter: 'brightness(0.55) saturate(1.4) contrast(1.2)',
            transform: 'scale(1.05)',
          }}
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        
        {/* Video Overlay for better text readability */}
        <div className="video-overlay"></div>
        {/* Animated conic gradient for vibrant motion (paused during recording for FPS) */}
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: isRecording ? 0.08 : 0.18,
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(34,211,238,0.35), rgba(139,92,246,0.35), rgba(99,102,241,0.35), rgba(236,72,153,0.3), rgba(34,211,238,0.35))'
          }}
          animate={isRecording ? { rotate: 0 } : { rotate: 360 }}
          transition={isRecording ? { duration: 0 } : { duration: 36, repeat: Infinity, ease: 'linear' }}
        />
        {/* Floating radial color spots (fully dimmed during recording) */}
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: isRecording ? 0.04 : 0.22,
            background: [
              'radial-gradient(40% 40% at 15% 20%, rgba(34,211,238,0.35) 0%, rgba(34,211,238,0) 60%)',
              'radial-gradient(35% 35% at 80% 30%, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0) 60%)',
              'radial-gradient(45% 45% at 50% 80%, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0) 60%)'
            ].join(',')
          }}
          animate={isRecording ? { opacity: 0.04 } : { backgroundPosition: ['0% 0%, 100% 0%, 0% 100%', '100% 100%, 0% 100%, 100% 0%'] }}
          transition={isRecording ? { duration: 0.25 } : { duration: 28, repeat: Infinity, ease: 'linear' }}
        />
        {/* Very light color tint & vignette to preserve readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/6 to-pink-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t via-transparent from-black/6 to-black/4"></div>
      </div>

      {/* Subtle grain overlay for cinematic texture */}
      <div className="grain-overlay" />

      {/* Background Ripple Effect */}
      <div className="flex absolute inset-0 z-10 justify-center items-center">
        <div className="w-96 h-96 rounded-full border opacity-30 animate-pulse border-white/20"></div>
        <div className="absolute w-80 h-80 rounded-full border opacity-20 animate-pulse border-white/15" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 rounded-full border opacity-10 animate-pulse border-white/10" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="absolute top-6 left-6 z-10 p-3 text-gray-600 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 bg-white/80 hover:text-gray-800 hover:bg-white/90"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Main Card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl"
        variants={cardVariants}
      >
        {/* Animated gradient border wrapper */}
        <div className="rounded-3xl animated-border">
          <div className="p-8 rounded-3xl border shadow-2xl backdrop-blur-sm bg-white/0 md:p-12 border-white/20">
          {/* Title */}
          <motion.h1
            className="mb-4 text-3xl font-bold text-center text-white drop-shadow-lg md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Describe your voice
          </motion.h1>

          {/* Instruction */}
          <motion.p
            className="mb-8 text-lg text-center drop-shadow-md text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Click the microphone to record your voice description
          </motion.p>

          {/* Microphone Interface */}
          <motion.div
            className="flex relative flex-col items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            {/* Soft spotlight under mic */}
            <div className="absolute -bottom-6 w-56 h-16 bg-gradient-to-r rounded-full opacity-60 blur-2xl from-blue-500/30 via-fuchsia-500/25 to-emerald-400/30" />

            {/* Recording Duration Display */}
            {isRecording && (
              <motion.div
                className="mb-4 text-2xl font-bold text-red-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}
              </motion.div>
            )}

            {/* Advanced Mic Visuals */}
            {/* Rotating gradient ring */}
            {isRecording && (
              <motion.div
                className="absolute w-56 h-56 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(59,130,246,0.15), rgba(168,85,247,0.2), rgba(236,72,153,0.15), rgba(59,130,246,0.15))'
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
            )}

            {/* Circular equalizer bars (reduced count + transform-only for FPS) */}
            {isRecording && (
              <div className="absolute w-52 h-52 will-change-transform">
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 360) / 8;
                  const delay = (i % 4) * 0.14;
                  return (
                    <span key={`eq-${i}`} className="absolute top-1/2 left-1/2 origin-bottom" style={{ transform: `rotate(${angle}deg) translateY(-94px)` }}>
                      <motion.span
                        className="block w-1 rounded-full bg-cyan-300/80"
                        style={{ height: 16, transformOrigin: 'bottom center' }}
                        animate={{ scaleY: [0.7, 1.3, 0.85] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay }}
                      />
                    </span>
                  );
                })}
              </div>
            )}

            {/* Unique start shards burst */}
            {showShards && (
              <div key={`shards-${shardKey}`} className="absolute w-0 h-0 will-change-transform">
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 360) / 12;
                  const distance = 110;
                  const tx = Math.cos((angle * Math.PI) / 180) * distance;
                  const ty = Math.sin((angle * Math.PI) / 180) * distance;
                  const hue = 220 + (i * 18) % 120; // cyan/indigo/violet range
                  return (
                    <motion.span
                      key={`s-${i}`}
                      className="block absolute origin-left"
                      style={{
                        width: 28,
                        height: 4,
                        borderRadius: 2,
                        background: `linear-gradient(90deg, hsla(${hue},85%,65%,0.9), hsla(${(hue+30)%360},85%,60%,0.15))`,
                        boxShadow: `0 0 12px hsla(${hue},85%,60%,0.5)`
                      }}
                      initial={{ opacity: 0.9, x: 0, y: 0, rotate: angle - 5, scaleX: 0.6 }}
                      animate={{ opacity: 0, x: tx, y: ty, rotate: angle + 18, scaleX: 1.2 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  );
                })}
              </div>
            )}

            {/* Microphone Button */}
            <motion.button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-500 shadow-lg hover:bg-red-600 shadow-red-500/50' 
                  : 'bg-gray-800 shadow-lg hover:bg-gray-700 shadow-gray-800/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isRecording ? {
                scale: [1, 1.06, 1]
              } : {}}
              transition={isRecording ? {
                scale: { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
              } : {}}
            >
              <ModernMicIcon size={48} isActive={isRecording} />
              
              {/* Pulsing Ring Animation for Recording */}
              {isRecording && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-red-400"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-red-300"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-red-200"
                    animate={{
                      scale: [1, 2.1, 1],
                      opacity: [0.4, 0, 0.4]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6
                    }}
                  />
                </>
              )}
            </motion.button>

            {/* Status Text */}
            <motion.div
              className="mt-4 text-center"
              animate={{ opacity: isRecording || uploadedFile ? 1 : 0.7 }}
            >
              <p className="drop-shadow-sm text-white/70">
                {isRecording ? 'Recording... Click to stop' : 
                 uploadedFile ? `File uploaded: ${uploadedFile.name}` :
                 'Click to start recording'}
              </p>
              {analysisError && (
                <p className="mt-2 text-sm text-red-400">{analysisError}</p>
              )}
              {analysisResult && (
                <p className="mt-2 text-sm text-green-300">Analysis complete.</p>
              )}
              {uploadedFile && (
                <motion.p
                  className="mt-1 text-sm text-green-300 drop-shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  ✓ Audio file ready
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {/* Button Container */}
          <motion.div
            className="flex gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {/* Upload Button */}
            <motion.button
              onClick={handleUploadClick}
              disabled={isRecording || isUploading || isCreating}
              className={`flex-1 py-4 px-6 rounded-full flex items-center justify-center gap-3 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r ${
                isUploading 
                  ? 'from-blue-500 to-cyan-500 shadow-lg hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/50' 
                  : uploadedFile
                  ? 'from-emerald-500 to-lime-500 shadow-lg hover:from-emerald-600 hover:to-lime-600 shadow-green-500/50'
                  : 'shadow-lg from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 shadow-gray-700/50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={isUploading ? {
                scale: [1, 1.02, 1],
              } : {}}
              transition={isUploading ? {
                scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
              } : {}}
            >
              {isUploading ? (
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-white animate-spin border-t-transparent"
                />
              ) : showUploadSuccess ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <FaCheck className="w-5 h-5" />
                </motion.div>
              ) : (
                <FaUpload className="w-5 h-5" />
              )}
              {uploadedFile ? 'File Uploaded' : 'Upload Audio'}
            </motion.button>

            {/* Start Analyzing Button */}
            <motion.button
              onClick={handleCreateVoice}
              disabled={isCreating || (recordingDuration === 0 && !uploadedFile)}
              className="overflow-hidden relative flex-1 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-500 hover:to-fuchsia-500"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {isCreating ? (
                <div className="flex gap-3 justify-center items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-white animate-spin border-t-transparent"></div>
                  Creating voice...
                </div>
              ) : (
                <div className="flex gap-3 justify-center items-center">
                  <FaFileAudio className="w-5 h-5" />
                  Start Analyzing
                </div>
              )}
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
        </div>

        {/* Cancel Button */}
        <motion.button
          onClick={onBack}
          className="px-8 py-3 mt-6 w-full text-lg font-semibold text-white bg-gray-800 rounded-full"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          CANCEL
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default VoiceDescriptionPage;
