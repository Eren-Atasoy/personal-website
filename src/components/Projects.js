import React, { useState } from 'react';
import { ExternalLink, Github, Star, Filter } from 'lucide-react';
import { projects } from '../data/portfolio';

const ProjectCard = ({ project }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
    {/* Project Image */}
    <div className="relative overflow-hidden h-48">
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4">
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
            <Star size={12} className="mr-1" />
            Featured
          </span>
        </div>
      )}

      {/* Overlay Buttons */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full transition-colors duration-200"
            aria-label={`View ${project.title} live demo`}
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full transition-colors duration-200"
            aria-label={`View ${project.title} source code`}
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>

    {/* Project Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
        {project.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          aria-label={`View ${project.title} live demo`}
        >
          <ExternalLink size={16} />
          <span>Live Demo</span>
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          aria-label={`View ${project.title} source code`}
        >
          <Github size={16} />
          <span>Code</span>
        </a>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Get unique technologies for filter (currently using hardcoded list below)
  // const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];

  // Filter projects based on selected filter
  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured'
    ? projects.filter(project => project.featured)
    : projects.filter(project => project.technologies.includes(filter));

  const loadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
            }`}
          >
            <Filter size={16} />
            <span>All Projects</span>
          </button>
          
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 ${
              filter === 'featured'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
            }`}
          >
            <Star size={16} />
            <span>Featured</span>
          </button>

          {/* Technology Filters */}
          {['React', 'Node.js', 'Python', 'JavaScript'].map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filter === tech
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.slice(0, visibleProjects).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="btn-primary"
            >
              Load More Projects
            </button>
          </div>
        )}

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found for the selected filter.
            </p>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-16 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want to see more?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check out my GitHub for more projects and contributions
          </p>
          <a
            href="https://github.com/johndoe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Github size={20} />
            <span>Visit GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;