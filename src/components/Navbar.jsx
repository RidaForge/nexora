import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ArrowUpRight = ({ size = 16, style = {} }) => (
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

export default function Navbar({ isLoaded }) {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      tl.to(
        linksRef.current.children,
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out'
        },
        '-=0.5'
      );

      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        },
        '-=0.4'
      );
    }, navRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.25,
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
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: scrolled ? '1.15rem 4rem' : '2.25rem 4rem',
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1680px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '220px 1fr auto',
          alignItems: 'center'
        }}
      >
        {/* Left: Brand Logo */}
        <a
          href="#"
          ref={logoRef}
          data-cursor="pointer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: '700',
            letterSpacing: '0.12em',
            color: 'var(--text-primary)',
            opacity: 0,
            transform: 'translateY(-15px)'
          }}
        >
          <span className="lime-dot" />
          <span>NEXORA</span>
        </a>

        {/* Center: Nav Items */}
        <nav
          ref={linksRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: '3rem'
          }}
        >
          {['WORK', 'SERVICES', 'ABOUT'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              data-cursor="pointer"
              style={{
                position: 'relative',
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                opacity: 0,
                transform: 'translateY(-15px)',
                transition: 'color 0.3s ease',
                padding: '0.25rem 0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
                const underline = e.currentTarget.querySelector('.nav-underline');
                if (underline) gsap.to(underline, { scaleX: 1, duration: 0.3, ease: 'power2.out' });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                const underline = e.currentTarget.querySelector('.nav-underline');
                if (underline) gsap.to(underline, { scaleX: 0, duration: 0.3, ease: 'power2.in' });
              }}
            >
              {item}
              <span
                className="nav-underline"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'var(--accent-lime)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  willChange: 'transform'
                }}
              />
            </a>
          ))}
        </nav>

        {/* Right: Glowing Acid Lime Pill CTA Button (Matching Reference Image Layout) */}
        <div
          ref={ctaRef}
          style={{
            justifySelf: 'end',
            opacity: 0,
            transform: 'translateY(-15px)'
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
              padding: '0.65rem 0.65rem 0.65rem 1.6rem',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: '800',
              letterSpacing: '0.06em',
              color: '#0A0A0A',
              background: 'linear-gradient(135deg, #C8FF00 0%, #96C800 100%)',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(200, 255, 0, 0.35)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            <span>LET'S TALK</span>
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0A0A0A',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                color: '#C8FF00'
              }}
            >
              <ArrowUpRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
