import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Bot, ChevronDown, MessageCircle, Sparkles, X } from 'lucide-react';
import { profile, projects, publicRepos } from '../data/profile';

type Message = { from: 'bot' | 'user'; content: string };
const suggestions = ['What does he build?', 'Tell me about his internship', 'What skills does he know?', 'How can I contact him?'];
const start: Message[] = [{ from: 'bot', content: "Hey! I'm the portfolio guide. Ask me about Yadhaeshwar's work, skills, experience, projects, or how to connect. My answers come from his portfolio data." }];

function answer(query: string): string {
  const q = query.toLowerCase();
  if (/hello|^hi\b|hey|good morning/.test(q)) return "Hello! I'm here to help you explore Yadhaeshwar's engineering work. Try asking about projects, his internship, skills, or contact details.";
  if (/contact|email|reach|hire|linkedin|phone|connect/.test(q)) return `You can contact Yadhaeshwar at ${profile.email}. His LinkedIn: linkedin.com/in/yadhaeshwar-s and GitHub: github.com/Yadhaesh27.`;
  if (/intern|experience|digiplus|work(ed)?/.test(q)) return 'He was a React JS Trainee Intern at Digiplus Agency from May to July 2025. His resume describes 15+ reusable React components and responsive UI work across three production projects.';
  if (/skill|stack|language|technology|technologies|tools|know/.test(q)) return 'His toolkit includes Python, Java, JavaScript, TypeScript, SQL, React, Tailwind CSS, FastAPI, REST APIs, RAG, OCR, digital forensics, Docker, Git and Azure basics.';
  if (/github|repo|open.source|public/.test(q)) return `His GitHub username is ${profile.githubUsername}. ${publicRepos.length} public repositories were verified when this site was built: ${publicRepos.map(r => r.name).join(', ')}. The live count may change.`;
  if (/clientflow|client flow/.test(q)) return `${projects[0].title} is a multi-tenant client workspace built with React, FastAPI and Gemini AI, supporting Kanban workflows, versioned approvals, and live AI assistance.`;
  if (/forensic|cyber|evidence|security/.test(q)) return 'AI Cyber Forensics is his digital investigation platform. It focuses on evidence intake, SHA-256 integrity verification, OCR, chain of custody and AI-assisted retrieval. The public repository contains its implementation.';
  if (/drainage|iot|computer vision/.test(q)) return 'Smart Drainage is a resume-featured project exploring IoT and computer-vision-based anomaly monitoring with a web dashboard and alert workflow.';
  if (/aegis|traffic|emergency/.test(q)) return 'AEGIS AI is an additional project exploring emergency-vehicle prioritization and traffic routing through a React command center, FastAPI and NetworkX.';
  if (/justra|legal/.test(q)) return 'JUSTRA is a legal-guidance product concept exploring multilingual AI assistance, retrieval, OCR and document workflows. It is not presented as a deployed legal service.';
  if (/apex|devops|agent|incident/.test(q)) return 'APEX AI is an AI-driven DevOps incident response agent currently in planning, focusing on triage, hypotheses, tool integration and human-approved actions.';
  if (/project|build|portfolio|do(es)? he/.test(q)) return `He works on AI-powered applications and full-stack systems. Featured work includes ClientFlow AI, AI Cyber Forensics and Smart Drainage. Additional work includes AEGIS AI, JUSTRA and APEX AI. Open any project card for a case study.`;
  if (/education|study|college|graduat|cgpa|degree/.test(q)) return 'He is pursuing B.E. Computer Science Engineering at K. Ramakrishnan College of Technology (September 2023 – April 2027). His uploaded resume reports a CGPA of 6.9/10.';
  if (/award|hackathon|achieve|certif|wipro|japanese/.test(q)) return 'Highlights include winning the Syntax2Code hackathon, internal selection for Smart India Hackathon, zonal-level badminton, a Wipro .NET certificate, Japanese N5.1 qualification, and Azure/Cybersecurity certificates.';
  if (/resume|cv|download/.test(q)) return `His original one-page resume is available through the Download Resume button in the navigation. File path: ${profile.resume}.`;
  return "I only answer from the portfolio's verified information — I'm a built-in knowledge assistant, not a connected LLM. Ask about projects, internship, skills, education, achievements or contact details.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(start);
  const [draft, setDraft] = useState('');
  const bottom = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => { if (open) bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [messages, open]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  function send(text = draft) {
    const clean = text.trim().slice(0, 400);
    if (!clean) return;
    setMessages(prev => [...prev, { from: 'user', content: clean }, { from: 'bot', content: answer(clean) }]);
    setDraft('');
  }
  return <>
    <motion.button className="chat-fab" type="button" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}><span className="chat-fab-glow" />{open ? <X size={22} /> : <><MessageCircle size={21} /><span className="chat-fab-dot" /></>}</motion.button>
    <AnimatePresence>{open && <motion.div ref={dialog} className="chat-panel" role="dialog" aria-modal="false" aria-label="Portfolio assistant" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ duration: 0.23 }}>
      <div className="chat-head"><div className="chat-avatar"><Bot size={20} /></div><div><strong>NEURAL / GUIDE</strong><span><i className="status-dot" /> Available · portfolio knowledge</span></div><button onClick={() => setOpen(false)} aria-label="Minimize chat"><ChevronDown size={19} /></button></div>
      <div className="chat-scroll" aria-live="polite">{messages.map((m, i) => <div key={i} className={`chat-message ${m.from}`}>{m.from === 'bot' && <span className="chat-bot-marker"><Sparkles size={12} /></span>}<p>{m.content}</p></div>)}<div ref={bottom} /></div>
      <div className="chat-suggestions">{suggestions.map(s => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); send(); }}><input aria-label="Ask about Yadhaeshwar" placeholder="Ask about my work..." value={draft} onChange={e => setDraft(e.target.value)} maxLength={400} autoFocus /><button type="submit" disabled={!draft.trim()} aria-label="Send message"><ArrowUp size={18} /></button></form>
      <div className="chat-disclosure">Local FAQ engine · No external AI API or messages sent</div>
    </motion.div>}</AnimatePresence>
  </>;
}
