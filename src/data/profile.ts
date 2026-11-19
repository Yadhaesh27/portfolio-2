// Source of truth: supplied resume (19 Nov 2026). Public repo links verified on GitHub.
// Extended project descriptions for AEGIS AI, JUSTRA, APEX AI come from the user's prior project brief.
export const profile = {
  name: 'Yadhaeshwar S',
  firstName: 'Yadhaeshwar',
  initials: 'YS',
  title: 'AI & Software Engineer',
  location: 'Tamil Nadu, India',
  email: 'yadhaesh@gmail.com',
  phone: '+91 6381098377',
  linkedin: 'https://www.linkedin.com/in/yadhaeshwar-s',
  github: 'https://github.com/Yadhaesh27',
  githubUsername: 'Yadhaesh27',
  resume: '/Yadhaeshwar_S_Resume.pdf',
  // Optional: place your portrait at public/portrait.jpg and set this to '/portrait.jpg'.
  // Until then, the site uses the genuine public GitHub avatar, with a YS fallback.
  portrait: '',
  institution: 'K. Ramakrishnan College of Technology',
  degree: 'B.E. Computer Science Engineering',
  graduation: '2027',
  cgpa: '6.9 / 10',
  intro: 'I build intelligent software that connects thoughtful experiences with capable engineering.',
  status: 'Open to graduate engineering opportunities',
};

