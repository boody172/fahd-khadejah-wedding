import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-40 py-5 transition-colors duration-500 ${scrolled ? 'bg-[var(--navy-deep)]/80 backdrop-blur' : ''}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className="font-script inline-block py-1 text-4xl leading-[1.3] text-[var(--gold-light)]"
        >
          F<span className="mx-1 text-white/70">&amp;</span>K
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { href: '#moments', label: 'Our Moments' },
            { href: '#big-day', label: 'The Big Day' },
            { href: '#rsvp', label: 'RSVP' },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-[11px] uppercase tracking-[0.35em] text-white/80 transition-colors hover:text-[var(--gold-light)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
