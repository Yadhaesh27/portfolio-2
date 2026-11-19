import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2, X } from 'lucide-react';
import type { Project } from '../data/profile';
import { ProjectVisual } from './ProjectVisual';

type Screenshot = { src: string; label: string; path: string };
const screenshotCache = new Map<string, Promise<Screenshot[]>>();
const imageExt = /\.(?:png|jpe?g|webp|gif)$/i;
const likelyScreenshots = /(?:screenshot|screen[-_ ]?shot|screens|ui[-_]?preview|demo[-_]?image|dashboard|kanban|investigation|evidence|interface|gallery|preview|application[-_]?(?:ui|screen))/i;
const excluded = /(?:node_modules|\/dist\/|\/build\/|\/\.git\/|\/icons?\/|\/logos?\/|\/badges?\/)/i;

function score(path: string): number {
  let n = 0;
  if (/screenshots?|screen[-_ ]?shots?/i.test(path)) n += 80;
  if (/dashboard|investigation|evidence|kanban|overview|case|client|report/i.test(path)) n += 35;
  if (/preview|demo|gallery|ui|interface/i.test(path)) n += 24;
  if (/readme|docs|assets|images/i.test(path)) n += 8;
  if (/logo|icon|badge|cover|banner|splash|og[-_]?image|favicon/i.test(path)) n -= 85;
  return n;
}
function pretty(path: string) {
  const name = path.split('/').pop()!.replace(imageExt, '').replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim();
  return name.length > 38 ? name.slice(0, 35) + '…' : name || 'Project screenshot';
}
async function fetchScreenshots(repository: string): Promise<Screenshot[]> {
  const match = repository.match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+)\/?$/i);
  if (!match) return [];
  const [, owner, repo] = match;
  const base = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const headers = { Accept: 'application/vnd.github+json' };
  const metadataResponse = await fetch(base, { headers });
  if (!metadataResponse.ok) return [];
  const metadata: { default_branch?: string } = await metadataResponse.json();
  const branch = metadata.default_branch || 'main';
  const treeResponse = await fetch(`${base}/git/trees/${encodeURIComponent(branch)}?recursive=1`, { headers });
  if (!treeResponse.ok) return [];
  const tree: { tree?: Array<{ path: string; type: string; size?: number }> } = await treeResponse.json();
  return (tree.tree || [])
    .filter(file => file.type === 'blob' && file.size !== 0 && file.path && file.path.length < 250 && imageExt.test(file.path) && likelyScreenshots.test(file.path) && !excluded.test('/' + file.path))
    .sort((a, b) => score(b.path) - score(a.path))
    .slice(0, 8)
    .map(file => ({
      src: `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}/${file.path.split('/').map(encodeURIComponent).join('/')}`,
      label: pretty(file.path),
      path: file.path,
    }));
}
function getScreenshots(project: Project) {
  if (!project.repo || !project.verifiedRepo) return Promise.resolve([]);
  if (!screenshotCache.has(project.slug)) screenshotCache.set(project.slug, fetchScreenshots(project.repo).catch(() => []));
  return screenshotCache.get(project.slug)!;
}

/** Displays actual image files discovered in the project's verified public GitHub repository.
 * If unavailable, renders the original abstract graphic instead of a fabricated screenshot.
 */
export function ProjectScreenshots({ project, large = false }: { project: Project; large?: boolean }) {
  const [images, setImages] = useState<Screenshot[]>([]);
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [bad, setBad] = useState<string[]>([]);
  useEffect(() => {
    let cancelled = false;
    setImages([]); setIndex(0); setBad([]); setModal(false);
    getScreenshots(project).then(items => { if (!cancelled) setImages(items); });
    return () => { cancelled = true; };
  }, [project]);
  useEffect(() => {
    if (!modal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModal(false);
      if (event.key === 'ArrowLeft') setIndex(i => (i + images.length - 1) % images.length);
      if (event.key === 'ArrowRight') setIndex(i => (i + 1) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, images.length]);
  const visible = images.filter(img => !bad.includes(img.src));
  const current = visible.length ? visible[index % visible.length] : undefined;
  const change = (step: number) => setIndex(i => (i + step + visible.length) % visible.length);
  if (!current) return <div className="preview-fallback"><ProjectVisual project={project} large={large} />{large && <span className="preview-fallback-note">Concept visual · No verified repository screenshot loaded</span>}</div>;
  const imgElement = <img src={current.src} alt={`${project.title} — screenshot from the public GitHub repository: ${current.label}`} onError={() => { setBad(items => [...items, current.src]); setIndex(0); }} loading={large ? 'eager' : 'lazy'} />;
  return <div className={`repo-preview ${large ? 'repo-preview-large' : ''}`}>
    <div className="repo-preview-toolbar"><span className="preview-leds"><i /><i /><i /></span><span className="repo-preview-label"><ImageIcon size={13} /> REAL PROJECT SCREEN / PUBLIC GITHUB REPO</span>{large && <span className="repo-preview-counter">{index % visible.length + 1} / {visible.length}</span>}</div>
    <div className="repo-preview-stage">{imgElement}</div>
    {large && <div className="repo-preview-actions"><span title={current.path}>{current.label}</span><div>
      {visible.length > 1 && <><button type="button" onClick={() => change(-1)} aria-label="Previous project screenshot"><ChevronLeft size={18} /></button><button type="button" onClick={() => change(1)} aria-label="Next project screenshot"><ChevronRight size={18} /></button></>}
      <button type="button" onClick={() => setModal(true)} aria-label="Expand project screenshot"><Maximize2 size={17} /></button>
      <a href={project.repo} rel="noreferrer" target="_blank" aria-label="Open original project GitHub repository"><ArrowUpRight size={18} /></a>
    </div></div>}
    {modal && <div className="preview-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} screenshot viewer`} onClick={() => setModal(false)}>
      <button type="button" className="preview-lightbox-close" aria-label="Close enlarged screenshot" onClick={() => setModal(false)}><X size={22} /></button>
      <div className="preview-lightbox-body" onClick={e => e.stopPropagation()}><img src={current.src} alt={`${project.title} enlarged screenshot`} /><div><span>{current.label}</span><a href={project.repo} rel="noreferrer" target="_blank">Original repository <ArrowUpRight size={14} /></a></div></div>
    </div>}
  </div>;
}
