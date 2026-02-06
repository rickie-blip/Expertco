import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe2, Lightbulb, TrendingUp, Users } from "lucide-react";

type Slide = {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
};

export default function Home() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Empowering African Businesses to Scale with Confidence.",
        subtitle:
          "We partner with leaders and teams to build repeatable sales systems—pipeline discipline, coaching, and execution built for African markets.",
        cta: "Explore Services",
        image: "/images/hero-1.jpeg",
      },
      {
        title: "From Strategy to Execution—We Build Sales Engines.",
        subtitle:
          "Sales Acceleration, Key Account Management, and Market Expansion designed for measurable growth and long-term momentum.",
        cta: "Work With Expertco",
        image: "/images/hero-2.jpeg",
      },
      {
        title: "Pan ‑ Africa Coverage. Local Insight. Measurable Impact.",
        subtitle:
          "We help teams improve win rates, grow key accounts, and expand confidently into new regions—without losing clarity or control.",
        cta: "Book a Discovery Call",
        image: "/images/hero-3.jpeg",
      },
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5500 })]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--brand-grey)]" />
        <div className="container-width relative pt-14 pb-12 md:pt-18 md:pb-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold text-[color:rgba(14,27,54,0.82)] backdrop-blur"
                data-testid="badge-hero"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--brand-red)]" />
                Sales Growth. African Focus. Global Standard.
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="mt-5"
                >
                  <h1
                    className="text-4xl md:text-6xl lg:text-7xl leading-[1.03] tracking-tight font-black"
                    data-testid="text-hero-title"
                  >
                    {slides[current].title}
                  </h1>

                  <p className="mt-5 text-base md:text-lg text-[color:rgba(14,27,54,0.70)] leading-relaxed max-w-xl" data-testid="text-hero-subtitle">
                    {slides[current].subtitle}
                  </p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <a
                      href="#services"
                      className="inline-flex items-center justify-center rounded-full bg-[var(--brand-red)] text-white font-semibold px-6 h-12 shadow-[0_18px_50px_rgba(239,68,56,0.22)] hover:opacity-95 transition"
                      data-testid="button-hero-primary"
                    >
                      {slides[current].cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>

                    <a
                      href="#about"
                      className="inline-flex items-center justify-center rounded-full border border-[color:rgba(14,27,54,0.18)] bg-white/70 text-[var(--brand-navy)] font-semibold px-6 h-12 hover:bg-white transition"
                      data-testid="button-hero-secondary"
                    >
                      Learn About Expertco
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4" data-testid="grid-hero-stats">
                {[
                  { k: "15+", v: "Years Experience" },
                  { k: "500+", v: "Projects Supported" },
                  { k: "Pan‑Africa", v: "Coverage" },
                  { k: "Execution", v: "Focused" },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white/75 border border-black/10 p-4 backdrop-blur shadow-[0_12px_30px_rgba(14,27,54,0.10)]"
                  >
                    <div className="text-2xl md:text-3xl font-black tracking-tight" data-testid={`text-stat-${idx}`}>
                      {s.k}
                    </div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[color:rgba(14,27,54,0.62)]" data-testid={`text-statlabel-${idx}`}>
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-black/10 shadow-[0_22px_70px_rgba(14,27,54,0.16)] bg-white" data-testid="card-hero-media">
                <div ref={emblaRef} className="overflow-hidden" data-testid="carousel-hero">
                  <div className="flex">
                    {slides.map((s, idx) => (
                      <div key={idx} className="relative flex-[0_0_100%] min-w-0">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="h-[360px] md:h-[470px] w-full object-cover"
                          data-testid={`img-hero-${idx}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2" data-testid="carousel-dots">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => emblaApi?.scrollTo(idx)}
                      className={
                        "h-2 rounded-full transition-all " +
                        (idx === current ? "w-10 bg-[var(--brand-red)]" : "w-2 bg-white/70 hover:bg-white")
                      }
                      data-testid={`button-dot-${idx}`}
                    />
                  ))}
                </div>

                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {["Pan‑African Coverage", "Sales Execution", "Key Accounts"].map((t, i) => (
                    <div
                      key={i}
                      className="rounded-full bg-white/80 border border-black/10 px-3 py-2 text-xs font-semibold text-[var(--brand-navy)] backdrop-blur"
                      data-testid={`chip-hero-${i}`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 text-xs text-[color:rgba(14,27,54,0.60)]" data-testid="text-hero-note">
                Images served from <span className="font-semibold">/public/images</span>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="container-width grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-black/10 shadow-[0_22px_70px_rgba(14,27,54,0.16)]">
              <img
                src="/images/about.png"
                alt="Expertco team strategy"
                className="w-full h-[360px] md:h-[470px] object-cover"
                data-testid="img-about"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              className="inline-flex items-center rounded-full bg-[var(--brand-grey)] border border-black/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[var(--brand-navy)]"
              data-testid="badge-about"
            >
              About Expertco
            </div>

            <h2 className="mt-4 text-3xl md:text-5xl leading-tight font-black" data-testid="text-about-title">
              Not just consultants. <span className="text-[var(--brand-red)]">Growth partners.</span>
            </h2>

            <p className="mt-4 text-[color:rgba(14,27,54,0.70)] leading-relaxed" data-testid="text-about-body">
              Our mission: <span className="font-semibold">Empowering African Businesses to Scale with Confidence</span>.
              We blend strategy with execution—helping teams build predictable revenue, strengthen key accounts, and expand into new markets.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                "Sales Acceleration",
                "Key Account Management",
                "Market Expansion",
                "Corporate Training",
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_12px_30px_rgba(14,27,54,0.10)]"
                  data-testid={`card-about-feature-${i}`}
                >
                  <CheckCircle2 className="h-5 w-5 text-[var(--brand-red)] mt-0.5" />
                  <div className="font-semibold">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 bg-[var(--brand-grey)]">
        <div className="container-width">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-white/70 border border-black/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[var(--brand-navy)]">
              Our Services
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-black">Comprehensive Solutions</h2>
            <p className="mt-3 text-[color:rgba(14,27,54,0.70)]">
              Built for clarity, execution, and measurable growth across African markets.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Sales Acceleration", icon: TrendingUp, desc: "Pipeline discipline, coaching, and closing systems." },
              { title: "Key Account Management", icon: Users, desc: "Protect and expand your most valuable accounts." },
              { title: "Market Expansion", icon: Globe2, desc: "Go-to-market planning and partner strategy." },
              { title: "Strategic Advisory", icon: Lightbulb, desc: "Execution roadmaps for growth decisions." },
              { title: "Business Development", icon: TrendingUp, desc: "Relationship-driven lead generation and growth." },
              { title: "Corporate Training", icon: Users, desc: "Enable teams with repeatable capability." },
            ].map((s, i) => (
              <div
                key={i}
                className={
                  "rounded-3xl border bg-white p-6 transition hover:-translate-y-1 " +
                  "shadow-[0_12px_30px_rgba(14,27,54,0.10)] hover:shadow-[0_22px_70px_rgba(14,27,54,0.16)] " +
                  (i === 0 ? "border-[color:rgba(239,68,56,0.45)]" : "border-black/10")
                }
                data-testid={`card-service-${i}`}
              >
                <div className="h-12 w-12 rounded-2xl bg-[var(--brand-grey)] flex items-center justify-center border border-black/10">
                  <s.icon className="h-6 w-6 text-[var(--brand-red)]" />
                </div>
                <h3 className="mt-4 text-xl font-black">{s.title}</h3>
                <p className="mt-2 text-sm text-[color:rgba(14,27,54,0.70)] leading-relaxed">{s.desc}</p>

                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--brand-navy)] hover:text-[var(--brand-red)] transition"
                  data-testid={`link-service-${i}`}
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="py-20 md:py-28 bg-[var(--brand-navy)] text-white">
        <div className="container-width">
          <h2 className="text-3xl md:text-5xl font-black" data-testid="text-values-title">
            Our Core Values
          </h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: "Integrity", desc: "Transparency in every engagement." },
              { title: "Innovation", desc: "Forward-thinking strategies that work." },
              { title: "Excellence", desc: "High standards. High impact." },
              { title: "People‑First", desc: "Human-centered capability and growth." },
              { title: "Partnership", desc: "We co-create success with clients." },
            ].map((v, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
                data-testid={`card-value-${i}`}
              >
                <div className="text-[var(--brand-coral)] font-black text-lg">{v.title}</div>
                <p className="mt-2 text-sm text-white/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="py-16 bg-white">
        <div className="container-width">
          <div className="rounded-3xl bg-[var(--brand-navy)] text-white p-8 md:p-12 border border-white/10 shadow-[0_22px_70px_rgba(14,27,54,0.22)]">
            <h3 className="text-2xl md:text-4xl font-black" data-testid="text-cta-title">
              Ready to accelerate growth?
            </h3>
            <p className="mt-3 text-white/75 max-w-2xl" data-testid="text-cta-body">
              Let’s map your current sales process and design the next 90 days of execution—built for your market and your team.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:info@expertco.com"
                className="rounded-full bg-[var(--brand-red)] text-white font-semibold px-6 h-12 inline-flex items-center justify-center hover:opacity-95"
                data-testid="button-cta-email"
              >
                Email Us
              </a>
              <a
                href="tel:+254700000000"
                className="rounded-full border border-white/20 bg-white/10 text-white font-semibold px-6 h-12 inline-flex items-center justify-center hover:bg-white/15"
                data-testid="button-cta-call"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}