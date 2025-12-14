import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Share2, Download, Search, ShieldCheck, Mail, MapPin, Send } from 'lucide-react';

const Landing: React.FC = () => {
  // Typing Effect State
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const words = ["Study Hub", "Notes Gallery", "Exam Guide"];

  // Typing Effect Logic
  useEffect(() => {
    const i = loopNum % words.length;
    const fullText = words[i];

    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      // Deleting speed
      timer = setTimeout(() => {
        setText(prev => prev.substring(0, prev.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setLoopNum(prev => prev + 1);
        }
      }, 50);
    } else {
      // Typing speed
      if (text !== fullText) {
        timer = setTimeout(() => {
          setText(prev => fullText.substring(0, prev.length + 1));
        }, 40);
      } else {
        // Pause at end of word before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 200);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      // Offset for sticky header (approx 80px)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-gradient-to-b md:bg-gradient-to-l from-gold-50/50 via-white to-white dark:from-maroon-950/30 dark:via-gray-900 dark:to-gray-900 opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16 relative z-10">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-maroon-50 dark:bg-maroon-900/30 text-maroon-800 dark:text-maroon-200 text-xs sm:text-sm font-medium mb-6 transition-colors border border-maroon-100 dark:border-maroon-800">
                <span className="flex h-2 w-2 rounded-full bg-maroon-600 dark:bg-maroon-400 mr-2"></span>
                Now available for all branches
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6 transition-colors min-h-[160px] sm:min-h-[auto]">
                The Ultimate <br className="hidden sm:block"/>
                <span className="text-maroon-800 dark:text-gold-500">
                  {text}
                  <span className="animate-pulse text-gray-400 dark:text-gray-500 font-light">|</span>
                </span>
                <br className="hidden sm:block"/> for Engineers
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 transition-colors px-2 sm:px-0">
                Access thousands of Notes, PYQs, Assignments, and Lab Manuals curated by top students and faculty. Centralized, organized, and free.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 px-4 sm:px-0">
                <Link to="/login" className="px-8 py-3.5 rounded-xl bg-maroon-800 text-white font-semibold shadow-lg shadow-maroon-200 dark:shadow-maroon-900/50 hover:bg-maroon-900 dark:hover:bg-maroon-700 hover:translate-y-[-2px] transition-all border border-transparent flex items-center justify-center">
                  Get Started
                </Link>
                <button 
                  onClick={scrollToFeatures}
                  className="px-8 py-3.5 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-semibold hover:bg-gold-50 dark:hover:bg-gray-700 hover:border-gold-300 dark:hover:border-gray-600 transition-all flex items-center justify-center"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center px-4">
               <div className="relative w-full max-w-sm lg:max-w-md">
                 {/* Gold/Maroon glow */}
                 <div className="absolute -inset-4 bg-gradient-to-tr from-maroon-200 to-gold-200 dark:from-maroon-900/40 dark:to-gold-900/20 rounded-full blur-3xl opacity-40"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Students studying" 
                   className="relative rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-full h-auto"
                 />
                 <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 animate-bounce-slow transition-colors">
                   <div className="p-2 sm:p-3 bg-gold-100 dark:bg-gold-900/30 rounded-lg text-gold-700 dark:text-gold-400">
                     <Download size={20} className="sm:w-6 sm:h-6" />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Downloads</p>
                     <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">12,500+</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 transition-colors scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-base font-semibold text-maroon-800 dark:text-gold-500 tracking-wide uppercase">Why ABES Connect?</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to ace your exams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-6 h-6 text-white" />,
                title: "Smart Search",
                desc: "Filter by Branch, Year, and Semester to find exactly what you need in seconds.",
                color: "bg-maroon-700"
              },
              {
                icon: <Share2 className="w-6 h-6 text-maroon-900" />,
                title: "Community Driven",
                desc: "Upload your own notes and help juniors. Get recognized on the leaderboard.",
                color: "bg-gold-400"
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-white" />,
                title: "Verified Content",
                desc: "All uploads are verified by faculty admins to ensure quality and relevance.",
                color: "bg-gray-800"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all hover:border-gold-200 dark:hover:border-gold-900">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 shadow-lg shadow-gray-200 dark:shadow-none`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-base font-semibold text-maroon-800 dark:text-gold-500 tracking-wide uppercase">Get in touch</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                We'd love to hear from you
              </p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Have a question about the study materials? Want to contribute notes or report an issue? Reach out to our student admin team.
              </p>
              
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-maroon-100 dark:bg-maroon-900/30 text-maroon-800 dark:text-maroon-400">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">support@abes.ac.in</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Campus</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">ABES Engineering College<br />Ghaziabad, Uttar Pradesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-maroon-500 focus:ring-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-maroon-500 focus:ring-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-maroon-500 focus:ring-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2" placeholder="How can we help?"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-maroon-800 hover:bg-maroon-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500 transition-colors">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 py-8 border-t border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-4 text-center">
           <p className="text-gray-500 dark:text-gray-400 text-sm">
             © {new Date().getFullYear()} ABES Connect. Built by Students, for Students.
           </p>
         </div>
      </footer>
    </div>
  );
};

export default Landing;