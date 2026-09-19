import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Clouds from './Clouds';

type Phase = 'gate' | 'falling' | 'whiteout' | 'revealed';

const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top: Math.random() * 45,
  left: Math.random() * 100,
  size: 1 + Math.random() * 2,
  delay: Math.random() * 4,
}));

export default function CloudGate({ onRevealed }: { onRevealed?: () => void }) {
  const [phase, setPhase] = useState<Phase>('gate');

  const beginDescent = () => {
    if (phase !== 'gate') return;
    setPhase('falling');
    window.setTimeout(() => setPhase('whiteout'), 1100);
    window.setTimeout(() => {
      setPhase('revealed');
      onRevealed?.();
    }, 1300);
  };

  if (phase === 'revealed') return null;

  return (
    <div className="fixed inset-0 z-50" style={{ perspective: 800 }}>
      {/* Sky */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 32%, var(--dusk) 58%, var(--coral) 82%, var(--gold-light) 100%)',
          transformOrigin: '50% 62%',
        }}
        animate={
          phase === 'falling' || phase === 'whiteout'
            ? { scale: 3.6, filter: 'blur(4px)' }
            : { scale: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: 1.1, ease: [0.6, 0, 0.85, 1] }}
      >
        {/* stars */}
        <div aria-hidden className="absolute inset-0">
          {STARS.map((s) => (
            <span
              key={s.id}
              className="absolute rounded-full bg-white"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                animation: `twinkle ${3 + s.delay}s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <Clouds density={phase === 'falling' ? 1 : 0} />

        {/* horizon glow */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[45%]"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,222,173,0.55), transparent 70%)' }}
        />
      </motion.div>

      {/* Content */}
      <AnimatePresence>
        {phase === 'gate' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeIn' }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.6em] text-[var(--gold-light)]">
              With love, an invitation
            </p>
            <h1 className="font-script mt-4 text-[clamp(3.5rem,14vw,8rem)] leading-[0.9] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              Fahd <span className="text-[var(--gold-light)]">&amp;</span> Khadejah
            </h1>
            <p className="mt-5 font-sans text-xs uppercase tracking-[0.5em] text-white/80">
              01 · 01 · 2027 &nbsp;·&nbsp; Dammam
            </p>

            <motion.button
              onClick={beginDescent}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={{ boxShadow: ['0 0 0px rgba(212,166,86,0.0)', '0 0 40px rgba(212,166,86,0.55)', '0 0 0px rgba(212,166,86,0.0)'] }}
              transition={{ boxShadow: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }}
              className="mt-14 rounded-full border border-[var(--gold-light)]/70 bg-white/5 px-10 py-4 font-sans text-[11px] uppercase tracking-[0.5em] text-[var(--gold-light)] backdrop-blur-sm transition hover:bg-white/10"
            >
              Descend to the Celebration
            </motion.button>

            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 font-sans text-[9px] uppercase tracking-[0.4em] text-white/50"
            >
              Tap to begin your descent
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Whiteout flash */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle, #fffaf0 0%, var(--champagne) 100%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'whiteout' ? 1 : 0 }}
        transition={{ duration: phase === 'whiteout' ? 0.3 : 0 }}
      />
    </div>
  );
}
