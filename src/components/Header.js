import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: 'Directory', href: '/directory' },
    { name: 'Deals', href: '/deals' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-border shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-default flex items-center justify-center">
              <span className="text-white font-bold text-lg">B+</span>
            </div>
            <span className="text-xl font-semibold text-primary">
              Benefit+
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-4">
            {/* User Profile Link */}
            <Link 
              to="/profile" 
              className="hidden sm:flex items-center space-x-2 text-text-secondary hover:text-text transition-colors duration-200"
            >
              <UserIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Profile</span>
            </Link>
            
            {/* Auth Button */}
            <button className="btn-primary text-sm px-4 py-2">
              Log In / Sign Up
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-default text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-default text-base font-medium text-text-secondary hover:text-text hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
