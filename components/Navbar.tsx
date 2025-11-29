import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Box } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Tech Showcase', path: '/technology' },
    { name: 'Developers', path: '/developer' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-deepSlate/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded overflow-hidden group-hover:border-neonBlue transition-colors">
            <Box className="w-5 h-5 text-neonBlue" />
          </div>
          <span className="font-serif font-bold text-xl tracking-tighter">
            VTO<span className="text-neonBlue">-</span>Nexus
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-neonBlue ${
                location.pathname === link.path ? 'text-neonBlue' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="px-5 py-2 text-sm font-semibold bg-white/5 border border-white/10 rounded-full hover:bg-neonBlue/10 hover:border-neonBlue hover:text-neonBlue transition-all"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-deepSlate border-b border-white/10 backdrop-blur-xl p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-neonBlue py-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="text-center w-full py-3 bg-neonBlue/10 text-neonBlue border border-neonBlue/30 rounded"
          >
            Login
          </Link>
        </motion.div>
      )}
    </nav>
  );
}