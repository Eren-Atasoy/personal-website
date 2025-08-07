import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personalInfo, socialLinks, navigation } from '../data/portfolio';

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

  const getSocialIcon = (iconName) => {
    const icons = {
      FaGithub: FaGithub,
      FaLinkedin: FaLinkedin,
      FaTwitter: FaTwitter
    };
    return icons[iconName] || FaGithub;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand/About Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">{personalInfo.name}</h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {personalInfo.bio}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <p className="text-gray-400">
                <span className="font-medium">Email:</span>{' '}
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
                >
                  {personalInfo.email}
                </a>
              </p>
              <p className="text-gray-400">
                <span className="font-medium">Location:</span> {personalInfo.location}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = getSocialIcon(social.icon);
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group"
                    aria-label={`Visit my ${social.name} profile`}
                  >
                    <IconComponent size={18} className="group-hover:scale-110 transition-transform duration-200" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navigation.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services/Skills */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                Web Development
              </li>
              <li className="hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                Frontend Development
              </li>
              <li className="hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                Backend Development
              </li>
              <li className="hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                UI/UX Design
              </li>
              <li className="hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                Consulting
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center text-gray-400 text-sm">
              <span>© {currentYear} {personalInfo.name}. Made with</span>
              <Heart size={16} className="text-red-500 mx-2 animate-pulse" />
              <span>and lots of coffee.</span>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors duration-200 group"
              aria-label="Scroll to top"
            >
              <span className="text-sm">Back to top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button for Mobile */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group md:hidden z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-200" />
      </button>
    </footer>
  );
};

export default Footer;