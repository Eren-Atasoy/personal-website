import React from 'react';
import { generateGradient } from '../utils/gradientGenerator';

const BlogPlaceholder = ({ postId, postTitle }) => {
  const [gradient1, gradient2] = generateGradient(postTitle);

  return (
    <div 
      className="w-full h-full relative overflow-hidden transition-transform duration-500 ease-out group-hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${gradient1} 0%, ${gradient2} 100%)`
      }}
    >
      {/* Geometric patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`pattern-${postId}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="white"/>
            <circle cx="0" cy="0" r="2" fill="white"/>
            <circle cx="40" cy="0" r="2" fill="white"/>
            <circle cx="0" cy="40" r="2" fill="white"/>
            <circle cx="40" cy="40" r="2" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pattern-${postId})`}/>
      </svg>
      
      {/* Responsive gradient orbs */}
      <div className="absolute -top-10 md:-top-20 -right-10 md:-right-20 w-40 h-40 md:w-80 md:h-80 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-5 md:-bottom-10 -left-5 md:-left-10 w-32 h-32 md:w-60 md:h-60 bg-white/20 rounded-full blur-3xl"></div>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 z-10">
        <div className="mb-3 md:mb-4">
          <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 shadow-2xl">
            <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14" viewBox="0 0 24 24" fill="currentColor" style={{ color: gradient1 }}>
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
            </svg>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white text-sm md:text-base lg:text-lg font-semibold mb-0.5 md:mb-1">Medium Article</p>
          <p className="text-white/80 text-xs md:text-sm">Read on Medium</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPlaceholder;

