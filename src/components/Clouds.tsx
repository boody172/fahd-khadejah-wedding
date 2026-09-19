type CloudsProps = {
  /** 0 = calm drifting sky, 1 = fully "inside" the cloud (used during descent) */
  density?: number;
  className?: string;
};

// A single soft, painterly cloud puff built from overlapping radial highlights.
function Puff({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className="absolute rounded-[50%] blur-2xl"
      style={{
        background:
          'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 45%, rgba(255,255,255,0) 75%)',
        ...style,
      }}
    />
  );
}

export default function Clouds({ density = 0, className = '' }: CloudsProps) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* far layer — slow drift */}
      <div className="absolute inset-0 animate-[drift-slow_70s_linear_infinite]" style={{ opacity: 0.5 + density * 0.2 }}>
        <Puff style={{ top: '8%', left: '-5%', width: 320, height: 140 }} />
        <Puff style={{ top: '18%', left: '55%', width: 260, height: 110 }} />
        <Puff style={{ top: '4%', left: '80%', width: 300, height: 130 }} />
      </div>
      {/* mid layer */}
      <div className="absolute inset-0 animate-[drift-mid_45s_linear_infinite]" style={{ opacity: 0.7 + density * 0.2 }}>
        <Puff style={{ top: '30%', left: '10%', width: 420, height: 180 }} />
        <Puff style={{ top: '55%', left: '65%', width: 380, height: 160 }} />
        <Puff style={{ top: '15%', left: '35%', width: 260, height: 120 }} />
      </div>
      {/* near layer — faster drift */}
      <div className="absolute inset-0 animate-[drift-fast_28s_linear_infinite]" style={{ opacity: 0.85 + density * 0.15 }}>
        <Puff style={{ top: '65%', left: '-10%', width: 520, height: 220 }} />
        <Puff style={{ top: '75%', left: '50%', width: 460, height: 200 }} />
        <Puff style={{ top: '60%', left: '85%', width: 340, height: 160 }} />
      </div>
    </div>
  );
}