export type ProjectCategory = 'AI / ML' | 'Full stack' | 'Systems';
export type Project = {
  slug: string;
  index: string;
  title: string;
  overline: string;
  category: ProjectCategory;
  summary: string;
  elevator: string;
  tags: string[];
  year: string;
  status: string;
  repo?: string;
  verifiedRepo?: boolean;
  featured?: boolean;
  motif: 'flow' | 'shield' | 'waves' | 'map' | 'scales' | 'pulse';
  theme: 'violet' | 'cyan' | 'teal';
  problem: string;
  approach: string;
  features: string[];
  architecture: { label: string; detail: string }[];
  outcome: string;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: 'clientflow-ai', index: '01', title: 'ClientFlow AI', overline: 'THE ENTERPRISE WORKSPACE', category: 'Full stack',
    summary: 'A collaborative client workspace with real-time AI assistance, versioned approvals and intuitive team workflows.',
    elevator: 'Making client delivery feel less fragmented and more intelligent.',
    tags: ['React', 'TypeScript', 'FastAPI', 'Gemini AI', 'SQLite', 'SSE'], year: '2026', status: 'Public repository',
    repo: 'https://github.com/Yadhaesh27/ClientFlow-AI', verifiedRepo: true, featured: true, motif: 'flow', theme: 'violet',
    problem: 'Project communication, approvals, and client updates often live in scattered tools. Teams need a shared source of context without losing the nuance of client feedback.',
    approach: 'Designed a multi-tenant interface around project workspaces, Kanban tasks, versioned deliverables and an AI-assisted copilot. React handles the responsive experience, while FastAPI serves project operations and Gemini workflows over streaming responses.',
    features: ['Multi-tenant client and team workspaces', 'Kanban task and approval workflows', 'Deliverable revision history (v1–v3)', 'Streaming AI copilot responses', 'Project health insights and executive reports'],
    architecture: [{ label: 'Experience', detail: 'React + TypeScript dashboard' }, { label: 'Application', detail: 'FastAPI REST endpoints + SSE' }, { label: 'Intelligence', detail: 'Gemini AI copilot' }, { label: 'Persistence', detail: 'SQLite / workspace records' }],
    outcome: 'A connected project-management experience with live AI assistance and structured client delivery.',
  },
  {
    slug: 'ai-cyber-forensics', index: '02', title: 'AI Cyber Forensics', overline: 'EVIDENCE INTELLIGENCE', category: 'AI / ML',
    summary: 'Digital evidence organization with OCR, cryptographic integrity checks, investigator workflows and contextual AI assistance.',
    elevator: 'Turning scattered digital evidence into traceable investigation context.',
    tags: ['React', 'Python', 'FastAPI', 'RAG', 'OCR', 'SHA-256'], year: '2026', status: 'Public repository',
    repo: 'https://github.com/Yadhaesh27/AI-Cyber-Forensics', verifiedRepo: true, featured: true, motif: 'shield', theme: 'cyan',
    problem: 'Investigators have to preserve evidence integrity while searching across mixed files and keeping an auditable trail of what happened and when.',
    approach: 'Created an investigation workspace combining evidence ingestion, hashing, OCR and contextual search. The public repository documents configurable local/cloud LLM connectors and a lightweight NumPy vector store; the resume additionally describes a PostgreSQL/FAISS architecture.',
    features: ['Secure case and evidence organization', 'SHA-256 hash verification', 'OCR and metadata extraction', 'Chain-of-custody event ledger', 'Contextual retrieval and AI assistant'],
    architecture: [{ label: 'Experience', detail: 'React investigation dashboard' }, { label: 'API', detail: 'Python + FastAPI' }, { label: 'Evidence', detail: 'OCR, hashes and audit records' }, { label: 'Retrieval', detail: 'Vector search + configurable LLM' }],
    outcome: 'An investigation-focused platform that emphasizes traceability, evidence search, and human-in-the-loop AI support.',
    note: 'Stack details differ between the uploaded resume and current public README. This case study uses the verified public implementation where applicable.',
  },
  {
    slug: 'smart-drainage-monitoring', index: '03', title: 'Smart Drainage', overline: 'INTELLIGENT INFRASTRUCTURE', category: 'Systems',
    summary: 'Computer vision and IoT monitoring for infrastructure anomalies, real-time telemetry and early incident alerts.',
    elevator: 'From reactive maintenance to earlier, data-led intervention.',
    tags: ['Python', 'Computer Vision', 'IoT', 'React', 'Telemetry'], year: '2026', status: 'Resume project', featured: true, motif: 'waves', theme: 'teal',
    problem: 'Infrastructure incidents are hard to respond to when anomalies are identified late or monitoring data is difficult to interpret.',
    approach: 'Designed a web-facing monitoring workflow in which telemetry and visual signals feed a Python-based anomaly assessment pipeline, with alert states presented in a responsive dashboard.',
    features: ['Real-time sensor monitoring concepts', 'Computer-vision-assisted anomaly detection', 'Visual status indicators and alert states', 'Incident notification workflow'],
    architecture: [{ label: 'Signals', detail: 'IoT sensors + visual input' }, { label: 'Detection', detail: 'Python + computer vision' }, { label: 'Display', detail: 'React monitoring dashboard' }, { label: 'Action', detail: 'Anomaly alerts / dispatch workflow' }],
    outcome: 'A monitoring system focused on making potential drainage problems visible sooner.',
    note: 'Featured in the uploaded resume. No matching public repository was verified.',
  },
  {
    slug: 'aegis-ai', index: '04', title: 'AEGIS AI', overline: 'EMERGENCY MOBILITY', category: 'Systems',
    summary: 'Traffic command center concept for emergency-vehicle priority, road routing and real-time map-driven coordination.',
    elevator: 'Exploring smarter routes when every second matters.',
    tags: ['React', 'FastAPI', 'NetworkX', 'SQLite', 'SSE'], year: '2026', status: 'Additional work', motif: 'map', theme: 'violet',
    problem: 'Emergency mobility depends on rapidly interpreting traffic states, route alternatives and coordination across intersections.',
    approach: 'Developed a prototype architecture with a React command center, FastAPI services, a graph-based road network, geospatial calculations and streamed simulation updates.',
    features: ['Map-based operator command center', 'NetworkX road graph and routing', 'Simulated GPS and priority signals', 'Persistent event data', 'Real-time updates'],
    architecture: [{ label: 'UI', detail: 'React command center' }, { label: 'Routing', detail: 'NetworkX + geospatial logic' }, { label: 'Services', detail: 'FastAPI + SSE' }, { label: 'Storage', detail: 'SQLite simulation records' }],
    outcome: 'A technical exploration of route prioritization and situational awareness for emergency response.',
    note: 'Additional project shared in prior discussions; no public repository linked.',
  },
  {
    slug: 'justra', index: '05', title: 'JUSTRA', overline: 'ACCESSIBLE LEGAL GUIDANCE', category: 'AI / ML',
    summary: 'Multilingual legal-assistance product concept combining retrieval, guided workflows and document intelligence.',
    elevator: 'Making complex legal information easier to navigate.',
    tags: ['Gemini', 'RAG', 'OCR', 'Voice AI', 'Security'], year: '2026', status: 'Product concept', motif: 'scales', theme: 'cyan',
    problem: 'People often need a clear starting point when navigating complaints, evidence organization and legal information.',
    approach: 'Outlined an assistance-oriented application using grounded retrieval, multilingual voice interaction, OCR and secure document flows, with emphasis on clear user guidance rather than replacing professional advice.',
    features: ['English / Tamil / Hindi guidance', 'Retrieval-grounded legal assistant concept', 'Document OCR and complaint drafting', 'Secure evidence vault design'],
    architecture: [{ label: 'Interaction', detail: 'Multilingual voice + web interface' }, { label: 'Retrieval', detail: 'RAG + reference content' }, { label: 'Documents', detail: 'OCR + complaint flows' }, { label: 'Trust', detail: 'Privacy-focused vault design' }],
    outcome: 'A product design exploring accessible, structured legal self-help workflows.',
    note: 'Concept / additional work; not presented as a deployed legal service.',
  },
  {
    slug: 'apex-ai', index: '06', title: 'APEX AI', overline: 'THE AUTONOMOUS OPS LAB', category: 'AI / ML',
    summary: 'In-development AI agent architecture for DevOps incident triage, diagnostics and guided remediation.',
    elevator: 'Exploring how AI can make operations more understandable.',
    tags: ['Python', 'LLMs', 'DevOps', 'Agents', 'GitHub'], year: '2026', status: 'In planning', motif: 'pulse', theme: 'violet',
    problem: 'Incident responders often switch between logs, alerts, runbooks and issue tracking before reaching a reliable diagnosis.',
    approach: 'Planning an agent workflow that gathers incident context, proposes hypotheses and remediation steps, and retains human approval before consequential actions.',
    features: ['Incident triage workflow design', 'Root-cause hypothesis generation', 'Tool and GitHub integration planning', 'Human approval gates', 'Runbook-oriented response'],
    architecture: [{ label: 'Input', detail: 'Alerts and operational context' }, { label: 'Reasoning', detail: 'Hybrid LLM orchestration (planned)' }, { label: 'Tools', detail: 'DevOps and GitHub integrations (planned)' }, { label: 'Safety', detail: 'Human-reviewed actions' }],
    outcome: 'A documented engineering direction; implementation and results are not yet claimed.',
    note: 'Planning stage. No public repository or finished system is claimed.',
  },
];

