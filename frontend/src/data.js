export const CV_URL = null;

export const PROFILE = {
  name: 'Manoj Kumar',
  fullName: 'B. Manoj Kumar',
  email: 'manojkumarbondada123@gmail.com',
  phone: '+91 63035 92919',
  linkedin: 'https://www.linkedin.com/in/manoj-kumar-bondada-a92410384/',
  github: 'https://github.com/ManojKumar0013',
};

export const ROLES = ['AI/ML', 'FULL STACK', 'CYBERSECURITY', 'CSE STUDENT'];

export const NAV = [
  { id: 'about', label: 'About', path: '/proc/manoj' },
  { id: 'focus', label: 'Focus', path: '/focus' },
  { id: 'skills', label: 'Skills', path: '/usr/bin' },
  { id: 'projects', label: 'Projects', path: '~/projects' },
  { id: 'contact', label: 'Contact', path: '/dev/contact' },
];

export const FOCUS = [
  { title: 'Full-stack systems', kicker: 'BUILD / 01', text: 'I connect expressive interfaces to APIs and relational data. HungryHub is where I put that end-to-end thinking into practice.', tags: ['React', 'Express', 'PostgreSQL'] },
  { title: 'AI & interaction', kicker: 'EXPLORE / 02', text: 'I am learning how intelligent systems make useful decisions, while experimenting with experiences that respond to people and their moods.', tags: ['Machine learning', 'NexTune', 'UX'] },
  { title: 'Security mindset', kicker: 'PROTECT / 03', text: 'I study vulnerabilities and ethical hacking so that security is part of how I design and build software.', tags: ['Secure design', 'Ethical hacking'] },
  { title: 'Computer science', kicker: 'LEARN / 04', text: 'I am strengthening the fundamentals behind reliable software: algorithms, operating systems, databases and computer networks.', tags: ['DSA', 'OS', 'DBMS', 'Networks'] },
];

export const SKILLS = [
  { group: 'Web', items: [
    { name: 'HTML', icon: '/icons/html5-original.svg' },
    { name: 'CSS', icon: '/icons/css3-original.svg' },
    { name: 'JavaScript', icon: '/icons/javascript-original.svg' },
    { name: 'React', icon: '/icons/react-original.svg' },
    { name: 'Next.js', icon: '/icons/nextjs-original.svg' },
    { name: 'Tailwind CSS', icon: '/icons/tailwindcss-original.svg' },
  ] },
  { group: 'Backend', items: [
    { name: 'Express', icon: '/icons/express-original.svg' },
    { name: 'Flask', icon: '/icons/flask-original.svg' },
  ] },
  { group: 'Databases', items: [
    { name: 'SQL', icon: '/icons/sql.svg' },
    { name: 'PostgreSQL', icon: '/icons/postgresql-original.svg' },
    { name: 'MongoDB', icon: '/icons/mongodb-original.svg' },
    { name: 'Supabase', icon: '/icons/supabase-original.svg' },
  ] },
  { group: 'Tools', items: [
    { name: 'Git', icon: '/icons/git-original.svg' },
    { name: 'VS Code', icon: '/icons/vscode-original.svg' },
  ] },
  { group: 'Languages', items: [
    { name: 'Python', icon: '/icons/python-original.svg' },
    { name: 'Java', icon: '/icons/java-original.svg' },
    { name: 'C', icon: '/icons/c-original.svg' },
    { name: 'C++', icon: '/icons/cplusplus-original.svg' },
  ] },
];

export const PROJECTS = [
  {
    id: 'circle-accuracy',
    status: 'live',
    title: 'Circle Accuracy Challenge',
    blurb: 'A browser game that scores how perfectly you can draw a circle by hand.',
    image: '/project-circle.webp',
    tags: ['HTML5 Canvas', 'CSS', 'JavaScript', 'Session Storage', 'Audio API'],
    live: 'https://manojkumar0013.github.io/Circle-Accuracy-Challenge/',
    source: 'https://github.com/ManojKumar0013/Circle-Accuracy-Challenge',
  },
  {
    id: 'hungryhub', status: 'live', title: 'HungryHub',
    blurb: 'A full-stack food ordering system connecting customers, restaurants, staff and delivery partners through a PostgreSQL-backed API.',
    image: '/project-hungryhub.svg',
    tags: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Neon'],
    live: 'https://hungry-hub-online-food-ordering-sys.vercel.app/',
    source: 'https://github.com/ManojKumar0013/HungryHub-Online-Food-Ordering-System-',
  },
  {
    id: 'nextune', status: 'live', title: 'NexTune',
    blurb: 'An emotion-based music experience with mood-driven discovery, playlists, a player and ambient visual effects.',
    image: '/project-nextune.svg',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Jamendo API'],
    live: 'https://manojkumar0013.github.io/EMOTION_BASED_MUSIC_WEBSITE/',
    source: 'https://github.com/ManojKumar0013/EMOTION_BASED_MUSIC_WEBSITE',
  },
];
