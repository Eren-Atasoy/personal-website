# Technical Context

## Technology Stack

### Frontend Framework

**React 18.x (JavaScript)**

- **Why React**: Component-based, large ecosystem, industry standard
- **Why not Vue/Angular**: React more common in job market
- **Why JavaScript over TypeScript**: Simpler setup, faster development for MVP
- **Future**: Consider TypeScript migration for type safety

### Styling Solution

**Tailwind CSS 3.x**

- **Why Tailwind**: Utility-first, rapid development, consistent design
- **Custom CSS**: For complex animations and components
- **PostCSS**: For Tailwind processing
- **Configuration**: `tailwind.config.js` with custom colors, animations

### Build Tool

**Create React App (CRA)**

- **Why CRA**: Zero-config setup, React official tool
- **Scripts**:
  - `npm start`: Development server
  - `npm build`: Production build
  - `npm test`: Run tests

### Package Manager

**npm**

- Lock file: `package-lock.json`
- Consistent dependencies across environments

## Key Dependencies

### Core Libraries

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1"
}
```

### UI & Icons

```json
{
  "lucide-react": "^0.263.1", // Modern icon library
  "react-icons": "^4.10.1" // GitHub, LinkedIn, etc icons
}
```

### Styling

```json
{
  "tailwindcss": "^3.3.3",
  "@tailwindcss/forms": "^0.5.4",
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.27"
}
```

### Development

```json
{
  "web-vitals": "^3.4.0" // Performance monitoring
}
```

## API Integrations

### 1. GitHub REST API v3

**Endpoint**: `https://api.github.com`  
**Purpose**: Fetch user repositories  
**Rate Limits**:

- Without token: 60 requests/hour
- With token: 5,000 requests/hour

**Authentication**:

```javascript
// Optional, increases rate limit
headers: {
  Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`;
}
```

**Endpoints Used**:

```
GET /users/{username}/repos
GET /repos/{owner}/{repo}
```

**Response Handling**:

- Success: Display repositories
- Error: Show fallback static data
- Rate limit: Display cached/fallback data

### 2. Medium RSS Feed (via rss2json)

**Endpoint**: `https://api.rss2json.com/v1/api.json`  
**Purpose**: Fetch Medium blog articles  
**Why proxy**: Direct Medium RSS has CORS issues

**Request**:

```javascript
fetch(
  `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@erenatasoy04`
);
```

**Rate Limits**: 10,000 requests/day (free tier)

**Response Processing**:

- Parse HTML for thumbnails
- Extract plain text for excerpts
- Calculate read time
- Categorize featured posts

### 3. Web3Forms API

**Endpoint**: `https://api.web3forms.com/submit`  
**Purpose**: Contact form email delivery  
**Free Tier**: 250 emails/month

**Request**:

```javascript
POST / submit;
{
  access_key: process.env.REACT_APP_WEB3FORMS_KEY,
    name,
    email,
    subject,
    message;
}
```

**Fallback**: `mailto:` link if API key not configured

## Environment Variables

### Required Variables

```env
# GitHub API (optional, but recommended)
REACT_APP_GITHUB_TOKEN=ghp_xxxxx

# Contact Form (required for form to work)
REACT_APP_WEB3FORMS_KEY=xxxxx-xxxxx-xxxxx
```

### Setup Process

1. Copy `env.example` to `.env`
2. Fill in actual keys
3. Restart dev server
4. `.env` is gitignored (never commit)

## Development Environment

### System Requirements

- Node.js 14.x or higher
- npm 6.x or higher
- Modern browser (Chrome, Firefox, Safari, Edge)
- Git

### Development Tools

- **VS Code**: Recommended editor
- **Browser DevTools**: Debugging
- **React DevTools**: Component inspection
- **Postman**: API testing (optional)

### Local Setup

```bash
# Clone repository
git clone https://github.com/Eren-Atasoy/personal-website.git

# Install dependencies
npm install

# Create environment file
copy env.example .env
# Edit .env with actual keys

# Start development server
npm start
```

### Development Server

- **URL**: `http://localhost:3000`
- **Hot Reload**: Yes
- **Port**: 3000 (configurable)

## Production Environment

### Hosting Platform

**Vercel**

- **Why Vercel**: Free, automatic deployments, optimized for React
- **URL**: `personal-website-xxx.vercel.app`
- **Custom Domain**: Can add custom domain

### Build Process

```bash
npm run build
# Creates /build folder with optimized production files
```

### Deployment Workflow

