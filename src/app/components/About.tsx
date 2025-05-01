import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              elementsRef.current.forEach((el, i) => {
                if (el) {
                  setTimeout(() => {
                    el.classList.add('fade-in');
                  }, i * 100);
                }
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

  // Function to set elements in the ref array
  const setElementRef = (index: number) => (element: HTMLElement | null) => {
    elementsRef.current[index] = element;
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 
          ref={setElementRef(0)}
          className="text-3xl md:text-4xl font-bold mb-12 stagger-item"
        >
          About <span className="text-gradient">Me</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-3">
            <p 
              ref={setElementRef(1)}
              className="text-lg mb-6 leading-relaxed stagger-item"
            >
              I am a full-stack and AI developer passionate about creating impactful web applications that cater to real user needs. My technical expertise spans various languages and frameworks, including React, JavaScript, Python, FastAPI, Django, Svelte, Astro, TailwindCSS, Next.js, ConvexDB, and Java.
            </p>
            
            <p 
              ref={setElementRef(2)}
              className="text-lg mb-6 leading-relaxed stagger-item"
            >
              As an entrepreneur, I focus on shipping fast and ensuring my solutions are context-aware and user-centric. I am particularly interested in web development and AI implementation, where I see immense potential for innovation and problem-solving.
            </p>

            <div 
              ref={setElementRef(3)}
              className="mb-8 stagger-item"
            >
              <h3 className="text-xl font-semibold mb-4">Goal Statement</h3>
              <p className="text-lg leading-relaxed">
                My goal is to build AI-driven applications that help people achieve more by enhancing productivity and learning. I aim to work on impactful projects that push the boundaries of full-stack development and AI technologies, especially in education.
              </p>
            </div>

            <div 
              ref={setElementRef(4)}
              className="mb-8 stagger-item"
            >
              <h3 className="text-xl font-semibold mb-4">Vision Statement</h3>
              <p className="text-lg leading-relaxed">
                In the next 3-5 years, I see myself leading a team of developers working on innovative AI solutions, where we continuously ship fast, iterate based on real-world user feedback, and create products that make a meaningful difference.
              </p>
            </div>

            <div 
              ref={setElementRef(5)}
              className="stagger-item"
            >
              <h3 className="text-xl font-semibold mb-4">Values</h3>
              <p className="text-lg leading-relaxed">
                I believe in shipping fast, maintaining a strong understanding of user needs, and fostering innovation through entrepreneurship. While I am passionate about developing cutting-edge solutions, I am also focused on building with purpose and making a tangible impact. The entrepreneurial mindset drives me to solve problems quickly and learn iteratively.
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div 
              ref={setElementRef(6)} 
              className="bg-foreground/5 p-6 rounded-lg mb-6 hover-lift stagger-item"
            >
              <h3 className="text-xl font-semibold mb-4">Elevator Pitch</h3>
              <p className="leading-relaxed">
                I&apos;m a full-stack developer with a strong focus on AI. I build scalable, user-friendly applications using technologies like React, Python, and FastAPI. My entrepreneurial background allows me to understand market needs and deliver products quickly. I created Studi.ink, an AI-powered tool to help students maximize productivity on Canvas by generating study materials through intelligent agents.
              </p>
            </div>

            <div 
              ref={setElementRef(7)} 
              className="bg-foreground/5 p-6 rounded-lg mb-6 hover-lift stagger-item"
            >
              <h3 className="text-xl font-semibold mb-4">Brand Image</h3>
              <div className="flex flex-col gap-3">
                <p className="leading-relaxed">
                  <strong>Tagline:</strong> &quot;Empowering through AI and Fast Innovation&quot;
                </p>
                <p className="leading-relaxed">
                  <strong>Logo:</strong> The &quot;K&quot; and &quot;N&quot; stacked vertically, representing growth and simplicity. Bold purple tones convey creativity and boldness.
                </p>
                <p className="leading-relaxed">
                  <strong>Statement:</strong> The logo embodies simplicity and innovation, reflecting my commitment to developing clear, impactful solutions through AI and full-stack development.
                </p>
              </div>
            </div>

            <div 
              ref={setElementRef(8)} 
              className="bg-foreground/5 p-6 rounded-lg hover-lift stagger-item"
            >
              <h3 className="text-xl font-semibold mb-4">Project Spotlight</h3>
              <p className="leading-relaxed">
                <strong>Studi.ink</strong> is an AI-powered app for students using Canvas. It leverages RAG (retrieval-augmented generation) to index class materials, ensuring context-aware interactions. The app includes a ReAct agent capable of generating study materials such as notes, quizzes, and flashcards for students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 