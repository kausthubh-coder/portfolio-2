import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: 'Studi.ink',
      description: 'AI-powered tool that helps students maximize productivity on Canvas by generating study materials through intelligent agents.',
      technologies: ['React', 'TypeScript', 'Node.js', 'OpenAI', 'ConvexDB'],
      image: '/project-placeholder.svg',
      link: 'https://studi.ink'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, sleek portfolio site with micro-interactions and animations to showcase my work and skills.',
      technologies: ['Next.js', 'TailwindCSS', 'TypeScript', 'React'],
      image: '/project-placeholder.svg',
    },
    {
      title: 'AI Content Generator',
      description: 'Tool for creating customized content using various AI models with flexible input parameters.',
      technologies: ['Python', 'FastAPI', 'React', 'LangChain'],
      image: '/project-placeholder.svg',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current && projectsRef.current) {
              const projects = projectsRef.current.querySelectorAll('.project-card');
              projects.forEach((project, index) => {
                setTimeout(() => {
                  project.classList.add('fade-in');
                }, index * 200);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="project-card opacity-0 bg-background rounded-lg overflow-hidden border border-foreground/10 hover:border-foreground/30 transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <div 
                  className={`absolute inset-0 bg-foreground/80 flex items-center justify-center transition-opacity duration-300 z-10 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {project.link ? (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-background text-foreground rounded-full font-medium text-sm hover-lift"
                    >
                      View Project
                    </a>
                  ) : (
                    <span className="px-4 py-2 bg-background text-foreground rounded-full font-medium text-sm">
                      Coming Soon
                    </span>
                  )}
                </div>
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  width={600} 
                  height={337}
                  className="w-full h-auto"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-foreground/80 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-foreground/5 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 rounded-full border border-foreground hover:bg-foreground/5 transition-all duration-300 hover-lift gap-2"
          >
            <span>View More Projects</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 