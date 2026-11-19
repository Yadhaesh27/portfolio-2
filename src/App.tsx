import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Award, BookOpen, BrainCircuit,
  Check, ChevronRight, CircleDot, Code2, Command, Download,
  Github, GraduationCap, Layers3, Linkedin, Mail, MapPin, Menu, Moon,
  MoveUpRight, Play, ShieldCheck, Sparkles, Sun, TerminalSquare, X,
} from 'lucide-react';
import { NeuralScene } from './components/NeuralScene';
import { Terminal } from './components/Terminal';
import { Cursor } from './components/Cursor';
import { Chatbot } from './components/Chatbot';
import { ProjectScreenshots } from './components/ProjectScreenshots';
import { IntroSplash } from './components/IntroSplash';
import { IdentityCard } from './components/IdentityCard';
import { certifications, highlights, profile, projects, publicRepos, skillGroups } from './data/profile';
import type { Project, ProjectCategory } from './data/profile';

type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} });
function useTheme() { return useContext(ThemeContext); }

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return window.localStorage.getItem('portfolio-v2-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080b19' : '#f4f3fd');
    try { window.localStorage.setItem('portfolio-v2-theme', theme); } catch { /* optional */ }
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>{children}</ThemeContext.Provider>;
}

function ScrollController() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 110);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);
  return null;
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 27 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.11 }} transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

const navigation = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'GitHub', href: '/#github' },
  { label: 'Expertise', href: '/#skills' },
  { label: 'Journey', href: '/#journey' },
];

function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  return <header className="site-header"><div className="nav-shell container">
    <Link className="brand" to="/" aria-label="Yadhaeshwar home"><span className="brand-icon"><span>&gt;</span>_</span><span>yadhaesh<span className="brand-suffix">.dev</span></span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link to={item.href} key={item.label}>{item.label}</Link>)}</nav>
    <div className="nav-actions"><button className="replay-intro" type="button" onClick={() => window.dispatchEvent(new Event('neural-aurora:replay'))} aria-label="Replay the cinematic introduction" title="Replay intro"><Play size={14} /><span>REPLAY INTRO</span></button><button className="theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={toggle}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
      <a className="nav-contact" href={`mailto:${profile.email}`}>Let's talk <ArrowUpRight size={15} /></a>
      <button className="mobile-toggle" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </div>
  </div>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
      {navigation.map(item => <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={15} /></Link>)}<a href={profile.resume} download>Download resume <Download size={15} /></a><button className="mobile-replay" type="button" onClick={() => { setOpen(false); window.dispatchEvent(new Event('neural-aurora:replay')); }}>Replay intro <Play size={15} /></button>
    </motion.nav>}</AnimatePresence>
  </header>;
}

function Label({ children, number }: { children: ReactNode; number?: string }) {
  return <div className="section-label"><span className="label-icon">✳</span>{number && <span className="section-number">{number}</span>}<span>{children}</span><span className="label-line" /></div>;
}

function SectionIntro({ number, tag, title, accent, description }: { number: string; tag: string; title: string; accent: string; description?: string }) {
  return <Reveal><div className="section-heading"><Label number={number}>{tag}</Label><div className="section-heading-line"><h2>{title}<br /><span className="gradient-text">{accent}</span></h2>{description && <p>{description}</p>}</div></div></Reveal>;
}

