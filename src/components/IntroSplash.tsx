import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';

/** A short, accessible intro played once per session. Replay it from the navigation. */
export function IntroSplash() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(() => {
    try { return window.sessionStorage.getItem('neural-aurora-intro-seen') !== 'yes'; }
    catch { return true; }
  });
  const [phase, setPhase] = useState(0);
  const close = useCallback(() => {
    setActive(false);
    try { window.sessionStorage.setItem('neural-aurora-intro-seen', 'yes'); } catch { /* optional */ }
  }, []);

  useEffect(() => {
    const replay = () => { setPhase(0); setActive(true); };
    window.addEventListener('neural-aurora:replay', replay);
    return () => window.removeEventListener('neural-aurora:replay', replay);
  }, []);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) { close(); return; }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const a = window.setTimeout(() => setPhase(1), 650);
    const b = window.setTimeout(() => setPhase(2), 1650);
    const c = window.setTimeout(close, 3450);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter') close(); };
    window.addEventListener('keydown', onKey);
    return () => { window.clearTimeout(a); window.clearTimeout(b); window.clearTimeout(c); window.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; };
  }, [active, reducedMotion, close]);

  return <AnimatePresence mode="wait">
    {active && !reducedMotion && <motion.div className="intro-overlay" role="dialog" aria-modal="true" aria-label="Neural Aurora introductory animation" key="intro"
      initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}>
      <div className="intro-scanlines" aria-hidden="true" />
      <div className="intro-top"><span className="intro-mark">YS<span>✳</span></span><span>PORTFOLIO / 2.0 — NEURAL AURORA</span></div>
      <button className="intro-skip" type="button" onClick={close}>Skip intro <X size={15} /></button>
      <div className="intro-core" aria-live="polite">
        <motion.div className="intro-cross" initial={{ opacity: 0, rotate: -45, scale: .5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 1.3 }}>✳</motion.div>
        <motion.p className="intro-pretitle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28 }}> {phase === 0 ? 'INITIALIZING PORTFOLIO.EXE' : phase === 1 ? 'HUMAN INTELLIGENCE × MACHINE POSSIBILITY' : 'SYSTEM READY / WELCOME'} </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ duration: 1.1, delay: .22 }}>
          YADHAESHWAR <span>S.</span>
        </motion.h2>
        <motion.div className="intro-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }}><Sparkles size={15} /> AI & SOFTWARE ENGINEER <ArrowUpRight size={15} /></motion.div>
      </div>
      <div className="intro-bottom"><span>EST. 2023 / BUILDING WHAT'S NEXT</span><span className="intro-progress-label">{phase === 0 ? '01' : phase === 1 ? '02' : '03'} / 03</span></div>
      <motion.div className="intro-progress" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 3.35, ease: 'linear' }} />
    </motion.div>}
  </AnimatePresence>;
}
