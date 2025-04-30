import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="text-gradient hover-lift relative w-12 h-12"
        >
          <svg width="100%" height="100%" viewBox="0 0 93 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2727 107V13.9091H22.5455V60.0909H23.6364L65.4545 13.9091H80.1818L41.0909 55.9091L80.1818 107H66.5455L34.1818 63.7273L22.5455 76.8182V107H11.2727Z" fill="currentColor"/>
            <path d="M86.0909 13.9091V107H75.1818L24.4545 33.9091H23.5455V107H12.2727V13.9091H23.1818L74.0909 87.1818H75V13.9091H86.0909Z" fill="currentColor"/>
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {['About', 'Projects', 'Skills', 'Contact'].map((item, i) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`hover-lift relative text-sm font-medium fade-in opacity-0`}
              style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col space-y-1.5 p-2 hover-lift"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background/95 z-40 flex flex-col items-center justify-center md:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col space-y-6 items-center">
          {['About', 'Projects', 'Skills', 'Contact'].map((item, i) => (
            <Link 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-2xl font-medium hover-lift"
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
} 