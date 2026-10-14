import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Marquee() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Seamless infinite horizontal scrolling loop using GSAP xPercent
    const animation = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 22,
      ease: 'none'
    });

    return () => animation.kill();
  }, []);

  const marqueeItems = [
    'DIGITAL EXPERIENCES',
    'ATTENTION ENGINE',
    'STRATEGY',
    'CREATIVE',
    'PERFORMANCE',
    'BRAND GROWTH'
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(200, 255, 0, 0.35)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: '0 -10px 35px rgba(200, 255, 0, 0.12)',
        padding: '1.35rem 0',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          width: 'max-content',
          willChange: 'transform'
        }}
      >
        {/* Render duplicates for perfectly smooth continuous loop */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div
            key={index}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2rem',
              paddingRight: '2rem',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.4vw, 1.85rem)',
              fontWeight: '800',
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
              textTransform: 'uppercase'
            }}
          >
            <span>{item}</span>
            <span style={{ color: 'var(--accent-lime)', fontSize: '0.85em', textShadow: '0 0 12px rgba(200, 255, 0, 0.6)' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
