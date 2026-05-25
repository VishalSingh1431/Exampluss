import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const executeSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/exams?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false); // Close mobile menu if open
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Exams', path: '/exams' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const Logo = () => (
    <Link to="/" className="flex items-center">
      <img 
        src="/images/logo.png" 
        alt="ExamPlus Logo"
        className="h-12 w-auto"
      />
    </Link>
  );

  return (
    <header className={`w-full transition-colors duration-300 z-50 ${
      isSticky ? 'sticky top-0 shadow-md bg-white' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />

          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg text-gray-700 hover:text-[#008080] font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') executeSearch();
                }}
                className="py-2.5 px-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent text-lg"
              />
              <button onClick={executeSearch} className="absolute right-4 top-2.5 text-gray-500 hover:text-[#008080]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            
            {user?.role === 'admin' && (
              <Link to="/admin" className="ml-4 text-gray-500 hover:text-[#008080] font-medium transition duration-300">
                Admin
              </Link>
            )}

            {user ? (
              <Link to="/profile" className="ml-4 flex items-center justify-center h-10 w-10 rounded-full bg-[#008080] text-white font-bold uppercase shadow-sm hover:shadow-md transition duration-300">
                {user.email ? user.email[0] : 'U'}
              </Link>
            ) : (
              <Link to="/login" className="ml-4 bg-[#008080] hover:bg-[#006666] text-white font-medium py-2.5 px-6 rounded-full transition duration-300">
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#008080] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8"
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

        {isOpen && (
          <div className="md:hidden mt-5 pb-5">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-5 py-3 text-lg text-gray-700 hover:bg-[#008080]/10 hover:text-[#008080] rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-5 px-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') executeSearch();
                  }}
                  className="w-full py-2.5 px-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent text-lg"
                />
                <button onClick={executeSearch} className="absolute right-4 top-2.5 text-gray-500 hover:text-[#008080]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
            <div className="mt-4 px-5 space-y-3">
              {user?.role === 'admin' && (
                <Link to="/admin" className="block w-full text-center bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-2.5 px-6 rounded-full transition duration-300" onClick={() => setIsOpen(false)}>
                  Admin Dashboard
                </Link>
              )}
              {user ? (
                <Link to="/profile" className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-[#008080] font-medium py-2.5 px-6 rounded-full transition duration-300" onClick={() => setIsOpen(false)}>
                  My Profile
                </Link>
              ) : (
                <Link to="/login" className="block w-full text-center bg-[#008080] hover:bg-[#006666] text-white font-medium py-2.5 px-6 rounded-full transition duration-300" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;