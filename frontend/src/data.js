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
  { title: 'Cybersecurity', text: 'I am passionate about learning system vulnerabilities, ethical hacking, and building secure applications.' },
  { title: 'Artificial Intelligence', text: 'I explore machine learning concepts and how intelligent systems analyze data to solve real-world problems.' },
  { title: 'Software Development', text: 'I work with technologies like Python, C, JavaScript, HTML, CSS and build real-world projects to strengthen my development skills.' },
  { title: 'Core CS Mastery', text: 'My main focus is mastering DSA, Operating Systems, DBMS, and Computer Networks.' },
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
  { id: 'slot-02', status: 'soon' },
  { id: 'slot-03', status: 'soon' },
  { id: 'slot-04', status: 'soon' },
];
