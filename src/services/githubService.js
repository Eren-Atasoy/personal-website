// GitHub API Service
import { fallbackRepos } from '../data/fallbackRepos';

const GITHUB_USERNAME = 'Eren-Atasoy';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Optional: Add your GitHub Personal Access Token for higher rate limits
// Get token from: https://github.com/settings/tokens
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN || '';

// Rate limit cache
let rateLimitInfo = {
  limit: 60,
  remaining: 60,
  reset: Date.now(),
  lastChecked: null
};

/**
 * Check rate limit status
 * @returns {Promise<Object>} Rate limit information
 */
export const checkRateLimit = async () => {
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Website', // GitHub requires User-Agent
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch('https://api.github.com/rate_limit', { headers });
    
    if (response.ok) {
      const data = await response.json();
      rateLimitInfo = {
        limit: data.rate.limit,
        remaining: data.rate.remaining,
        reset: data.rate.reset * 1000, // Convert to milliseconds
        lastChecked: Date.now()
      };
      console.log('GitHub Rate Limit:', rateLimitInfo);
    }
    
    return rateLimitInfo;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return rateLimitInfo;
  }
};

/**
 * Fetch repositories from GitHub with proper rate limiting
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchGitHubRepos = async () => {
  try {
    // Check rate limit before making request
    const rateLimit = await checkRateLimit();
    
    // If rate limit is exhausted, use fallback data
    if (rateLimit.remaining === 0) {
      const resetTime = new Date(rateLimit.reset);
      console.warn(`Rate limit exceeded. Resets at: ${resetTime.toLocaleString()}`);
      throw new Error('RATE_LIMIT_EXCEEDED');
    }

    // Prepare headers according to GitHub best practices
    const headers = {
      'Accept': 'application/vnd.github.v3+json', // API version
      'User-Agent': 'Portfolio-Website', // Required by GitHub
      'X-GitHub-Api-Version': '2022-11-28', // Explicit API version
    };

    // Add authentication if token is available
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    // Add pagination parameters for better performance
    const url = new URL(GITHUB_API_URL);
    url.searchParams.append('per_page', '100'); // Max repos per page
    url.searchParams.append('sort', 'updated'); // Sort by last updated
    url.searchParams.append('direction', 'desc'); // Newest first

    const response = await fetch(url.toString(), { headers });

    // Check response status
    if (!response.ok) {
      // Log rate limit headers
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const limit = response.headers.get('X-RateLimit-Limit');
      const reset = response.headers.get('X-RateLimit-Reset');
      
      console.error('GitHub API Error:', {
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

    // Update rate limit info from response headers
    rateLimitInfo = {
      limit: parseInt(response.headers.get('X-RateLimit-Limit') || '60'),
      remaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0'),
      reset: parseInt(response.headers.get('X-RateLimit-Reset') || '0') * 1000,
      lastChecked: Date.now()
    };

    console.log('GitHub API Success - Rate Limit:', rateLimitInfo);

    const repos = await response.json();

    // Sort by stars and updated date
    const sortedRepos = repos
      .filter(repo => !repo.fork) // Exclude forked repos
      .sort((a, b) => {
        // First sort by stars
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        // Then by update date
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

    // Transform to our project format
    return sortedRepos.map((repo, index) => ({
      id: repo.id,
      title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
      description: repo.description || 'No description available',
      image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
      technologies: extractTechnologies(repo),
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || repo.html_url,
      featured: index < 3, // First 3 are featured
      stars: repo.stargazers_count,
      language: repo.language,
      updatedAt: repo.updated_at,
    }));
  } catch (error) {
    // Detailed error logging
    if (error.message === 'RATE_LIMIT_EXCEEDED') {
      console.warn('⚠️ GitHub API rate limit exceeded. Using cached fallback data.');
      console.warn(`Rate limit will reset at: ${new Date(rateLimitInfo.reset).toLocaleString()}`);
      console.warn('💡 Add REACT_APP_GITHUB_TOKEN to .env file to increase limit to 5000/hour');
    } else {
      console.error('❌ Error fetching GitHub repos:', error.message);
    }
    
    // Use fallback data when API fails (rate limit, network error, etc.)
    return fallbackRepos
      .filter(repo => !repo.fork)
      .map((repo, index) => ({
        id: repo.id,
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        description: repo.description || 'No description available',
        image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
        technologies: extractTechnologies(repo),
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || repo.html_url,
        featured: index < 3,
        stars: repo.stargazers_count,
        language: repo.language,
        updatedAt: repo.updated_at,
      }));
  }
};

/**
 * Get current rate limit status
 * @returns {Object} Current rate limit information
 */
export const getRateLimitStatus = () => {
  return {
    ...rateLimitInfo,
    resetTime: new Date(rateLimitInfo.reset).toLocaleString(),
    isExhausted: rateLimitInfo.remaining === 0,
    hasToken: !!GITHUB_TOKEN,
  };
};

/**
 * Extract technologies from repository
 * @param {Object} repo - Repository object
 * @returns {Array<string>} Array of technology names
 */
const extractTechnologies = (repo) => {
  const technologies = [];

  // Add primary language
  if (repo.language) {
    technologies.push(repo.language);
  }

  // Add common technologies based on repo name and description
  const text = `${repo.name} ${repo.description || ''}`.toLowerCase();

  const techKeywords = {
    'React': ['react', 'reactjs'],
    'Next.js': ['next', 'nextjs'],
    'Node.js': ['node', 'nodejs', 'express'],
    'TypeScript': ['typescript', 'ts'],
    'JavaScript': ['javascript', 'js'],
    'Python': ['python', 'django', 'flask'],
    'Docker': ['docker', 'container'],
    'MongoDB': ['mongodb', 'mongo'],
    'PostgreSQL': ['postgresql', 'postgres'],
    'MySQL': ['mysql'],
    'Redis': ['redis'],
    'GraphQL': ['graphql'],
    'REST API': ['api', 'rest'],
    'TailwindCSS': ['tailwind', 'tailwindcss'],
    'Bootstrap': ['bootstrap'],
    'Vue': ['vue', 'vuejs'],
    'Angular': ['angular'],
    'C#': ['csharp', 'c#', '.net', 'dotnet'],
    'ASP.NET': ['asp.net', 'aspnet'],
    'Dart': ['dart', 'flutter'],
    'Flutter': ['flutter'],
    'Machine Learning': ['ml', 'machine learning', 'ai'],
    'Makefile': ['makefile'],
  };

  Object.entries(techKeywords).forEach(([tech, keywords]) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      if (!technologies.includes(tech)) {
        technologies.push(tech);
      }
    }
  });

  // Limit to 5 technologies
  return technologies.slice(0, 5);
};

/**
 * Get featured repositories (top 6)
 * @returns {Promise<Array>} Array of featured repositories
 */
export const getFeaturedRepos = async () => {
  const repos = await fetchGitHubRepos();
  return repos.slice(0, 6);
};
