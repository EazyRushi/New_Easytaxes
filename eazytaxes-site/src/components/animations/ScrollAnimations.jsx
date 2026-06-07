import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useInView } from 'framer-motion';

// ============================================================
// CONFIGURATION
// ============================================================
const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
const smoothConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ============================================================
// 1. ScrollFadeUp — Scrub-based fade + translate
// ============================================================
export function ScrollFadeUp({ children, className = '', offset = ["start end", "end start"], yRange = [60, 0, 0], opacityRange = [0, 1, 1] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 1], yRange);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], opacityRange);
  const smoothY = useSpring(y, springConfig);
  const smoothOpacity = useSpring(opacity, springConfig);

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY, opacity: smoothOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// 2. ScrollScale — Scrub-based scale animation
// ============================================================
export function ScrollScale({ children, className = '', scaleRange = [0.85, 1], opacityRange = [0, 1], offset = ["start end", "center center"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 0.5], opacityRange);
  const smoothScale = useSpring(scale, springConfig);
  const smoothOpacity = useSpring(opacity, springConfig);

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale, opacity: smoothOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// 3. ScrollParallax — Multi-speed parallax layer
// ============================================================
export function ScrollParallax({ children, className = '', speed = 0.5, direction = 'y', offset = ["start end", "end start"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const range = 100 * speed;
  const transform = useTransform(scrollYProgress, [0, 1], [`${-range}px`, `${range}px`]);
  const smoothTransform = useSpring(transform, smoothConfig);

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const style = direction === 'x' ? { x: smoothTransform } : { y: smoothTransform };

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================
// 4. ScrollRevealText — Word-by-word reveal tied to scroll
// ============================================================
export function ScrollRevealText({ text, className = '', tag: Tag = 'span' }) {
  const ref = useRef(null);
  const words = text.split(' ');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  if (prefersReducedMotion()) {
    return <Tag ref={ref} className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </Tag>
  );
}

function ScrollWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <span className="mr-[0.25em] overflow-hidden inline-block pb-[0.2em] mb-[-0.2em]">
      <motion.span style={{ opacity, y }} className="inline-block will-change-transform">
        {children}
      </motion.span>
    </span>
  );
}

// ============================================================
// 5. ScrollColorShift — Background color transition on scroll
// ============================================================
export function ScrollColorShift({ children, className = '', colors = ['#ffffff', '#f8f6f4'], offset = ["start end", "end start"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    colors.map((_, i) => i / (colors.length - 1)),
    colors
  );

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className} style={{ backgroundColor: colors[0] }}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ backgroundColor }} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================
// 6. StickySection — Sticky container with scroll-animated children
// ============================================================
export function StickySection({ children, className = '', height = '300vh' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {typeof children === 'function' ? children(scrollYProgress) : children}
      </div>
    </div>
  );
}

// ============================================================
// 7. HorizontalScroll — Horizontal scroll within vertical
// ============================================================
export function HorizontalScroll({ children, className = '', containerClassName = '' }) {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth - window.innerWidth);
    }
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -containerWidth]);
  const smoothX = useSpring(x, smoothConfig);

  if (prefersReducedMotion()) {
    return (
      <div className={`overflow-x-auto ${containerClassName}`}>
        <div ref={containerRef} className={`flex ${className}`}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={targetRef} style={{ height: `${containerWidth + window.innerHeight}px` }} className={containerClassName}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div ref={containerRef} style={{ x: smoothX }} className={`flex ${className}`}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================
// 8. ScrollCounter — Number count-up tied to scroll
// ============================================================
export function ScrollCounter({ target, suffix = '', prefix = '', className = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTimestamp = null;
      const duration = 1500; // 1.5 seconds count up
      let animationFrameId;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Ease out quad
        const easeProgress = progress * (2 - progress);
        const currentVal = easeProgress * target;
        
        setDisplayVal(decimals > 0 ? currentVal.toFixed(decimals) : Math.round(currentVal));

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setDisplayVal(decimals > 0 ? target.toFixed(decimals) : target);
        }
      };

      animationFrameId = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(animationFrameId);
    }
  }, [inView, target, decimals]);

  if (prefersReducedMotion()) {
    return <span ref={ref} className={className}>{prefix}{decimals > 0 ? target.toFixed(decimals) : target}{suffix}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}{displayVal}{suffix}
    </span>
  );
}


