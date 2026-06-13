const footerLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Story', href: '#story' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: 'mailto:concierge@luxor.example' }
];

export const Footer = () => (
  <footer className="bg-ink px-6 py-12 md:px-10 md:py-16">
    <div className="mx-auto flex max-w-[1600px] flex-col gap-10 border-t border-white/8 pt-10 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="text-xs uppercase tracking-[0.4em] text-white">Luxor</span>
        </div>
        <p className="max-w-md text-sm leading-7 tracking-[0.14em] text-white/52">
          A cinematic luxury marketplace for products crafted with intention, restraint, and enduring value.
        </p>
      </div>

      <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <a key={link.label} href={link.href} className="text-xs uppercase tracking-[0.26em] text-white/50 transition duration-300 hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>
    </div>

    <div className="mx-auto mt-12 flex max-w-[1600px] flex-col gap-3 text-[11px] uppercase tracking-[0.26em] text-white/32 md:flex-row md:justify-between">
      <span>© 2026 Luxor Curated Living</span>
      <span>Privacy · Terms · Concierge</span>
    </div>
  </footer>
);
