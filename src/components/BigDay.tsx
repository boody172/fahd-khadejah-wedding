import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Shirt } from 'lucide-react';

const WEDDING_DATE = new Date('2027-01-01T20:00:00+03:00'); // 8:00 PM Riyadh/Dammam time
const MAPS_SHORT_LINK = 'https://maps.app.goo.gl/TpRmPQJbHpo1onq6A?g_st=ipc';
const VENUE_QUERY = encodeURIComponent('قاعة الشرقية للمناسبات، الدمام');

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function BigDay() {
  const t = useCountdown();

  return (
    <section id="big-day" className="relative overflow-hidden bg-[var(--navy-deep)] py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-1/3 left-1/2 h-[140%] w-[140%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(74,58,99,0.6),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.55em] text-[var(--gold-light)]">Chapter Two</p>
        <h2 className="font-script mt-4 text-6xl text-white sm:text-7xl">The Big Day</h2>
        <div className="gold-divider mx-auto mt-6 w-32" />
      </div>

      {/* countdown */}
      <div className="mx-auto mt-16 max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-[var(--gold)]/25 bg-white/5 p-10 backdrop-blur"
        >
          <p className="text-center font-sans text-[10px] uppercase tracking-[0.5em] text-[var(--gold-light)]">
            Until we celebrate
          </p>
          <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-6">
            {[{ v: t.d, l: 'Days' }, { v: t.h, l: 'Hours' }, { v: t.m, l: 'Minutes' }, { v: t.s, l: 'Seconds' }].map((u) => (
              <div key={u.l} className="rounded-2xl border border-white/10 bg-white/5 py-5 text-center">
                <div className="font-display text-3xl text-[var(--gold-light)] sm:text-5xl">{String(u.v).padStart(2, '0')}</div>
                <div className="mt-2 font-sans text-[9px] uppercase tracking-[0.35em] text-white/60 sm:text-[10px]">{u.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* detail cards */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 px-6 sm:grid-cols-3">
        {[
          { Icon: Calendar, k: 'Date', v: 'January 1', sub: 'Friday, 2027' },
          { Icon: Clock, k: 'Time', v: '8:00 PM', sub: 'Doors open early' },
          { Icon: Shirt, k: 'Dress Code', v: 'Formal', sub: 'Navy · Gold · Blush' },
        ].map(({ Icon, k, v, sub }, i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="rounded-2xl border border-[var(--gold)]/20 bg-white/5 p-8 text-center backdrop-blur transition hover:-translate-y-1"
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-[var(--navy-deep)] shadow-lg">
              <Icon size={22} />
            </div>
            <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.45em] text-[var(--gold-light)]">{k}</p>
            <h3 className="mt-2 font-display text-2xl text-white">{v}</h3>
            <p className="mt-1 font-sans text-xs text-white/60">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* venue + map */}
      <div className="mx-auto mt-16 max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-[var(--gold)]/20 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-10 text-left">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-[var(--navy-deep)]">
                <MapPin size={20} />
              </div>
              <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.45em] text-[var(--gold)]">Venue</p>
              <h3 className="font-script mt-2 text-5xl text-[var(--navy)]">قاعة الشرقية للمناسبات</h3>
              <p className="mt-3 font-serif text-base text-[var(--plum)]/75">Dammam · Eastern Province<br />Saudi Arabia</p>
              <a
                href={MAPS_SHORT_LINK}
                target="_blank" rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-6 py-3 font-sans text-[11px] uppercase tracking-[0.35em] text-white transition hover:bg-[var(--gold)] hover:text-[var(--navy-deep)]"
              >
                <MapPin size={14} /> Open in Maps
              </a>
            </div>
            <div className="relative min-h-[320px] bg-[var(--champagne)]">
              <iframe
                title="Venue map"
                src={`https://www.google.com/maps?q=${VENUE_QUERY}&output=embed`}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 text-center">
        <a
          href="#rsvp"
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)] px-10 py-4 font-sans text-[11px] uppercase tracking-[0.4em] text-[var(--navy-deep)] shadow-[0_20px_40px_-15px_rgba(212,166,86,0.6)] transition hover:-translate-y-0.5"
        >
          Confirm Your Presence →
        </a>
      </div>
    </section>
  );
}
