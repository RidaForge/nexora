import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CreativePortrait() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener('mousemove', onMouseMove);

    const ticker = gsap.ticker.add(() => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (imageRef.current) {
        gsap.set(imageRef.current, {
          x: mouse.x * 20,
          y: mouse.y * 20
        });
      }

      if (glowRef.current) {
        gsap.set(glowRef.current, {
          x: mouse.x * -30,
          y: mouse.y * -30
        });
      }
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="explore"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '480px',
        maxHeight: '620px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
      }}
    >
      {/* Immersive Green Studio Lighting Radial Glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(0, 230, 118, 0.45) 0%, rgba(200, 255, 0, 0.25) 35%, rgba(10, 10, 10, 0) 70%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          willChange: 'transform'
        }}
      />

      {/* Cinematic Human Subject (Creative Professional in Dark Outfit with Sunglasses) */}
      <div
        ref={imageRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform'
        }}
      >
        <svg
          viewBox="0 0 700 850"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))' }}
        >
          <defs>
            <linearGradient id="skinLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A88C" />
              <stop offset="50%" stopColor="#A87A5E" />
              <stop offset="100%" stopColor="#5E3E2B" />
            </linearGradient>

            <linearGradient id="greenRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E676" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#C8FF00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141414" />
              <stop offset="100%" stopColor="#0A0A0A" />
            </linearGradient>
          </defs>

          {/* Torso & Dark Shirt */}
          <path
            d="M 120 850 C 140 640, 220 540, 350 510 C 480 540, 560 640, 580 850 Z"
            fill="url(#shirtGrad)"
            stroke="#222"
            strokeWidth="2"
          />

          {/* Neck */}
          <path d="M 290 530 L 290 410 C 330 430, 370 430, 410 410 L 410 530 Z" fill="#996D53" />
          <path d="M 290 530 L 290 410" stroke="url(#greenRim)" strokeWidth="4" fill="none" />

          {/* Jawline & Face Profile looking upward/diagonal */}
          <path
            d="M 260 410 C 240 330, 250 240, 300 180 C 370 120, 470 130, 520 200 C 560 260, 550 350, 500 410 C 430 460, 330 450, 260 410 Z"
            fill="url(#skinLight)"
          />

          {/* Beard & Facial Hair Detail */}
          <path
            d="M 260 410 C 270 440, 320 460, 390 450 C 450 440, 490 410, 500 370 C 480 390, 440 400, 390 400 C 330 400, 280 390, 260 410 Z"
            fill="#1A120C"
          />

          {/* Cool Dark Sunglasses */}
          <g>
            {/* Left Lens */}
            <path
              d="M 310 245 C 310 220, 385 210, 395 240 C 400 270, 320 280, 310 245 Z"
              fill="#080808"
              stroke="#111"
              strokeWidth="4"
            />
            {/* Right Lens */}
            <path
              d="M 405 240 C 415 210, 490 220, 490 245 C 480 280, 400 270, 405 240 Z"
              fill="#080808"
              stroke="#111"
              strokeWidth="4"
            />
            {/* Bridge */}
            <line x1="390" y1="230" x2="410" y2="230" stroke="#111" strokeWidth="5" />
            {/* Sunglass Green Reflection */}
            <path d="M 320 230 Q 360 225 380 250" fill="none" stroke="#00E676" strokeWidth="2.5" opacity="0.8" />
            <path d="M 420 230 Q 460 225 475 250" fill="none" stroke="#C8FF00" strokeWidth="2.5" opacity="0.8" />
          </g>

          {/* Modern Hair */}
          <path
            d="M 280 220 C 260 160, 300 90, 380 80 C 460 70, 530 110, 540 180 C 500 130, 430 120, 360 130 C 310 140, 290 180, 280 220 Z"
            fill="#14100C"
          />

          {/* Dramatic Green Rim Lighting along Head & Neck contour */}
          <path
            d="M 280 220 C 260 160, 300 90, 380 80 C 460 70, 530 110, 540 180"
            fill="none"
            stroke="url(#greenRim)"
            strokeWidth="5"
          />

          {/* Green Atmospheric Light Reflection Highlight */}
          <circle cx="380" cy="180" r="140" fill="url(#greenRim)" opacity="0.08" />
        </svg>
      </div>
    </div>
  );
}
