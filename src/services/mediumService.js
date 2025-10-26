import { logger } from '../utils/logger';

const MEDIUM_USERNAME = '@erenatasoy04';
const MEDIUM_RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${MEDIUM_USERNAME}`;
const WORDS_PER_MINUTE = 200;
const EXCERPT_LENGTH = 200;
const FEATURED_ARTICLE_COUNT = 2;

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
      featured: index < FEATURED_ARTICLE_COUNT,
    }));
  } catch (error) {
    logger.error('Error fetching Medium articles:', error);
    return [];
  }
};

const extractExcerpt = (html) => {
  const text = html.replace(/<[^>]*>/g, '');
  const excerpt = text.substring(0, EXCERPT_LENGTH);
  return excerpt.length < text.length ? `${excerpt}...` : excerpt;
};

const calculateReadTime = (content) => {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return `${minutes} min read`;
};

const extractSlug = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1] || '';
};

const extractThumbnail = (html) => {
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
  const imgUrl = imgMatch ? imgMatch[1] : null;
  
  if (!imgUrl || imgUrl.trim() === '' || imgUrl.includes('medium.com/_/stat')) {
    return null;
  }
  
  return imgUrl;
};

export const getFeaturedArticles = async () => {
  const articles = await fetchMediumArticles();
  return articles.slice(0, 4);
};

export const getArticleBySlug = async (slug) => {
  const articles = await fetchMediumArticles();
  return articles.find(article => article.slug === slug) || null;
};
