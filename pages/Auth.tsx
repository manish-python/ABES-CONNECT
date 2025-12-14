import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight, AlertCircle, GraduationCap, BookOpen } from 'lucide-react';
import { BRANCHES, YEARS } from '../types';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // New State for Students
  const [branch, setBranch] = useState('CSE');
  const [year, setYear] = useState('1st Year');
  
  const [error, setError] = useState('');
  const { login, signup } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  // Check URL query param for mode (e.g., /login?mode=signup)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('mode') === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login Logic
      const success = login(email, password, role);
      if (success) {
        navigate(role === 'ADMIN' ? '/admin' : '/dashboard');
      } else {
        setError("Invalid credentials. Please check Email, Password, and Role selection.");
      }
    } else {
      // Sign Up Logic
      if (!name.trim()) {
        setError("Name is required for sign up.");
        return;
      }
      // For security in this demo, prevent direct Admin signup (Admin must be promoted or hardcoded)
      if (role === 'ADMIN') {
         setError("Admin signup is restricted. Please login with provided credentials.");
         return;
      }

      const success = signup(name, email, password, role, branch, year);
      if (success) {
        navigate('/dashboard');
      } else {
        setError("Email already exists. Please login.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/30 p-8 border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isLogin ? 'Enter your details to access your dashboard' : 'Join the community of top achievers'}
          </p>
        </div>

        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-8 transition-colors">
          <button
            onClick={() => { setRole('STUDENT'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'STUDENT' ? 'bg-white dark:bg-gray-600 text-maroon-900 dark:text-white shadow-sm ring-1 ring-gray-200 dark:ring-0' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => { setRole('ADMIN'); setError(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'ADMIN' ? 'bg-white dark:bg-gray-600 text-maroon-900 dark:text-white shadow-sm ring-1 ring-gray-200 dark:ring-0' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Admin
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Show Name field only for Sign Up */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  required={!isLogin}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Student Specific Fields for Sign Up */}
          {!isLogin && role === 'STUDENT' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpen className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    {BRANCHES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-maroon-800 hover:bg-maroon-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin); 
              setError('');
              // Reset role to student if switching to signup (admin signup restricted)
              if (isLogin) setRole('STUDENT'); 
            }}
            className="text-sm font-medium text-maroon-700 dark:text-gold-500 hover:text-maroon-900 dark:hover:text-gold-400 underline decoration-transparent hover:decoration-current transition-all"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;