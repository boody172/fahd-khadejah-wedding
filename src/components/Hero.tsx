import { motion } from 'framer-motion';
import portraitSeated from '../assets/couple/portrait-seated.jpg';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--navy-deep)] pt-28 pb-28">
      {/* ground glow — the "landed" horizon light */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/2"
        style={{ background: 'linear-gradient(180deg, var(--dusk) 0%, transparent 100%)' }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(231,144,128,0.35), transparent 70%)' }}
      />

      {/* floral kosha frame — soft blurred blossoms at the edges, as if standing inside the arch */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute -left-16 top-0 h-full w-56 bg-[radial-gradient(circle_at_20%_20%,rgba(231,144,128,0.55),transparent_60%),radial-gradient(circle_at_60%_70%,rgba(212,166,86,0.4),transparent_55%)] blur-2xl" />
        <div className="absolute -right-16 top-0 h-full w-56 bg-[radial-gradient(circle_at_80%_30%,rgba(231,144,128,0.55),transparent_60%),radial-gradient(circle_at_40%_75%,rgba(212,166,86,0.4),transparent_55%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_50%_100%,rgba(244,201,187,0.5),transparent_70%)] blur-xl" />
      </div>

      <div className="relative z-30 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
          className="font-sans text-[10px] uppercase tracking-[0.55em] text-[var(--gold-light)]"
        >
          Together with their families
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="relative mt-8 aspect-[9/16] w-56 overflow-hidden rounded-t-full border-4 border-[var(--gold-light)]/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] sm:w-64"
        >
          <img
            src={portraitSeated}
            alt="Fahd and Khadejah"
            className="h-full w-full object-cover object-top"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/40 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-8"
        >
          <h1 className="font-script px-2 py-1 text-[clamp(2.6rem,8vw,5.2rem)] leading-[1.3] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            Fahd <span className="text-[var(--gold-light)]">&amp;</span> Khadejah
          </h1>
          <p className="mt-4 font-serif text-base italic text-white/80 sm:text-lg">
            Two hearts, guided home to one another.
          </p>
          <p className="mt-6 font-sans text-xs uppercase tracking-[0.45em] text-[var(--gold-light)]">
            January 1 · 2027 · Dammam
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#big-day" className="rounded-full border-2 border-[var(--gold-light)] bg-white/5 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--gold-light)] backdrop-blur transition hover:bg-[var(--gold-light)] hover:text-[var(--navy-deep)]">
            The Big Day
          </a>
          <a href="#rsvp" className="rounded-full border-2 border-[var(--gold)] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] px-7 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-[var(--navy-deep)] shadow-[0_8px_24px_rgba(212,166,86,0.5)] transition hover:scale-105">
            RSVP Now
          </a>
          <a href="#moments" className="rounded-full border-2 border-white bg-black/20 px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-white backdrop-blur transition hover:border-[var(--gold-light)] hover:bg-[var(--gold-light)] hover:text-[var(--navy-deep)]">
            Our Moments
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 font-sans text-[9px] uppercase tracking-[0.4em] text-white/50"
      >
        Scroll
      </motion.div>
    </section>
  );
}
