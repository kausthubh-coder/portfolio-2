import { useEffect, useRef, useState } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

interface Trail {
  x: number;
  y: number;
  size: number;
  opacity: number;
  age: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const targetMousePosition = useRef({ x: 0, y: 0 });
  const prevMousePosition = useRef({ x: 0, y: 0 });
  const lerpFactor = 0.05; // Lower value for smoother movement
  const mouseActive = useRef(false);
  const time = useRef(0);
  const ripples = useRef<Ripple[]>([]);
  const trails = useRef<Trail[]>([]);
  const isMobile = useRef(false);
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const influenceRadius = useRef(200); // Radius of mouse influence

  useEffect(() => {
    // Check if device is mobile
    isMobile.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check if dark mode is enabled
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeQuery.addEventListener('change', handleDarkModeChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with HiDPI support
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr); // Scale for HiDPI displays
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Adjust influence radius based on screen size
      influenceRadius.current = Math.min(window.innerWidth, window.innerHeight) * 0.25;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Create interaction handler for both mouse and touch
    const handleInteraction = (x: number, y: number, isActive: boolean = true) => {
      // Calculate velocity for subtle effects
      mouseVelocity.current = {
        x: x - prevMousePosition.current.x,
        y: y - prevMousePosition.current.y
      };
      
      prevMousePosition.current = { x, y };
      targetMousePosition.current = { x, y };
      mouseActive.current = isActive;
      
      // Add subtle trail effect based on mouse velocity
      const speed = Math.sqrt(
        mouseVelocity.current.x * mouseVelocity.current.x + 
        mouseVelocity.current.y * mouseVelocity.current.y
      );
      
      // Only create trails when moving at a certain speed
      if (speed > 3 && Math.random() > 0.6) {
        trails.current.push({
          x,
          y,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          age: 0
        });
      }
      
      if (isActive) {
        // Reset mouse active status after 2 seconds of inactivity
        clearTimeout(mouseActiveTimeout);
        mouseActiveTimeout = setTimeout(() => {
          mouseActive.current = false;
        }, 2000);
      }
    };

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };

    // Touch handlers for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        prevMousePosition.current = { x: touch.clientX, y: touch.clientY };
        handleInteraction(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleInteraction(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      // Don't immediately deactivate on mobile to maintain smooth experience
      setTimeout(() => {
        mouseActive.current = false;
      }, 1000);
    };

    // Handle mouse enter/leave
    const handleMouseEnter = () => {
      mouseActive.current = true;
    };

    const handleMouseLeave = () => {
      mouseActive.current = false;
    };

    // Create ripple effect handler for both mouse and touch
    const createRippleEffect = (x: number, y: number) => {
      const foregroundColor = isDarkMode ? 'rgb(237, 237, 237)' : 'rgb(23, 23, 23)';
      
      // Create new ripple
      ripples.current.push({
        x: x,
        y: y,
        radius: 0,
        maxRadius: Math.random() * 100 + 50,
        opacity: 1,
        color: foregroundColor
      });
      
      // Create burst of particles
      createParticleBurst(x, y, 8);
    };

    // Handle click to create ripple effect
    const handleClick = (e: MouseEvent) => {
      createRippleEffect(e.clientX, e.clientY);
    };

    // Handle touch tap to create ripple effect
    const handleTap = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        createRippleEffect(touch.clientX, touch.clientY);
      }
    };
    
    // Function to create a burst of particles
    const createParticleBurst = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        const baseSize = Math.random() * 3 + 2;
        const baseOpacity = Math.random() * 0.7 + 0.3;
        
