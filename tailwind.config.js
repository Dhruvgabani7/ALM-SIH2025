module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // switched primary/secondary/accent to blue-themed palette
        primary: '#2B9CFF',
        secondary: '#5AC8FF',
        accent: '#8FD3FF',
        dark: {
          100: '#0a0a0a',
          200: '#1a1a2e',
          300: '#16213e',
          400: '#0f172a',
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
          'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(43, 156, 255, 0.5)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(43, 156, 255, 0.8), 0 0 60px rgba(90, 200, 255, 0.6)' 
          },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.2)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
          'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(43, 156, 255, 0.3), 0 0 40px rgba(90, 200, 255, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(43, 156, 255, 0.6), 0 0 60px rgba(90, 200, 255, 0.4)' 
          },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}
