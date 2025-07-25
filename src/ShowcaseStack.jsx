import React from 'react';
import { motion } from 'framer-motion';
import img4 from './assets/dashboard_straight.svg';
import './ShowcaseStack.css';

/**
 * ShowcaseStack with DissolveStack-style animation
 * Props:
 * - layers: number of stacked layers (default: 3)
 * - animateStack: boolean to control animation (default: true)
 * - tintHueStep: degrees to hue-rotate per layer (default: 0)
 */

const dissolveVariants = {
  initial: i => ({
    opacity: 0,
    scale: 1.05,
    filter: 'blur(4px)'
  }),
  animate: i => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.4,
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
};

const ShowcaseStack = ({ animateStack = true, layers = 3, tintHueStep = 0 }) => {
  const imageArray = Array.from({ length: layers }, () => img4);
  return (
    <div className="stack-wrapper">
      <div className="stack-layer-container">
        {imageArray.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            className="stack-image"
            custom={i}
            initial="initial"
            animate={animateStack ? 'animate' : 'initial'}
            variants={dissolveVariants}
            style={{
              zIndex: imageArray.length - i,
              transformStyle: 'preserve-3d',
              transform: `scale(${1 - i * 0.05}) translateY(${-i * 6}px)`,
              filter: `blur(${i}px) brightness(${1 - i * 0.1}) hue-rotate(${i * tintHueStep}deg)`,
              opacity: 1 - i * 0.1
            }}
          />
        ))}
      </div>
      {/* This is the real image that takes up vertical space */}
      <img src={img4} alt="Showcase visual effect placeholder" className="stack-placeholder" />
    </div>
  );
};

export default ShowcaseStack;