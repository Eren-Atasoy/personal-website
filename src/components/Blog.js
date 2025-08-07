import React from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '../data/portfolio';

const BlogCard = ({ post }) => (
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
    {/* Featured Badge */}
    {post.featured && (
      <div className="bg-gradient-to-r from-primary-500 to-blue-500 px-4 py-2">
        <span className="text-white text-sm font-semibold">Featured Post</span>
      </div>
    )}

    <div className="p-6">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs font-medium"
          >
            <Tag size={12} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>

      {/* Meta Information */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <span className="flex items-center">
            <Clock size={14} className="mr-1" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Read More Button */}
      <button className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200 group">
        <span>Read More</span>
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </div>
  </article>
);

const Blog = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 4);

  return (
    <section id="blog" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Articles
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development and technology
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full mr-3"></span>
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
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
            Recent Posts
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* View All Posts CTA */}
        <div className="text-center mt-16 p-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want to read more?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore all articles and stay updated with the latest posts
          </p>
          <button className="btn-primary">
            View All Articles
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-6 opacity-90">
            Subscribe to get notified about new articles and insights
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
              required
            />
            <button
              type="submit"
              className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Custom Styles for Line Clamping */}
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