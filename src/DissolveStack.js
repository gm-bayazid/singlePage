import React from 'react';
import { motion } from 'framer-motion';
import './DissolveStack.css';
import PropTypes from 'prop-types';

/**
 * DissolveStack Component
 * 
 * Props:
 * - image: image source (SVG, PNG, etc.)
 * - layers: number of stacked layers (default: 3)
 * - animateStack: boolean to control animation (default: true)
 * - tintHueStep: degrees to hue-rotate per layer (default: 0 = no color shift)
 */

const dissolveVariants = {
  initial: i => ({
    opacity: 0,
    scale: 0.95,
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

const DissolveStack = ({ image, layers = 3, animateStack = true, tintHueStep = 0, className = '', style = {} }) => {
  const imageArray = Array.from({ length: layers }, () => image);

  return (
    <div className={`stack-wrapper${className ? ' ' + className : ''}`} style={style}>
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
              transform: `scale(${1 - i * 0.05}) translateY(${i * 6}px)`,
              filter: `blur(${i}px) brightness(${1 - i * 0.1}) hue-rotate(${i * tintHueStep}deg)`,
              opacity: 1 - i * 0.1
            }}
          />
        ))}
      </div>
      {/* This is the real image that takes up vertical space */}
      <img src={image} alt="Stacked visual effect placeholder" className="stack-placeholder" />
    </div>
  );
};

DissolveStack.propTypes = {
  image: PropTypes.string.isRequired,
  layers: PropTypes.number,
  animateStack: PropTypes.bool,
  tintHueStep: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
};

export default DissolveStack;
