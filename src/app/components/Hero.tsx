import { useEffect, useRef } from 'react';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.remove('translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentTitleRef = titleRef.current;
    const currentSubtitleRef = subtitleRef.current;
    const currentCtaRef = ctaRef.current;

    if (currentTitleRef) observer.observe(currentTitleRef);
    if (currentSubtitleRef) observer.observe(currentSubtitleRef);
    if (currentCtaRef) observer.observe(currentCtaRef);

    return () => {
      if (currentTitleRef) observer.unobserve(currentTitleRef);
      if (currentSubtitleRef) observer.unobserve(currentSubtitleRef);
      if (currentCtaRef) observer.unobserve(currentCtaRef);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 translate-y-4 transition-all duration-700"
        >
          <span className="inline-block">Kausthubh</span> <span className="inline-block text-gradient">Nandimandalam</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl opacity-0 translate-y-4 transition-all duration-700 delay-200 mb-10 max-w-3xl mx-auto"
        >
          Full-stack & AI Developer
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-wrap justify-center gap-4 opacity-0 translate-y-4 transition-all duration-700 delay-400"
        >
          <a 
            href="#about" 
            className="px-8 py-3 rounded-full bg-foreground text-background hover:bg-accent-dark transition-all duration-300 hover-lift"
          >
            Explore My Work
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 rounded-full border border-foreground hover:bg-foreground/5 transition-all duration-300 hover-lift"
          >
            Get In Touch
          </a>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-foreground/30 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
} 