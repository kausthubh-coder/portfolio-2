import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function LogoAnimation() {
  const [animationState, setAnimationState] = useState<'initial' | 'zooming' | 'complete'>('initial');
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if the animation has already played in this session
    const hasAnimationPlayed = sessionStorage.getItem('logoAnimationPlayed');
    
    if (hasAnimationPlayed) {
      // Skip animation if it has already played
      setAnimationState('complete');
      return;
    }
    
    // Start the animation after a delay - keep it on screen for 2 seconds
    const initialTimer = setTimeout(() => {
      setAnimationState('zooming');
      
      // After the zooming animation completes, mark as complete
      const zoomTimer = setTimeout(() => {
        setAnimationState('complete');
        // Save to session storage that animation has played
        sessionStorage.setItem('logoAnimationPlayed', 'true');
      }, 3000); // Transition duration remains 3000ms
      
      return () => clearTimeout(zoomTimer);
    }, 2000); // Set to 2000ms (2 seconds) as requested
    
    return () => clearTimeout(initialTimer);
  }, []);
  
  // Determine the appropriate classes based on animation state
  const containerClasses = {
    initial: 'fixed inset-0 flex items-center justify-center bg-background z-[100]', // Higher z-index
    zooming: 'fixed inset-0 flex items-center justify-center bg-background z-[100] transition-all duration-3000', // Longer duration
    complete: 'fixed top-0 left-0 z-[60] pointer-events-none transition-all duration-500', // Higher than background but lower than navbar
  }[animationState];
  
  const logoClasses = {
    initial: 'text-foreground w-64 h-64', // Bigger initial size
    zooming: 'text-foreground w-64 h-64 transform scale-[0.15] translate-x-[-400%] translate-y-[-350%] transition-all duration-3000', // Longer duration
    complete: 'text-gradient w-12 h-12 hover-lift transition-all duration-500',
  }[animationState];
  
  // If animation is complete and navbar is taking over, we can hide this component
  if (animationState === 'complete') {
    return null;
  }
  
  return (
    <div className={containerClasses}>
      <div 
        ref={logoRef}
        className={logoClasses}
      >
        <svg width="100%" height="100%" viewBox="0 0 93 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2727 107V13.9091H22.5455V60.0909H23.6364L65.4545 13.9091H80.1818L41.0909 55.9091L80.1818 107H66.5455L34.1818 63.7273L22.5455 76.8182V107H11.2727Z" fill="currentColor"/>
          <path d="M86.0909 13.9091V107H75.1818L24.4545 33.9091H23.5455V107H12.2727V13.9091H23.1818L74.0909 87.1818H75V13.9091H86.0909Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
} 