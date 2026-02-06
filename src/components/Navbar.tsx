import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Values", href: "#values" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "bg-white/75 backdrop-blur-xl border-b border-black/5 shadow-sm"
          : "bg-transparent")
      }
      data-testid="nav-primary"
    >
      <div className="container-width h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3" data-testid="link-home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--brand-red)] text-white shadow-[0_14px_30px_rgba(239,68,56,0.25)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-black tracking-tight text-xl">
            EXPERT<span className="text-[var(--brand-red)]">CO</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7" data-testid="nav-links">
          {navLinks.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="text-sm font-semibold text-[color:rgba(14,27,54,0.72)] hover:text-[var(--brand-navy)] transition-colors"
              data-testid={`link-${l.name.toLowerCase()}`}
            >
              {l.name}
            </a>
          ))}

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand-red)] px-5 py-2.5 text-white font-semibold shadow-[0_14px_30px_rgba(239,68,56,0.22)] hover:opacity-95 transition"
            data-testid="button-get-started"
          >
            Get Started
          </a>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl h-11 w-11 hover:bg-[var(--brand-grey)] transition"
          onClick={() => setOpen((v) => !v)}
          data-testid="button-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white" data-testid="panel-mobile-menu">
          <div className="container-width py-4 flex flex-col gap-2">
            {navLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="rounded-xl px-3 py-3 font-semibold text-[var(--brand-navy)] hover:bg-[var(--brand-grey)]"
                onClick={() => setOpen(false)}
                data-testid={`link-mobile-${l.name.toLowerCase()}`}
              >
                {l.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 rounded-xl bg-[var(--brand-red)] text-white font-semibold px-4 py-3 text-center hover:opacity-95"
              onClick={() => setOpen(false)}
              data-testid="button-mobile-get-started"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}