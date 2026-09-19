import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RSVP() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState({ guests: 0, confirmed: 0 });

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('rsvps')
      .select('guest_count, attending')
      .then(({ data }) => {
        if (!data) return;
        const confirmed = data.filter((r) => r.attending);
        setCounts({
          guests: confirmed.reduce((sum, r) => sum + r.guest_count, 0),
          confirmed: confirmed.length,
        });
      });
  }, [submitted]);

  const submit = async () => {
    if (!supabase || !name || attending === null) return;
    setSubmitting(true);
    setError(null);
    const { error: err } = await supabase.from('rsvps').insert({
      name,
      guest_count: attending === 'yes' ? guestCount : 1,
      attending: attending === 'yes',
      message: message || null,
    });
    setSubmitting(false);
    if (err) {
      setError('Something went wrong — please try again.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="relative min-h-screen overflow-hidden bg-[var(--ivory)] pb-24 pt-28">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(74,58,99,0.1), transparent 60%)' }}
      />

      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.55em] text-[var(--dusk)]">Kindly Respond</p>
        <h2 className="font-display mt-4 text-5xl text-[var(--navy)] sm:text-6xl">RSVP</h2>
        <div className="gold-divider mx-auto mt-6 w-32" />
        <p className="mx-auto mt-6 max-w-md font-serif text-base italic text-[var(--plum)]/75">
          Your presence is the greatest gift. Please reply by December 1, 2026.
        </p>
      </div>

      {supabase && (
        <div className="mx-auto mt-10 max-w-md px-6">
          <div className="flex items-center justify-around rounded-2xl border border-[var(--gold)]/20 bg-white/70 px-6 py-4 text-center backdrop-blur">
            <div>
              <div className="font-display text-3xl text-[var(--gold)]">{counts.guests}</div>
              <div className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--plum)]/70">Guests</div>
            </div>
            <div className="h-10 w-px bg-[var(--gold)]/20" />
            <div>
              <div className="font-display text-3xl text-[var(--gold)]">{counts.confirmed}</div>
              <div className="font-sans text-[9px] uppercase tracking-[0.3em] text-[var(--plum)]/70">Confirmed</div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-xl px-6">
        <div className="rounded-3xl border border-[var(--gold)]/25 bg-white/85 p-8 shadow-[0_40px_80px_-30px_rgba(27,35,64,0.3)] backdrop-blur sm:p-12">
          {!supabase ? (
            <p className="text-center font-serif italic text-[var(--plum)]/70">
              RSVP is being connected — please check back shortly.
            </p>
          ) : submitted ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-white">
                <Check size={36} />
              </div>
              <h3 className="font-script mt-6 text-5xl text-[var(--navy)]">
                {attending === 'yes' ? "We can't wait!" : 'With heartfelt thanks'}
              </h3>
              <p className="mx-auto mt-4 max-w-md font-serif text-base italic leading-relaxed text-[var(--plum)]/80">
                {attending === 'yes'
                  ? `${name}, your seat is saved. See you on January 1st — your presence will make our day complete.`
                  : `Dear ${name}, thank you for taking a moment to reply. Though distance keeps you from us, your kind thoughts mean the world.`}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--dusk)]">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="mt-2 w-full rounded-xl border border-[var(--dusk)]/25 bg-white px-5 py-4 font-serif text-lg outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
                />
              </div>

              <div>
                <label className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--dusk)]">Will you attend?</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAttending('yes')}
                    className={`rounded-xl border px-5 py-4 font-sans text-sm uppercase tracking-[0.2em] transition ${attending === 'yes' ? 'border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--navy)]' : 'border-[var(--dusk)]/20 text-[var(--plum)]/60 hover:border-[var(--gold)]/50'}`}
                  >
                    Joyfully Accept
                  </button>
                  <button
                    onClick={() => setAttending('no')}
                    className={`rounded-xl border px-5 py-4 font-sans text-sm uppercase tracking-[0.2em] transition ${attending === 'no' ? 'border-[var(--dusk)] bg-[var(--dusk)]/10 text-[var(--navy)]' : 'border-[var(--dusk)]/20 text-[var(--plum)]/60 hover:border-[var(--dusk)]/50'}`}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {attending === 'yes' && (
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--dusk)]">Number of guests</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value)))}
                    className="mt-2 w-full rounded-xl border border-[var(--dusk)]/25 bg-white px-5 py-4 font-serif text-lg outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
                  />
                </div>
              )}

              <div>
                <label className="font-sans text-[10px] uppercase tracking-[0.35em] text-[var(--dusk)]">A message (optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Share your wishes for Fahd & Khadejah"
                  className="mt-2 w-full rounded-xl border border-[var(--dusk)]/25 bg-white px-5 py-4 font-serif text-base outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
                />
              </div>

              {error && <p className="text-center font-sans text-sm text-red-500">{error}</p>}

              <button
                onClick={submit}
                disabled={!name || attending === null || submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)] px-7 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-[var(--navy-deep)] shadow-[0_15px_30px_-12px_rgba(212,166,86,0.6)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <Heart size={14} /> {submitting ? 'Sending…' : 'Send RSVP'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
