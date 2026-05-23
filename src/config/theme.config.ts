/* MASTER THEME CONFIG — edit here to restyle everything */
import html from '../assets/images/html.png'
import css from '../assets/images/css.png'
import javascript from '../assets/images/javascript.png'
import jquery from '../assets/images/jquery.png'
import react from '../assets/images/react.png'
import tailwindcss from '../assets/images/tailwindcss.png'
import bootstrap from '../assets/images/bootstrap.png'
import angular from '../assets/images/angular.png'
import figma from '../assets/images/figma.png'
import wordpress from '../assets/images/wordpress.png'

type Project = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    url: string;
    cta: string;
    size: "small" | "large";
    image_path: string;
};

export const HERO_PANEL_SHOW_IMG: boolean = true;


export const SITE_CONFIG = {
    name: 'Julietta Stanislaus',
    role: 'Senior UI Developer',
    tagline: 'Designing scalable, pixel-perfect interfaces with a strong focus on precision, consistency, and maintainable implementation',
    bio: 'Experienced UI Architect and Front-End Developer focused on building scalable, accessible, and optimized interfaces. Skilled in design systems, component architecture, and optimizing UI/UX for better experiences.',
    email: 'julietta.stanislaus@outlook.com',
    linkedin: 'https://linkedin.com/in/julietta-stanislaus/',
    github: 'https://github.com/Julietta-14',
    availability: 'Available for Work',
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
    { label: 'Journey', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
] as const

export const PROJECTS: Project[] = [
    {
        id: 'uiux-framework',
        title: 'Monolith',
        description: 'A high-fidelity monolithic landing page crafted for a confidential enterprise client under NDA, designed to deliver a visually immersive, scroll-driven experience with strong narrative flow, performance optimization, and responsive static architecture using HTML, CSS, and JavaScript.',
        tags: ['HTML5', 'CSS', 'JavaScript', 'Boostrap'],
        url: 'https://julietta-monolith.netlify.app/',
        cta: 'Explore the site',
        size: 'small',
        image_path: '/portfolio/monolith_banner.png'
    },
    {
        id: 'shipment-react',
        title: 'Shipment Dashboard - React',
        description: 'Developed the end-to-end UI/UX and fully functional frontend for a comprehensive shipping and logistics dashboard application built with React. Specialized in translating high-fidelity designs into interactive, production-ready components, custom layouts, and a conversion-focused user interface.',
        tags: ['React', 'Tailwind', 'TypeScript', 'Vite'],
        url: 'https://shipment-julietta-uiux.netlify.app/',
        cta: 'Explore the app',
        size: 'small',
        image_path: '/portfolio/shipment_dash_banner.png'
    },
    /*{
        id: 'corporate-web',
        title: 'Corporate Web Interfaces',
        description: 'Designed and delivered corporate websites and e-commerce platforms end-to-end - from Figma wireframes to pixel-perfect, production-ready implementation.',
        tags: ['HTML5', 'SCSS', 'JavaScript'],
        url: '#',
        cta: 'Explore Work',
        size: 'large',
        image_path: ''
    }*/
] as const


export const SKILLS = [
    {
        category: 'Languages',
        icon: '{ }',
        items: [
            {
                img: html,
                skillName: "HTML",
                skillDes: "Markup Language",
            },
            {
                img: css,
                skillName: "CSS",
                skillDes: "Visual Styling",
            },
            {
                img: javascript,
                skillName: "Javascript",
                skillDes: "Interactive Programming",
            },
            {
                img: jquery,
                skillName: "jQuery",
                skillDes: "Interactive Effects",
            }
        ],
    },
    {
        category: 'Frameworks',
        icon: '⚛',
        items: [
            {
                img: react,
                skillName: "React",
                skillDes: "Component Development",
            },
            {
                img: angular,
                skillName: "Angular",
                skillDes: "Visual Styling",
            },
            {
                img: tailwindcss,
                skillName: "Tailwind CSS",
                skillDes: "Utility Styling",
            },
            {
                img: bootstrap,
                skillName: "Bootstrap",
                skillDes: "Responsive Framework",
            }
        ],
    },
    {
        category: 'Design Tools',
        icon: '✦',
        items: [
            {
                img: figma,
                skillName: "Figma",
                skillDes: "UI Prototyping",
            }
        ],
    },
    {
        category: 'Platforms',
        icon: '⬡',
        items: [
            {
                img: wordpress,
                skillName: "WordPress/Elementor",
                skillDes: "Content Management",
            }
        ],
    }
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

export const EXPERIENCE_STATS = [
    { value: "150+", label: "Projects Built" },
    { value: "UI/UX", label: "Design Focus" },
    { value: "Frontend Dev", label: "Experienced" }
]

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