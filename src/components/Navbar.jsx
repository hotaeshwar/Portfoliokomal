import { useState, useEffect } from "react";

const navLinks = [
  { label: "Bio", href: "#bio" },
  { label: "Seminars", href: "#seminars" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#bio");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || "#bio");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setActiveHash(href);
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm transition-all duration-500 ease-in-out overflow-hidden"
        style={{ height: "90px" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-full flex items-center justify-between">

          {/* LOGO */}
          <a
            href="#bio"
            onClick={(e) => { e.preventDefault(); handleNavClick("#bio"); }}
            className="group cursor-pointer flex-shrink-0 flex items-center"
            aria-label="Komal Dhawan - Home"
          >
            <img
              src="/media/komal.png"
              alt="Komal Dhawan"
              className="object-contain transition-all duration-500 ease-in-out group-hover:scale-105"
              style={{ height: "177px", width: "auto" }}
            />
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ label, href }) => (
              <NavLink
                key={href}
                label={label}
                href={href}
                active={activeHash === href}
                onClick={() => handleNavClick(href)}
              />
            ))}
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer z-[110] flex-shrink-0"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-black transition-all duration-300 origin-center ${menuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
            <span className={`block h-0.5 bg-black transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-6 opacity-100"}`} />
            <span className={`block h-0.5 bg-black transition-all duration-300 origin-center ${menuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
          </button>

        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        className={`fixed inset-0 z-[99] flex flex-col items-center justify-center gap-10 transition-all duration-300 ease-in-out md:hidden backdrop-blur-md
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(255,255,255,0.85)" }}
      >
        {navLinks.map(({ label, href }, i) => (
          <a
            key={href}
            href={href}
            onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
            className={`text-2xl uppercase tracking-[0.25em] font-black transition-all duration-300 cursor-pointer no-underline
              ${activeHash === href ? "text-amber-500" : "text-black hover:text-amber-500"}
              ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}

function NavLink({ label, href, active, onClick }) {
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`relative text-[11px] uppercase tracking-[0.18em] font-black
        transition-colors duration-300 group cursor-pointer no-underline
        ${active ? "text-amber-500" : "text-black hover:text-amber-500"}`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-px bg-amber-500
          transition-all duration-300 ease-out
          ${active ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </a>
  );
}