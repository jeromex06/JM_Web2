import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoFull from '../assets/JM Logo BGR.png';
import logoShield from '../assets/JM Logo Shield BGR.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `relative transition-colors duration-200 hover:text-[#FF6B00] ${
      isActive(path) ? 'text-[#FF6B00]' : 'text-gray-800'
    }`;

  const mobileNavLinkClass = (path) =>
    `flex items-center gap-2 hover:text-[#FF6B00] transition-colors pb-4 border-b border-gray-100 ${
      isActive(path) ? 'text-[#FF6B00]' : 'text-gray-800'
    }`;

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-700 ease-in-out ${isScrolled ? 'pt-4' : 'pt-6'}`}>
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-700 ease-in-out overflow-hidden ${
            isScrolled
              ? 'w-[98%] max-w-[1920px] bg-white/80 backdrop-blur-xl border border-white/20 shadow-sm rounded-full px-4 md:px-6 py-3'
              : 'w-[98%] md:w-[80%] max-w-[1920px] bg-[#E8E6DF]/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.15)] rounded-full px-4 md:px-8 py-2'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center w-24 md:w-32 relative h-10 md:h-14 shrink-0">
            <img
              src={logoShield}
              alt="JOVA METCRAFT"
              className={`absolute object-contain drop-shadow-md transition-all duration-700 ease-in-out ${isScrolled ? 'opacity-0 scale-50' : 'opacity-100 scale-100 h-8 md:h-10'}`}
            />
            <img
              src={logoFull}
              alt="JOVA METCRAFT"
              className={`absolute object-contain drop-shadow-md transition-all duration-700 ease-in-out ${isScrolled ? 'opacity-100 scale-100 h-10 md:h-14' : 'opacity-0 scale-150'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8 text-[13px] font-bold tracking-wider">
            <Link to="/" className={navLinkClass('/')}>
              Home
              {isActive('/') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              )}
            </Link>
            <Link to="/about" className={navLinkClass('/about')}>
              About
              {isActive('/about') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              )}
            </Link>
            <Link to="/Product" className={navLinkClass('/Product')}>
              Product
              {isActive('/Product') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              )}
            </Link>
            <Link to="/services" className={navLinkClass('/services')}>
              Services
              {isActive('/services') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              )}
            </Link>
            <Link to="/contact" className={navLinkClass('/contact')}>
              Contact
              {isActive('/contact') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              )}
            </Link>
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <button className="hidden sm:flex bg-gradient-to-r from-[#FF6B00] to-[#D4AF37] hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] text-white font-bold py-2.5 px-5 md:px-6 rounded-full transition-all transform hover:-translate-y-0.5 items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 19L19 5M19 5v10M19 5H9"></path></svg>
              </span>
            </button>

            {/* Hamburger Button */}
            <button
              className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/50 border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 xl:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl flex flex-col p-8 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-end mb-8">
            <button
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <nav className="flex flex-col space-y-6 text-lg font-bold tracking-wide">
            <Link to="/" className={mobileNavLinkClass('/')}>
              {isActive('/') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0" />}
              Home
            </Link>
            <Link to="/about" className={mobileNavLinkClass('/about')}>
              {isActive('/about') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0" />}
              About
            </Link>
            <Link to="/Product" className={mobileNavLinkClass('/Product')}>
              {isActive('/Product') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0" />}
              Product
            </Link>
            <Link to="/services" className={mobileNavLinkClass('/services')}>
              {isActive('/services') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0" />}
              Services
            </Link>
            <Link to="/contact" className={mobileNavLinkClass('/contact')}>
              {isActive('/contact') && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0" />}
              Contact
            </Link>
          </nav>

          <div className="mt-auto">
            <button className="w-full bg-gradient-to-r from-[#FF6B00] to-[#D4AF37] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 19L19 5M19 5v10M19 5H9"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
