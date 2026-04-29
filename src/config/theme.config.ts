/* MASTER THEME CONFIG — edit here to restyle everything */

export const SITE_CONFIG = {
    name: 'Julietta Stanislaus',
    role: 'Senior UI Developer',
    tagline: 'Designing scalable, pixel-perfect interfaces with a strong focus on precision, consistency, and maintainable implementation',
    bio: 'Experienced UI Architect and Front-End Developer focused on building scalable, accessible, and optimized interfaces. Skilled in design systems, component architecture, and optimizing UI/UX for better experiences.',
    email: 'julietta.stanislaus@outlook.com',
    linkedin: 'linkedin.com/in/julietta-stanislaus/',
    github: 'https://github.com/Julietta-14',
    availability: 'Available for Architecture',
} as const

export const THEME_CONFIG = {
    defaultTheme: 'dark' as 'dark' | 'light',
    accentViolet: '#8B5CF6',
    accentCyan: '#06B6D4',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Inter',
} as const

export const NAV_LINKS = [
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
] as const

export const PROJECTS = [
    {
        id: 'uiux-framework',
        title: 'Monolith',
        description: 'A high-fidelity monolithic landing page crafted for a confidential enterprise client under NDA, designed to deliver a visually immersive, scroll-driven experience with strong narrative flow, performance optimization, and responsive static architecture using HTML, CSS, and JavaScript.',
        tags: ['HTML', 'CSS', 'Javascript'],
        url: 'https://julietta-monolith.netlify.app/',
        cta: 'Explore the site',
        size: 'large',
        image_path: ''
    },
    {
        id: 'wordpress-platforms',
        title: 'WordPress UI Platforms',
        description: 'Built and customized WordPress sites using Elementor across multiple projects including theme development, plugin integration, and conversion-driven UI customization.',
        tags: ['WordPress', 'Elementor', 'SCSS'],
        url: '#',
        cta: 'Project Details',
        size: 'small',
        image_path: ''
    },
    {
        id: 'corporate-web',
        title: 'Corporate Web Interfaces',
        description: 'Designed and delivered corporate websites and e-commerce platforms end-to-end - from Figma wireframes to pixel-perfect, production-ready implementation.',
        tags: ['HTML5', 'SCSS', 'JavaScript'],
        url: '#',
        cta: 'Explore Work',
        size: 'small',
        image_path: ''
    }
] as const

export const SKILLS = [
    {
        category: 'Languages',
        icon: '{ }',
        items: [
            { name: 'HTML5 / CSS3 / SCSS', level: 'Expert' },
            { name: 'JavaScript (ES6+)', level: 'Expert' },
            { name: 'JQuery', level: 'Advanced' },
        ],
    },
    {
        category: 'Frameworks',
        icon: '⚛',
        items: [
            { name: 'React', level: 'Medium' },
            { name: 'Tailwind CSS', level: 'Expert' },
            { name: 'Bootstrap', level: 'Expert' },
        ],
    },
    {
        category: 'Design Tools',
        icon: '✦',
        items: [
            { name: 'Figma', level: 'Power User' },
            { name: 'Figma-to-Code', level: 'Advanced' },
            { name: 'UI/UX Wireframing', level: 'Advanced' },
        ],
    },
    {
        category: 'Platforms',
        icon: '⬡',
        items: [
            { name: 'WordPress / Elementor', level: 'Expert' },
            { name: 'E-commerce UI/UX', level: 'Expert' }
        ],
    },
] as const

export const TIMELINE = [
    {
        period: '2024 - Present',
        role: 'Account Manager - UI/UX Solutions',
        company: 'Vinsinfo, Chennai',
        current: true,
        description: 'Architected scalable front-end systems and reusable component libraries for enterprise and e-commerce platforms. Led end-to-end UI development using React, guiding teams from Figma designs to pixel-perfect implementation. Implemented WCAG 2.1 standards and mentored UI developers.',
    },
    {
        period: '2023 - 2024',
        role: 'Associate Developer Lead',
        company: 'Vinsinfo, Chennai',
        current: false,
        description: 'Owned front-end architecture, defined UI standards and coding guidelines, and led UI strategy for responsive applications. Built reusable component systems improving development velocity and UI consistency across concurrent projects.',
    },
    {
        period: '2021 - 2023',
        role: 'Senior UI UX Developer',
        company: 'Vinsinfo, Chennai',
        current: false,
        description: 'Developed responsive, pixel-perfect interfaces using HTML5, CSS3, SCSS, JavaScript, Bootstrap, and Tailwind CSS. Built and customized WordPress sites with Elementor. Implemented interactive UI features converting Figma designs to production-ready components.',
    },
    {
        period: '2018 - 2021',
        role: 'Front-End Developer',
        company: 'Vinsinfo, Chennai',
        current: false,
        description: 'Progressed from Associate Developer to Software Developer. Trained and mentored junior developers in HTML5, CSS3, Bootstrap, and jQuery. Contributed to responsive UI development and WordPress customization.',
    }
] as const

export const PHILOSOPHY = [
    {
        icon: '♿',
        title: 'Accessibility First',
        description: "WCAG compliance isn't optional, it's foundational. Every interface I build enforces accessibility standards from the first component, ensuring inclusive experiences for all users.",
    },
    {
        icon: '⬡',
        title: 'Component-Driven',
        description: 'Scalability begins with well-structured components. I build modular, themeable design systems that help teams move faster, maintain consistency, and reduce technical debt.',
    },
    {
        icon: '◎',
        title: 'Performance Obsessed',
        description: 'I analyze rendering performance, optimize asset delivery, and improve Core Web Vitals because fast, responsive interfaces are essential to a great user experience.',
    },
] as const

export const PERFORMANCE_STATS = [
    { value: '7+', label: 'Years Exp' },
    { value: 'AA', label: 'WCAG 2.1' },
    { value: '100', label: 'Lighthouse' },
] as const

export const EXTRA_SKILLS = [
  'Design Systems',
  'WCAG 2.1',
  'Agile Workflow',
  'Code Review',
  'UI Optimization',
  'Figma-to-Code',
  'Responsive Design',
  'Mobile-First',
  'WordPress',
  'Elementor',
  'Core Web Vitals',
  'Component Architecture',
] as const