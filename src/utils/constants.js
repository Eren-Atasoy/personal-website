// Animation & UI Constants
export const ANIMATION = {
  TYPEWRITER_DELAY: 100, // ms
  PROFILE_PERSPECTIVE: 1000, // px
  PROFILE_TILT_MAX: 10, // degrees
  PROFILE_SCALE_HOVER: 1.05,
  STATUS_MESSAGE_TIMEOUT: 5000, // ms
};

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /\S+@\S+\.\S+/,
  MESSAGE_MIN_LENGTH: 10,
};

// API Configuration
export const API = {
  GITHUB_USERNAME: 'Eren-Atasoy',
  GITHUB_API_BASE: 'https://api.github.com',
  GITHUB_RATE_LIMIT: {
    WITHOUT_TOKEN: 60,
    WITH_TOKEN: 5000,
  },
  GITHUB_REPOS_PER_PAGE: 100,
  WEB3FORMS_ENDPOINT: 'https://api.web3forms.com/submit',
};

// GitHub API Headers
export const GITHUB_HEADERS = {
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'Portfolio-Website',
  'X-GitHub-Api-Version': '2022-11-28',
};

// Blog Placeholder Gradients
export const GRADIENT_COLORS = [
  ['#667eea', '#764ba2'],
  ['#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'],
  ['#fa709a', '#fee140'],
  ['#30cfd0', '#330867'],
  ['#a8edea', '#fed6e3'],
  ['#ff9a9e', '#fecfef'],
];

// Technology Keywords for GitHub Repo Detection
export const TECH_KEYWORDS = {
  React: ['react', 'reactjs'],
  'Next.js': ['next', 'nextjs'],
  'Node.js': ['node', 'nodejs', 'express'],
  TypeScript: ['typescript', 'ts'],
  JavaScript: ['javascript', 'js'],
  Python: ['python', 'django', 'flask'],
  Docker: ['docker', 'container'],
  MongoDB: ['mongodb', 'mongo'],
  PostgreSQL: ['postgresql', 'postgres'],
  MySQL: ['mysql'],
  Redis: ['redis'],
  GraphQL: ['graphql'],
  'REST API': ['api', 'rest'],
  TailwindCSS: ['tailwind', 'tailwindcss'],
  Bootstrap: ['bootstrap'],
  Vue: ['vue', 'vuejs'],
  Angular: ['angular'],
  'C#': ['csharp', 'c#', '.net', 'dotnet'],
  'ASP.NET': ['asp.net', 'aspnet'],
  Dart: ['dart', 'flutter'],
  Flutter: ['flutter'],
  'Machine Learning': ['ml', 'machine learning', 'ai'],
  Makefile: ['makefile'],
};

// Featured Items Limits
export const LIMITS = {
  FEATURED_REPOS: 6,
  FEATURED_BLOG_TAGS: 3,
  MAX_TECHNOLOGIES_PER_REPO: 5,
};

