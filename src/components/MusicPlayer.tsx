import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/theme.wav"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)]/40 bg-white/10 text-[var(--gold-light)] shadow-[0_10px_30px_-10px_rgba(212,166,86,0.5)] backdrop-blur transition hover:scale-110"
      >
        {playing ? (
          <Pause size={18} />
        ) : (
          <motion.span animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Music size={18} />
          </motion.span>
        )}
      </motion.button>
    </>
  );
}