// ============================================================
// 9. ScrollRotate — Rotation tied to scroll
// ============================================================
export function ScrollRotate({ children, className = '', degrees = 360, offset = ["start end", "end start"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, degrees]);
  const smoothRotate = useSpring(rotate, smoothConfig);

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ rotate: smoothRotate }} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================
// 10. ScrollClipReveal — Clip-path reveal on scroll
// ============================================================
export function ScrollClipReveal({ children, className = '', direction = 'bottom', offset = ["start 0.85", "start 0.25"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const clipPaths = {
    bottom: {
      from: 'inset(100% 0 0 0)',
      to: 'inset(0% 0 0 0)',
    },
    top: {
      from: 'inset(0 0 100% 0)',
      to: 'inset(0 0 0% 0)',
    },
    left: {
      from: 'inset(0 100% 0 0)',
      to: 'inset(0 0% 0 0)',
    },
    right: {
      from: 'inset(0 0 0 100%)',
      to: 'inset(0 0 0 0%)',
    },
  };

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [clipPaths[direction].from, clipPaths[direction].to]
  );

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ clipPath }} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================
// 11. ScrollSlideIn — Scrub-based slide from any direction
// ============================================================
export function ScrollSlideIn({ children, className = '', direction = 'left', distance = 80, offset = ["start 0.9", "start 0.3"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const axes = {
    left: { prop: 'x', from: -distance },
    right: { prop: 'x', from: distance },
    up: { prop: 'y', from: -distance },
    down: { prop: 'y', from: distance },
  };

  const { prop, from } = axes[direction];
  const val = useTransform(scrollYProgress, [0, 1], [from, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const smoothVal = useSpring(val, springConfig);
  const smoothOpacity = useSpring(opacity, springConfig);

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ [prop]: smoothVal, opacity: smoothOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// 12. ScrollStagger — Scrub-based stagger for child elements
// ============================================================
export function ScrollStagger({ children, className = '', staggerAmount = 0.1, offset = ["start 0.9", "start 0.2"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const childArray = React.Children.toArray(children);

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, i) => {
        const start = i * staggerAmount;
        const end = start + 0.4;
        return (
          <ScrollStaggerItem key={i} progress={scrollYProgress} start={start} end={Math.min(end, 1)}>
            {child}
          </ScrollStaggerItem>
        );
      })}
    </div>
  );
}

function ScrollStaggerItem({ children, progress, start, end }) {
  const y = useTransform(progress, [start, end], [40, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.95, 1]);
  const smoothY = useSpring(y, springConfig);
  const smoothOpacity = useSpring(opacity, springConfig);

  return (
    <motion.div style={{ y: smoothY, opacity: smoothOpacity, scale }}>
      {children}
    </motion.div>
  );
}

// ============================================================
// 13. ScrollLineGrow — Draw a line on scroll
// ============================================================
export function ScrollLineGrow({ className = '', direction = 'vertical', offset = ["start 0.8", "start 0.2"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const scale = useSpring(scrollYProgress, springConfig);

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className} />;
  }

  const style = direction === 'vertical'
    ? { scaleY: scale, transformOrigin: 'top' }
    : { scaleX: scale, transformOrigin: 'left' };

  return (
    <motion.div ref={ref} style={style} className={className} />
  );
}

// ============================================================
// 14. ScrollBlurReveal — Blur-to-clear reveal on scroll
// ============================================================
export function ScrollBlurReveal({ children, className = '', offset = ["start 0.9", "start 0.35"] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const smoothOpacity = useSpring(opacity, springConfig);
  const smoothY = useSpring(y, springConfig);

  const [filterStr, setFilterStr] = useState('blur(10px)');
  useMotionValueEvent(blur, "change", (v) => {
    setFilterStr(`blur(${v.toFixed(1)}px)`);
  });

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity: smoothOpacity, y: smoothY, filter: filterStr }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// 15. SectionExit — Fades out section as you scroll past
// ============================================================
export function SectionExit({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.97]);
  const smoothOpacity = useSpring(opacity, smoothConfig);
  const smoothScale = useSpring(scale, smoothConfig);

  if (prefersReducedMotion()) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ opacity: smoothOpacity, scale: smoothScale }} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================
// 16. useScrollDirection — Hook for navbar hide/reveal
// ============================================================
export function useScrollDirection() {
  const [direction, setDirection] = useState('up');
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > prevScroll && currentScroll > 100) {
        setDirection('down');
      } else {
        setDirection('up');
      }
      setPrevScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return direction;
}
