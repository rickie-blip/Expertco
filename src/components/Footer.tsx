import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-navy)] text-white pt-20 pb-10 border-t border-white/5" data-testid="footer">
      <div className="container-width px-6">
        {/* Newsletter Panel (Matches Screenshot: Dark Gradient + Red Outline) */}
        <div className="relative overflow-hidden rounded-3xl border border-[color:rgba(239,68,56,0.3)] bg-[#152342] p-8 md:p-12 mb-16 shadow-2xl">
          {/* Subtle glow effect */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--brand-red)]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-heading font-extrabold mb-3 text-white">Stay Ahead of the Curve</h3>
              <p className="text-white/70 text-base md:text-lg">
                Get exclusive insights, industry trends, and expert tips delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3 flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-lg px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--brand-red)] focus:ring-1 focus:ring-[var(--brand-red)] w-full sm:w-80 h-14"
              />
              <button className="bg-[var(--brand-red)] hover:bg-[#D63025] text-white font-bold px-8 py-3 rounded-lg transition-all h-14 shadow-lg shadow-red-900/20 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="text-2xl font-black tracking-tight">
              EXPERT<span className="text-[var(--brand-red)]">CO</span>
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              Transforming businesses through expert consulting and innovative solutions across Africa.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--brand-red)] transition-colors text-white">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Services</h4>
            <ul className="space-y-4 text-sm text-white/60">
              {["Sales Acceleration", "Outsourced Sales", "Key Account Management", "Market Expansion", "Digital Marketing"].map(item => (
                <li key={item}><a href="#" className="hover:text-[var(--brand-coral)] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-sm text-white/60">
              {["About Us", "Our Values", "Case Studies", "Blog & Insights", "Careers"].map(item => (
                <li key={item}><a href="#" className="hover:text-[var(--brand-coral)] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-[var(--brand-red)]" />
                <a href="mailto:faith@expertco.com" className="hover:text-white">faith@expertco.com</a>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-[var(--brand-red)]" />
                <span>+254 732 271 731</span>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[var(--brand-red)] mt-1" />
                <span>P.O Box 190 Sarit Center<br/>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; 2026 Expertco Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}