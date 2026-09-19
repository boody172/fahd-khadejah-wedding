import { motion } from 'framer-motion';
import signingTable from '../assets/couple/signing-table.jpg';
import ringExchange from '../assets/couple/ring-exchange.jpg';
import laughingTable from '../assets/couple/laughing-table.jpg';
import aisleWalk from '../assets/couple/aisle-walk.jpg';
import signingCrowd from '../assets/couple/signing-crowd.jpg';

const photos = [
  { src: signingTable, caption: 'Sealed with a signature', span: 'sm:col-span-2 sm:row-span-2' },
  { src: ringExchange, caption: 'The exchange of rings', span: '' },
  { src: laughingTable, caption: 'Joy, shared', span: '' },
  { src: aisleWalk, caption: 'Walking forward, together', span: 'sm:col-span-2' },
  { src: signingCrowd, caption: 'Witnessed with love', span: '' },
];

export default function Moments() {
  return (
    <section id="moments" className="relative bg-[var(--ivory)] py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,166,86,0.1), transparent 55%)' }}
      />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-sans text-[10px] uppercase tracking-[0.55em] text-[var(--dusk)]"
        >
          Chapter One
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-script mt-4 text-6xl text-[var(--navy)] sm:text-7xl"
        >
          Our Moments
        </motion.h2>
        <div className="gold-divider mx-auto mt-6 w-32" />
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl auto-rows-[220px] grid-cols-2 gap-4 px-6 sm:grid-cols-4">
        {photos.map((p, i) => (
          <motion.figure
            key={p.caption}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            className={`group relative overflow-hidden rounded-2xl shadow-[0_25px_50px_-20px_rgba(27,35,64,0.4)] ${p.span}`}
          >
            <img
              src={p.src}
              alt={p.caption}
              loading={i < 2 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <p className="absolute inset-x-0 bottom-3 translate-y-2 px-4 text-center font-serif text-sm italic text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {p.caption}
            </p>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
