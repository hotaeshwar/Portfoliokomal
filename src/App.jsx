import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Seminars from "./components/Seminar";
import Contact from "./components/Contact";

function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 1000);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(() => onComplete(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className={`
        fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center
        transition-opacity duration-500 ease-in-out
        ${phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`
            w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px]
            transition-all duration-1000
            ${phase === "hold" ? "scale-110 opacity-100" : "scale-90 opacity-50"}
          `}
        />
      </div>

      {/* Logo + text */}
      <div
        className={`
          relative flex flex-col items-center gap-8
          transition-all duration-700 ease-out
          ${phase === "enter" ? "opacity-0 scale-90 translate-y-4" : "opacity-100 scale-100 translate-y-0"}
          ${phase === "exit" ? "opacity-0 scale-95 -translate-y-2" : ""}
        `}
      >
        <div className="relative flex items-center justify-center">
          {/* Pulse ring 1 */}
          <div
            className={`
              absolute rounded-full border border-amber-400/20
              transition-all duration-1000
              ${phase === "hold" ? "w-[260px] h-[260px] opacity-100" : "w-[220px] h-[220px] opacity-0"}
            `}
            style={{ animation: phase === "hold" ? "ringPulse 1.8s ease-in-out infinite" : "none" }}
          />
          {/* Pulse ring 2 */}
          <div
            className={`
              absolute rounded-full border border-amber-400/10
              transition-all duration-1000
              ${phase === "hold" ? "w-[310px] h-[310px] opacity-100" : "w-[260px] h-[260px] opacity-0"}
            `}
            style={{ animation: phase === "hold" ? "ringPulse 1.8s ease-in-out infinite 0.4s" : "none" }}
          />

          {/* Logo */}
          <img
            src="/media/komal.png"
            alt="Kamyabi Talks by KD"
            className="relative w-[50vw] max-w-[220px] min-w-[140px] object-contain"
            style={{ filter: "drop-shadow(0 0 32px rgba(251,191,36,0.25))" }}
          />
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="text-white text-lg sm:text-xl font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kamyabi Talks
          </span>
          <span
            className="text-amber-400/70 text-[10px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            by Komal Dhawan
          </span>
        </div>

        {/* Loading bar */}
        <div className="flex flex-col items-center gap-2.5 w-[180px] sm:w-[220px]">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-full"
              style={{ animation: "loadBar 2.4s ease-in-out forwards", width: "0%" }}
            />
          </div>
          <span
            className="text-white/25 text-[9px] uppercase tracking-[0.25em]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Loading...
          </span>
        </div>
      </div>

      {/* Dot shimmer */}
      <div className="absolute bottom-12 flex items-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-amber-400/40"
            style={{
              animation: phase === "hold" ? "dotBounce 1.2s ease-in-out infinite" : "none",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes loadBar {
          0%   { width: 0%; }
          30%  { width: 35%; }
          60%  { width: 65%; }
          85%  { width: 88%; }
          100% { width: 100%; }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1);    opacity: 0.6; }
          50%       { transform: scale(1.08); opacity: 0.2; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0);    opacity: 0.3; }
          50%       { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    if (!splash) {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
        }
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }
  }, [splash]);

  return (
    <>
      {splash && <SplashScreen onComplete={() => setSplash(false)} />}
      <div
        className={`transition-opacity duration-500 ${splash ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Navbar />
        <main>
          <div id="bio"><Hero /></div>
          <div id="seminars"><Seminars /></div>
          <div id="contact"><Contact /></div>
        </main>
      </div>
    </>
  );
}

export default App;