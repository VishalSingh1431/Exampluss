import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Exams', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  // Logo component - replace with your actual logo import
  const Logo = () => (
    <a href="#" className="flex items-center">
      <img 
        src="/images/logo (1).png" // Replace with your logo path
        alt="ExamPluss Logo"
        className="h-12 w-auto" // Increased from h-10 to h-12
      />
    </a>
  );

  return (
    <header
      className={`w-full transition-all duration-300 z-50 ${
        isSticky ? 'sticky top-0 shadow-md bg-white' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 py-4"> {/* Increased py-3 to py-4 */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10"> {/* Increased space-x-8 to space-x-10 */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors" // Added text-lg
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-2.5 px-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" // Increased padding and added text-lg
                style={{ fontSize: '1.1rem' }} // Slightly larger font
              />
              <button className="absolute right-4 top-2.5 text-gray-500 hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6" // Increased from h-5 w-5
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8" // Increased from w-6 h-6
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
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
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-5 pb-5"> {/* Increased mt-4 pb-4 to mt-5 pb-5 */}
            <div className="flex flex-col space-y-4"> {/* Increased space-y-3 to space-y-4 */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-5 py-3 text-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors" // Increased padding and added text-lg
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-5 px-5"> {/* Increased mt-4 px-4 to mt-5 px-5 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-2.5 px-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" // Increased padding and added text-lg
                  style={{ fontSize: '1.1rem' }} // Slightly larger font
                />
                <button className="absolute right-4 top-2.5 text-gray-500 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6" // Increased from h-5 w-5
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;