        particles.push({
          x: x,
          y: y,
          baseSize: baseSize,
          size: baseSize,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          baseOpacity: baseOpacity,
          opacity: baseOpacity,
          hue: Math.random() * 360,
          pulseSpeed: Math.random() * 0.05 + 0.02,
          pulseAmount: Math.random() * 0.8 + 0.5,
          lifespan: 100, // Particle will exist for 100 frames
          currentLife: 0,
          rotation: Math.random() * Math.PI * 2
        });
      }
    };

    let mouseActiveTimeout: NodeJS.Timeout;
    
    // Add event listeners based on device type
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);
    
    // Add touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchend', handleTap);
    
    canvas.style.pointerEvents = 'auto'; // Make canvas clickable
    canvas.style.touchAction = 'manipulation'; // Improve touch responsiveness

    // Enhanced particle properties
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
      hue: number;
      pulseSpeed: number;
      pulseAmount: number;
      lifespan?: number;
      currentLife?: number;
      rotation?: number;
      rotationSpeed?: number;
      originalX?: number;
      originalY?: number;
    }> = [];

    // Adjust particle count based on device
    const baseCount = isMobile.current ? 
      Math.min(Math.max(Math.floor(window.innerWidth / 20), 20), 60) : // Fewer particles on mobile
      Math.min(Math.max(Math.floor(window.innerWidth / 15), 40), 120);  // More particles on desktop

    // Create particles with improved visibility and animation properties
    for (let i = 0; i < baseCount; i++) {
      const baseSize = Math.random() * 2.5 + 1.5;
      const baseOpacity = Math.random() * 0.6 + 0.4;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      particles.push({
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        baseSize: baseSize,
        size: baseSize,
        speedX: (Math.random() * 0.2 - 0.1) * 0.5, 
        speedY: (Math.random() * 0.2 - 0.1) * 0.5,
        baseOpacity: baseOpacity,
        opacity: baseOpacity,
        hue: Math.random() * 360, // For potential color effects
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseAmount: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.002 - 0.001) // Very slow rotation
      });
    }

    // Add automatic particle movement for mobile to improve interactivity
    if (isMobile.current) {
      // Create a simulated "cursor" that moves in a figure-8 pattern for mobile
      const simulateMovement = () => {
        if (!mouseActive.current) {
          const width = window.innerWidth;
          const height = window.innerHeight;
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) / 4;
          
          const angle = time.current * 0.5;
          const x = centerX + Math.sin(angle) * radius;
          const y = centerY + Math.sin(angle * 2) * radius / 2;
          
          targetMousePosition.current = { x, y };
        }
      };
      
      // Set interval for the simulated movement
      const simulationInterval = setInterval(simulateMovement, 50);
      
      // Clean up
      return () => {
        clearInterval(simulationInterval);
      };
    }

    // Function to get subtle color variation
    const getSubtleColorVariation = (baseColor: string, intensity: number): string => {
      // For grayscale colors, we'll just adjust the opacity
      return baseColor.replace('rgb', 'rgba').replace(')', `, ${intensity})`);
    };

    // Animation
    let animationId: number;

    const animate = () => {
      time.current += 0.01;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      const foregroundColor = isDarkMode ? 'rgb(237, 237, 237)' : 'rgb(23, 23, 23)';
      
      // Smooth mouse movement with linear interpolation (LERP)
      setMousePosition(prev => ({
        x: prev.x + (targetMousePosition.current.x - prev.x) * lerpFactor,
        y: prev.y + (targetMousePosition.current.y - prev.y) * lerpFactor
      }));
      
      // Draw and update mouse trails
      trails.current.forEach((trail, index) => {
        trail.age += 1;
        trail.opacity -= 0.02;
        
        if (trail.opacity <= 0 || trail.age >= 20) {
          trails.current.splice(index, 1);
          return;
        }
        
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
        ctx.fillStyle = `${foregroundColor.replace('rgb', 'rgba').replace(')', `, ${trail.opacity})`)}`;
        ctx.fill();
      });
      
      // Draw and update ripples
      ripples.current.forEach((ripple, index) => {
        ripple.radius += 3;
        ripple.opacity -= 0.02;
        
        if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
          // Remove ripple when it's faded or reached max size
          ripples.current.splice(index, 1);
          return;
        }
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color.replace('rgb', 'rgba').replace(')', `, ${ripple.opacity})`);
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      
      // Calculate mouse velocity magnitude for effects
      const velocityMagnitude = Math.sqrt(
        mouseVelocity.current.x * mouseVelocity.current.x + 
        mouseVelocity.current.y * mouseVelocity.current.y
      );
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        // Remove burst particles that have reached their lifespan
        if (particle.lifespan && particle.currentLife !== undefined) {
          particle.currentLife += 1;
          if (particle.currentLife >= particle.lifespan) {
            particles.splice(index, 1);
            return;
          }
          // Fade out as they reach end of life
          if (particle.currentLife > particle.lifespan * 0.7) {
            const fadeRatio = 1 - ((particle.currentLife - particle.lifespan * 0.7) / (particle.lifespan * 0.3));
            particle.opacity = particle.baseOpacity * fadeRatio;
          }
        }
        
        // Subtle rotation effect
        if (particle.rotation !== undefined && particle.rotationSpeed !== undefined) {
          particle.rotation += particle.rotationSpeed;
        }
        
        // Update position with slightly dynamic speed when mouse is active
        const speedMultiplier = mouseActive.current ? 1.2 : 1;
        particle.x += particle.speedX * speedMultiplier;
        particle.y += particle.speedY * speedMultiplier;

        // Wrap particles around the edges (except for burst particles which can go off-screen)
        if (!particle.lifespan) {
          if (particle.x < 0) particle.x = window.innerWidth;
          if (particle.x > window.innerWidth) particle.x = 0;
          if (particle.y < 0) particle.y = window.innerHeight;
          if (particle.y > window.innerHeight) particle.y = 0;
        }

        // Subtle effect: particles influenced by mouse movement
        if (mouseActive.current && !particle.lifespan && particle.originalX !== undefined && particle.originalY !== undefined) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < influenceRadius.current) {
            // Calculate influence based on distance and mouse velocity
            const influenceFactor = (1 - distance / influenceRadius.current) * 0.03;
            
            // Apply subtle displacement based on mouse velocity
            particle.x += mouseVelocity.current.x * influenceFactor;
            particle.y += mouseVelocity.current.y * influenceFactor;
            
            // Very subtle wobble effect when mouse is moving
            if (velocityMagnitude > 2) {
              const wobbleIntensity = 0.2 * influenceFactor * Math.min(velocityMagnitude * 0.05, 1);
              particle.x += Math.sin(time.current * 10 + particle.hue) * wobbleIntensity;
              particle.y += Math.cos(time.current * 10 + particle.hue) * wobbleIntensity;
            }
            
            // Very gentle return to original position when far from mouse
            const returnFactor = 0.001 * (distance / influenceRadius.current);
            particle.x += (particle.originalX - particle.x) * returnFactor;
            particle.y += (particle.originalY - particle.y) * returnFactor;
          } else if (distance < influenceRadius.current * 2) {
            // Very subtle return to original position when far from mouse
            const returnFactor = 0.001;
            particle.x += (particle.originalX - particle.x) * returnFactor;
            particle.y += (particle.originalY - particle.y) * returnFactor;
          }
        }

        // Pulse animation for size and opacity
        const pulse = Math.sin(time.current * particle.pulseSpeed * Math.PI * 2);
        particle.size = particle.baseSize + pulse * particle.pulseAmount;
        
        if (!particle.lifespan) {
          particle.opacity = particle.baseOpacity + pulse * 0.1;
        }

        // Draw particle with enhanced visibility
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Apply subtle color variation based on distance to mouse when active
        let particleColor = foregroundColor;
        if (mouseActive.current && !particle.lifespan) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < influenceRadius.current) {
            const intensity = (1 - distance / influenceRadius.current) * 1.2;
            particleColor = getSubtleColorVariation(foregroundColor, particle.opacity * intensity);
          } else {
            particleColor = `${foregroundColor.replace('rgb', 'rgba').replace(')', `, ${particle.opacity})`)}`;
          }
        } else {
          particleColor = `${foregroundColor.replace('rgb', 'rgba').replace(')', `, ${particle.opacity})`)}`;
        }
        
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Don't connect temporary burst particles
        if (particle.lifespan) return;

        // Connect particles within a certain distance with gradual fade and thicker lines
        for (let j = index + 1; j < particles.length; j++) {
          // Skip connecting to burst particles
          if (particles[j].lifespan) continue;
          
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Adjust max distance based on device type
          const maxDistance = isMobile.current ? 
            (mouseActive.current ? 180 : 150) : // Smaller on mobile
            (mouseActive.current ? 200 : 180);  // Larger on desktop

          if (distance < maxDistance) {
            // More visible connection opacity
            const opacity = 0.35 * Math.pow(1 - distance / maxDistance, 1.5);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Dynamic line style based on mouse activity
            let lineWidth = mouseActive.current ? 1.5 + (1 - distance / maxDistance) * 0.5 : 1.5;
            
            // Subtle line width variation when mouse is moving fast
            if (mouseActive.current && velocityMagnitude > 5) {
              const mouseDx = mousePosition.x - particle.x;
              const mouseDy = mousePosition.y - particle.y;
              const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
              
              if (mouseDistance < influenceRadius.current) {
                const influence = 1 - (mouseDistance / influenceRadius.current);
                lineWidth += influence * (velocityMagnitude * 0.01);
              }
            }
            
            ctx.strokeStyle = `${foregroundColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`)}`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }

        // Enhanced mouse attraction/interaction
        if (mouseActive.current || isMobile.current) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const mouseMaxDistance = isMobile.current ? 220 : 250; // Slightly smaller on mobile

          if (distance < mouseMaxDistance) {
            // Mouse attraction effect - particles gradually move toward mouse
            const force = (1 - distance / mouseMaxDistance) * 0.05;
            particle.x += dx * force;
            particle.y += dy * force;
            
            // Connections to mouse with enhanced visual effect
            const opacity = 0.4 * Math.pow(1 - distance / mouseMaxDistance, 1.5);
            
            // Only draw connections to closer particles for a cleaner look
            if (distance < mouseMaxDistance * 0.7) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(mousePosition.x, mousePosition.y);
              
              // Subtle line width variation based on velocity
              let lineWidth = 1.5 + (1 - distance / mouseMaxDistance) * 1;
              if (velocityMagnitude > 5) {
                lineWidth += Math.min(velocityMagnitude * 0.03, 0.5);
              }
              
              ctx.strokeStyle = `${foregroundColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`)}`;
              ctx.lineWidth = lineWidth;
              ctx.stroke();
            }
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      
      // Remove touch events
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchend', handleTap);
      
      clearTimeout(mouseActiveTimeout);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-10"
      aria-hidden="true"
    />
  );
} 