import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis Smooth Scroll & sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#0A0A0A' }}>
      {/* Noise Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Preloader Screen */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Minimal Floating Header */}
      <Navbar isLoaded={isLoaded} />

      {/* Hero Section Matching Reference Screenshot Exactly */}
      <Hero isLoaded={isLoaded} />

      {/* Glowing Infinite Horizontal Marquee Ticker */}
      <Marquee />

      {/* Interactive Scroll-Driven About Section */}
      <About />

      {/* Editorial Services Section with Interactive Hover Image Reveal */}
      <Services />

      {/* Awwwards-Inspired Client Stories & Testimonials Section */}
      <Testimonials />

      {/* Premium Editorial Footer Section */}
      <Footer />
    </div>
  );
}

