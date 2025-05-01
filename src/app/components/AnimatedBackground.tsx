import { useEffect, useRef, useState, useCallback } from 'react';

interface ParticleData {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  lastMoved: number; // Track when the particle last moved
}

interface CanvasWithParticles extends HTMLCanvasElement {
  particlesData?: ParticleData[];
}

export default function AnimatedBackground() {
  const canvasRef = useRef<CanvasWithParticles>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const targetMousePosition = useRef({ x: 0, y: 0 });
  const lerpFactor = 0.005; // Extremely slow mouse cursor influence
  const animationFrameId = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  
  // Extremely slow movement settings
  const moveInterval = 5000; // Only move particles every 5 seconds
  const speedMultiplier = 0.0001; // Drastically reduced speed

  useEffect(() => {
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

  const render = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    const foregroundColor = isDarkMode ? 'rgb(237, 237, 237)' : 'rgb(23, 23, 23)';
    
    // Smooth mouse movement with linear interpolation (LERP)
    setMousePosition(prev => ({
      x: prev.x + (targetMousePosition.current.x - prev.x) * lerpFactor,
      y: prev.y + (targetMousePosition.current.y - prev.y) * lerpFactor
    }));
    
    // Get particle data from canvas
    const particlesData = canvas.particlesData;
    if (!particlesData) return;

    // Very infrequent particle movement - only update positions every few seconds
    if (timestamp - lastUpdateTime.current > moveInterval) {
      particlesData.forEach(particle => {
        // Only move 1/5 of particles at a time for extra subtle movement
        if (Math.random() < 0.2) {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap particles around the edges
          if (particle.x < 0) particle.x = window.innerWidth;
          if (particle.x > window.innerWidth) particle.x = 0;
          if (particle.y < 0) particle.y = window.innerHeight;
          if (particle.y > window.innerHeight) particle.y = 0;
          
          particle.lastMoved = timestamp;
        }
      });
      lastUpdateTime.current = timestamp;
    }

    // Draw particles
    particlesData.forEach((particle, index) => {
      // Draw particle with subtle visibility
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `${foregroundColor.replace('rgb', 'rgba').replace(')', `, ${particle.opacity})`)}`;
      ctx.fill();

      // Connect particles within a certain distance with very faint lines
      for (let j = index + 1; j < particlesData.length; j++) {
        const dx = particlesData[j].x - particle.x;
        const dy = particlesData[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Reduced connection distance

        if (distance < maxDistance) {
          // Very subtle connection opacity
          const opacity = 0.15 * Math.pow(1 - distance / maxDistance, 1.5);
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particlesData[j].x, particlesData[j].y);
          ctx.strokeStyle = `${foregroundColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`)}`;
          ctx.lineWidth = 0.8; // Thinner lines for subtlety
          ctx.stroke();
        }
      }

      // Connect to mouse if within range with very subtle fade
      const dx = mousePosition.x - particle.x;
      const dy = mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const mouseMaxDistance = 150; // Reduced mouse interaction distance

      if (distance < mouseMaxDistance) {
        // More subtle connection opacity
        const opacity = 0.2 * Math.pow(1 - distance / mouseMaxDistance, 1.5);
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mousePosition.x, mousePosition.y);
        ctx.strokeStyle = `${foregroundColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`)}`;
        ctx.lineWidth = 0.8; // Thinner lines
        ctx.stroke();
      }
    });

    animationFrameId.current = requestAnimationFrame(render);
  }, [isDarkMode, mousePosition, lerpFactor, moveInterval]);

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
      
      // Initialize particles again when resizing
      initParticles();
    };

    // Mouse movement handler with smoothing
    const handleMouseMove = (e: MouseEvent) => {
      targetMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // Initialize particles
    const initParticles = () => {
      // Create particles with improved visibility
      const particles: ParticleData[] = [];
      
      // Fewer particles for better performance and less visual clutter
      const particleCount = Math.min(Math.max(Math.floor(window.innerWidth / 25), 20), 60);
      const now = performance.now();

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.8, // Smaller particles
          speedX: (Math.random() * 0.1 - 0.05) * speedMultiplier,
          speedY: (Math.random() * 0.1 - 0.05) * speedMultiplier,
          opacity: Math.random() * 0.4 + 0.2, // Reduced opacity for subtlety
          lastMoved: now
        });
      }
      
      // Store particles in the canvas element for access in the animation loop
      canvas.particlesData = particles;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation with single render loop and much less frequent updates
    initParticles();
    lastUpdateTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
    />
  );
}