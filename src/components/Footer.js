import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { personalInfo, navigation } from '../data/portfolio';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="container-max px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {personalInfo.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mb-6">
              {personalInfo.bio}
            </p>
            
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigation.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                {personalInfo.location}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Apple minimal style */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container-max px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <span>© {currentYear} {personalInfo.name}. Made with</span>
              <Heart size={14} className="text-apple-red mx-2 fill-apple-red" />
              <span>and passion.</span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm group"
              aria-label="Scroll to top"
            >
              <span>Back to top</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button - Mobile */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full shadow-apple-lg hover:shadow-apple-xl transition-all duration-300 flex items-center justify-center md:hidden z-40 group"
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </footer>
  );
};

export default Footer;
