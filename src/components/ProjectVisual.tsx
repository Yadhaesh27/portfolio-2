import type { Project } from '../data/profile';
import { Activity, BrainCircuit, GitBranch, Network, Scale, ShieldCheck, Waves } from 'lucide-react';

const icons = { flow: GitBranch, shield: ShieldCheck, waves: Waves, map: Network, scales: Scale, pulse: Activity };

export function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  const Icon = icons[project.motif] ?? BrainCircuit;
  return <div className={`project-visual motif-${project.motif} tone-${project.theme} ${large ? 'project-visual-large' : ''}`}>
    <div className="visual-grid" />
    <div className="visual-arc arc-a" /><div className="visual-arc arc-b" /><div className="visual-arc arc-c" />
    <span className="visual-corner visual-corner-l">{project.index} / SIGNAL</span>
    <span className="visual-corner visual-corner-r">SYS.READY</span>
    <div className="visual-main-icon"><Icon strokeWidth={1.12} /></div>
    <div className="visual-trace"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
    <span className="visual-bottom">{project.overline}</span>
  </div>;
}
