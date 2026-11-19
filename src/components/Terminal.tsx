import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Command, CornerDownLeft, TerminalSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { profile } from '../data/profile';

type HistoryLine = { type: 'command' | 'response'; text: string };
const greeting: HistoryLine[] = [
  { type: 'command', text: 'whoami' },
  { type: 'response', text: 'Yadhaeshwar S — AI & Software Engineer' },
  { type: 'command', text: 'cat mission.txt' },
  { type: 'response', text: 'Build systems that think. Make interfaces that feel human.' },
];

export function Terminal() {
  const [history, setHistory] = useState<HistoryLine[]>(greeting);
  const [input, setInput] = useState('');
  const log = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const outputs: Record<string, string> = {
    help: 'Commands: help, whoami, skills, projects, resume, contact, github, clear',
    whoami: 'Yadhaeshwar S / AI & Software Engineer / Tamil Nadu, India',
    skills: 'Python · React · FastAPI · RAG · JavaScript · SQL · Digital Forensics',
    projects: 'ClientFlow AI · AI Cyber Forensics · Smart Drainage · AEGIS AI · JUSTRA · APEX AI',
    contact: `${profile.email} | ${profile.linkedin}`,
  };
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    if (command === 'clear') setHistory([]);
    else {
      setHistory(prev => [...prev.slice(-12), { type: 'command', text: command }, { type: 'response', text: outputs[command] ?? (command === 'github' ? 'Opening public GitHub profile…' : command === 'resume' ? 'Downloading original resume…' : `Unknown command: ${command}. Try 'help'.`) }]);
      if (command === 'github') window.open(profile.github, '_blank', 'noopener,noreferrer');
      if (command === 'resume') {
        const link = document.createElement('a'); link.href = profile.resume; link.download = 'Yadhaeshwar_S_Resume.pdf'; link.click();
      }
    }
    setInput('');
  }
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: 'smooth' }); }, [history]);
  return <div className="terminal-window">
    <div className="terminal-titlebar"><div className="window-dots"><i /><i /><i /></div><span><TerminalSquare size={14} /> yadhaesh@neural-aurora — zsh</span><Command size={14} className="terminal-command-icon" /></div>
    <div className="terminal-body" ref={log} aria-live="polite">
      <div className="terminal-greeting">Last login: today on neural-aurora <span className="terminal-blink">▍</span></div>
      {history.map((line, i) => line.type === 'command' ? <div className="terminal-line" key={i}><span className="terminal-path">~/portfolio</span><span className="terminal-caret">❯</span><span>{line.text}</span></div> : <div className="terminal-response" key={i}>{line.text}</div>)}
      <form onSubmit={submit} className="terminal-entry"><label htmlFor="terminal-input" className="terminal-path">~/portfolio</label><span className="terminal-caret">❯</span><input id="terminal-input" aria-label="Terminal command" value={input} onChange={e => setInput(e.target.value)} spellCheck={false} autoComplete="off" placeholder="type help to explore..." /><button type="submit" aria-label="Run command"><CornerDownLeft size={14} /></button></form>
    </div>
    <div className="terminal-footer"><button onClick={() => { navigate('/#projects'); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore projects <ArrowRight size={13} /></button><span>interactive · local</span></div>
  </div>;
}
