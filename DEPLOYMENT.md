# Deployment Guide

This guide covers how to deploy your personal website to various hosting platforms.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

Vercel is the easiest way to deploy React applications with zero configuration.

#### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect it's a React app
5. Click "Deploy" - that's it!

#### Method 2: Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Follow the prompts

### Netlify

1. Build your project:

   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com) and sign up/login

3. Drag and drop the `build` folder to Netlify's deploy area

4. Or connect your GitHub repo for automatic deployments

### GitHub Pages

1. Install gh-pages:

   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json scripts:

   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://yourusername.github.io/personal-website"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 🔧 Pre-deployment Checklist

### 1. Update Personal Information

Edit `src/data/portfolio.js` with your actual information:

- [ ] Name and title
- [ ] Bio and description
- [ ] Contact information (email, phone, location)
- [ ] Profile image URL
- [ ] Social media links
- [ ] Skills and experience
- [ ] Projects with real URLs
- [ ] Education details

### 2. Update SEO Information

Edit `public/index.html`:

- [ ] Page title
- [ ] Meta descriptions
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Schema.org JSON-LD
- [ ] Canonical URL

### 3. Optimize Images

- [ ] Compress profile image
- [ ] Optimize project screenshots
- [ ] Add proper alt text to all images
- [ ] Use appropriate image formats (WebP for modern browsers)

### 4. Test Functionality

- [ ] Contact form validation
- [ ] Dark mode toggle
- [ ] Navigation smooth scrolling
- [ ] Responsive design on all devices
- [ ] All external links work
- [ ] Social media links are correct

### 5. Performance Optimization

- [ ] Remove unused dependencies
- [ ] Optimize bundle size
- [ ] Test loading speed
- [ ] Check Lighthouse scores

## 🌐 Custom Domain Setup

### Vercel

1. Go to your project dashboard
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

### Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records

### GitHub Pages

1. Add CNAME file to public folder with your domain
2. Update DNS records to point to GitHub Pages

## 📊 Analytics Setup

### Google Analytics

1. Create a Google Analytics account
2. Get your tracking ID
3. Add to your environment variables or directly in index.html:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_TRACKING_ID");
</script>
```

### Vercel Analytics

1. Go to your Vercel dashboard
2. Enable Analytics for your project
3. View insights in the dashboard

## 🔒 Security Headers

The included `vercel.json` file sets up basic security headers:

- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

For other platforms, configure these headers in your hosting platform's settings.

## 🐛 Troubleshooting

### Build Fails

1. Check for TypeScript errors
2. Verify all imports are correct
3. Ensure all dependencies are installed
4. Check the build logs for specific errors

### 404 Errors on Routes

Single Page Applications need proper routing configuration:

- **Vercel**: Already handled by vercel.json
- **Netlify**: Add `_redirects` file: `/* /index.html 200`
- **GitHub Pages**: Doesn't support SPA routing well

### Performance Issues

1. Analyze bundle size:

   ```bash
   npm run build -- --analyze
   ```

2. Use React DevTools Profiler
3. Optimize images and assets
4. Implement code splitting if needed

## 📱 PWA Setup (Optional)

To make your website a Progressive Web App:

1. Update `public/manifest.json`
2. Add service worker
3. Test PWA features

## 🔄 Continuous Deployment

All recommended platforms support automatic deployment:

1. Connect your GitHub repository
2. Enable automatic deployments
3. Every push to main branch will trigger a new deployment

## 📈 Monitoring

### Uptime Monitoring

- UptimeRobot (free)
- Pingdom
- StatusCake

### Performance Monitoring

- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## 🎯 Post-Deployment Tasks

1. Test all functionality in production
2. Set up monitoring
3. Submit to Google Search Console
4. Share on social media
5. Add to your resume/CV

---

**Remember**: Always test your website thoroughly before sharing it publicly!
