import { useState } from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';

/** Uses the user's real public GitHub avatar (not a fabricated face). Replace with /portrait.jpg in profile.ts. */
export function IdentityCard() {
  const [broken, setBroken] = useState(false);
  const avatar = profile.portrait || `https://github.com/${profile.githubUsername}.png?size=320`;
  return <a className="identity-card" href={profile.github} target="_blank" rel="noreferrer" aria-label="Yadhaeshwar's GitHub profile">
    <span className="identity-photo">
      {!broken ? <img src={avatar} alt="GitHub profile avatar" loading="eager" onError={() => setBroken(true)} /> : <span className="identity-monogram">YS</span>}
    </span>
    <span className="identity-meta"><small>THE MIND BEHIND THE CODE</small><strong>Yadhaeshwar S.</strong><span>Developer · Thinker · Builder</span></span>
    <span className="identity-arrow"><Github size={17} /><ArrowUpRight size={13} /></span>
  </a>;
}