export const publicRepos = [
  { name: 'ClientFlow-AI', description: 'Enterprise client collaboration and AI workspace', url: 'https://github.com/Yadhaesh27/ClientFlow-AI', language: 'TypeScript' },
  { name: 'AI-Cyber-Forensics', description: 'Agentic digital evidence and investigation platform', url: 'https://github.com/Yadhaesh27/AI-Cyber-Forensics', language: 'Python' },
  { name: 'Data-Structures', description: 'Shortest path between two users', url: 'https://github.com/Yadhaesh27/Data-Structures', language: 'Repository' },
  { name: 'Python-Programming', description: 'Hospital management system', url: 'https://github.com/Yadhaesh27/Python-Programming', language: 'Repository' },
];

export const skillGroups = [
  { id: '01', label: 'LANGUAGES', items: ['Python', 'Java', 'JavaScript / TypeScript', 'C', 'SQL'] },
  { id: '02', label: 'FRONTEND', items: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Responsive UI', 'Bootstrap'] },
  { id: '03', label: 'SYSTEMS & APIs', items: ['FastAPI', 'REST APIs', 'SSE', 'Docker', 'Git & GitHub', 'Postman'] },
  { id: '04', label: 'AI & SECURITY', items: ['RAG', 'Gemini integrations', 'OCR', 'Digital Forensics', 'SHA-256', 'Threat Analysis'] },
  { id: '05', label: 'CLOUD & TOOLS', items: ['Cloud Fundamentals', 'Azure Basics', 'VS Code', 'Git', 'Docker'] },
];

export const certifications = ['Wipro · .NET Certification', 'Japanese · N5.1 Qualification', 'Microsoft Azure · Simplilearn', 'Cybersecurity · Simplilearn'];
export const highlights = [
  { value: '01', label: 'HACKATHON WIN', detail: 'Syntax2Code · 1st place' },
  { value: '2027', label: 'GRADUATION', detail: 'B.E. Computer Science' },
  { value: '15+', label: 'REACT COMPONENTS', detail: 'Built during internship*' },
];
