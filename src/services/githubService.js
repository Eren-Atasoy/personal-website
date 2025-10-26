import { fallbackRepos } from '../data/fallbackRepos';
import { API, GITHUB_HEADERS, TECH_KEYWORDS, LIMITS } from '../utils/constants';
import { logger } from '../utils/logger';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN || '';

let rateLimitInfo = {
  limit: API.GITHUB_RATE_LIMIT.WITHOUT_TOKEN,
  remaining: API.GITHUB_RATE_LIMIT.WITHOUT_TOKEN,
  reset: Date.now(),
  lastChecked: null
};

const buildGitHubHeaders = () => {
  const headers = { ...GITHUB_HEADERS };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
};

const buildRepoURL = () => {
  const url = new URL(`${API.GITHUB_API_BASE}/users/${API.GITHUB_USERNAME}/repos`);
  url.searchParams.append('per_page', API.GITHUB_REPOS_PER_PAGE);
  url.searchParams.append('sort', 'updated');
  url.searchParams.append('direction', 'desc');
  return url.toString();
};

const updateRateLimitFromHeaders = (headers) => {
  rateLimitInfo = {
    limit: parseInt(headers.get('X-RateLimit-Limit') || '60'),
    remaining: parseInt(headers.get('X-RateLimit-Remaining') || '0'),
    reset: parseInt(headers.get('X-RateLimit-Reset') || '0') * 1000,
    lastChecked: Date.now()
  };
};

export const checkRateLimit = async () => {
  try {
    const response = await fetch(`${API.GITHUB_API_BASE}/rate_limit`, { 
      headers: buildGitHubHeaders() 
    });
    
    if (response.ok) {
      const data = await response.json();
      rateLimitInfo = {
        limit: data.rate.limit,
        remaining: data.rate.remaining,
        reset: data.rate.reset * 1000,
        lastChecked: Date.now()
      };
      logger.log('GitHub Rate Limit:', rateLimitInfo);
    }
    
    return rateLimitInfo;
  } catch (error) {
    logger.error('Error checking rate limit:', error);
    return rateLimitInfo;
  }
};

const extractTechnologies = (repo) => {
  const technologies = [];
  
  if (repo.language) {
    technologies.push(repo.language);
  }

  const text = `${repo.name} ${repo.description || ''}`.toLowerCase();

  Object.entries(TECH_KEYWORDS).forEach(([tech, keywords]) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      if (!technologies.includes(tech)) {
        technologies.push(tech);
      }
    }
  });

  return technologies.slice(0, LIMITS.MAX_TECHNOLOGIES_PER_REPO);
};

const transformRepoToProject = (repo, index) => ({
  id: repo.id,
  title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
  description: repo.description || 'No description available',
  image: `https://opengraph.githubassets.com/1/${API.GITHUB_USERNAME}/${repo.name}`,
  technologies: extractTechnologies(repo),
  githubUrl: repo.html_url,
  liveUrl: repo.homepage || repo.html_url,
  featured: index < 3,
  stars: repo.stargazers_count,
  language: repo.language,
  updatedAt: repo.updated_at,
});

const sortRepositories = (repos) => {
  return repos
    .filter(repo => !repo.fork)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
};

const handleRateLimitError = () => {
  logger.warn('⚠️ GitHub API rate limit exceeded. Using cached fallback data.');
  logger.warn(`Rate limit will reset at: ${new Date(rateLimitInfo.reset).toLocaleString()}`);
  logger.warn('💡 Add REACT_APP_GITHUB_TOKEN to .env file to increase limit to 5000/hour');
};

const getFallbackProjects = () => {
  return sortRepositories(fallbackRepos).map(transformRepoToProject);
};

export const fetchGitHubRepos = async () => {
  try {
    const rateLimit = await checkRateLimit();
    
    if (rateLimit.remaining === 0) {
      const resetTime = new Date(rateLimit.reset);
      logger.warn(`Rate limit exceeded. Resets at: ${resetTime.toLocaleString()}`);
      throw new Error('RATE_LIMIT_EXCEEDED');
    }

    const response = await fetch(buildRepoURL(), { 
      headers: buildGitHubHeaders() 
    });

    if (!response.ok) {
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const limit = response.headers.get('X-RateLimit-Limit');
      const reset = response.headers.get('X-RateLimit-Reset');
      
      logger.error('GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
        rateLimit: { remaining, limit, reset: new Date(reset * 1000).toLocaleString() }
      });

      if (response.status === 403) {
        const errorData = await response.json();
        if (errorData.message.includes('rate limit')) {
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
      }

      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    updateRateLimitFromHeaders(response.headers);
    logger.log('GitHub API Success - Rate Limit:', rateLimitInfo);

    const repos = await response.json();
    return sortRepositories(repos).map(transformRepoToProject);
    
  } catch (error) {
    if (error.message === 'RATE_LIMIT_EXCEEDED') {
      handleRateLimitError();
    } else {
      logger.error('❌ Error fetching GitHub repos:', error.message);
    }
    
    return getFallbackProjects();
  }
};

export const getRateLimitStatus = () => ({
  ...rateLimitInfo,
  resetTime: new Date(rateLimitInfo.reset).toLocaleString(),
  isExhausted: rateLimitInfo.remaining === 0,
  hasToken: !!GITHUB_TOKEN,
});

export const getFeaturedRepos = async () => {
  const repos = await fetchGitHubRepos();
  return repos.slice(0, LIMITS.FEATURED_REPOS);
};