```
1. Push to GitHub main branch
   ↓
2. Vercel detects change
   ↓
3. Automatic build triggered
   ↓
4. Build succeeds
   ↓
5. Deploy to production
   ↓
6. Live in ~30 seconds
```

### Environment Variables (Production)

Set in Vercel Dashboard:

- Project Settings → Environment Variables
- Add same keys as local `.env`
- Redeploy for changes to take effect

### Performance Optimizations

- **CDN**: Static assets on Vercel Edge Network
- **Compression**: Gzip/Brotli automatic
- **Caching**: Smart caching headers
- **Image Optimization**: Consider Vercel Image Optimization

## Browser Support

### Target Browsers

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari iOS (last 2 versions)
- Chrome Android (last 2 versions)

### Compatibility Features

- **CSS Grid**: Modern layout
- **Flexbox**: Component alignment
- **CSS Variables**: Theming
- **LocalStorage**: Theme persistence
- **Fetch API**: AJAX requests

### Polyfills

Create React App includes necessary polyfills for:

- Promises
- Object.assign
- Array methods

## Testing Setup (Future)

### Testing Libraries (To Add)

```json
{
  "@testing-library/react": "^13.4.0",
  "@testing-library/jest-dom": "^5.16.5",
  "@testing-library/user-event": "^14.4.3",
  "jest": "^29.5.0"
}
```

### Test Structure

```
src/
├── components/
│   ├── Hero.js
│   └── Hero.test.js
├── services/
│   ├── githubService.js
│   └── githubService.test.js
```

## Performance Considerations

### Metrics to Track

- **FCP**: First Contentful Paint < 1.8s
- **LCP**: Largest Contentful Paint < 2.5s
- **TTI**: Time to Interactive < 3.8s
- **CLS**: Cumulative Layout Shift < 0.1
- **FID**: First Input Delay < 100ms

### Optimization Techniques

1. **Code Splitting**: Lazy load components
2. **Image Optimization**: Lazy loading, proper sizing
3. **CSS Optimization**: Purge unused styles
4. **Bundle Size**: Monitor with webpack-bundle-analyzer
5. **Caching**: Leverage browser caching

### Current Performance

- Lighthouse Score: ~90+
- Load Time: < 3 seconds
- Bundle Size: < 500KB

## Security Considerations

### Best Practices Implemented

1. **Environment Variables**: Secrets not in code
2. **HTTPS**: Automatic on Vercel
3. **No Sensitive Data**: Client-side only
4. **Form Validation**: Client and server-side
5. **XSS Prevention**: React auto-escaping

### Dependencies Security

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Manual review
npm audit fix --force
```

## Development Workflow

### Git Workflow

```
main (production)
  └── feature branches
       └── PR → main
```

### Commit Convention

```
feat: Add new feature
fix: Bug fix
style: CSS/design changes
refactor: Code restructuring
docs: Documentation updates
chore: Maintenance tasks
```

### Code Quality

- **Linting**: ESLint (via CRA)
- **Formatting**: Prettier (recommended)
- **Git Hooks**: Husky (future)

## Monitoring & Analytics

### Current

- **Vercel Analytics**: Basic metrics
- **Console Logging**: Error tracking
- **Manual Testing**: QA process

### Future Additions

- **Google Analytics**: User behavior
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Hotjar**: Heatmaps

## CI/CD Pipeline

### Current Setup

```
GitHub → Vercel (automatic)
```

### Future Enhancements

- **GitHub Actions**: Run tests before deploy
- **Preview Deployments**: Per PR
- **Staging Environment**: Test before production

## Documentation

### Code Documentation

- **Comments**: For complex logic
- **JSDoc**: Function documentation (future)
- **README**: Setup instructions
- **Memory Bank**: This documentation

### API Documentation

- Inline comments in service files
- README sections for API integration
- Setup guides for third-party services

## Technical Debt

### Known Issues

1. No TypeScript (consider migration)
2. No automated tests (add Jest + RTL)
3. No error tracking service
4. No analytics implementation
5. Large bundle size (optimize)

### Maintenance Tasks

- Dependency updates (monthly)
- Security patches (as needed)
- Performance audits (quarterly)
- Refactoring (continuous)

## Learning Resources

### Technologies Used

- React: https://react.dev
- Tailwind: https://tailwindcss.com
- Vercel: https://vercel.com/docs
- GitHub API: https://docs.github.com/en/rest
- Web3Forms: https://docs.web3forms.com

### Best Practices

- React patterns
- Performance optimization
- Accessibility guidelines (WCAG)
- SEO for SPAs
