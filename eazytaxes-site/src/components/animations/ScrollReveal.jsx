import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// Premium Financialist-style easing (very smooth deceleration)
export const premiumEase = [0.22, 1, 0.36, 1];
const defaultDuration = 1.2;
const defaultViewport = { once: true, margin: "-10%" };

// Helper to convert "delay-100" or 0.1 into seconds for Framer Motion
export const parseDelay = (delay) => {
  if (typeof delay === 'number') return delay;
  if (typeof delay === 'string' && delay.startsWith('delay-')) {
    const ms = parseInt(delay.replace('delay-', ''), 10);
    return isNaN(ms) ? 0 : ms / 1000;
  }
  return 0;
};

// 1. Standard FadeUp (Longer, sweeping reveal)
export function FadeUp({ children, delay = 0, className = '' }) {
  const parsedDelay = parseDelay(delay);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: defaultDuration, ease: premiumEase, delay: parsedDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. Slide In Left
export function SlideInLeft({ children, delay = 0, className = '' }) {
  const parsedDelay = parseDelay(delay);
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={defaultViewport}
      transition={{ duration: defaultDuration, ease: premiumEase, delay: parsedDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. Slide In Right
export function SlideInRight({ children, delay = 0, className = '' }) {
  const parsedDelay = parseDelay(delay);
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={defaultViewport}
      transition={{ duration: defaultDuration, ease: premiumEase, delay: parsedDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Fade Scale (Great for cards and images)
export function FadeScale({ children, delay = 0, className = '' }) {
  const parsedDelay = parseDelay(delay);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: defaultDuration + 0.2, ease: premiumEase, delay: parsedDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 5. StaggerChildren (for Grids)
export function StaggerChildren({ children, className = '', staggerDelay = 0.15, delay = 0 }) {
  const parsedDelay = parseDelay(delay);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: parsedDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: defaultDuration, ease: premiumEase },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div key={child.key || index} variants={itemVariants} className={child.props.className}>
            {React.cloneElement(child, { className: '' })}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// 6. RevealText: Essential for high-end typography reveals (words slide up from behind a mask)
export function RevealText({ text, className = '', delay = 0 }) {
  const parsedDelay = parseDelay(delay);
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: parsedDelay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 100,
        ease: premiumEase
      },
    },
    hidden: {
      opacity: 0,
      y: "120%",
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <span className="overflow-hidden pb-2 mr-[0.25em]" key={index}>
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

// 7. ParallaxImage: Slight image scrolling parallax 
export function ParallaxImage({ src, alt, className = '', containerClassName = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // slightly slower than scroll speed
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${containerClassName}`}>
      <motion.div style={{ y, height: '120%' }} className="absolute -top-[10%] left-0 w-full bg-surface-container-low">
        <img src={src} alt={alt} className={`object-cover w-full h-full ${className}`} />
      </motion.div>
    </div>
  );
}

// 8. VerticalScrollLine
export function VerticalScrollLine({ className = '', height = "100%" }) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`relative w-[2px] bg-outline-variant/30 overflow-hidden ${className}`} style={{ height }}>
      <motion.div 
        className="absolute top-0 left-0 w-full bg-secondary origin-top"
        style={{ scaleY, height: '100%' }}
      />
    </div>
  );
}
