import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
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
      className="min-h-screen flex items-center justify-center relative bg-white dark:bg-black overflow-hidden"
    >
      {/* Subtle gradient background - Apple style */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900"></div>
      
      {/* Floating orbs - subtle Apple-style */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-apple-blue/5 dark:bg-apple-blue/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-apple-purple/5 dark:bg-apple-purple/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      {/* Content */}
      <div className="container-max section-padding relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          
          {/* Profile Image - minimalist */}
          <div className="mb-12 animate-scale-in">
            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 shadow-apple">
              <img
                src={personalInfo.profileImage}
                alt={`${personalInfo.name}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Main Content - Apple typography */}
          <div className="animate-fade-in space-y-6">
            {/* Small intro text */}
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
              Welcome
            </p>
            
            {/* Main heading - large and bold like Apple */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-gray-900 dark:text-white tracking-tight leading-none">
              {personalInfo.name}
            </h1>
            
            {/* Subtitle with gradient - Apple style */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gradient">
              {personalInfo.title}
            </h2>
            
            {/* Description - generous spacing */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-normal pt-4">
              {personalInfo.bio}
            </p>

            {/* CTA Buttons - Apple style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => handleScroll('#projects')}
                className="btn-apple flex items-center space-x-2 group"
                aria-label="View my projects"
              >
                <span>View My Work</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-apple-secondary flex items-center space-x-2"
                aria-label="Contact me via email"
              >
                <span>Get In Touch</span>
              </a>
            </div>
          </div>

          {/* Scroll Indicator - minimal */}
          <div className="pt-16 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <button
              onClick={() => handleScroll('#about')}
              className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300 focus:outline-none group"
              aria-label="Scroll to about section"
            >
              <ChevronDown size={28} className="animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;