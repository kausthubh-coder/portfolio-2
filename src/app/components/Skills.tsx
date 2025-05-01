import { useEffect, useRef } from 'react';

type Skill = {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'language' | 'tool';
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: 'React', icon: '⚛️', category: 'frontend' },
    { name: 'JavaScript', icon: '𝗝𝗦', category: 'language' },
    { name: 'TypeScript', icon: '𝗧𝗦', category: 'language' },
    { name: 'Python', icon: '🐍', category: 'language' },
    { name: 'Go', icon: '𝗚𝗼', category: 'language' },
    { name: 'Django', icon: '🎸', category: 'backend' },
    { name: 'FastAPI', icon: '⚡', category: 'backend' },
    { name: 'Svelte', icon: '🔥', category: 'frontend' },
    { name: 'Next.js', icon: '𝗡', category: 'frontend' },
    { name: 'Astro', icon: '🚀', category: 'frontend' },
    { name: 'TailwindCSS', icon: '🌊', category: 'frontend' },
    { name: 'ConvexDB', icon: '📊', category: 'database' },
    { name: 'Java', icon: '☕', category: 'language' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current && skillsRef.current) {
              const skills = skillsRef.current.querySelectorAll('.skill-item');
              skills.forEach((skill, i) => {
                setTimeout(() => {
                  skill.classList.add('scale-in');
                }, i * 50);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) observer.observe(currentSectionRef);

    return () => {
      if (currentSectionRef) observer.unobserve(currentSectionRef);
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 bg-foreground/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          My <span className="text-gradient">Skills</span>
        </h2>
        
        <div className="mb-10">
          <div className="flex gap-4 mb-4 overflow-x-auto py-2">
            <button className="px-4 py-2 rounded-full bg-foreground text-background text-sm hover-lift">
              All
            </button>
            {(['frontend', 'backend', 'database', 'language', 'tool'] as const).map((category) => (
              <button 
                key={category}
                className="px-4 py-2 rounded-full border border-foreground/20 text-sm hover:bg-foreground/5 hover-lift whitespace-nowrap"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div ref={skillsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div 
              key={skill.name}
              className="skill-item opacity-0 bg-background p-4 rounded-lg border border-foreground/10 flex flex-col items-center justify-center text-center gap-2 hover-lift cursor-pointer transition-all duration-300 hover:border-foreground/30"
            >
              <div className="text-3xl mb-2">{skill.icon}</div>
              <span className="font-medium">{skill.name}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground/70">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-foreground/5 to-foreground/10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">SWOT Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-2">Strengths</h4>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                <li>Quick to ship</li>
                <li>Strong entrepreneurial mindset</li>
                <li>User-centric approach</li>
                <li>Proficiency with modern technologies</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Weaknesses</h4>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                <li>Occasional imposter syndrome</li>
                <li>Sometimes feeling inadequate</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Opportunities</h4>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                <li>AI implementation in real-world applications</li>
                <li>Education and productivity tools</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Threats</h4>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                <li>Rapid advancement of AI technology</li>
                <li>Staying ahead of the curve</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 