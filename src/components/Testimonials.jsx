import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const ArrowLeft = ({ size = 20, style = {} }) => (
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
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRight = ({ size = 20, style = {} }) => (
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
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

// Reusable Testimonial Data
// Strict Requirement: Never fabricate real client testimonials or endorsements.
// Clearly labeled placeholder content for preview & quick replacement.
const TESTIMONIALS_DATA = [
  {
    id: '01',
    category: 'DIGITAL TRANSFORMATION',
    quote: "Your client's approved testimonial will appear here. Highlight verified strategic outcomes, collaboration milestones, and measurable digital growth achieved together.",
    clientName: "Client Name",
    clientRole: "Chief Marketing Officer",
    company: "Partner Brand 01",
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    fallbackPortrait: "/images/about.jpg",
    alt: "Client portrait placeholder"
  },
  {
    id: '02',
    category: 'BRAND IDENTITY & CREATIVE',
    quote: "Your client's approved testimonial will appear here. Detail distinctive creative direction, visual brand positioning, and market reception achieved through the partnership.",
    clientName: "Client Name",
    clientRole: "Head of Brand Experience",
    company: "Partner Brand 02",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    fallbackPortrait: "/images/about.jpg",
    alt: "Client portrait placeholder"
  },
  {
    id: '03',
    category: 'PERFORMANCE & ACQUISITION',
    quote: "Your client's approved testimonial will appear here. Showcase verified performance marketing metrics, conversion lift, and customer acquisition improvements.",
    clientName: "Client Name",
    clientRole: "VP of Growth & Strategy",
    company: "Partner Brand 03",
    portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    fallbackPortrait: "/images/about.jpg",
    alt: "Client portrait placeholder"
  },
  {
    id: '04',
    category: 'WEB & INTERACTIVE PLATFORMS',
    quote: "Your client's approved testimonial will appear here. Share insights on interactive website performance, technical precision, and elevated digital user experience.",
    clientName: "Client Name",
    clientRole: "Digital Product Director",
    company: "Partner Brand 04",
    portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    fallbackPortrait: "/images/about.jpg",
    alt: "Client portrait placeholder"
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const quoteRef = useRef(null);
  const portraitRef = useRef(null);
  const detailsRef = useRef(null);
  const badgeRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimatingRef = useRef(false);

  const currentItem = TESTIMONIALS_DATA[currentIndex];

  // Coordinated Transition Function
  const transitionTo = useCallback((newIndex, direction = 1) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const duration = 0.75;
    const ease = 'power3.inOut';

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    // 1. Animate Out current quote, portrait, details
    tl.to(quoteRef.current, {
      y: direction > 0 ? -24 : 24,
      opacity: 0,
      duration: duration * 0.45,
      ease: 'power2.in'
    }, 0);

    tl.to(portraitRef.current, {
      scale: 0.96,
      opacity: 0,
      duration: duration * 0.45,
      ease: 'power2.in'
    }, 0);

    tl.to([detailsRef.current, badgeRef.current], {
      y: direction > 0 ? -12 : 12,
      opacity: 0,
      duration: duration * 0.4,
      ease: 'power2.in'
    }, 0);

    // 2. State change at midpoint
    tl.call(() => {
      setCurrentIndex(newIndex);
    }, null, duration * 0.45);

    // 3. Set starting position for new content
    tl.call(() => {
      gsap.set(quoteRef.current, { y: direction > 0 ? 24 : -24, opacity: 0 });
      gsap.set(portraitRef.current, { scale: 1.04, opacity: 0 });
      gsap.set([detailsRef.current, badgeRef.current], { y: direction > 0 ? 12 : -12, opacity: 0 });
    }, null, duration * 0.48);

    // 4. Animate In new content smoothly
    tl.to(quoteRef.current, {
      y: 0,
      opacity: 1,
      duration: duration * 0.52,
      ease: 'power3.out'
    }, duration * 0.48);

    tl.to(portraitRef.current, {
      scale: 1,
      opacity: 1,
      duration: duration * 0.52,
      ease: 'power3.out'
    }, duration * 0.48);

    tl.to([detailsRef.current, badgeRef.current], {
      y: 0,
      opacity: 1,
      duration: duration * 0.52,
      ease: 'power3.out'
    }, duration * 0.48);

  }, []);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % TESTIMONIALS_DATA.length;
    transitionTo(nextIdx, 1);
  }, [currentIndex, transitionTo]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
    transitionTo(prevIdx, -1);
  }, [currentIndex, transitionTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Section Entrance ScrollTrigger Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(['.testimonials-eyebrow', '.testimonials-h-line', '.testimonials-lead', '.testimonials-stage', '.testimonials-controls'], {
          opacity: 1,
          y: 0
        });
        return;
      }

      // 1. Eyebrow Tag
      gsap.fromTo(
        '.testimonials-eyebrow',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 2. Editorial Headline Lines (Masked)
      gsap.fromTo(
        '.testimonials-h-line',
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

      // 3. Lead Subtitle
      gsap.fromTo(
        '.testimonials-lead',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 4. Testimonials Stage Entrance
      gsap.fromTo(
        ['.testimonials-left', '.testimonials-right'],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-stage',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 5. Controls Entrance
      gsap.fromTo(
        '.testimonials-controls',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-stage',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="testimonials-section"
      data-cursor="pointer"
    >
      {/* Subtle Ambient Lime Lighting Accent */}
      <div className="testimonials-ambient-glow" aria-hidden="true" />

      <div className="testimonials-container">
        {/* ------------------------------------------------------------------
            1. SECTION INTRODUCTION (EDITORIAL HEADLINE)
            ------------------------------------------------------------------ */}
        <div className="testimonials-intro">
          {/* Eyebrow Label */}
          <div className="testimonials-eyebrow">
            <span className="testimonials-eyebrow-accent">[04]</span>
            <span>— CLIENT STORIES</span>
          </div>

          {/* Large Left-Aligned Editorial Heading */}
          <div ref={headlineRef} className="testimonials-headline-wrap">
            <div className="line-mask">
              <h2 className="testimonials-h-line">GOOD WORK.</h2>
            </div>
            <div className="line-mask">
              <h2 className="testimonials-h-line">
                REAL <span className="testimonials-headline-accent">WORDS.</span>
              </h2>
            </div>
          </div>

          {/* Supporting Sentence */}
          <p className="testimonials-lead">
            Great partnerships create work worth talking about.
          </p>
        </div>

        {/* ------------------------------------------------------------------
            2. MAIN TESTIMONIAL SPLIT SLIDER LAYOUT
            ------------------------------------------------------------------ */}
        <div className="testimonials-stage" role="region" aria-label="Client Feedback Slider">
          
          {/* LEFT SIDE: Oversized Quote & Typography */}
          <div className="testimonials-left">
            <div>
              {/* Category Pill Tag */}
              <div className="testimonials-meta-bar">
                <span ref={badgeRef} className="testimonials-category-badge">
                  {currentItem.category}
                </span>
              </div>

              {/* Oversized Neon Lime Quotation Mark */}
              <div className="testimonials-quote-mark" aria-hidden="true">
                “
              </div>

              {/* Large Editorial Quote */}
              <div className="testimonials-quote-wrap">
                <blockquote className="testimonials-quote-text" ref={quoteRef}>
                  {currentItem.quote}
                </blockquote>
              </div>
            </div>

            {/* Index Counter Indicator */}
            <div className="testimonials-indicator-row">
              <div className="testimonials-counter" aria-live="polite">
                <span className="testimonials-counter-active">0{currentIndex + 1}</span>
                <span className="testimonials-counter-divider">/</span>
                <span className="testimonials-counter-total">0{TESTIMONIALS_DATA.length}</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Client Portrait & Details Card */}
          <div className="testimonials-right">
            <div className="testimonials-card">
              {/* Portrait Visual Frame */}
              <div className="testimonials-portrait-frame">
                <img
                  ref={portraitRef}
                  src={currentItem.portrait}
                  alt={currentItem.alt}
                  className="testimonials-portrait-img"
                  loading="lazy"
                  onError={(e) => {
                    if (e.target.src !== currentItem.fallbackPortrait) {
                      e.target.src = currentItem.fallbackPortrait;
                    }
                  }}
                />
                <span className="testimonials-placeholder-tag">
                  DEV PREVIEW
                </span>
              </div>

              {/* Client Information */}
              <div ref={detailsRef} className="testimonials-client-details">
                <h3 className="testimonials-client-name">
                  {currentItem.clientName}
                </h3>
                <p className="testimonials-client-role">
                  {currentItem.clientRole}
                </p>
                <span className="testimonials-client-company">
                  {currentItem.company}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------
            3. BOTTOM AREA: COMPACT NAVIGATION & PROGRESS INDICATOR
            ------------------------------------------------------------------ */}
        <div className="testimonials-controls">
          {/* Progress Dots Track */}
          <div className="testimonials-progress-track">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`testimonials-progress-dot ${idx === currentIndex ? 'is-active' : ''}`}
                onClick={() => transitionTo(idx, idx > currentIndex ? 1 : -1)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrow Buttons */}
          <div className="testimonials-nav-btns">
            <button
              type="button"
              className="testimonials-nav-btn"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              data-cursor="pointer"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              className="testimonials-nav-btn"
              onClick={handleNext}
              aria-label="Next testimonial"
              data-cursor="pointer"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
