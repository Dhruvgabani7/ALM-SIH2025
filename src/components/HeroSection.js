import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone } from 'react-icons/fa';
import FloatingIcons from './FloatingIcons';

const HeroSection = () => {
  const canvasRef = useRef(null);
  // use refs for frequent updates so we don't re-create the animation loop on every mouse move
  const isHoveringRef = useRef(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize enhanced waveform animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    let lastTs = performance.now();
    const smoothedMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = (ts) => {
      const delta = (ts - lastTs) / 1000; // seconds
      lastTs = ts;

      // Smoothly follow the mouse to avoid jittery interactive effects
      smoothedMouse.x += (mousePositionRef.current.x - smoothedMouse.x) * Math.min(1, 6 * delta);
      smoothedMouse.y += (mousePositionRef.current.y - smoothedMouse.y) * Math.min(1, 6 * delta);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / 80) * 1.5;
      const spacing = 2;
      let x = 0;

      for (let i = 0; i < 80; i++) {
        // Multi-layered wave effect with phase shifts
        const wave1 = Math.sin(time + i * 0.15) * 0.3;
        const wave2 = Math.sin(time * 0.7 + i * 0.25) * 0.2;
        const wave3 = Math.cos(time * 0.5 + i * 0.1) * 0.15;
        const baseAmplitude = wave1 + wave2 + wave3 + 0.35;

        const hoverMultiplier = isHoveringRef.current ? 1.25 : 1;
        const amplitude = Math.abs(baseAmplitude) * hoverMultiplier;
  const barHeightRaw = amplitude * canvas.height * 0.45;
  const barHeight = Number.isFinite(barHeightRaw) ? Math.max(0, barHeightRaw) : 0;

        // Calculate distance from smoothed mouse for interactive glow
        const mouseDistance = Math.hypot(smoothedMouse.x - x, smoothedMouse.y - canvas.height / 2);
        const mouseEffect = Math.max(0, 1 - mouseDistance / 300);

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(x, canvas.height / 2 - barHeight / 2, x, canvas.height / 2 + barHeight / 2);

  // Dynamic color based on position and amplitude
  // Blue theme: hue range approx 200-240
  const hueRaw = (i / 80) * 40 + 200; // Blue range
  const hue = Number.isFinite(hueRaw) ? hueRaw : 140;
  const saturationRaw = 70 + amplitude * 30;
  const saturation = Number.isFinite(saturationRaw) ? Math.max(0, Math.min(100, saturationRaw)) : 70;
  const lightnessRaw = 45 + amplitude * 20 + mouseEffect * 12;
  const lightness = Number.isFinite(lightnessRaw) ? Math.max(0, Math.min(100, lightnessRaw)) : 45;
  const alphaRaw = 0.6 + amplitude * 0.25 + mouseEffect * 0.18;
  const alpha = Number.isFinite(alphaRaw) ? Math.max(0, Math.min(1, alphaRaw)) : 0.6;

        gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness + 10}%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness - 10}%, ${alpha * 0.8})`);

        ctx.fillStyle = gradient;

  // Enhanced glow effect
  const glowIntensityRaw = isHoveringRef.current ? 18 + mouseEffect * 12 : 10;
  const glowIntensity = Number.isFinite(glowIntensityRaw) ? Math.max(0, glowIntensityRaw) : 10;
  ctx.shadowBlur = glowIntensity;
  // Compose a safe shadow color
  const shadowAlpha = Number.isFinite(alpha) ? Math.max(0, Math.min(1, alpha * 0.8)) : 0.5;
  ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${shadowAlpha})`;

        // Rounded bars for smoother look
        ctx.beginPath();
        const radius = barWidth / 2;
        const y = canvas.height / 2 - barHeight / 2;
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, barHeight, radius);
        } else {
          // fallback rounded rect
          const r = Math.min(radius, barHeight / 2);
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + barWidth, y, x + barWidth, y + barHeight, r);
          ctx.arcTo(x + barWidth, y + barHeight, x, y + barHeight, r);
          ctx.arcTo(x, y + barHeight, x, y, r);
          ctx.arcTo(x, y, x + barWidth, y, r);
          ctx.closePath();
        }
        ctx.fill();

        x += barWidth + spacing;
      }

      // advance time based on real delta for consistent smooth motion
      const baseSpeed = 1.2; // tweak for perceived speed
      const hoverSpeedMultiplier = isHoveringRef.current ? 1.6 : 1;
      time += delta * baseSpeed * hoverSpeedMultiplier;

      animationId = requestAnimationFrame(animate);
    };

  // Start the animation using requestAnimationFrame so the `ts` timestamp is provided
  animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleMouseMove = (e) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -3,
      boxShadow: "0 10px 30px rgba(0, 255, 136, 0.4)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        onMouseLeave={() => { isHoveringRef.current = false; }}
    >
      {/* Background Waveform */}
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-40 transition-opacity duration-300"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Parallax Background Layers */}
      <div className="absolute inset-0 z-1">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-secondary/5 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/3 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating Icons */}
      <FloatingIcons />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Microphone Icon */}
        <motion.div
          className="mb-12 flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 text-primary flex items-center justify-center relative">
              <FaMicrophone className="w-full h-full text-[#2B9CFF] drop-shadow-[0_0_20px_rgba(43,156,255,0.4)]" />
              <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(43,156,255,0.12)', filter: 'blur(6px)' }}></div>
              <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'rgba(124,203,255,0.45)', opacity: 0.5 }}></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Headlines */}
        <motion.div className="mb-10" variants={itemVariants}>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black mb-2 uppercase tracking-tight"
            variants={containerVariants}
          >
            <motion.span className="gradient-text-blue inline-block" variants={wordVariants}>
              ALM
            </motion.span>
            <motion.span className="text-white mx-3 md:mx-6" variants={wordVariants}>
              —
            </motion.span>
          </motion.h1>
          
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold uppercase tracking-wide mb-6"
            variants={containerVariants}
          >
            <motion.span className="text-white" variants={wordVariants}>
              Listen
            </motion.span>
            <motion.span className="text-primary mx-2" variants={wordVariants}>
              .
            </motion.span>
            <motion.span className="text-white" variants={wordVariants}>
              Think
            </motion.span>
            <motion.span className="text-primary mx-2" variants={wordVariants}>
              .
            </motion.span>
            <motion.span className="text-white" variants={wordVariants}>
              Understand
            </motion.span>
            <motion.span className="text-primary mx-2" variants={wordVariants}>
              .
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
            variants={itemVariants}
          >
            AI that recognizes speech, non-speech sounds, and understands context in multiple languages.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <motion.button
            className="relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full text-lg uppercase tracking-wider overflow-hidden group"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={{ boxShadow: "0 0 30px rgba(0, 255, 136, 0.3)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaMicrophone className="w-5 h-5" />
              </motion.div>
              Try Demo
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            {/* Ripple Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/30"
              initial={{ scale: 0, opacity: 1 }}
              whileHover={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            className="relative px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full text-lg uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 overflow-hidden group"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span className="relative z-10">Learn More</span>
            {/* Animated Underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary opacity-0"
              whileHover={{ 
                opacity: 1,
                boxShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
                scale: 1.1
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
