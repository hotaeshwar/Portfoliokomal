import { useEffect, useRef, useState } from "react";

// ── Animated counter hook ──
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const numeric = parseInt(target.replace(/\D/g, ""));

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

// ── Single stat item ──
function StatItem({ value, label, delay, start }) {
  const suffix = value.replace(/[0-9]/g, "");
  const hasK = value.includes("K");
  const count = useCounter(value, 1800, start);

  const display = hasK
    ? count >= 1000
      ? `${Math.floor(count / 1000)}K${suffix.replace("K", "")}`
      : count
    : `${count}${suffix}`;

  return (
    <div
      className={`
        flex flex-col items-center lg:items-start
        transition-all duration-700 ease-out
        ${start ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent tabular-nums"
        style={{ fontFamily: "'Playfair Display', serif", minWidth: "80px" }}
      >
        {display}
      </span>
      <span
        className="text-white/40 text-[11px] uppercase tracking-widest mt-0.5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center overflow-hidden"
    >
      {/* ── Grain texture ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-600/5 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 pt-24 pb-16">

        {/* ── LEFT: IMAGE ── */}
        <div
          className={`
            w-full lg:w-[45%] flex-shrink-0
            transition-all duration-1000 ease-out
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}
          `}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="relative mx-auto lg:mx-0 w-[280px] sm:w-[340px] md:w-[400px] lg:w-full max-w-[480px]">
            <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 opacity-60 blur-[2px]" />
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-transparent opacity-40" />
            <img
              src="/media/hero.jpeg"
              alt="Komal Dhawan"
              className="relative rounded-2xl w-full object-cover object-top shadow-2xl"
              style={{ aspectRatio: "3/4", maxHeight: "580px" }}
            />
            <div
              className={`
                absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6
                bg-black border border-amber-500/40 rounded-xl
                px-4 py-3 shadow-xl shadow-black/60
                transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: "800ms" }}
            >
              <p className="text-amber-400 text-[10px] uppercase tracking-widest font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Motivational Speaker</p>
              <p className="text-white/60 text-[10px] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Yamunanagar · India</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: TEXT ── */}
        <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left gap-6">

          {/* Eyebrow */}
          <div
            className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <span
              className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/5 text-amber-400 text-[10px] uppercase tracking-[0.25em] px-4 py-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Kamyabi Talks by KD
            </span>
          </div>

          {/* Heading */}
          <div
            className={`transition-all duration-800 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "350ms" }}
          >
            <h1
              className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Inspiring{" "}
              <span className="block">
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Minds,
                </span>
              </span>
              <span className="block mt-1">
                Igniting{" "}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  Success.
                </span>
              </span>
            </h1>
          </div>

          {/* Divider */}
          <div
            className={`transition-all duration-700 ease-out ${visible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
            style={{ transitionDelay: "500ms", transformOrigin: "left" }}
          >
            <div className="w-16 h-[2px] bg-gradient-to-r from-amber-400 to-transparent mx-auto lg:mx-0" />
          </div>

          {/* Description */}
          <div
            className={`transition-all duration-800 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "550ms" }}
          >
            <p
              className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              I am a{" "}
              <span className="text-amber-400 font-semibold">Motivational & Inspirational Speaker</span>{" "}
              with a passion for delivering impactful sessions that transform perspectives and unlock human potential.
              Through{" "}
              <span className="text-amber-400 font-semibold">Kamyabi Talks</span>,
              I help individuals and organisations rise beyond limits and build a life of purpose.
            </p>
          </div>

          {/* ── ANIMATED STATS ROW ── */}
          <div
            className={`
              flex items-center gap-8 sm:gap-12 mt-2
              transition-all duration-700 ease-out
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
            style={{ transitionDelay: "680ms" }}
          >
            <StatItem value="500+" label="Sessions" delay={700} start={visible} />
            <StatItem value="50K+" label="Lives Impacted" delay={850} start={visible} />
            <StatItem value="10+" label="Years Experience" delay={1000} start={visible} />
          </div>

          {/* CTA */}
          <div
            className={`
              flex items-center lg:items-start gap-4 mt-2
              transition-all duration-700 ease-out
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
            style={{ transitionDelay: "800ms" }}
          >
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 text-black text-[11px] uppercase tracking-[0.2em] font-black rounded-full hover:from-amber-300 hover:to-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Book a Session
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}