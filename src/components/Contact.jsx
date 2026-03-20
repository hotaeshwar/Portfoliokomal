import { useEffect, useRef, useState } from "react";
import { User, Phone, MessageSquare, Send, CheckCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918929550001";
const WHATSAPP_MESSAGE = "Namaste Komal Ji,%0A%0AI came across your profile and I am interested in booking a motivational session. Could you please share more details?";

const contactInfo = [
  {
    label: "WhatsApp",
    value: "+91 89295 50001",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
    isWhatsApp: true,
  },
  {
    label: "YouTube",
    value: "@KamyabiTalksbyKD",
    href: "https://www.youtube.com/@KamyabiTalksbyKD",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
      </svg>
    ),
    color: "text-red-400",
    border: "hover:border-red-500/50",
  },
  {
    label: "Instagram",
    value: "@kamyabi.talksby_kd",
    href: "https://www.instagram.com/kamyabi.talksby_kd/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    color: "text-pink-400",
    border: "hover:border-pink-500/50",
  },
  {
    label: "LinkedIn",
    value: "Kamyabi Talks by KD",
    href: "https://www.linkedin.com/in/kamyabi-talks-by-kd",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "text-sky-400",
    border: "hover:border-sky-500/50",
  },
  {
    label: "Facebook",
    value: "KamyabiTalksbyKD",
    href: "https://www.facebook.com/KamyabiTalksbyKD",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
    color: "text-blue-400",
    border: "hover:border-blue-500/50",
  },
];

function useReveal(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

const fadeUp = (visible, delay = 0) => ({
  opacity: visible ? undefined : 0,
  animation: visible ? `fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` : "none",
});

const fadeLeft = (visible, delay = 0) => ({
  opacity: visible ? undefined : 0,
  animation: visible ? `fadeLeft 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` : "none",
});

const fadeRight = (visible, delay = 0) => ({
  opacity: visible ? undefined : 0,
  animation: visible ? `fadeRight 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` : "none",
});

export default function Contact() {
  const [sectionRef, visible] = useReveal(0.1);
  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!formState.name || !formState.message) return;
    const lines = [
      "Namaste Komal Ji,",
      "",
      `Name: ${formState.name}`,
      `Phone: ${formState.phone || "Not provided"}`,
      "",
      "Message:",
      formState.message,
    ];
    const msg = lines.join("%0A");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", phone: "", message: "" });
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="relative bg-black py-24 overflow-hidden"
      >
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-600/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">

          {/* ── HEADER ── */}
          <div className="text-center mb-16" style={fadeUp(visible, 0)}>
            <span
              className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/5 text-amber-400 text-[10px] uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Let's Connect
            </span>
            <h2
              className="text-white text-4xl sm:text-5xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get In{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p
              className="text-white/40 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Ready to transform your team or event? Reach out directly and let's create something impactful together.
            </p>
            <div className="w-12 h-[2px] bg-gradient-to-r from-amber-400 to-transparent mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── LEFT ── */}
            <div className="flex flex-col gap-6" style={fadeLeft(visible, 150)}>
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden border border-green-500/20 bg-gradient-to-br from-green-950/60 via-black to-black hover:border-green-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/10 p-6 sm:p-8 flex items-center gap-5 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:shadow-green-400/50 transition-all duration-300">
                  <svg viewBox="0 0 32 32" className="w-10 h-10 sm:w-12 sm:h-12" fill="white">
                    <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.627 4.56 1.72 6.48L2.667 29.333l7.04-1.693A13.277 13.277 0 0 0 16.004 29.333c7.36 0 13.329-5.973 13.329-13.333S23.364 2.667 16.004 2.667zm0 24c-2.107 0-4.08-.56-5.787-1.533l-.413-.24-4.187 1.013.987-4.08-.267-.427A10.627 10.627 0 0 1 5.334 16c0-5.893 4.773-10.667 10.667-10.667S26.667 10.107 26.667 16 21.893 26.667 16.004 26.667zm5.84-7.947c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.24-.16.213-.347.24-.667.08-.32-.16-1.333-.493-2.547-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.027-.493.133-.653.147-.133.32-.347.48-.52.16-.173.213-.293.32-.507.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.253-.613-.52-.533-.72-.547-.187-.013-.4-.013-.613-.013-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.76.32 1.36.52 1.827.667.773.24 1.467.2 2.013.12.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
                  </svg>
                </div>
                <div className="relative flex flex-col gap-1">
                  <span className="text-green-400 text-[10px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Chat on WhatsApp
                  </span>
                  <span className="text-white text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    +91 89295 50001
                  </span>
                  <span className="text-white/40 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Tap to open a conversation instantly
                  </span>
                </div>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-green-500/40 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Social links grid */}
              <div className="grid grid-cols-2 gap-3">
                {contactInfo.filter(c => !c.isWhatsApp).map(({ label, value, href, icon, color, border }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] ${border} hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    <span className={`${color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {icon}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-white/40 text-[9px] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                      <span className="text-white/70 text-xs truncate font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <span className="text-amber-400 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <div>
                  <span className="text-white/40 text-[9px] uppercase tracking-widest block" style={{ fontFamily: "'DM Sans', sans-serif" }}>Location</span>
                  <span className="text-white/70 text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Yamunanagar, Haryana · India</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: FORM ── */}
            <div style={fadeRight(visible, 250)}>
              <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-2xl pointer-events-none" />
                <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Send a Message
                </h3>
                <p className="text-white/30 text-xs mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Fill in your details and it'll open directly in WhatsApp.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <User className="w-3 h-3" /> Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all duration-300"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <Phone className="w-3 h-3" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all duration-300"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <MessageSquare className="w-3 h-3" /> Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="I'd like to book a motivational session for my team... 🎯"
                      rows={4}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formState.name || !formState.message}
                    className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-400 disabled:bg-white/10 disabled:cursor-not-allowed text-black disabled:text-white/30 font-black text-[11px] uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {submitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Opened in WhatsApp!
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        Send via WhatsApp
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ── FOOTER NOTE ── */}
          <div className="mt-16 text-center" style={fadeUp(visible, 400)}>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
            <p className="text-white/20 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              © {new Date().getFullYear()} Kamyabi Talks by KD · All Rights Reserved
            </p>
            <p className="text-amber-500/30 text-[10px] mt-1 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Inspiring Minds · Igniting Success
            </p>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}