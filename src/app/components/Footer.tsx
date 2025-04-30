export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t border-foreground/10 bg-background">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="text-gradient inline-block mb-2 w-10 h-10">
            <svg width="100%" height="100%" viewBox="0 0 93 128" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2727 107V13.9091H22.5455V60.0909H23.6364L65.4545 13.9091H80.1818L41.0909 55.9091L80.1818 107H66.5455L34.1818 63.7273L22.5455 76.8182V107H11.2727Z" fill="currentColor"/>
              <path d="M86.0909 13.9091V107H75.1818L24.4545 33.9091H23.5455V107H12.2727V13.9091H23.1818L74.0909 87.1818H75V13.9091H86.0909Z" fill="currentColor"/>
            </svg>
          </div>
          <p className="text-sm text-foreground/70">
            &copy; {currentYear} Kaustav Nag. All rights reserved.
          </p>
          <div className="flex flex-col mt-2 text-sm text-foreground/70">
            <a href="mailto:kausthubh2007@gmail.com" className="hover:text-foreground transition-colors">
              kausthubh2007@gmail.com
            </a>
            <a href="tel:9803274282" className="hover:text-foreground transition-colors">
              (980) 327-4282
            </a>
          </div>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <a 
            href="#about" 
            className="hover:text-foreground transition-colors hover-lift"
          >
            About
          </a>
          <a 
            href="#projects" 
            className="hover:text-foreground transition-colors hover-lift"
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className="hover:text-foreground transition-colors hover-lift"
          >
            Skills
          </a>
          <a 
            href="#contact" 
            className="hover:text-foreground transition-colors hover-lift"
          >
            Contact
          </a>
        </nav>
        
        <div className="flex gap-4">          
          <a 
            href="https://github.com/kausthubh-coder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 hover-lift"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/kausthubh-nandimandalam-3242852aa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 hover-lift"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
} 