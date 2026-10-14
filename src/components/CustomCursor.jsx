import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);

    if (hasTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Set initial centered transform origin & offscreen position
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100
    });

    // High performance GSAP quickTo setters for zero-friction movement
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.04, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.04, ease: 'power2.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.16, ease: 'power2.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.16, ease: 'power2.out' });

    let isVisible = false;

    const onMouseMove = (e) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        isVisible = true;
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (!target) return;

      const cursorType = target.getAttribute('data-cursor');

      if (cursorType === 'cta') {
        // CTA Hover State: 1.7x scale with translucent lime overlay
        gsap.to(ring, {
          scale: 1.7,
          backgroundColor: 'rgba(200, 255, 0, 0.08)',
          borderColor: 'rgba(200, 255, 0, 0.8)',
          boxShadow: '0 0 20px rgba(200, 255, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        gsap.to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        // Standard interactive link / button hover state: 1.5x scale
        gsap.to(ring, {
          scale: 1.5,
          backgroundColor: 'transparent',
          borderColor: 'rgba(200, 255, 0, 0.75)',
          boxShadow: '0 0 16px rgba(200, 255, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        gsap.to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (!target) return;

      const related = e.relatedTarget;
      if (related && target.contains(related)) return;

      // Restore default minimal state
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(200, 255, 0, 0.45)',
        boxShadow: '0 0 12px rgba(200, 255, 0, 0.15)',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      isVisible = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Central Precision Acid Lime Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#C8FF00',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          boxShadow: '0 0 8px rgba(200, 255, 0, 0.6)',
          willChange: 'transform, opacity'
        }}
      />

      {/* Minimal Editorial Outer Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '34px',
          height: '34px',
          border: '1px solid rgba(200, 255, 0, 0.45)',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          boxShadow: '0 0 12px rgba(200, 255, 0, 0.15)',
          willChange: 'transform, opacity, background-color, border-color'
        }}
      />
    </>
  );
}
