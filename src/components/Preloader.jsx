import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const percentRef = useRef(null);
  const barRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // Animate progress number from 0 to 100
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: 100,
        duration: 1.4,
        ease: 'power3.inOut',
        onUpdate: () => {
          setProgress(Math.floor(counterObj.val));
        }
      });

      // Progress bar fill
      tl.to(barRef.current, {
        scaleX: 1,
        duration: 1.4,
        ease: 'power3.inOut'
      }, 0);

      // Fade & lift text out
      tl.to([textRef.current, percentRef.current, barRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
      });

      // Slide container curtain upwards
      tl.to(containerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.9,
        ease: 'power4.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0A0A0A',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem 4rem',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        willChange: 'clip-path'
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          ref={textRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: '700',
            letterSpacing: '0.15em',
            color: '#F5F5F0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span className="lime-dot" />
          NEXORA
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
        >
          DIGITAL CREATIVE STUDIO
        </div>
      </div>

      {/* Center Counter */}
      <div style={{ alignSelf: 'center', textAlign: 'center' }}>
        <div
          ref={percentRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            fontWeight: '800',
            letterSpacing: '-0.05em',
            color: '#F5F5F0',
            lineHeight: 1
          }}
        >
          {String(progress).padStart(2, '0')}<span style={{ color: 'var(--accent-lime)' }}>%</span>
        </div>
      </div>

      {/* Bottom Status & Progress Bar */}
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justify: 'space-between',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}
        >
          <span>ATTENTION × CREATIVITY × TECHNOLOGY</span>
          <span>INITIATING EXPERIENCE</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: '#1E1E1E',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            ref={barRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--accent-lime)',
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              willChange: 'transform'
            }}
          />
        </div>
      </div>
    </div>
  );
}
