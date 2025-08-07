import React from 'react';
import { DarkModeProvider, useDarkMode } from './components/DarkModeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Main App component wrapped with dark mode context
const AppContent = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Root App component with providers
function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
