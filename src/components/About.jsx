import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const METHOD_ITEMS = [
  { num: '01', title: 'STRATEGY' },
  { num: '02', title: 'CREATIVE' },
  { num: '03', title: 'PERFORMANCE' },
  { num: '04', title: 'GROWTH' }
];

const PRINCIPLES = [
  { num: '01', title: 'THINK' },
  { num: '02', title: 'CREATE' },
  { num: '03', title: 'GROW' }
];

export default function About() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const rightColumnRef = useRef(null);
  const imageFrameRef = useRef(null);
  const imageRef = useRef(null);
  const philosophyRef = useRef(null);
  const methodRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Top Section Tag & Headline Line Reveals
      gsap.fromTo(
        '.about-tag-reveal',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.about-headline-line',
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

      // 2. Right-side Editorial Paragraph & Principles Stagger
      gsap.fromTo(
        '.about-paragraph-reveal',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightColumnRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.about-principle-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-principle-list',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 3. Editorial Visual Subtle Parallax Scroll
      if (imageRef.current && imageFrameRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -8, scale: 1.05 },
          {
            yPercent: 8,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageFrameRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          }
        );
      }

      // 4. Philosophy Statement Vertical Reveals
      gsap.fromTo(
        '.philosophy-line',
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 5. NEXORA Method Sequential Row Reveals
      const methodRows = gsap.utils.toArray('.about-method-row');
      methodRows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Highlight GROWTH row on scroll
        if (i === METHOD_ITEMS.length - 1) {
          gsap.to(row.querySelector('.about-method-title'), {
            color: '#C8FF00',
            scale: 1.02,
            scrollTrigger: {
              trigger: row,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          });
        }
      });

      // 6. Subtle Desktop Mouse Parallax on Main Image (10-15px max)
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (!isTouch && imageFrameRef.current) {
        const xTo = gsap.quickTo(imageFrameRef.current, 'x', { duration: 1.2, ease: 'power2.out' });
        const yTo = gsap.quickTo(imageFrameRef.current, 'y', { duration: 1.2, ease: 'power2.out' });

        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 15;
          const yPos = (clientY / window.innerHeight - 0.5) * 15;
          xTo(xPos);
          yTo(yPos);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-editorial-section" data-cursor="pointer">
      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Top Section Tag */}
        <div className="about-tag-reveal" style={{ marginBottom: '3.5rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: '700', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--accent-lime)' }}>01</span> / WHO WE ARE
          </span>
        </div>

        {/* SECTION 1 — ASYMMETRIC EDITORIAL LAYOUT */}
        <div className="about-editorial-grid" style={{ marginBottom: '6rem' }}>
          
          {/* LEFT COLUMN — MAIN HEADLINE */}
          <div ref={headlineRef} style={{ gridColumn: 'span 12', lgGridColumn: 'span 6' }}>
            <div className="line-mask" style={{ marginBottom: '0.04em' }}>
              <h2 className="about-headline-line" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', fontWeight: '800', letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: '0.92' }}>
                WE MAKE
              </h2>
            </div>
            <div className="line-mask" style={{ marginBottom: '0.04em' }}>
              <h2 className="about-headline-line" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', fontWeight: '800', letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: '0.92' }}>
                DIGITAL
              </h2>
            </div>
            <div className="line-mask">
              <h2 className="about-headline-line" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', fontWeight: '800', letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: '0.92' }}>
                MATTER.
              </h2>
            </div>
          </div>

          {/* RIGHT COLUMN — EDITORIAL PARAGRAPH & THREE PRINCIPLES */}
          <div ref={rightColumnRef} style={{ gridColumn: 'span 12', lgGridColumn: 'span 6' }}>
            <div className="about-paragraph-reveal">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '1.25rem' }}>
                WHO WE ARE
              </span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', lineHeight: '1.55', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                We are Nexora a digital marketing agency built for brands that refuse to blend in.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.3vw, 1.125rem)', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                We combine strategy, creative thinking and performance to turn attention into meaningful action.
              </p>
            </div>

            {/* Three Simple Editorial Principles List (No Cards!) */}
            <div className="about-principle-list">
              {PRINCIPLES.map((principle, idx) => (
                <div key={idx} className="about-principle-item">
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{principle.num}</span>
                  <span>{principle.title}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>→</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2 — SINGLE STRONG EDITORIAL VISUAL FRAME */}
        <div ref={imageFrameRef} className="about-image-frame" data-cursor="cta">
          <img
            ref={imageRef}
            src="/images/about.jpg"
            alt="NEXORA Visionary Editorial Visual"
          />
        </div>

        {/* SECTION 3 — ABOUT PHILOSOPHY STATEMENT */}
        <div ref={philosophyRef} style={{ padding: '6rem 0', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div className="line-mask" style={{ marginBottom: '0.1em' }}>
            <h3 className="philosophy-line" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: '0.95' }}>
              ATTENTION IS EASY.
            </h3>
          </div>
          <div className="line-mask" style={{ marginBottom: '1.75rem' }}>
            <h3 className="philosophy-line" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: '0.95' }}>
              EARNING IT IS NOT.
            </h3>
          </div>
          <div className="line-mask">
            <p className="philosophy-line" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2vw, 1.75rem)', fontWeight: '700', letterSpacing: '0.02em', color: 'var(--accent-lime)' }}>
              That's where we come in.
            </p>
          </div>
        </div>

        {/* SECTION 4 — THE NEXORA METHOD (EDITORIAL TYPOGRAPHIC ROWS) */}
        <div ref={methodRef} style={{ padding: '6rem 0 4rem 0' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>
            THE NEXORA METHOD
          </span>

          <div className="about-method-list">
            {METHOD_ITEMS.map((item, idx) => (
              <div key={idx} className="about-method-row" data-cursor="pointer">
                <span className="about-method-num">{item.num}</span>
                <h4 className="about-method-title">{item.title}</h4>
                <span className="about-method-arrow">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5 — TRANSITION TO SERVICES */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: '700', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--accent-lime)' }}>02</span> / WHAT WE DO
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: '700', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
            NEXORA SERVICES ↗
          </span>
        </div>

      </div>
    </section>
  );
}
