'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Static components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LogoAnimation from './components/LogoAnimation';

// Dynamic import for the animated background
const AnimatedBackground = dynamic(
  () => import('./components/AnimatedBackground'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <LogoAnimation />
      
      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