function Hero() {
  const reduce = useReducedMotion();
  return <section id="home" className="hero">
    <div className="hero-ambient" aria-hidden="true"><div className="ambient-blob blob-one" /><div className="ambient-blob blob-two" /><div className="hero-grid" /></div>
    <div className="container hero-inner">
      <div className="hero-copy">
        <Reveal><div className="availability"><span className="status-dot" /><span>AVAILABLE FOR OPPORTUNITIES</span><span className="availability-arrow">↗</span></div></Reveal>
        <Reveal delay={0.08}><div className="hero-kicker"><span className="kicker-sigil">//</span> AI ENGINEER <span className="kicker-divider">×</span> SOFTWARE DEVELOPER</div>
          <h1>Crafting code.<br /><span className="gradient-text">Creating</span><br /><span className="gradient-text">intelligence.</span></h1></Reveal>
        <Reveal delay={0.15}><p className="hero-lede">Hi, I'm <strong>Yadhaeshwar S.</strong> I transform ambitious ideas into intelligent, human-centered software — from AI-powered investigations to full-stack systems.</p></Reveal>
        <Reveal delay={0.21}><div className="hero-cta"><Link className="btn btn-primary" to="/#projects">Explore my work <ArrowUpRight size={17} /></Link><a className="btn btn-secondary" href={profile.resume} download="Yadhaeshwar_S_Resume.pdf">Download resume <Download size={16} /></a></div></Reveal>
        <Reveal delay={0.27}><div className="hero-footnotes"><span><MapPin size={14} /> Tamil Nadu, India</span><span className="hero-separator" /><span><CircleDot size={14} /> Class of 2027</span></div></Reveal>
      </div>
      <div className="hero-art" aria-label="Immersive neural visualization">
        <motion.div className="orbit-frame" initial={reduce ? false : { opacity: 0, scale: 0.77, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.4, ease: [0.17, 0.67, 0.18, 1] }}>
          <div className="orbit-frame-lines" />
          <NeuralScene />
          <span className="orbit-tick orbit-tick-a">+ SIGNAL_01</span><span className="orbit-tick orbit-tick-b">NEURAL CORE / ACTIVE</span>
          <motion.div className="float-label float-label-top" animate={reduce ? {} : { y: [-5, 6, -5] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}><span className="float-label-icon"><BrainCircuit size={17} /></span><span>ARTIFICIAL<br /><strong>INTELLIGENCE</strong></span><span className="float-label-dot" /></motion.div>
          <motion.div className="float-label float-label-bottom" animate={reduce ? {} : { y: [5, -7, 5] }} transition={{ repeat: Infinity, duration: 7.2, ease: 'easeInOut' }}><span className="float-chart"><i /><i /><i /><i /><i /></span><span>CREATIVE SYSTEMS<br /><strong>IN MOTION</strong></span></motion.div>
        </motion.div>
        <motion.div className="hero-identity" initial={reduce ? false : { opacity: 0, y: 32, rotate: -5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 1.65, duration: .95 }}><IdentityCard /></motion.div>
      </div>
    </div>
    <div className="hero-bottom container"><div className="hero-scroll"><span>SCROLL TO DISCOVER</span><ArrowDownRight size={16} /></div><div className="hero-signature">EST. 2023 <span>/</span> ALWAYS ITERATING</div><div className="hero-index">01 <span>—</span> 05</div></div>
  </section>;
}

function Marquee() {
  const labels = ['INTELLIGENT SYSTEMS', 'FULL-STACK ENGINEERING', 'AI-POWERED EXPERIENCES', 'DIGITAL FORENSICS', 'BUILT WITH CURIOSITY'];
  return <div className="marquee" aria-label="Areas of work"><div className="marquee-track">{Array.from({ length: 3 }).map((_, index) => <div className="marquee-set" key={index}>{labels.map(label => <span key={label}><Sparkles size={13} />{label}</span>)}</div>)}</div></div>;
}

function About() {
  return <section className="section about-section" id="about"><div className="container">
    <SectionIntro number="01" tag="THE PERSON BEHIND THE SYSTEMS" title="Curious by nature." accent="Engineer by choice." />
    <div className="about-layout"><Reveal className="about-main"><div className="about-bigquote">I believe technology works best when it <em>actually solves something.</em></div>
      <p>I'm a Computer Science Engineering undergraduate at <strong>K. Ramakrishnan College of Technology</strong>, graduating in 2027. My interests sit at the crossroads of AI, full-stack development and applied problem-solving.</p>
      <p>Whether it's bringing intelligence to client workflows or making complex evidence easier to navigate, I like shipping things that have a clear purpose — and a thoughtful user experience.</p>
      <div className="about-quicklinks"><a href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={16} /></a><a href={profile.github} target="_blank" rel="noreferrer">See my GitHub <ArrowUpRight size={16} /></a></div>
    </Reveal><Reveal className="about-terminal" delay={0.12}><div className="terminal-caption"><Command size={15} /> A LITTLE ABOUT ME, IN COMMANDS <span>~/about</span></div><Terminal /></Reveal></div>
    <div className="stats-grid">{highlights.map((stat, index) => <Reveal className="stat-card" key={stat.label} delay={index * 0.08}><div className="stat-number">{stat.value}</div><div><strong>{stat.label}</strong><span>{stat.detail}</span></div><ArrowUpRight size={15} className="stat-arrow" /></Reveal>)}</div>
  </div></section>;
}

const filters: ('All' | ProjectCategory)[] = ['All', 'AI / ML', 'Full stack', 'Systems'];
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  function tilt(event: MouseEvent<HTMLElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const xx = (event.clientX - rect.left) / rect.width - 0.5;
    const yy = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--rot-x', `${(-yy * 4).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--rot-y', `${(xx * 4).toFixed(2)}deg`);
  }
  function reset(event: MouseEvent<HTMLElement>) { event.currentTarget.style.setProperty('--rot-x', '0deg'); event.currentTarget.style.setProperty('--rot-y', '0deg'); }
  return <Reveal delay={Math.min(index, 3) * 0.075} className="project-card-wrap"><article ref={cardRef} className="project-card" onMouseMove={tilt} onMouseLeave={reset}>
    <Link to={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`} className="project-image-link"><ProjectScreenshots project={project} /></Link>
    <div className="project-card-content"><div className="project-card-meta"><span>{project.index} / {project.category}</span><span className="project-badge">{project.status}</span></div><h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p>
      <div className="project-tags">{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="project-card-links"><Link to={`/projects/${project.slug}`} className="case-study-link">View case study <ArrowUpRight size={16} /></Link>{project.repo && <a className="source-link" target="_blank" rel="noreferrer" href={project.repo} aria-label={`View ${project.title} source on GitHub`}><Github size={18} /></a>}</div>
    </div>
  </article></Reveal>;
}

function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const visible = projects.filter(p => filter === 'All' || p.category === filter);
  return <section className="section projects-section" id="projects"><div className="container">
    <SectionIntro number="02" tag="SELECTED WORK / PROJECT INDEX" title="Ideas, shipped" accent="into reality." description="An evolving collection of meaningful builds — from intelligent workspaces and digital forensics to experimental systems." />
    <Reveal><div className="projects-toolbar"><div className="filter-list" role="group" aria-label="Filter projects by category">{filters.map(f => <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''} aria-pressed={filter === f}>{f}{f === 'All' && <sup>{projects.length.toString().padStart(2, '0')}</sup>}</button>)}</div><span className="project-count">DISPLAYING {visible.length.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}</span></div></Reveal>
    <div className="projects-grid"><AnimatePresence mode="popLayout">{visible.map((p, i) => <motion.div layout key={p.slug} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.22 }}><ProjectCard project={p} index={i} /></motion.div>)}</AnimatePresence></div>
    <Reveal><div className="projects-notice"><ShieldCheck size={17} /><p><strong>Transparency matters.</strong> The first three projects are featured in my resume. Other projects are additional work or concepts, with their status clearly identified. Verified source links appear only where repositories are public.</p></div></Reveal>
  </div></section>;
}

type PublicRepo = { name: string; description: string; url: string; language: string; stars?: number; pushed?: string };
function GitHubPanel() {
  const [repos, setRepos] = useState<PublicRepo[]>(publicRepos);
  const [synced, setSynced] = useState(false);
  const [syncState, setSyncState] = useState<'loading' | 'live' | 'fallback'>('loading');
  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 8500);
    fetch(`https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated`, { headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal })
      .then(async r => { if (!r.ok) throw Error(`GitHub ${r.status}`); return r.json() as Promise<Array<{ name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; pushed_at: string; private: boolean }>>; })
      .then(items => {
        if (!Array.isArray(items)) throw Error('Invalid payload');
        const verified = items.filter(i => !i.private && typeof i.name === 'string' && typeof i.html_url === 'string').map(i => ({ name: i.name, description: i.description || 'Public GitHub repository', url: i.html_url, language: i.language || 'Code', stars: i.stargazers_count, pushed: i.pushed_at }));
        if (verified.length) { setRepos(verified); setSynced(true); setSyncState('live'); } else setSyncState('fallback');
      })
      .catch(() => setSyncState('fallback')).finally(() => window.clearTimeout(timer));
    return () => { controller.abort(); window.clearTimeout(timer); };
  }, []);
  return <section className="section github-section" id="github"><div className="container"><SectionIntro number="03" tag="OPEN SOURCE / DIGITAL FOOTPRINT" title="Proof of work." accent="On GitHub." description="Explore repositories from my public profile. The list refreshes from GitHub when the public API is available." />
    <div className="github-layout"><Reveal className="github-profile-card"><div className="github-profile-top"><Github size={30} strokeWidth={1.3} /><span className="github-live"><i className="status-dot" />{synced ? 'LIVE FROM GITHUB' : 'VERIFIED PROFILE'}</span></div>
      <div className="github-avatar">YS<span>✳</span></div><div className="github-handle">@{profile.githubUsername}</div><h3>Building in public,<br /><span>one commit at a time.</span></h3><p>Full-stack applications, AI exploration and practical engineering projects.</p>
      <div className="github-card-bottom"><div><strong>{repos.length.toString().padStart(2, '0')}</strong><span>{synced ? 'PUBLIC REPOS · LIVE' : 'VERIFIED REPOS'}</span></div><a href={profile.github} rel="noreferrer" target="_blank" className="github-profile-link" aria-label="Visit full GitHub profile"><ArrowUpRight size={20} /></a></div>
    </Reveal><Reveal className="github-repo-card" delay={0.1}><div className="repo-heading"><span><Code2 size={16} /> REPOSITORY EXPLORER</span><span className="repo-sync-state">{syncState === 'loading' ? 'CONNECTING…' : syncState === 'live' ? '● SYNCED' : '● OFFLINE FALLBACK'}</span></div>
      <div className="repo-list">{repos.slice(0, 5).map((repo, i) => <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="repo-row"><span className="repo-num">0{i + 1}</span><span className="repo-body"><strong>{repo.name}</strong><small>{repo.description}</small><span className="repo-language"><i />{repo.language}{typeof repo.stars === 'number' && <span> · ★ {repo.stars}</span>}</span></span><ArrowUpRight size={18} /></a>)}</div>
      <div className="repo-footer"><span>{syncState === 'live' ? 'Source: GitHub public API' : 'Source: verified public repository URLs · API unavailable'}</span><a href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer">All repositories <ArrowRight size={15} /></a></div>
    </Reveal></div>
  </div></section>;
}

function Skills() {
  return <section className="section skills-section" id="skills"><div className="container"><SectionIntro number="04" tag="TECHNOLOGY / THE TOOLKIT" title="Curiosity is" accent="my core stack." description="The technologies I reach for to connect great experiences with purposeful engineering." />
    <div className="skills-layout"><Reveal className="skills-aside"><div className="skills-graphic"><Layers3 size={40} strokeWidth={1.1} /><div className="skills-graphic-inner">&lt;/&gt;</div><span className="skills-graphic-a">SYSTEMS</span><span className="skills-graphic-b">LOGIC</span></div><p>Frontend polish.<br />Backend clarity.<br /><span>AI curiosity.</span></p><small>GROWING MY STACK WITH EVERY BUILD.</small></Reveal>
      <div className="skill-groups">{skillGroups.map((group, i) => <Reveal className="skill-group" key={group.id} delay={i * 0.04}><div className="skill-group-header"><span>{group.id}</span><h3>{group.label}</h3><span className="skill-number">{group.items.length.toString().padStart(2, '0')}</span></div><div className="skill-chips">{group.items.map(skill => <span key={skill}>{skill}</span>)}</div></Reveal>)}</div>
    </div>
  </div></section>;
}

function Journey() {
  return <section className="section journey-section" id="journey"><div className="container"><SectionIntro number="05" tag="THE JOURNEY / GROWTH.LOG" title="Still learning." accent="Always building." />
    <div className="journey-grid"><div className="timeline">
      <Reveal className="timeline-event"><div className="timeline-dot" /><div className="timeline-date">MAY — JUL 2025 <span>EXPERIENCE</span></div><h3>React JS Trainee Intern</h3><div className="timeline-org">Digiplus Agency</div><p>Engineered 15+ reusable React components and responsive interfaces across three production projects, with a focus on modern JavaScript, cross-browser UI and dynamic interactions.</p></Reveal>
      <Reveal className="timeline-event" delay={0.05}><div className="timeline-dot" /><div className="timeline-date">2026 <span>ACHIEVEMENT</span></div><h3>Syntax2Code Hackathon Winner</h3><div className="timeline-org">CodeTantra</div><p>Won first place in the hackathon and received an internship offer.</p></Reveal>
      <Reveal className="timeline-event" delay={0.09}><div className="timeline-dot" /><div className="timeline-date">2026 <span>SELECTION</span></div><h3>Smart India Hackathon</h3><div className="timeline-org">Institutional selection</div><p>Selected internally for the official national submission process.</p></Reveal>
      <Reveal className="timeline-event" delay={0.13}><div className="timeline-dot" /><div className="timeline-date">SEP 2023 — APR 2027 <span>EDUCATION</span></div><h3>B.E. Computer Science Engineering</h3><div className="timeline-org">K. Ramakrishnan College of Technology</div><p>Building foundations in data structures, web development, software engineering and object-oriented programming.</p></Reveal>
    </div><div className="journey-aside"><Reveal><div className="journey-info-card"><GraduationCap size={25} /><div><span>EDUCATION STATUS</span><strong>Class of '27</strong><small>Computer Science Engineering<br />CGPA: {profile.cgpa} (per resume)</small></div></div></Reveal>
      <Reveal delay={0.08}><div className="credentials-card"><div className="credentials-heading"><Award size={21} /><span>CERTIFICATES & MILESTONES</span></div>{certifications.map(item => <div className="credential" key={item}><Check size={15} /><span>{item}</span></div>)}<div className="credentials-extra"><Sparkles size={16} /> Zonal-level badminton player</div></div></Reveal>
    </div></div>
  </div></section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }
    catch { window.location.href = `mailto:${profile.email}`; }
  }
  return <section id="contact" className="contact-section"><div className="container"><Reveal><div className="contact-shell"><div className="contact-glow" /><div className="contact-content"><Label>FINAL TRANSMISSION / LET'S CONNECT</Label><div className="contact-signal"><i className="status-dot" /> AVAILABLE FOR THE RIGHT CHALLENGE</div><h2>Have a problem worth<br /><span className="gradient-text">solving together?</span></h2><p>AI engineering, full-stack development, collaborations or simply a great idea — my inbox is open.</p><div className="contact-buttons"><a className="btn btn-primary" href={`mailto:${profile.email}`}>Start a conversation <ArrowUpRight size={18} /></a><button className="btn btn-secondary" onClick={copyEmail}>{copied ? 'Copied email!' : 'Copy email'} {copied ? <Check size={17} /> : <Mail size={17} />}</button></div><div className="contact-email">{profile.email}</div></div><div className="contact-decoration" aria-hidden="true">@</div></div></Reveal>
    <footer className="footer"><Link to="/" className="brand footer-brand"><span className="brand-icon"><span>&gt;</span>_</span><span>yadhaesh<span className="brand-suffix">.dev</span></span></Link><span>DESIGNED WITH INTENTION. BUILT WITH CODE. © {new Date().getFullYear()}.</span><div className="footer-icons"><a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={19} /></a><a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={19} /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={19} /></a><Link to="/#home" aria-label="Back to top"><MoveUpRight size={19} /></Link></div></footer>
  </div></section>;
}

function HomePage() {
  useEffect(() => { document.title = 'Yadhaeshwar S — AI & Software Engineer | Portfolio 2.0'; }, []);
  return <><Hero /><Marquee /><About /><Projects /><GitHubPanel /><Skills /><Journey /><Contact /></>;
}

function CaseStudy({ project }: { project: Project }) {
  const related = projects.filter(p => p.slug !== project.slug).slice(0, 2);
  return <div className="case-page"><div className="case-noise" />
    <section className="case-hero container"><Reveal><Link to="/#projects" className="case-back"><ArrowLeft size={17} /> Back to selected work</Link><div className="case-eyebrow"><span className="status-dot" /> CASE STUDY / {project.index} — {project.category.toUpperCase()}</div><h1>{project.title}<span>.</span></h1><p className="case-lead">{project.elevator}</p><div className="case-top-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></Reveal>
      <Reveal delay={0.12}><ProjectScreenshots project={project} large /></Reveal>
      <div className="case-facts"><div><span>PROJECT TYPE</span><strong>{project.category}</strong></div><div><span>YEAR</span><strong>{project.year}</strong></div><div><span>CURRENT STATUS</span><strong>{project.status}</strong></div><div><span>REPOSITORY</span><strong>{project.repo ? <a href={project.repo} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={13} /></a> : 'Not publicly linked'}</strong></div></div>
    </section>
    <section className="case-body section"><div className="container"><div className="case-content-row"><Reveal><div className="case-section-label">01 / THE CHALLENGE</div><h2>Understanding<br /><span>the problem.</span></h2></Reveal><Reveal><p>{project.problem}</p></Reveal></div>
      <div className="case-content-row"><Reveal><div className="case-section-label">02 / THE APPROACH</div><h2>Designing<br /><span>the solution.</span></h2></Reveal><Reveal><p>{project.approach}</p></Reveal></div>
      <Reveal><div className="case-diagram"><div className="case-diagram-top"><span><Layers3 size={17} /> SYSTEM / ARCHITECTURE</span><span>ABSTRACTED VIEW</span></div><div className="diagram-stages">{project.architecture.map((stage, i) => <div className="diagram-segment" key={stage.label}><div className="diagram-node"><span>0{i + 1}</span><strong>{stage.label}</strong><small>{stage.detail}</small></div>{i < project.architecture.length - 1 && <div className="diagram-connector"><ChevronRight size={19} /></div>}</div>)}</div><p>Conceptual overview; architecture is simplified for readability.</p></div></Reveal>
      <div className="case-content-row case-features-row"><Reveal><div className="case-section-label">03 / CORE FEATURES</div><h2>What makes<br /><span>it work.</span></h2></Reveal><Reveal><div className="case-feature-list">{project.features.map((feature, index) => <div key={feature}><span>{String(index + 1).padStart(2, '0')}</span><strong>{feature}</strong><Check size={17} /></div>)}</div></Reveal></div>
      <Reveal><div className="case-takeaway"><div><div className="case-section-label">04 / THE TAKEAWAY</div><h2>Built to make<br /><span>a difference.</span></h2><p>{project.outcome}</p>{project.note && <div className="case-honesty"><ShieldCheck size={16} /> {project.note}</div>}</div><span className="takeaway-decoration">✳</span></div></Reveal>
      <div className="case-bottom-actions">{project.repo && <a className="btn btn-primary" href={project.repo} rel="noreferrer" target="_blank">View source on GitHub <Github size={17} /></a>}<Link className="btn btn-secondary" to="/#projects">Explore all projects <ArrowRight size={17} /></Link></div>
    </div></section>
    <section className="case-related"><div className="container"><div className="related-header"><h2>Keep exploring<span>.</span></h2><span>NEXT / CASE STUDIES</span></div><div className="related-cards">{related.map(p => <Link to={`/projects/${p.slug}`} key={p.slug} className="related-card"><span>{p.index} / {p.category}</span><strong>{p.title}</strong><ArrowUpRight size={20} /></Link>)}</div></div></section>
    <Contact />
  </div>;
}

function CaseRoute() {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const project = projects.find(p => p.slug === slug);
  useEffect(() => { document.title = project ? `${project.title} — Case Study | Yadhaeshwar S` : 'Project not found | Yadhaeshwar S'; }, [project]);
  return project ? <CaseStudy key={project.slug} project={project} /> : <div className="not-found container"><BookOpen size={40} /><h1>Project not found.</h1><p>That case study isn't in the portfolio index.</p><Link to="/#projects" className="btn btn-primary">Back to projects <ArrowRight size={17} /></Link></div>;
}

export function App() {
  return <ThemeProvider><IntroSplash /><ScrollController /><ProgressBar /><Cursor /><Header /><main><Routes><Route path="/" element={<HomePage />} /><Route path="/projects/:slug" element={<CaseRoute />} /><Route path="*" element={<div className="not-found container"><TerminalSquare size={40} /><h1>404 — Signal lost.</h1><Link to="/" className="btn btn-primary">Return home <ArrowRight size={17} /></Link></div>} /></Routes></main><Chatbot /></ThemeProvider>;
}
