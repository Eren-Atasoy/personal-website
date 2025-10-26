# System Patterns & Architecture

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel CDN/Edge                       │
│                  (Static Hosting)                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  React Application                       │
│                  (Single Page App)                       │
├─────────────────────────────────────────────────────────┤
│  Components:                                             │
│  - Hero (Profile + Typewriter)                          │
│  - Navigation (Dark Mode Toggle)                         │
│  - About (Skills + Education + Experience)              │
│  - Projects (GitHub API Integration)                    │
│  - Blog (Medium RSS Integration)                        │
│  - Contact (Web3Forms Integration)                      │
│  - Footer                                                │
└────────┬────────────┬────────────┬──────────────────────┘
         │            │            │
         ▼            ▼            ▼
    ┌────────┐  ┌─────────┐  ┌──────────┐
    │ GitHub │  │ Medium  │  │Web3Forms │
    │  API   │  │RSS2JSON │  │   API    │
    └────────┘  └─────────┘  └──────────┘
```

## Component Architecture

### Component Hierarchy

```
App.js
├── DarkModeContext (Provider)
├── Navigation
│   └── Dark Mode Toggle
├── Hero
│   ├── Profile Image (3D Hover)
│   └── Typewriter Effect
├── About
│   ├── Description
│   ├── Skills Grid
│   ├── Education Cards
│   └── Experience Cards
├── Projects
│   ├── Featured Projects
│   └── All Projects Grid
│       └── Project Cards (GitHub Data)
├── Blog
│   ├── Featured Articles
│   └── Recent Articles Grid
│       └── Blog Cards (Medium Data)
├── Contact
│   ├── Contact Info Cards
│   ├── Social Links
│   └── Contact Form (Web3Forms)
└── Footer
```

## Design Patterns

### 1. Container/Presentational Pattern

**Why**: Separation of data fetching from UI rendering

**Implementation**:

```javascript
// Container Component (Projects.js)
const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRepositories(); // Data fetching
  }, []);

  return <ProjectCard repo={repo} />; // Presentational
};

// Presentational Component (ProjectCard)
const ProjectCard = ({ repo }) => {
  return <div>{repo.name}</div>; // Pure UI
};
```

### 2. Context API for Global State

**Why**: Dark mode needs to be accessible everywhere

**Implementation**:

```javascript
// DarkModeContext.js
export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Usage in components
const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
```

### 3. Service Layer Pattern

**Why**: Isolate API calls from components

**Implementation**:

```
src/services/
├── githubService.js    # GitHub API calls
└── mediumService.js    # Medium RSS calls
```

```javascript
// githubService.js
export const fetchUserRepositories = async (username) => {
  // API logic isolated here
};

// Component just calls service
const repos = await fetchUserRepositories("Eren-Atasoy");
```

### 4. Fallback Pattern

**Why**: Graceful degradation when APIs fail

**Implementation**:

```javascript
// Try API first, fall back to static data
try {
  const repos = await fetchGitHubRepos();
  setRepositories(repos);
} catch (error) {
  setRepositories(fallbackRepos); // Static data
}
```

### 5. Error Boundary Pattern

**Why**: Prevent entire app crash from component errors

**Implementation**:

```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}
```

## Data Flow Patterns

### GitHub Integration Flow

```
1. Component Mount (Projects.js)
   ↓
2. useEffect triggers fetchUserRepositories()
   ↓
3. githubService.js makes API call
   ↓
4. Response processed (filter, sort, transform)
   ↓
5. setState(repositories)
   ↓
6. Component re-renders with data
   ↓
7. If error: fallbackRepos loaded
```

### Contact Form Flow

```
1. User fills form
   ↓
2. Form validation (client-side)
   ↓
3. handleSubmit triggered
   ↓
4. Check if Web3Forms key exists
   ├─ YES: API call to Web3Forms
   │   ↓
   │   Success: Show success message
   │   Error: Show error message
   │
   └─ NO: Open mailto: link (fallback)
```

### Theme Toggle Flow

```
1. User clicks dark mode button
   ↓
2. toggleDarkMode() called
   ↓
3. Context state updated
   ↓
4. All components re-render
   ↓
5. CSS classes change (dark:)
   ↓
