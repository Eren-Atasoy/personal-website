import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Tag, Loader, ExternalLink } from 'lucide-react';
import { fetchMediumArticles } from '../services/mediumService';

const BlogCard = ({ post }) => (
  <a
    href={post.url}
    target="_blank"
    rel="noopener noreferrer"
    className="card-apple group cursor-pointer hover:shadow-apple-lg transition-all duration-500 block"
  >
    {/* Thumbnail if available */}
    {post.thumbnail && (
      <div className="relative overflow-hidden rounded-2xl mb-6 aspect-video">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    )}

    {/* Featured indicator */}
    {post.featured && (
      <div className="mb-4">
        <span className="inline-flex items-center bg-apple-blue/10 dark:bg-apple-blue/20 text-apple-blue px-3 py-1 rounded-full text-xs font-medium">
          Featured Post
        </span>
      </div>
    )}

    {/* Tags */}
    {post.tags && post.tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
          >
            <Tag size={10} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
    )}

    {/* Title */}
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-apple-blue transition-colors duration-300 line-clamp-2">
      {post.title}
    </h3>

    {/* Excerpt */}
    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3 text-sm">
      {post.excerpt}
    </p>

    {/* Meta Information */}
    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4 space-x-4">
      <span className="flex items-center">
        <Calendar size={12} className="mr-1.5" />
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </span>
      <span className="flex items-center">
        <Clock size={12} className="mr-1.5" />
        {post.readTime}
      </span>
    </div>

    {/* Read More */}
    <div className="inline-flex items-center text-apple-blue font-medium text-sm group-hover:gap-2 transition-all duration-300">
      <span>Read on Medium</span>
      <ExternalLink size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
    </div>
  </a>
);

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const posts = await fetchMediumArticles();
      setArticles(posts);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const featuredPosts = articles.filter(post => post.featured);
  const recentPosts = articles.filter(post => !post.featured);

  return (
    <section id="blog" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase mb-4">
            Insights & Articles
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            Latest Articles
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Thoughts, tutorials, and insights from my Medium blog
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader size={40} className="text-apple-blue animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading articles from Medium...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={loadArticles}
              className="btn-apple"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Articles Content */}
        {!loading && !error && (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                  Featured Articles
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                  Recent Posts
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* No Articles Message */}
            {articles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No articles found.
                </p>
              </div>
            )}
          </>
        )}

        {/* Medium CTA - Apple style */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="card-apple text-center bg-gradient-to-br from-apple-blue/5 to-apple-purple/5 dark:from-apple-blue/10 dark:to-apple-purple/10">
            <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white dark:text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Read More on Medium
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Follow me on Medium for more articles and insights
            </p>
            <a
              href="https://medium.com/@erenatasoy04"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple inline-flex items-center space-x-2"
            >
              <ExternalLink size={18} />
              <span>Visit Medium</span>
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Blog;
