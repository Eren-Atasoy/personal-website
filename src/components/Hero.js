import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { ANIMATION } from '../utils/constants';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const profileRef = useRef(null);

  useEffect(() => {
    const text = personalInfo.title;
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, ANIMATION.TYPEWRITER_DELAY);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (targetId) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e) => {
    if (!profileRef.current) return;

    const rect = profileRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -ANIMATION.PROFILE_TILT_MAX;
    const rotateY = ((x - centerX) / centerX) * ANIMATION.PROFILE_TILT_MAX;

    profileRef.current.style.transform = `perspective(${ANIMATION.PROFILE_PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${ANIMATION.PROFILE_SCALE_HOVER})`;
  };

  const handleMouseLeave = () => {
    if (profileRef.current) {
      profileRef.current.style.transform = `perspective(${ANIMATION.PROFILE_PERSPECTIVE}px) rotateX(0) rotateY(0) scale(1)`;
    }
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
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
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-apple-purple/5 dark:bg-apple-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="container-max section-padding relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-8">

          {/* Profile Image - minimalist with 3D hover effect */}
          <div className="mb-12 animate-scale-in">
            <div
              ref={profileRef}
              className={`w-48 h-48 md:w-42 md:h-42 mx-auto rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 shadow-apple profile-container transition-all duration-300 ${isHovered ? 'ring-apple-blue/50 dark:ring-apple-blue/30 shadow-xl' : ''
                }`}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={personalInfo.profileImage}
                alt={`${personalInfo.name}`}
                className="w-full h-full object-cover transition-all duration-300"
                loading="eager"
              />
              {/* Hover glow effect */}
              {isHovered && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-apple-blue/20 via-apple-purple/10 to-apple-pink/20 pointer-events-none animate-pulse-slow" />
              )}
            </div>
          </div>

          {/* Main Content - Apple typography */}
          <div className="animate-fade-in space-y-6">

            {/* Main heading - handwritten style */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white leading-none handwritten-name">
              {personalInfo.name}
            </h1>

            {/* Subtitle with typewriter effect - handwritten style */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold handwritten-subtitle min-h-[3rem] md:min-h-[4rem] flex items-center justify-center">
              {displayText}
              {displayText !== personalInfo.title && <span className="typewriter-cursor ml-1">|</span>}
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
          <div className="pt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
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