// src/components/Layout/Header.jsx
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Recherche', path: '/recherche' },
    { name: 'Ajouter', path: '/ajouter' }
  ];

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
      isActive 
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
        : 'text-gray-800 hover:bg-white/20 hover:text-blue-600'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
        : 'text-gray-800 hover:bg-white/20 hover:text-blue-600'
    }`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-transparent backdrop-blur-md  sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main header content */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎬 Ger4u.vip
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={navLinkClass}
                end={item.path === '/'}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-white/20 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isMobileMenuOpen ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-64 opacity-100 pb-4' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-2 pt-2 border-t border-white/20">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={mobileNavLinkClass}
                end={item.path === '/'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;