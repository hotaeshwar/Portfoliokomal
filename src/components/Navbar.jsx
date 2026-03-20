import { useState, useEffect } from "react";

const navLinks = [
  { label: "Bio", href: "#bio" },
  { label: "Seminars", href: "#seminars" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#bio");

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

  const handleNavClick = (href) => {
    setActiveHash(href);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm transition-all duration-500 ease-in-out overflow-hidden"
      style={{ height: "90px" }}
    >
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">

        {/* ── LEFT: LOGO ── */}
        <a
          href="#bio"
          onClick={(e) => { e.preventDefault(); handleNavClick("#bio"); }}
          className="group cursor-pointer flex-shrink-0 flex items-center"
          aria-label="Komal Dhawan - Home"
        >
          <img
            src="/media/komal.png"
            alt="Komal Dhawan"
            className={`
              object-contain transition-all duration-500 ease-in-out
              group-hover:scale-105
            `}
            style={{ height: "177px", width: "auto" }}
          />
        </a>

        {/* ── RIGHT: LINKS ── */}
        <div className="flex items-center gap-10">
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

      </div>
    </nav>
  );
}

function NavLink({ label, href, active, onClick }) {
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`
        relative text-[11px] uppercase tracking-[0.18em] font-black
        transition-colors duration-300 group cursor-pointer no-underline
        ${active ? "text-amber-500" : "text-black hover:text-amber-500"}
      `}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {label}
      <span
        className={`
          absolute -bottom-0.5 left-0 h-px bg-amber-500
          transition-all duration-300 ease-out
          ${active ? "w-full" : "w-0 group-hover:w-full"}
        `}
      />
    </a>
  );
}