6. Preference saved to localStorage
```

## State Management

### Local State (useState)

Used for:

- Form inputs
- Loading states
- Error states
- Hover states

### Context State (useContext)

Used for:

- Dark mode preference (global)
- User theme settings

### No Redux

**Rationale**: App is simple enough, Context API sufficient

## Styling Architecture

### Tailwind CSS Approach

**Pattern**: Utility-first with custom components

```css
/* Base utilities from Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component classes */
@layer components {
  .btn-apple {
    /* Reusable button style */
  }
  .card-apple {
    /* Reusable card style */
  }
  .text-gradient {
    /* Gradient text */
  }
}
```

### CSS Organization

```
src/
├── index.css (Global styles, custom components)
└── tailwind.config.js (Theme customization)
```

### Naming Conventions

- **Utility classes**: Tailwind utilities in JSX
- **Custom components**: `.btn-apple`, `.card-apple`
- **BEM where needed**: `.profile-container__icon`

## API Integration Patterns

### 1. Rate Limit Handling

```javascript
// GitHub API: 60 req/hr without token, 5000 with token
const headers = {
  ...(GITHUB_TOKEN && {
    Authorization: `token ${GITHUB_TOKEN}`,
  }),
};
```

### 2. Caching Strategy

- **Browser cache**: Images, static assets
- **No app-level cache**: Always fresh data
- **Future**: Consider React Query for caching

### 3. Error Handling

```javascript
try {
  const data = await fetch(API_URL);
  return data;
} catch (error) {
  console.error("API Error:", error);
  return fallbackData; // Always have fallback
}
```

## Performance Patterns

### 1. Code Splitting

```javascript
// Future improvement: Lazy load routes
const Projects = lazy(() => import("./components/Projects"));
```

### 2. Image Optimization

- Lazy loading: `loading="lazy"`
- Proper sizing: `aspect-video`
- Placeholder: gradient backgrounds

### 3. Animation Performance

- CSS transforms (GPU accelerated)
- `will-change` property for optimizations
- Debounced scroll events

## Accessibility Patterns

### 1. Semantic HTML

```javascript
<section>, <nav>, <article>, <button>
// Not: <div onClick> everywhere
```

### 2. ARIA Labels

```javascript
<button aria-label="Toggle dark mode">
<a aria-label="Visit GitHub profile">
```

### 3. Keyboard Navigation

- Tab order logical
- Focus states visible
- Smooth scroll with keyboard

## Routing Strategy

### Single Page Application

**Current**: No routing library  
**Navigation**: Smooth scroll to sections  
**Benefit**: Simple, fast, no route loading

### Future Consideration

If blog posts need individual pages:

- React Router for `/blog/:slug`
- Still SPA, no full page reloads

## Environment Configuration

### Pattern: Environment Variables

```javascript
// .env (not committed)
REACT_APP_GITHUB_TOKEN = xxx;
REACT_APP_WEB3FORMS_KEY = xxx;

// env.example (committed)
REACT_APP_GITHUB_TOKEN = your_token_here;
```

**Benefits**:

- Secrets not in code
- Different configs per environment
- Easy deployment to Vercel

## Testing Strategy (Future)

### Planned Patterns

1. **Unit Tests**: Service functions
2. **Integration Tests**: API calls
3. **E2E Tests**: Full user flows
4. **Visual Regression**: Screenshot comparison

## Deployment Pattern

### Continuous Deployment

```
Git Push to main
  ↓
GitHub webhook triggers
  ↓
Vercel auto-deploy
  ↓
Build process
  ↓
Deploy to production
  ↓
Automatic HTTPS + CDN
```

## Security Patterns

### 1. API Key Protection

- Environment variables only
- Never commit `.env`
- Vercel env vars for production

### 2. XSS Prevention

- React auto-escapes JSX
- No `dangerouslySetInnerHTML`
- Validate form inputs

### 3. CORS

- GitHub API: Open CORS
- Web3Forms: Handles CORS
- Medium RSS: Via proxy (rss2json)

## Code Organization Principles

### 1. Single Responsibility

Each component does one thing well

### 2. DRY (Don't Repeat Yourself)

Reusable components and utilities

### 3. KISS (Keep It Simple)

No over-engineering, simple solutions first

### 4. File Structure

```
src/
├── components/      # UI components
├── services/        # API calls
├── data/           # Static data, fallbacks
├── assets/         # Images, fonts
└── index.css       # Global styles
```
