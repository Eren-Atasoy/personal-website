# Personal Portfolio Website

A modern, responsive personal website built with React, TailwindCSS, and modern web technologies.

## 🚀 Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI/UX**: Clean, professional Apple-inspired design with smooth animations
- **Dynamic Content**: Real-time data from GitHub repositories and Medium articles
- **SEO Optimized**: Meta tags, Open Graph, and Schema.org markup
- **Accessible**: ARIA labels and semantic HTML structure
- **Performance Focused**: Optimized images, code splitting, and fallback data
- **API Integration**: GitHub API for projects, Medium RSS for blog posts

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript ES6+
- **Styling**: TailwindCSS, CSS3
- **Icons**: Lucide React, React Icons
- **Build Tool**: Create React App
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📋 Sections

1. **Hero Section**: Introduction with name, title, and call-to-action
2. **About Me**: Personal bio, skills, education, and experience
3. **Projects**: Featured projects with live demos and source code
4. **Blog**: Article previews and reading interface
5. **Contact**: Contact form with validation and social links
6. **Navigation**: Responsive navbar with smooth scroll
7. **Footer**: Social media links and additional information

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/personal-website.git
   cd personal-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. **IMPORTANT:** Create `.env` file for GitHub API access:

   ```bash
   # Copy the example file
   cp env.example .env
   ```

   Then edit `.env` and add your GitHub Personal Access Token:
   ```env
   REACT_APP_GITHUB_TOKEN=ghp_your_token_here
   ```

   **⚠️ Why you need this:** Without a GitHub token, you'll hit API rate limits (60 requests/hour). With a token, you get 5000 requests/hour.

   📖 **See [GITHUB_TOKEN_SETUP.md](GITHUB_TOKEN_SETUP.md) for detailed setup instructions**

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## 🎨 Customization

### Personal Information

Edit the data in `src/data/portfolio.js` to customize:

- Personal details (name, title, bio, contact info)
- Skills and experience
- Projects and portfolio items
- Blog posts
- Social media links

### Styling

The website uses TailwindCSS for styling. You can:

- Modify colors in `tailwind.config.js`
- Add custom components in `src/index.css`
- Adjust responsive breakpoints

### Components

All components are located in `src/components/`:

- `Navigation.js` - Top navigation bar
- `Hero.js` - Landing section
- `About.js` - About me section
- `Projects.js` - Projects showcase
- `Blog.js` - Blog articles
- `Contact.js` - Contact form and info
- `Footer.js` - Footer section
- `DarkModeContext.js` - Dark mode functionality

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🌙 Dark Mode

Dark mode is implemented using:

- TailwindCSS dark mode classes
- React Context for state management
- localStorage for persistence
- System preference detection

## 🔍 SEO Features

- Comprehensive meta tags
- Open Graph protocol for social sharing
- Twitter Card support
- Schema.org JSON-LD markup
- Semantic HTML structure
- Optimized images with alt text

## ♿ Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators
- Semantic HTML elements

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Netlify

1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Configure custom domain (optional)

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

- Email: erenatasoy@gmail.com
- LinkedIn: [Eren Atasoy](www.linkedin.com/in/eren-atasoy-91b704215)
---

**Note**: Replace all placeholder content in `src/data/portfolio.js` with your actual information before deploying.
