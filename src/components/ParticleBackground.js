import React from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = async (container) => {
    console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            // disable hover interactions so cursor does not move the constellation
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 3,
            },
            repulse: {
              // shorter, gentler repulse so cursor doesn't freeze motion
              distance: 120,
              duration: 0.15
            },
          },
        },
        particles: {
          color: {
            value: ["#8FD3FF", "#5AC8FF", "#2B9CFF"],
          },
          links: {
            color: "#7CCBFF",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.6,
            straight: false,
            // reduce abrupt changes
            warp: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticleBackground;
