import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, Loader, Clock } from 'lucide-react';
import { fetchGitHubRepos, getRateLimitStatus } from '../services/githubService';

const ProjectCard = ({ project }) => (
  <a 
    href={project.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="card-apple group cursor-pointer overflow-hidden block"
  >
    {/* Project Image - Apple style with subtle overlay */}
    <div className="relative overflow-hidden rounded-2xl mb-6 aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/600x400/e5e7eb/6b7280?text=' + encodeURIComponent(project.title);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Featured Badge - Apple style */}
      {project.featured && (
        <div className="absolute top-4 right-4">
          <div className="glass px-3 py-1.5 rounded-full flex items-center space-x-1">
            <Star size={12} className="text-apple-yellow fill-apple-yellow" />
            <span className="text-xs font-medium text-gray-900 dark:text-white">Featured</span>
          </div>
        </div>
      )}

      {/* Stars badge */}
      {project.stars > 0 && (
        <div className="absolute top-4 left-4">
          <div className="glass px-3 py-1.5 rounded-full flex items-center space-x-1">
            <Star size={12} className="text-gray-900 dark:text-white" />
            <span className="text-xs font-medium text-gray-900 dark:text-white">{project.stars}</span>
          </div>
        </div>
      )}

      {/* Action buttons on hover */}
      <div className="absolute bottom-4 left-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        <div className="flex-1 glass hover:bg-white/90 dark:hover:bg-black/90 text-gray-900 dark:text-white text-center py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2">
          <Github size={14} />
          <span>View Repository</span>
        </div>
        {project.liveUrl && project.liveUrl !== project.githubUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass hover:bg-white/90 dark:hover:bg-black/90 text-gray-900 dark:text-white p-2.5 rounded-full transition-all duration-300 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>

    {/* Project Content */}
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-apple-blue transition-colors duration-300 capitalize">
        {project.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-2">
        {project.description}
      </p>

      {/* Technologies - Apple pill style */}
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </a>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [rateLimitStatus, setRateLimitStatus] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      setUsingFallback(false);
      const repos = await fetchGitHubRepos();
      setProjects(repos);
      
      // Get rate limit status
      const rateLimit = getRateLimitStatus();
      setRateLimitStatus(rateLimit);
      
      // Check if we're using fallback data
      if (repos.length > 0) {
        const isFallback = repos.every(repo => 
          [1, 2, 3, 4, 5, 6].includes(repo.id)
        );
        setUsingFallback(isFallback);
      }
    } catch (err) {
      setError('Failed to load projects. Please try again later.');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects
  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured'
    ? projects.filter(project => project.featured)
    : projects.filter(project => 
        project.technologies.some(tech => tech.toLowerCase().includes(filter.toLowerCase()))
      );

  // Get unique technologies for filters
  const allTechnologies = [...new Set(projects.flatMap(p => p.technologies))];
  const topTechnologies = allTechnologies.slice(0, 4);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-black">
      <div className="container-max">
        {/* Section Header - Apple style */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            Featured Work
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Open source projects and repositories from my GitHub
          </p>
        </div>

        {/* Rate Limit & Fallback Notification */}
        {usingFallback && rateLimitStatus && (
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="glass border border-apple-blue/20 rounded-2xl p-4 flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-apple-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong className="font-semibold">Rate Limit Info:</strong> Using cached repository data.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    Resets: {rateLimitStatus.resetTime}
                  </span>
                  <span>
                    Remaining: {rateLimitStatus.remaining}/{rateLimitStatus.limit}
                  </span>
                  {!rateLimitStatus.hasToken && (
                    <span className="text-apple-blue">
                      💡 Add token for 5000/hour limit
                    </span>
                  )}
                </div>
                {!rateLimitStatus.hasToken && (
                  <a 
                    href="https://github.com/settings/tokens" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-apple-blue hover:underline text-xs mt-2 inline-block"
                  >
                    Get GitHub Token →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filter Pills - Apple style */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-apple'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === 'featured'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-apple'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Featured
          </button>
          {topTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tech
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-apple'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader size={40} className="text-apple-blue animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading projects from GitHub...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={loadProjects}
              className="btn-apple"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Projects Grid - Apple spacing */}
        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* No Projects Message */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No projects found for the selected filter.
                </p>
              </div>
            )}
          </>
        )}

        {/* GitHub CTA - Apple card style */}
        <div className="max-w-3xl mx-auto">
          <div className="card-apple text-center">
            <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Github size={28} className="text-white dark:text-black" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Want to see more?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Check out my GitHub for more projects and contributions
            </p>
            <a
              href="https://github.com/Eren-Atasoy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple inline-flex items-center space-x-2"
            >
              <Github size={18} />
              <span>Visit GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Line clamp styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Projects;
