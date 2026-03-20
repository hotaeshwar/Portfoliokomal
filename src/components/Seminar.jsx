import { useEffect, useRef, useState, useCallback } from "react";

const videos = [
  { id: "GLwCzhe5nFs", title: "Kamyabi Talks — Session 1" },
  { id: "SEXjLXqqPPw", title: "Kamyabi Talks — Session 2" },
  { id: "EmHWy8H0OrM", title: "Kamyabi Talks — Session 3" },
  { id: "gFvMv4I4IOE", title: "Kamyabi Talks — Session 4" },
];

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@KamyabiTalksbyKD",
    color: "hover:border-red-400 hover:text-red-400 hover:shadow-red-500/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/KamyabiTalksbyKD",
    color: "hover:border-blue-400 hover:text-blue-400 hover:shadow-blue-500/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kamyabi.talksby_kd/",
    color: "hover:border-pink-400 hover:text-pink-400 hover:shadow-pink-500/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kamyabi-talks-by-kd",
    color: "hover:border-sky-400 hover:text-sky-400 hover:shadow-sky-500/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function YTThumbnail({ videoId, alt, className }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);

  useEffect(() => {
    setSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
  }, [videoId]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setSrc(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`)}
    />
  );
}

function VideoModal({ video, isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-5xl" style={{ animation: "modalIn 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 w-10 h-10 rounded-full border border-white/10 text-white/50 hover:text-[#c9a84c] hover:border-[#c9a84c]/50 flex items-center justify-center transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black ring-1 ring-white/5">
          <div className="aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
        <p
          className="text-center text-white/30 text-[11px] tracking-[0.2em] uppercase mt-5"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {video.title}
        </p>
      </div>
      <style>{`@keyframes modalIn { from { opacity:0; transform:translateY(16px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
    </div>
  );
}

export default function Seminars() {
  const [visible, setVisible] = useState(false);
  const [revealKey, setRevealKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setRevealKey(k => k + 1);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index) => {
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (paused || modalOpen) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 300);
        return (i + 1) % videos.length;
      });
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [paused, modalOpen]);

  const handleManualNav = (index) => {
    clearInterval(timerRef.current);
    setPaused(true);
    goTo(index);
    setTimeout(() => setPaused(false), 8000);
  };

  const prev = () => handleManualNav((activeIndex - 1 + videos.length) % videos.length);
  const next = () => handleManualNav((activeIndex + 1) % videos.length);

  const openModal = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
    setPaused(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
    setTimeout(() => setPaused(false), 2000);
  };

  const activeVideo = videos[activeIndex];

  return (
    <>
      <section
        id="seminars"
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0c0b09 0%, #111008 50%, #0c0b09 100%)" }}
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Ambient glows */}
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />

        {/* Top gold rule */}
        <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #c9a84c33, transparent)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-28">

          {/* ── HEADER ── */}
          <div key={`header-${revealKey}`} className="text-center mb-16" style={{ opacity: visible ? undefined : 0, animation: visible ? "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both" : "none", animationDelay: "0ms" }}>
            <div className="flex items-center justify-center gap-4 mb-7">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
              <span
                className="text-[10px] uppercase tracking-[0.35em]"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c", letterSpacing: "0.35em" }}
              >
                Watch &amp; Learn
              </span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
            </div>

            <h2
              className="text-white leading-[1.1] mb-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              Seminars &amp;{" "}
              <em style={{ color: "#c9a84c", fontStyle: "italic", fontWeight: 400 }}>Talks</em>
            </h2>

            <p
              className="text-white/30 text-sm mt-4 tracking-widest uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.25em" }}
            >
              Kamyabi Talks by KD
            </p>
          </div>

          {/* ── CAROUSEL ── */}
          <div key={`carousel-${revealKey}`} style={{ opacity: visible ? undefined : 0, animation: visible ? "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both" : "none", animationDelay: "180ms" }}>
            <div className="relative mx-auto max-w-3xl">

              {/* Gold corner accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 pointer-events-none border-t border-l" style={{ borderColor: "#c9a84c55" }} />
              <div className="absolute -top-2 -right-2 w-6 h-6 pointer-events-none border-t border-r" style={{ borderColor: "#c9a84c55" }} />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 pointer-events-none border-b border-l" style={{ borderColor: "#c9a84c55" }} />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 pointer-events-none border-b border-r" style={{ borderColor: "#c9a84c55" }} />

              <div
                className={`relative rounded-lg overflow-hidden aspect-video shadow-2xl cursor-pointer group transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.12)" }}
                onClick={() => openModal(activeVideo)}
              >
                <YTThumbnail
                  videoId={activeVideo.id}
                  alt={activeVideo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 transition-all duration-500 group-hover:opacity-50"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.35) 100%)" }} />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="relative flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ width: 72, height: 72 }}
                  >
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: "rgba(201,168,76,0.2)", animationDuration: "2s" }}
                    />
                    <div
                      className="relative w-full h-full rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #c9a84c, #e8c96d)", boxShadow: "0 8px 32px rgba(201,168,76,0.5)" }}
                    >
                      <svg viewBox="0 0 24 24" fill="#0c0b09" className="w-7 h-7 ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-px" style={{ background: "#c9a84c" }} />
                    <p
                      className="text-white/80 text-sm tracking-wide"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
                    >
                      {activeVideo.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              {!paused && !modalOpen && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-lg">
                  <div
                    key={activeIndex}
                    className="h-full"
                    style={{
                      background: "linear-gradient(90deg, #c9a84c, #e8c96d)",
                      animation: "progress 4s linear forwards"
                    }}
                  />
                </div>
              )}

              {/* Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 sm:-translate-x-7 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: "rgba(12,11,9,0.9)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 sm:translate-x-7 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: "rgba(12,11,9,0.9)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* ── THUMBNAIL STRIP ── */}
            <div className="flex gap-3 sm:gap-4 mt-8 justify-center flex-wrap sm:flex-nowrap">
              {videos.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => handleManualNav(i)}
                  className={`
                    relative flex-shrink-0 w-[70px] sm:w-[100px] md:w-[130px] rounded-md overflow-hidden
                    transition-all duration-400 group
                    ${i === activeIndex
                      ? "scale-105 opacity-100"
                      : "opacity-40 hover:opacity-75 hover:scale-102"
                    }
                  `}
                  style={{
                    border: i === activeIndex ? "1px solid rgba(201,168,76,0.6)" : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: i === activeIndex ? "0 4px 24px rgba(201,168,76,0.2)" : "none",
                  }}
                >
                  <YTThumbnail
                    videoId={v.id}
                    alt={v.title}
                    className="w-full aspect-video object-cover"
                  />
                  {i === activeIndex && (
                    <div className="absolute inset-0" style={{ background: "rgba(201,168,76,0.12)" }} />
                  )}
                </button>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleManualNav(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 24 : 6,
                    height: 6,
                    background: i === activeIndex ? "#c9a84c" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── SOCIAL LINKS ── */}
          <div
            key={`social-${revealKey}`}
            className="mt-20"
            style={{ opacity: visible ? undefined : 0, animation: visible ? "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both" : "none", animationDelay: "360ms" }}
          >
            {/* Decorative divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2))" }} />
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(201,168,76,0.5)" }}
              >
                Follow &amp; Watch More
              </span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)" }} />
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {socialLinks.map(({ label, href, color, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-flex items-center gap-2.5
                    text-white/40
                    text-[10px] uppercase tracking-[0.18em] font-semibold
                    px-5 py-2.5 rounded-full
                    transition-all duration-300 ${color}
                    hover:-translate-y-0.5 hover:shadow-lg
                  `}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.02)",
                    letterSpacing: "0.18em",
                  }}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom gold rule */}
        <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #c9a84c22, transparent)" }} />
      </section>

      <VideoModal video={selectedVideo} isOpen={modalOpen} onClose={closeModal} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </>
  );
}