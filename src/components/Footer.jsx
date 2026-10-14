import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const ArrowUpRight = ({ size = 18, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const ArrowUp = ({ size = 16, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
  >
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

// Navigation links referencing existing on-page sections
const NAVIGATION_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Client Stories', href: '#testimonials' }
];

// Disciplines quick links
const DISCIPLINE_LINKS = [
  { label: 'Digital Strategy', href: '#services' },
  { label: 'Branding & Creative', href: '#services' },
  { label: 'Web Development', href: '#services' },
  { label: 'Performance Marketing', href: '#services' }
];

// Clearly marked placeholders for client-provided social media URLs
const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', isPlaceholder: true },
  { label: 'LinkedIn', href: '#', isPlaceholder: true },
  { label: 'Behance', href: '#', isPlaceholder: true }
];

export default function Footer() {
  const footerRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const navGridRef = useRef(null);
  const bottomBarRef = useRef(null);

  // Magnetic CTA Button physics (matching Hero CTA interaction)
  const handleMagneticMove = useCallback((e) => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

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
  }, []);

  const handleMagneticLeave = useCallback((e) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)'
    });
  }, []);

  // Smooth scroll back to top handler
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(['.footer-h-line', '.footer-lead', ctaBtnRef.current, navGridRef.current, bottomBarRef.current], {
          opacity: 1,
          y: 0
        });
        return;
      }

      // 1. Headline Lines Masked Reveal
      gsap.fromTo(
        '.footer-h-line',
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Supporting Lead Text & CTA Button
      gsap.fromTo(
        ['.footer-lead', ctaBtnRef.current],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 3. Navigation Columns Grid Reveal
      gsap.fromTo(
        navGridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: navGridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 4. Bottom Bar Reveal
      gsap.fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bottomBarRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="footer-section"
      data-cursor="pointer"
      role="contentinfo"
    >
      {/* Subtle Bottom Ambient Lime Accent */}
      <div className="footer-ambient-glow" aria-hidden="true" />

      <div className="footer-container">
        {/* ------------------------------------------------------------------
            1. LARGE CLOSING STATEMENT & CALL TO ACTION
            ------------------------------------------------------------------ */}
        <div className="footer-statement-wrap">
          {/* Oversized Editorial Closing Headline */}
          <div ref={headlineRef} className="footer-headline">
            <div className="line-mask">
              <h2 className="footer-h-line">LET'S MAKE</h2>
            </div>
            <div className="line-mask">
              <h2 className="footer-h-line">SOMETHING</h2>
            </div>
            <div className="line-mask">
              <h2 className="footer-h-line">
                <span className="footer-headline-accent">MATTER.</span>
              </h2>
            </div>
          </div>

          {/* Supporting Lead & Prominent Action CTA */}
          <div className="footer-statement-side">
            <p className="footer-lead">
              Have a project in mind? Let's bring your vision to life.
            </p>

            <a
              ref={ctaBtnRef}
              href="#hero"
              className="footer-cta-btn"
              data-cursor="cta"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
            >
              <span>LET'S TALK</span>
              <span className="footer-cta-icon">
                <ArrowUpRight size={18} />
              </span>
            </a>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            2. NAVIGATION & SOCIALS GRID
            ------------------------------------------------------------------ */}
        <div ref={navGridRef} className="footer-nav-grid">
          {/* Brand Identity Column */}
          <div className="footer-brand-col">
            <a href="#hero" className="footer-brand-logo" onClick={(e) => { e.preventDefault(); handleScrollToTop(); }}>
              <span className="lime-dot" />
              <span>NEXORA</span>
            </a>
            <p className="footer-brand-desc">
              An independent creative agency engineering digital experiences, strategy, and measurable brand growth.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-links-list">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label} className="footer-link-item">
                  <a href={link.href}>
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} className="footer-link-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines Column */}
          <div>
            <span className="footer-col-title">Expertise</span>
            <ul className="footer-links-list">
              {DISCIPLINE_LINKS.map((link) => (
                <li key={link.label} className="footer-link-item">
                  <a href={link.href}>
                    <span>{link.label}</span>
                    <ArrowUpRight size={14} className="footer-link-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Column (Clearly marked placeholders ready to link) */}
          <div className="footer-social-col">
            <span className="footer-col-title">Connect</span>
            <ul className="footer-links-list">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label} className="footer-link-item">
                  <a
                    href={social.href}
                    aria-label={`${social.label} (Placeholder - ready to link)`}
                    onClick={(e) => {
                      if (social.href === '#') e.preventDefault();
                    }}
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight size={14} className="footer-link-arrow" />
                  </a>
                </li>
              ))}
            </ul>
            <span className="footer-placeholder-note">[Official Socials]</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            3. DYNAMIC BOTTOM BAR
            ------------------------------------------------------------------ */}
        <div ref={bottomBarRef} className="footer-bottom-bar">
          <div className="footer-bottom-meta">
            <span>Independent Digital Creative Agency</span>
            <span className="footer-bottom-meta-dot" />
            <span>© {new Date().getFullYear()} NEXORA</span>
            <span className="footer-bottom-meta-dot" />
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={handleScrollToTop}
            aria-label="Scroll back to top of page"
            data-cursor="pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
