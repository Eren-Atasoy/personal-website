import React from 'react';
import { ChevronDown, Download, Mail, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const Hero = () => {
  const handleScroll = (targetId) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
      
      {/* Content */}
      <div className="container-max section-padding relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 animate-fade-in">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
              <img
                src={personalInfo.profileImage}
                alt={`${personalInfo.name} - Profile`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
              {personalInfo.title}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => handleScroll('#projects')}
                className="btn-primary flex items-center space-x-2 group"
                aria-label="View my projects"
              >
                <span>View My Work</span>
                <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-secondary flex items-center space-x-2 group"
                aria-label="Contact me via email"
              >
                <Mail size={18} />
                <span>Get In Touch</span>
              </a>
              
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200 group"
                aria-label="Download my resume"
              >
                <Download size={18} className="group-hover:translate-y-1 transition-transform duration-200" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce-slow">
              <button
                onClick={() => handleScroll('#about')}
                className="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full p-2"
                aria-label="Scroll to about section"
              >
                <ChevronDown size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Animations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse dark:opacity-30"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000 dark:opacity-30"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000 dark:opacity-30"></div>

      {/* Custom Styles for Grid Pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;