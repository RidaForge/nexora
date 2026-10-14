import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ArrowUpRight = ({ size = 18, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isLoaded }) {
  const sectionRef = useRef(null);
  const metaLabelRef = useRef(null);
  const leftCardRef = useRef(null);
  const ctaBlockRef = useRef(null);
  const robotWrapperRef = useRef(null);
  const robotImgRef = useRef(null);
  const rightHeadlineRef = useRef(null);
  const rightCopyRef = useRef(null);

  // 1. Desktop Mouse Parallax for Central Robot
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener('mousemove', onMouseMove);

    const ticker = gsap.ticker.add(() => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (robotImgRef.current) {
        gsap.set(robotImgRef.current, {
          x: mouse.x * 16,
          y: mouse.y * 14,
          rotateY: mouse.x * 4,
          rotateX: -mouse.y * 4
        });
      }
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  // 2. Entrance Timeline triggered when Preloader finishes
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Reveal top-left label
      tl.to(metaLabelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Reveal central robot image
      tl.to(
        robotWrapperRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out'
        },
        '-=0.5'
      );

      // Reveal left column (feature card & CTA)
      tl.to(
        [leftCardRef.current, ctaBlockRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out'
        },
        '-=0.7'
      );

      // Reveal right column (main headline & paragraph copy)
      tl.to(
        [rightHeadlineRef.current, rightCopyRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power4.out'
        },
        '-=0.7'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // 3. ScrollTrigger Depth Transition
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (robotWrapperRef.current) {
            gsap.set(robotWrapperRef.current, {
              y: p * 60,
              scale: 1 - p * 0.04
            });
          }
          gsap.set(sectionRef.current, {
            opacity: 1 - p * 0.85
          });
        }
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Magnetic CTA Handler
  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMagneticLeave = (e) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)'
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        width: '100%',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: '7.5rem 4rem 2.5rem 4rem',
        overflow: 'hidden'
      }}
    >
      {/* Clean 3-Column Grid System Layout */}
      <div
        className="hero-grid-3col"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2.5rem',
          alignItems: 'center',
          width: '100%',
          margin: 'auto 0',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* COLUMN 1 (LEFT ~33%): Top Label, Lime Feature Card & START A PROJECT Button */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            zIndex: 3
          }}
        >
          {/* Top-Left Label */}
          <div
            ref={metaLabelRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.18em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              opacity: 0,
              transform: 'translateY(-10px)'
            }}
          >
            <span style={{ color: 'var(--accent-lime)' }}>[01]</span>
            <span>INDEPENDENT DIGITAL AGENCY</span>
          </div>

          {/* Lime-Green Feature Card */}
          <div
            ref={leftCardRef}
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #C8FF00 0%, #96C800 100%)',
              padding: '1.85rem 2rem',
              color: '#0A0A0A',
              boxShadow: '0 20px 50px rgba(200, 255, 0, 0.28)',
              width: '100%',
              maxWidth: '420px',
              opacity: 0,
              transform: 'translateY(20px)'
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.925rem',
                fontWeight: '800',
                letterSpacing: '0.06em',
                color: '#0A0A0A',
                marginBottom: '0.75rem',
                lineHeight: 1.35,
                textTransform: 'uppercase'
              }}
            >
              DIGITAL STRATEGY, CREATIVE DIRECTION, MEASURABLE GROWTH.
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#1A2400',
                lineHeight: 1.55
              }}
            >
              We build digital experiences and campaigns that turn attention into action.
            </p>
          </div>

          {/* START A PROJECT Glowing Pill CTA Button */}
          <div
            ref={ctaBlockRef}
            style={{
              opacity: 0,
              transform: 'translateY(20px)'
            }}
          >
            <button
              data-cursor="cta"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.1rem 2.4rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: '800',
                letterSpacing: '0.06em',
                color: '#0A0A0A',
                background: 'linear-gradient(135deg, #C8FF00 0%, #96C800 100%)',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 12px 35px rgba(200, 255, 0, 0.35)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* COLUMN 2 (CENTER ~34%): Cyborg Image strictly in Horizontal Center (Zero Text Overlap) */}
        <div
          ref={robotWrapperRef}
          data-cursor="explore"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '480px',
            maxHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            zIndex: 1,
            opacity: 0,
            transform: 'scale(0.95)',
            willChange: 'transform, opacity'
          }}
        >
          {/* Atmospheric Acid Lime Radial Studio Lighting Glow strictly behind Robot */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '460px',
              height: '460px',
              background: 'radial-gradient(circle, rgba(200, 255, 0, 0.32) 0%, rgba(0, 230, 118, 0.15) 40%, rgba(10, 10, 10, 0) 72%)',
              filter: 'blur(65px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          <img
            ref={robotImgRef}
            src="/images/nexora-robot.png"
            alt="NEXORA VR Character Subject"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '150%',
              height: '150%',
              maxHeight: '72vh',
              objectFit: 'contain',
              objectPosition: 'center',
              WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 98%)',
              maskImage: 'linear-gradient(to bottom, black 82%, transparent 98%)',
              filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.9))',
              willChange: 'transform'
            }}
          />
        </div>

        {/* COLUMN 3 (RIGHT ~33%): Main Heading 'WE TURN ATTENTION INTO ACTION.' & Paragraph */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            zIndex: 3
          }}
        >
          {/* Main Display Headline */}
          <div
            ref={rightHeadlineRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              opacity: 0,
              transform: 'translateY(20px)'
            }}
          >
            <div className="line-mask">
              <span
                style={{
                  fontSize: 'clamp(2.8rem, 5.2vw, 5.6rem)',
                  fontWeight: '800',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: 'var(--text-primary)',
                  display: 'block'
                }}
              >
                WE TURN
              </span>
            </div>
            <div className="line-mask">
              <span
                style={{
                  fontSize: 'clamp(2.8rem, 5.2vw, 5.6rem)',
                  fontWeight: '800',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: 'var(--text-primary)',
                  display: 'block'
                }}
              >
                ATTENTION
              </span>
            </div>
            <div className="line-mask">
              <span
                style={{
                  fontSize: 'clamp(2.8rem, 5.2vw, 5.6rem)',
                  fontWeight: '800',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: 'var(--text-primary)',
                  display: 'block'
                }}
              >
                INTO ACTION<span style={{ color: 'var(--accent-lime)' }}>.</span>
              </span>
            </div>
          </div>

          {/* Supporting Paragraph Copy directly under Right Heading */}
          <p
            ref={rightCopyRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '380px',
              opacity: 0,
              transform: 'translateY(20px)'
            }}
          >
            Strategy, creative and performance designed to make brands impossible to ignore and deliver measurable growth.
          </p>
        </div>
      </div>
    </section>
  );
}
