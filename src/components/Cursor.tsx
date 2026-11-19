import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const x = useMotionValue(-60);
  const y = useMotionValue(-60);
  const springX = useSpring(x, { stiffness: 480, damping: 34, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 480, damping: 34, mass: 0.45 });
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(query.matches && !reduced);
    update(); query.addEventListener('change', update);
    const mouseMove = (event: MouseEvent) => {
      x.set(event.clientX); y.set(event.clientY);
      setHovered(Boolean((event.target as HTMLElement)?.closest('a, button, input, textarea, [data-cursor]')));
    };
    window.addEventListener('mousemove', mouseMove);
    return () => { query.removeEventListener('change', update); window.removeEventListener('mousemove', mouseMove); };
  }, [x, y, reduced]);
  if (!enabled) return null;
  return <motion.div className="custom-cursor" style={{ x: springX, y: springY }} animate={{ scale: hovered ? 2.15 : 1, opacity: hovered ? 0.45 : 0.78 }} transition={{ duration: 0.2 }} aria-hidden="true" />;
}
