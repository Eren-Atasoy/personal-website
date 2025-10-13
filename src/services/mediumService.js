// Medium RSS Feed Service
const MEDIUM_USERNAME = '@erenatasoy04';
const MEDIUM_RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${MEDIUM_USERNAME}`;

/**
 * Fetch articles from Medium RSS feed
 * @returns {Promise<Array>} Array of article objects
 */
export const fetchMediumArticles = async () => {
  try {
    const response = await fetch(MEDIUM_RSS_URL);

    if (!response.ok) {
      throw new Error('Medium RSS request failed');
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('Medium RSS returned error status');
    }

    // Transform to our blog post format
    return data.items.map((item, index) => ({
      id: item.guid,
      title: item.title,
      excerpt: extractExcerpt(item.description),
      content: item.description,
      date: item.pubDate,
      readTime: calculateReadTime(item.description),
      tags: item.categories || [],
      slug: extractSlug(item.link),
      url: item.link,
      author: item.author,
      thumbnail: extractThumbnail(item.description),
      featured: index < 2, // First 2 are featured
    }));
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return [];
  }
};

/**
 * Extract plain text excerpt from HTML content
 * @param {string} html - HTML content
 * @returns {string} Plain text excerpt
 */
const extractExcerpt = (html) => {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '');
  // Get first 200 characters
  const excerpt = text.substring(0, 200);
  return excerpt.length < text.length ? `${excerpt}...` : excerpt;
};

/**
 * Calculate reading time based on content length
 * @param {string} content - Article content
 * @returns {string} Reading time string
 */
const calculateReadTime = (content) => {
  const text = content.replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

/**
 * Extract slug from Medium URL
 * @param {string} url - Medium article URL
 * @returns {string} Article slug
 */
const extractSlug = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1] || '';
};

/**
 * Extract thumbnail image from HTML content
 * @param {string} html - HTML content
 * @returns {string|null} Thumbnail URL or null
 */
const extractThumbnail = (html) => {
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
};

/**
 * Get featured articles (top 4)
 * @returns {Promise<Array>} Array of featured articles
 */
export const getFeaturedArticles = async () => {
  const articles = await fetchMediumArticles();
  return articles.slice(0, 4);
};

/**
 * Get article by slug
 * @param {string} slug - Article slug
 * @returns {Promise<Object|null>} Article object or null
 */
export const getArticleBySlug = async (slug) => {
  const articles = await fetchMediumArticles();
  return articles.find(article => article.slug === slug) || null;
};
