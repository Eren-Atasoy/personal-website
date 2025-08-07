// Portfolio data - Replace with your actual information
export const personalInfo = {
  name: "Eren Atasoy",
  title: "Software Engineering Student",
  bio: "I'm a passionate software engineering student with a love for creating innovative solutions and learning new technologies. Currently pursuing my degree while building projects that make a difference.",
  email: "erenatasoy04@gmail.com",
  phone: "+90 000 000 00 00",
  location: "İstanbul, Türkiye",
  resumeUrl: "/resume.pdf",
  profileImage: "https://media.licdn.com/dms/image/v2/D4D03AQHBMJCtR2Tugw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1684249645841?e=1757548800&v=beta&t=jZ8CvNBr0Rf-RqneC-b8Sk-f9XQUc5C1ExCjntldFDA"
};

export const about = {
  description: [
    "I'm a dedicated software engineering student with a passion for building innovative digital solutions. My journey in technology began with curiosity about how things work and has evolved into a commitment to creating meaningful applications that solve real-world problems.",
    "When I'm not coding, you can find me exploring new frameworks, contributing to open-source projects, or sharing my knowledge with fellow developers. I believe in continuous learning and staying up-to-date with the latest industry trends.",
    "I'm particularly interested in full-stack development, machine learning, and user experience design. My goal is to bridge the gap between complex technical solutions and intuitive user interfaces."
  ],
  skills: [
    { name: "JavaScript", level: 90, icon: "SiJavascript" },
    { name: "React", level: 85, icon: "SiReact" },
    { name: "Node.js", level: 80, icon: "SiNodedotjs" },
    { name: "Python", level: 85, icon: "SiPython" },
    { name: "TypeScript", level: 75, icon: "SiTypescript" },
    { name: "PostgreSQL", level: 70, icon: "SiPostgresql" },
    { name: "MongoDB", level: 75, icon: "SiMongodb" },
    { name: "Git", level: 85, icon: "SiGit" },
    { name: "Docker", level: 65, icon: "SiDocker" },
    { name: "AWS", level: 60, icon: "SiAmazonaws" }
  ],
  education: [
    {
      degree: "Faculty of Engineering and Architecture in Software Engineering",
      school: "University of Beykent",
      year: "2022 - 2026",
      description: "Focusing on mobile development, full-stack development, artificial intelligence, and software architecture."
    }
  ],
  experience: [
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      year: "2023 - Present",
      description: "Built custom websites for small businesses, focusing on performance and user experience."
    }
  ]
};

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Firebase", "Material-UI", "Socket.io"],
    githubUrl: "https://github.com/johndoe/task-manager",
    liveUrl: "https://taskman-demo.vercel.app",
    featured: true
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather application with location-based forecasts and interactive charts.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["JavaScript", "Chart.js", "OpenWeather API", "CSS3"],
    githubUrl: "https://github.com/johndoe/weather-dashboard",
    liveUrl: "https://weather-app-demo.vercel.app",
    featured: false
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and TailwindCSS.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "TailwindCSS", "Framer Motion", "Vercel"],
    githubUrl: "https://github.com/johndoe/portfolio",
    liveUrl: "https://johndoe-portfolio.vercel.app",
    featured: false
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "A content management system for bloggers with markdown support and SEO optimization.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    githubUrl: "https://github.com/johndoe/blog-platform",
    liveUrl: "https://blog-demo.vercel.app",
    featured: true
  },
  {
    id: 6,
    title: "AI Chat Assistant",
    description: "An intelligent chatbot powered by OpenAI API with conversation memory and context awareness.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Python", "FastAPI", "OpenAI API", "React", "WebSocket"],
    githubUrl: "https://github.com/johndoe/ai-chat",
    liveUrl: "https://ai-chat-demo.vercel.app",
    featured: true
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt: "Learn best practices for structuring and scaling React applications for production use.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Architecture"],
    slug: "building-scalable-react-applications",
    featured: true
  },
  {
    id: 2,
    title: "Introduction to TypeScript for JavaScript Developers",
    excerpt: "A comprehensive guide to getting started with TypeScript and its benefits for large-scale applications.",
    date: "2024-01-08",
    readTime: "12 min read",
    tags: ["TypeScript", "JavaScript", "Programming"],
    slug: "intro-to-typescript",
    featured: false
  },
  {
    id: 3,
    title: "Modern CSS Techniques for Better User Interfaces",
    excerpt: "Explore modern CSS features like Grid, Flexbox, and custom properties to create stunning UIs.",
    date: "2024-01-01",
    readTime: "6 min read",
    tags: ["CSS", "UI/UX", "Frontend"],
    slug: "modern-css-techniques",
    featured: false
  },
  {
    id: 4,
    title: "Deploying Full-Stack Applications with Docker",
    excerpt: "Step-by-step guide to containerizing and deploying your applications using Docker and Docker Compose.",
    date: "2023-12-25",
    readTime: "15 min read",
    tags: ["Docker", "DevOps", "Deployment"],
    slug: "deploying-with-docker",
    featured: true
  }
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Eren-Atasoy",
    icon: "FaGithub"
  },
  {
    name: "LinkedIn",
    url: "www.linkedin.com/in/eren-atasoy-91b704215",
    icon: "FaLinkedin"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: "FaTwitter"
  },
  {
    name: "Email",
    url: "mailto:erenatasoy04@gmail.com",
    icon: "FaEnvelope"
  }
];

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" }
];