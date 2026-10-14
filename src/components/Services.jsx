import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

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

const SERVICES_DATA = [
  {
    id: '01',
    numStr: '01',
    category: 'STRATEGY',
    title: 'Digital Strategy',
    description: 'Brand positioning, research, and digital growth planning.',
    tags: ['Positioning', 'Research', 'Growth Planning'],
    image: 'https://i.pinimg.com/originals/d9/89/53/d98953bfb4ff810e919c2b4ef15d6bed.gif',
    fallbackImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    alt: 'Digital Strategy - Brand positioning, research and roadmaps'
  },
  {
    id: '02',
    numStr: '02',
    category: 'CREATIVE',
    title: 'Branding & Creative',
    description: 'Visual identity, creative direction, and brand storytelling.',
    tags: ['Visual Identity', 'Direction', 'Storytelling'],
    image: 'https://i.pinimg.com/originals/80/fc/d5/80fcd5eecedbb0d36de9c01ffcf34a15.gif',
    fallbackImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    alt: 'Branding and Creative - Visual identity and creative direction'
  },
  {
    id: '03',
    numStr: '03',
    category: 'ENGINEERING',
    title: 'Web Design & Development',
    description: 'Premium digital experiences, responsive websites, and interactive interfaces.',
    tags: ['Interactive UI', 'React.js', 'Creative Tech'],
    image: 'https://assets-v2.lottiefiles.com/a/324888b0-1187-11ee-8316-97f287a1f5af/zi1Xj7TekV.gif',
    fallbackImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    alt: 'Web Design & Development - Digital experiences and interfaces'
  },
  {
    id: '04',
    numStr: '04',
    category: 'PERFORMANCE',
    title: 'Performance Marketing',
    description: 'Paid campaigns, analytics, and conversion optimization.',
    tags: ['Paid Media', 'Analytics', 'Conversion Rate'],
    image: 'https://i.pinimg.com/originals/4b/79/52/4b795221dbe1fa053ab1007b08e3f947.gif',
    fallbackImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    alt: 'Performance Marketing - Paid campaigns and analytics'
  },
  {
    id: '05',
    numStr: '05',
    category: 'GROWTH',
    title: 'SEO & Organic Growth',
    description: 'Search visibility, technical SEO, and sustainable organic growth.',
    tags: ['Technical SEO', 'Search Visibility', 'Organic Traffic'],
    image: 'https://cdn.pixabay.com/animation/2024/04/25/17/20/17-20-57-512_512.gif',
    fallbackImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    alt: 'SEO & Organic Growth - Search visibility and technical SEO'
  },
  {
    id: '06',
    numStr: '06',
    category: 'CONTENT',
    title: 'Social Media & Content',
    description: 'Content strategy, social campaigns, and creative storytelling.',
    tags: ['Content Strategy', 'Social Campaigns', 'Storytelling'],
    image: 'https://i.pinimg.com/originals/64/5b/5b/645b5ba2e24c4003155c87cd0ac5e36f.gif',
    fallbackImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    alt: 'Social Media & Content - Social campaigns and storytelling'
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const controlsRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Maintain circular visual slot order:
  // slotsRef.current: [c_left2, c_left1, c_center, c_right1, c_right2, c_offscreen]
  // where index 2 is the center card (initially card 0)
  const slotsRef = useRef([4, 5, 0, 1, 2, 3]);
  const isAnimatingRef = useRef(false);

  // Touch swipe tracking refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Compute Card Positions based on slot offset (-3 to +3) and viewport width
  const getSlotConfig = useCallback((diff, stageWidth) => {
    const isMobile = stageWidth < 640;
    const isTablet = stageWidth < 1024;

    let step1, step2, scale1, scale2, opacity1, opacity2;

    if (isMobile) {
      step1 = Math.min(240, stageWidth * 0.72);
      step2 = stageWidth * 1.25;
      scale1 = 0.82;
      scale2 = 0.65;
      opacity1 = 0.45;
      opacity2 = 0;
    } else if (isTablet) {
      step1 = 260;
      step2 = 480;
      scale1 = 0.82;
      scale2 = 0.68;
      opacity1 = 0.62;
      opacity2 = 0.32;
    } else {
      // Desktop: 5 visible cards centered with cohesive tighter spacing
      step1 = 320;
      step2 = 580;
      scale1 = 0.82;
      scale2 = 0.68;
      opacity1 = 0.65;
      opacity2 = 0.35;
    }

    if (diff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 10 };
    } else if (diff === 1) {
      return { x: step1, scale: scale1, opacity: opacity1, zIndex: 5 };
    } else if (diff === -1) {
      return { x: -step1, scale: scale1, opacity: opacity1, zIndex: 5 };
    } else if (diff === 2) {
      return { x: step2, scale: scale2, opacity: opacity2, zIndex: 2 };
    } else if (diff === -2) {
      return { x: -step2, scale: scale2, opacity: opacity2, zIndex: 2 };
    } else if (diff > 2) {
      return { x: step2 + 320, scale: 0.5, opacity: 0, zIndex: 1 };
    } else {
      return { x: -step2 - 320, scale: 0.5, opacity: 0, zIndex: 1 };
    }
  }, []);

  // Coordinated Cinematic Navigation Timeline (Next)
  const handleNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const stageWidth = stageRef.current ? stageRef.current.offsetWidth : window.innerWidth;
    const currentSlots = [...slotsRef.current];
    const [c_left2, c_left1, c_center, c_right1, c_right2, c_offscreen] = currentSlots;
    const newActiveIndex = c_right1;

    const duration = 0.85;
    const ease = 'power3.inOut';

    const tl = gsap.timeline({
      onComplete: () => {
        // Rotate slots array to the left
        slotsRef.current = [c_left1, c_center, c_right1, c_right2, c_offscreen, c_left2];
        // c_left2 is now at slot -3 (offscreen left); invisibly reset its x to slot +3 (offscreen right)
        const cardEl = cardsRef.current[c_left2];
        if (cardEl) {
          const slotPlus3 = getSlotConfig(3, stageWidth);
          gsap.set(cardEl, {
            x: slotPlus3.x,
            scale: slotPlus3.scale,
            opacity: 0,
            zIndex: 1
          });
        }
        isAnimatingRef.current = false;
      }
    });

    const el_left2 = cardsRef.current[c_left2];
    const el_left1 = cardsRef.current[c_left1];
    const el_center = cardsRef.current[c_center];
    const el_right1 = cardsRef.current[c_right1];
    const el_right2 = cardsRef.current[c_right2];
    const el_offscreen = cardsRef.current[c_offscreen];

    // Smooth coordinated transitions across all 6 cards
    if (el_left2) tl.to(el_left2, { ...getSlotConfig(-3, stageWidth), duration, ease }, 0);
    if (el_left1) tl.to(el_left1, { ...getSlotConfig(-2, stageWidth), duration, ease }, 0);
    if (el_center) tl.to(el_center, { ...getSlotConfig(-1, stageWidth), duration, ease }, 0);
    if (el_right1) tl.to(el_right1, { ...getSlotConfig(0, stageWidth), duration, ease }, 0);
    if (el_right2) tl.to(el_right2, { ...getSlotConfig(1, stageWidth), duration, ease }, 0);
    if (el_offscreen) tl.to(el_offscreen, { ...getSlotConfig(2, stageWidth), duration, ease }, 0);

    // Synchronize activeIndex update at midpoint of the transition
    tl.call(() => {
      setActiveIndex(newActiveIndex);
    }, null, duration * 0.4);

  }, [getSlotConfig]);

  // Coordinated Cinematic Navigation Timeline (Prev)
  const handlePrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const stageWidth = stageRef.current ? stageRef.current.offsetWidth : window.innerWidth;
    const currentSlots = [...slotsRef.current];
    const [c_left2, c_left1, c_center, c_right1, c_right2, c_offscreen] = currentSlots;
    const newActiveIndex = c_left1;

    // c_offscreen is currently at slot +3 (x = +860px, opacity = 0).
    // Before moving to the right, invisibly place c_offscreen at slot -3 (x = -860px, opacity = 0)
    const el_offscreen = cardsRef.current[c_offscreen];
    if (el_offscreen) {
      const slotMinus3 = getSlotConfig(-3, stageWidth);
      gsap.set(el_offscreen, {
        x: slotMinus3.x,
        scale: slotMinus3.scale,
        opacity: 0,
        zIndex: 1
      });
    }

    const duration = 0.85;
    const ease = 'power3.inOut';

    const tl = gsap.timeline({
      onComplete: () => {
        // Rotate slots array to the right
        slotsRef.current = [c_offscreen, c_left2, c_left1, c_center, c_right1, c_right2];
        isAnimatingRef.current = false;
      }
    });

    const el_left2 = cardsRef.current[c_left2];
    const el_left1 = cardsRef.current[c_left1];
    const el_center = cardsRef.current[c_center];
    const el_right1 = cardsRef.current[c_right1];
    const el_right2 = cardsRef.current[c_right2];

    if (el_offscreen) tl.to(el_offscreen, { ...getSlotConfig(-2, stageWidth), duration, ease }, 0);
    if (el_left2) tl.to(el_left2, { ...getSlotConfig(-1, stageWidth), duration, ease }, 0);
    if (el_left1) tl.to(el_left1, { ...getSlotConfig(0, stageWidth), duration, ease }, 0);
    if (el_center) tl.to(el_center, { ...getSlotConfig(1, stageWidth), duration, ease }, 0);
    if (el_right1) tl.to(el_right1, { ...getSlotConfig(2, stageWidth), duration, ease }, 0);
    if (el_right2) tl.to(el_right2, { ...getSlotConfig(3, stageWidth), duration, ease }, 0);

    // Synchronize activeIndex update at midpoint of the transition
    tl.call(() => {
      setActiveIndex(newActiveIndex);
    }, null, duration * 0.4);

  }, [getSlotConfig]);

  const handleCardClick = useCallback((index) => {
    if (isAnimatingRef.current) return;
    const currentSlots = slotsRef.current;
    const slotIdx = currentSlots.indexOf(index);
    if (slotIdx === 3 || slotIdx === 4) {
      handleNext();
    } else if (slotIdx === 1 || slotIdx === 0) {
      handlePrev();
    }
  }, [handleNext, handlePrev]);

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

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 45) {
      handleNext();
    } else if (delta < -45) {
      handlePrev();
    }
  };

  // Initial card layout positioning
  useEffect(() => {
    const stageWidth = stageRef.current ? stageRef.current.offsetWidth : window.innerWidth;
    slotsRef.current.forEach((cardIdx, slotPositionIndex) => {
      const cardEl = cardsRef.current[cardIdx];
      if (!cardEl) return;
      const slotNum = slotPositionIndex - 2;
      const target = getSlotConfig(slotNum, stageWidth);
      gsap.set(cardEl, {
        x: target.x,
        scale: target.scale,
        opacity: target.opacity,
        zIndex: target.zIndex
      });
    });
  }, [getSlotConfig]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isAnimatingRef.current) return;
      const stageWidth = stageRef.current ? stageRef.current.offsetWidth : window.innerWidth;
      slotsRef.current.forEach((cardIdx, slotPositionIndex) => {
        const cardEl = cardsRef.current[cardIdx];
        if (!cardEl) return;
        const slotNum = slotPositionIndex - 2;
        const target = getSlotConfig(slotNum, stageWidth);
        gsap.set(cardEl, {
          x: target.x,
          scale: target.scale,
          opacity: target.opacity,
          zIndex: target.zIndex
        });
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSlotConfig]);

  // Section Entrance ScrollTrigger Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(['.services-carousel-eyebrow', '.services-carousel-h-line', '.services-carousel-lead', controlsRef.current], {
          opacity: 1,
          y: 0
        });
        return;
      }

      // 1. Eyebrow Tag
      gsap.fromTo(
        '.services-carousel-eyebrow',
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
        '.services-carousel-h-line',
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
        '.services-carousel-lead',
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

      // 4. Carousel Stage Entrance
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 5. Controls Entrance
      if (controlsRef.current) {
        gsap.fromTo(
          controlsRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: controlsRef.current,
              start: 'top 92%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-carousel-section"
      data-cursor="pointer"
    >
      {/* Subtle Central Ambient Lime Glow */}
      <div className="services-carousel-glow" aria-hidden="true" />

      {/* ------------------------------------------------------------------
          1. TOP AREA: SPACIOUS EDITORIAL TYPOGRAPHY
          ------------------------------------------------------------------ */}
      <div className="services-carousel-header">
        {/* Eyebrow Label */}
        <div className="services-carousel-eyebrow">
          <span className="services-carousel-eyebrow-accent">[02]</span>
          <span>— OUR SERVICES</span>
        </div>

        {/* Large Left-Aligned Editorial Heading with Neon-Lime Accent */}
        <div ref={headlineRef} className="services-carousel-headline-wrap">
          <div className="line-mask">
            <h2 className="services-carousel-h-line">WE TURN DIGITAL</h2>
          </div>
          <div className="line-mask">
            <h2 className="services-carousel-h-line">
              AMBITION INTO <span className="services-carousel-accent">IMPACT.</span>
            </h2>
          </div>
        </div>

        {/* Supporting Sentence */}
        <p className="services-carousel-lead">
          Strategy, creativity and technology to move your brand forward.
        </p>
      </div>

      {/* ------------------------------------------------------------------
          2. MIDDLE AREA: CINEMATIC CENTER-FOCUSED HORIZONTAL CAROUSEL
          ------------------------------------------------------------------ */}
      <div
        ref={stageRef}
        className="services-carousel-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Services Horizontal Carousel"
      >
        {SERVICES_DATA.map((service, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`service-carousel-card ${isActive ? 'is-active' : ''}`}
              onClick={() => handleCardClick(index)}
              data-cursor={isActive ? 'cta' : 'pointer'}
              tabIndex={0}
              role="group"
              aria-label={`${service.numStr} — ${service.title}`}
              aria-current={isActive ? 'true' : 'false'}
            >
              {/* Card Image */}
              <div className="carousel-card-img-wrap">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="carousel-card-img"
                  loading="lazy"
                  onError={(e) => {
                    if (e.target.src !== service.fallbackImage) {
                      e.target.src = service.fallbackImage;
                    }
                  }}
                />
              </div>

              {/* Dark Gradient Overlay for Readability */}
              <div className="carousel-card-overlay" />

              {/* Card Inner Content */}
              <div className="carousel-card-content">
                {/* Top: Category/Number Pill & Arrow */}
                <div className="carousel-card-top">
                  <div className="carousel-card-badge">
                    <span className="carousel-card-dot" />
                    <span>{service.numStr} // {service.category}</span>
                  </div>

                  <div className="carousel-card-arrow-icon" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Bottom: Large Title, Description & Category Tags */}
                <div className="carousel-card-bottom">
                  <h3 className="carousel-card-title">{service.title}</h3>

                  <p className="carousel-card-desc">{service.description}</p>

                  <div className="carousel-card-tags">
                    {service.tags.map((tag) => (
                      <span key={tag} className="carousel-card-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------
          3. BOTTOM AREA: COMPACT NAVIGATION CONTROLS & COUNTER
          ------------------------------------------------------------------ */}
      <div ref={controlsRef} className="services-carousel-bottom">
        <button
          type="button"
          className="carousel-nav-btn"
          onClick={handlePrev}
          aria-label="Previous service"
          data-cursor="pointer"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="carousel-nav-counter" aria-live="polite">
          <span className="carousel-counter-current">0{activeIndex + 1}</span>
          <span className="carousel-counter-divider">/</span>
          <span className="carousel-counter-total">0{SERVICES_DATA.length}</span>
        </div>

        <button
          type="button"
          className="carousel-nav-btn"
          onClick={handleNext}
          aria-label="Next service"
          data-cursor="pointer"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
