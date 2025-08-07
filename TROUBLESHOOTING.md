# TailwindCSS Troubleshooting Guide

## Current Setup: TailwindCSS v4

Your project is now configured with TailwindCSS v4, which has a different setup than v3.

### If TailwindCSS v4 Causes Issues

If you encounter any problems with v4, you can downgrade to the stable v3 setup:

1. **Downgrade to TailwindCSS v3:**

```bash
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
npx tailwindcss init -p
```

2. **Restore v3 CSS format in `src/index.css`:**

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200;
  }

  .btn-secondary {
    @apply bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200;
  }

  .section-padding {
    @apply py-16 px-4 sm:px-6 lg:px-8;
  }

  .container-max {
    @apply max-w-7xl mx-auto;
  }
}
```

3. **Update `postcss.config.js` for v3:**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

4. **Create `tailwind.config.js` for v3:**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

## Common Issues & Solutions

### 1. "Module not found" errors

- Run `npm install` to ensure all dependencies are installed
- Check that `@tailwindcss/postcss` is in your `package.json`

### 2. Styles not applying

- Clear browser cache (Ctrl+Shift+R)
- Restart development server
- Check browser dev tools for CSS loading errors

### 3. Dark mode not working

- Ensure `class` strategy is configured in theme
- Check that `dark:` prefix classes are being applied

### 4. Custom colors not working

- Verify theme configuration is correct
- Check that color names match in CSS and usage

### 5. Build failures

- Run `npm run build` to check for production build issues
- Address any unused CSS warnings

## Verification Steps

After making changes:

1. ✅ **Server starts without errors**
2. ✅ **Page loads in browser**
3. ✅ **TailwindCSS classes render**
4. ✅ **Dark mode toggle works**
5. ✅ **Custom animations function**
6. ✅ **Production build succeeds**

## Need Help?

If you continue having issues:

1. Check browser console for JavaScript errors
2. Verify all imports are correct
3. Test with a minimal component
4. Consider using TailwindCSS v3 if v4 is problematic
