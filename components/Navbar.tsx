import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, BookOpen, User as UserIcon, Upload, LayoutDashboard, ShieldCheck, Sun, Moon, Menu, X, Home } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, logout } = useData();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? (user.role === 'ADMIN' ? '/admin' : '/dashboard') : '/'} className="flex-shrink-0 flex items-center gap-2 sm:gap-3 cursor-pointer">
              <img 
                src="https://www.abes.ac.in/assets/Logo.png" 
                alt="ABES Logo" 
                className="h-8 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://images.collegedunia.com/public/college_data/images/logos/1500615967Logo.jpg";
                }}
              />
              <span className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white tracking-tight leading-tight">
                ABES <span className="text-maroon-800 dark:text-gold-500 block sm:inline">Connect</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gold-50 hover:text-maroon-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gold-400 transition-colors focus:outline-none"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {user ? (
              <>
                {/* Show Student Links for both STUDENT and ADMIN */}
                {(user.role === 'STUDENT' || user.role === 'ADMIN') && (
                  <Link
                    to="/dashboard"
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard') 
                        ? 'text-maroon-800 bg-gold-50 dark:bg-maroon-900/30 dark:text-gold-400' 
                        : 'text-gray-600 hover:text-maroon-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                )}
                
                {(user.role === 'STUDENT' || user.role === 'ADMIN') && (
                   <Link
                   to="/upload"
                   className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                     isActive('/upload') 
                       ? 'text-maroon-800 bg-gold-50 dark:bg-maroon-900/30 dark:text-gold-400' 
                       : 'text-gray-600 hover:text-maroon-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                   }`}
                 >
                   <Upload className="w-4 h-4 mr-2" />
                   Upload
                 </Link>
                )}

                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/admin') 
                        ? 'text-maroon-800 bg-gold-50 dark:bg-maroon-900/30 dark:text-gold-400' 
                        : 'text-gray-600 hover:text-maroon-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Link>
                )}

                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role.toLowerCase()}</span>
                  </div>
                  <img src={user.avatar} alt="Profile" className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700 ring-2 ring-transparent hover:ring-maroon-500 transition-all" />
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full text-gray-500 hover:text-maroon-600 hover:bg-maroon-50 dark:text-gray-400 dark:hover:text-maroon-400 dark:hover:bg-maroon-900/30 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-maroon-800 dark:text-gray-300 dark:hover:text-white font-medium text-sm transition-colors">Log in</Link>
                <Link to="/login?mode=signup" className="bg-maroon-800 text-white px-4 py-2 rounded-lg hover:bg-maroon-900 dark:hover:bg-maroon-700 text-sm font-medium transition-colors shadow-sm shadow-maroon-200 dark:shadow-none border border-transparent hover:border-gold-500/30">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gold-50 hover:text-maroon-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gold-400 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-3 mb-2 border-b border-gray-100 dark:border-gray-800">
                  <img src={user.avatar} alt="Profile" className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                </div>

                {(user.role === 'STUDENT' || user.role === 'ADMIN') && (
                  <>
                    <Link
                      to="/dashboard"
                      className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                        isActive('/dashboard') 
                          ? 'bg-gold-50 text-maroon-800 dark:bg-maroon-900/30 dark:text-gold-400' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3" />
                      Dashboard
                    </Link>
                    <Link
                      to="/upload"
                      className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                        isActive('/upload') 
                          ? 'bg-gold-50 text-maroon-800 dark:bg-maroon-900/30 dark:text-gold-400' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Upload className="w-5 h-5 mr-3" />
                      Upload
                    </Link>
                  </>
                )}

                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                      isActive('/admin') 
                        ? 'bg-gold-50 text-maroon-800 dark:bg-maroon-900/30 dark:text-gold-400' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 mr-3" />
                    Admin Panel
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 px-3 py-2">
                <Link 
                  to="/" 
                  className={`flex items-center px-2 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md ${isActive('/') ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                >
                  <Home className="w-5 h-5 mr-3" />
                  Home
                </Link>
                <Link 
                  to="/login"
                  className="block w-full text-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/login?mode=signup"
                  className="block w-full text-center px-4 py-3 bg-maroon-800 text-white rounded-lg font-medium hover:bg-maroon-900 shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;