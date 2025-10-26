// Portfolio data - Replace with your actual information
export const personalInfo = {
  name: "Eren Atasoy",
  title: "Software Engineering Student",
  bio: "I'm a passionate software engineering student specializing in AI, machine learning, and full-stack development. Experienced in C#, Python, and JavaScript, building everything from AI-powered applications to mobile solutions. Currently pursuing my degree while creating projects that make a difference.",
  email: "erenatasoy04@gmail.com",
  phone: "+90 000 000 00 00",
  location: "İstanbul, Türkiye",
  profileImage: "/profile-image.jpeg"
};

export const about = {
  description: [
    "I'm a dedicated software engineering student with a passion for artificial intelligence and full-stack development. My journey in technology began with curiosity about how things work and has evolved into building AI-powered applications, mobile solutions, and web services that solve real-world problems.",
    "With hands-on experience in C#, Python, JavaScript, and various frameworks, I've developed projects ranging from AI-powered movie recommendation systems to mobile language learning applications. My work spans across ASP.NET Web APIs, machine learning models, and cross-platform mobile development with Flutter.",
    "I'm particularly passionate about machine learning, deep learning, and creating intelligent systems. My goal is to leverage AI technologies to build innovative solutions while maintaining clean code architecture and excellent user experiences. Currently exploring advanced topics in neural networks and computer vision while contributing to open-source projects."
  ],
  skills: [
    // Programming Languages
    { name: "C#", level: 85, icon: "SiCsharp" },
    { name: "Python", level: 85, icon: "SiPython" },
    { name: "JavaScript", level: 90, icon: "SiJavascript" },
    { name: "C", level: 80, icon: "SiC" },
    { name: "C++", level: 75, icon: "SiCplusplus" },
    { name: "Java", level: 75, icon: "SiJava" },
    { name: "Dart", level: 70, icon: "SiDart" },
    
    // Web Technologies
    { name: "HTML5", level: 90, icon: "SiHtml5" },
    { name: "CSS3", level: 85, icon: "SiCss3" },
    { name: "ASP.NET", level: 80, icon: "SiDotnet" },
    { name: "Node.js", level: 75, icon: "SiNodedotjs" },
    
    // AI & Machine Learning
    { name: "Machine Learning", level: 80, icon: "SiScikitlearn" },
    { name: "Deep Learning", level: 75, icon: "SiPytorch" },
    
    // Databases
    { name: "SQL", level: 80, icon: "SiMysql" },
    { name: "PostgreSQL", level: 75, icon: "SiPostgresql" },
    
    // Tools & Others
    { name: "Git", level: 85, icon: "SiGit" },
    { name: "Bash", level: 75, icon: "SiGnubash" },
    { name: "Docker", level: 65, icon: "SiDocker" },
    { name: "Postman", level: 80, icon: "SiPostman" },
    { name: "Agile", level: 75, icon: "SiJira" },
    { name: "Flutter", level: 70, icon: "SiFlutter" }
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
      title: "AI & Full-Stack Developer",
      company: "Personal Projects",
      year: "2023 - Present",
      description: "Developed AI-powered movie recommendation system using machine learning models and ASP.NET Web API. Created mobile applications with Flutter/Dart including language learning app (Prolingo). Built multiple C# projects focusing on OOP principles and layered architecture."
    },
    {
      title: "Software Engineering Student",
      company: "Beykent University",
      year: "2022 - Present",
      description: "Focusing on mobile development, full-stack development, artificial intelligence, and software architecture. Working on various projects including C/C++ systems programming and database management."
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

];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Eren-Atasoy",
    icon: "FaGithub"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/eren-atasoy-91b704215",
    icon: "FaLinkedin"
  },
  {
    name: "Medium",
    url: "https://medium.com/@erenatasoy04",
    icon: "FaMedium"
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