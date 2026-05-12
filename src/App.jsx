import { useState } from 'react';
import HammillLogo from './HammillLogo';
import { useReveal } from './useReveal';
import './index.css';

const PHONE     = '517-547-3800';
const EMAIL     = 'schammill1489@hotmail.com';
const ADDRESS   = '6300 U.S. Hwy 127, Addison, MI 49220';

// ─── SVG Icon set ──────────────────────────────────────────────────────────
const Icon = ({ name, size = 24, color = 'currentColor' }) => {
  const icons = {
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />,
    clipboard: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />,
    home: <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />,
    bolt: <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />,
    map: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />,
    star: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.499Z" />,
    building: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />,
    wrench: <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />,
    sun: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />,
    chevron: <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />,
    farm: <><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12 12 3l9.75 9M4.5 10.5V21h6v-4.5h3V21h6V10.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 21v-6a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 9 15v6" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {icons[name]}
    </svg>
  );
};

// ─── Data ───────────────────────────────────────────────────────────────────
const services = [
  { icon: 'home',     title: 'Residential Wiring',  desc: 'New construction, rewiring older homes, additions, and whole-home upgrades done cleanly and up to Michigan code.', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&q=80' },
  { icon: 'building', title: 'Commercial Work',      desc: 'Shops, offices, and warehouses of all sizes. We work around your schedule to keep downtime minimal.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80' },
  { icon: 'bolt',     title: 'Panel Upgrades',       desc: 'Old fuse box or undersized breaker panel? We replace it right, with the capacity your home or business actually needs.', img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=700&q=80' },
  { icon: 'wrench',   title: 'Service & Repair',     desc: "Outlets dead? Lights flickering? Breakers won't stay on? We find the real cause and fix it the first time.", img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80' },
  { icon: 'sun',      title: 'Outdoor & Lighting',   desc: 'Exterior lighting, garage sub-panels, generator hookups, and landscape circuits installed to last.', img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=700&q=80' },
  { icon: 'farm',     title: 'Agricultural Electrical', desc: 'Farm panels, grain bin wiring, barn and livestock facility electrical, irrigation pumps, and outbuildings. We know what farm work actually needs.', img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=700&q=80' },
];

const whyItems = [
  { icon: 'shield',    label: 'Licensed & Insured',         sub: 'Michigan Licensed Contractor' },
  { icon: 'clipboard', label: 'Free Estimates',             sub: 'No commitment required' },
  { icon: 'home',      label: 'Residential, Commercial & Ag', sub: 'All property types' },
  { icon: 'bolt',      label: '30+ Years Experience',       sub: 'Thousands of jobs completed' },
  { icon: 'map',       label: 'Asst. Chief, Addison FD',    sub: 'Knows what bad wiring costs' },
  { icon: 'check',     label: 'Up to Code, Every Time',     sub: 'Inspections passed, work guaranteed' },
];

const testimonials = [
  { name: 'Mark T., Addison', text: 'Steve showed up the next day, diagnosed the problem in 20 minutes, and had it fixed before lunch. Fair price and zero BS.' },
  { name: 'Linda R., Cement City', text: 'Had him wire our new garage. Clean work, cleaned up after himself, and the price was exactly what he quoted.' },
  { name: 'Dave K., Onsted', text: "We've called Steve for three different jobs over the years. Always reliable, always honest. Wouldn't call anyone else." },
];

// ─── Sticky Quote Widget ─────────────────────────────────────────────────────
function QuoteWidget() {
  const [open, setOpen]      = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="quote-widget" role="complementary" aria-label="Quick quote request">
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Slide-out panel */}
        <div className={`quote-widget-panel${open ? ' open' : ''}`} aria-hidden={!open}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.1 }}>
                Get a Free Quote
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>We'll call back within 2 hours</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close quote form"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text-muted)', display: 'flex' }}
            >
              <Icon name="x" size={20} />
            </button>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>
                <Icon name="check" size={40} color="var(--crimson)" />
              </div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16, marginBottom: 6 }}>Got it, thanks!</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Steve will call you shortly.</div>
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <div className="field-wrap">
                <label className="field-label" htmlFor="wq-name">Your Name</label>
                <input id="wq-name" className="field-input" type="text" placeholder="John Smith" required autoComplete="name" />
              </div>
              <div className="field-wrap">
                <label className="field-label" htmlFor="wq-phone">Phone Number</label>
                <input id="wq-phone" className="field-input" type="tel" placeholder="517-000-0000" required autoComplete="tel" />
              </div>
              <div className="field-wrap">
                <label className="field-label" htmlFor="wq-service">Type of Work</label>
                <select id="wq-service" className="field-input" required>
                  <option value="">Select...</option>
                  <option>Residential Wiring</option>
                  <option>Commercial Work</option>
                  <option>Agricultural / Farm</option>
                  <option>Panel Upgrade</option>
                  <option>Service and Repair</option>
                  <option>Outdoor / Lighting</option>
                  <option>Other</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 4 }}>
                Request Callback
              </button>
              <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
                Or call: <a href={`tel:${PHONE}`} style={{ color: 'var(--navy)', fontWeight: 600 }}>{PHONE}</a>
              </div>
            </form>
          )}
        </div>

        {/* Vertical tab */}
        <div
          className="quote-widget-tab"
          onClick={() => setOpen(o => !o)}
          role="button"
          tabIndex={0}
          aria-expanded={open}
          onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
        >
          Free&nbsp;Quote
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Section reveal refs
  const [whyRef,          whyVisible]          = useReveal();
  const [servicesRef,     servicesVisible]      = useReveal();
  const [servicesGridRef, servicesGridVisible]  = useReveal({ threshold: 0.05 });
  const [aboutLeftRef,    aboutLeftVisible]     = useReveal();
  const [aboutRightRef,   aboutRightVisible]    = useReveal();
  const [testimonialsRef, testimonialsVisible]  = useReveal();
  const [ctaBandRef,      ctaBandVisible]       = useReveal();
  const [contactLeftRef,  contactLeftVisible]   = useReveal();
  const [contactRightRef, contactRightVisible]  = useReveal();

  return (
    <div style={{ minHeight: '100vh' }}>
      <QuoteWidget />

      {/* ── NAV ───────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: 'var(--navy-dark)',
          borderBottom: '3px solid var(--crimson)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 40px', height: 68,
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <HammillLogo size={44} />
          <div>
            <div style={{ fontFamily: 'var(--font-head)', color: 'var(--white)', fontSize: 18, fontWeight: 700, letterSpacing: 1.5, lineHeight: 1.1 }}>
              HAMMILL ELECTRIC
            </div>
            <div style={{ color: 'var(--gold)', fontSize: 10, fontWeight: 700, letterSpacing: 3 }}>
              LLC • ADDISON, MI
            </div>
          </div>
        </a>

        <div className="nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Services', 'About', 'Contact'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 500, fontSize: 14, letterSpacing: 0.5, transition: 'color 150ms' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >
              {link}
            </a>
          ))}
          <a href={`tel:${PHONE}`} className="btn btn-primary" style={{ fontSize: 14, padding: '10px 20px', minHeight: 40 }}>
            <Icon name="phone" size={16} color="var(--navy-dark)" />
            {PHONE}
          </a>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div id="top" style={{ position: 'relative', paddingTop: 68 }}>
        {/* Hero background — absolute, scoped to this section */}
        <img
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1800&q=80"
          alt=""
          aria-hidden="true"
          width={1800} height={1200}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(110deg, rgba(15,26,61,0.95) 0%, rgba(26,42,94,0.80) 55%, rgba(0,0,0,0.55) 100%)',
        }} />
        {/* Crimson accent stripe */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 6, bottom: 0,
          background: 'var(--crimson)', zIndex: 2,
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative', zIndex: 3,
          maxWidth: 760, margin: '0 auto',
          padding: '52px 40px 64px',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 36, alignItems: 'center', flexWrap: 'wrap' }}>
            <HammillLogo size={100} />
            <div>
              <div style={{ fontFamily: 'var(--font-head)', color: 'var(--white)', fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 400, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.8 }}>
                Licensed Electrical Contractor
              </div>
              <div style={{ fontFamily: 'var(--font-head)', color: 'var(--gold)', fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginTop: 4 }}>
                Addison, Michigan
              </div>
            </div>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(44px, 7vw, 80px)',
            fontWeight: 700,
            lineHeight: 1.0,
            color: 'var(--white)',
            marginBottom: 20,
            letterSpacing: 0.5,
          }}>
            Reliable Electrical<br />
            <span style={{ color: 'var(--gold)' }}>Done Right.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2.2vw, 19px)',
            color: '#cbd5e1',
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 560,
          }}>
            Residential, commercial, and agricultural electrical serving Lenawee County and Southern Michigan for over 30 years.
            Licensed, insured, and priced honestly from the start.
          </p>

          <div className="hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-primary btn-lg">
              Get a Free Estimate
              <Icon name="chevron" size={18} color="var(--navy-dark)" />
            </a>
            <a href={`tel:${PHONE}`} className="btn btn-outline-white btn-lg">
              <Icon name="phone" size={18} />
              {PHONE}
            </a>
          </div>

          {/* Trust bar */}
          <div
            className="trust-bar"
            style={{
              display: 'flex', gap: 32, marginTop: 56, flexWrap: 'wrap',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              paddingTop: 28,
            }}
          >
            {['Licensed', 'Fully Insured', 'Free Estimates', '30+ Years'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon name="check" size={14} color="var(--white)" />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: 14 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY HAMMILL ────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '64px 40px' }} aria-labelledby="why-heading">
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div ref={whyRef} className={`reveal${whyVisible ? ' visible' : ''}`}>
          <span className="label-tag">Why Choose Us</span>
          <h2 id="why-heading" className="section-heading section-heading--light" style={{ marginBottom: 12 }}>
            The Hammill Difference
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 540, margin: '0 auto 40px' }}>
            You're not calling a dispatch center. You're calling Steve.
          </p>
          </div>
          <div
            className="why-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}
          >
            {whyItems.map((item, i) => (
              <div
                key={item.label}
                className={`reveal reveal-delay-${i + 1}${whyVisible ? ' visible' : ''}`}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 28px',
                  textAlign: 'left',
                  transition: 'background 200ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,32,32,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 'var(--radius-sm)',
                  background: 'rgba(196,32,32,0.12)',
                  border: '1px solid rgba(196,32,32,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <Icon name={item.icon} size={24} color="var(--crimson)" />
                </div>
                <div style={{ fontFamily: 'var(--font-head)', color: 'var(--white)', fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
                  {item.label}
                </div>
                <div style={{ color: '#64748b', fontSize: 14 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────── */}
      <section id="services" style={{ padding: '64px 40px', background: 'var(--surface)' }} aria-labelledby="services-heading">
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div ref={servicesRef} className={`reveal${servicesVisible ? ' visible' : ''}`} style={{ maxWidth: 600, marginBottom: 40 }}>
            <span className="label-tag">What We Do</span>
            <div className="gold-bar" />
            <h2 id="services-heading" className="section-heading">
              Our Services
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.7 }}>
              From a single outlet to a full commercial buildout, we handle it all.
            </p>
          </div>

          <div
            ref={servicesGridRef}
            className="services-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {services.map((svc, i) => (
              <article
                key={svc.title}
                className={`reveal reveal-delay-${i + 1}${servicesGridVisible ? ' visible' : ''}`}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--border)',
                  transition: 'transform 200ms, box-shadow 200ms',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.13)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={svc.img}
                    alt={svc.title}
                    width={700} height={220}
                    loading="lazy"
                    style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                  />
                  {/* Crimson top bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--crimson)' }} />
                  {/* Icon badge */}
                  <div style={{
                    position: 'absolute', bottom: -20, left: 24,
                    width: 44, height: 44, borderRadius: 'var(--radius-sm)',
                    background: 'var(--navy)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  }}>
                    <Icon name={svc.icon} size={22} color="var(--crimson)" />
                  </div>
                </div>
                <div style={{ padding: '32px 24px 28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', fontSize: 20, fontWeight: 600, marginBottom: 10, letterSpacing: 0.3 }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 15 }}>
                    {svc.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section id="about" style={{ background: 'var(--white)', padding: '64px 40px' }} aria-labelledby="about-heading">
        <div
          className="about-grid"
          style={{ maxWidth: 1060, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}
        >
          <div ref={aboutLeftRef} className={`reveal-left${aboutLeftVisible ? ' visible' : ''}`}>
            <span className="label-tag">About</span>
            <div className="gold-bar" />
            <h2 id="about-heading" className="section-heading">
              Steve Hammill,<br />Owner & Contractor
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
              I've been doing electrical work in the Addison area for decades. I'm not a big
              company with a call center. When you call, you get me. When I show up, I do the work.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
              I'm also Assistant Chief with the Addison Fire Department. I've seen firsthand what
              happens when electrical work is done wrong. That's not something I take lightly
              on any job, big or small.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.8, marginBottom: 36 }}>
              Clean work, honest pricing, and no mess left behind. No surprises on the bill either.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none' }}>
              {[
                '30+ years in residential, commercial & agricultural electrical',
                'Michigan Licensed Electrical Contractor',
                'Assistant Chief, Addison Fire Department',
                'Fully insured on every job, every time',
                'Serving Addison and surrounding communities',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    background: 'var(--crimson-pale)', border: '2px solid var(--crimson)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name="check" size={13} color="var(--crimson)" />
                  </div>
                  <span style={{ color: 'var(--text)', fontWeight: 500, fontSize: 15 }}>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 36, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href={`tel:${PHONE}`} className="btn btn-primary btn-lg">
                <Icon name="phone" size={18} color="var(--navy-dark)" />
                {PHONE}
              </a>
              <a href="#contact" className="btn btn-outline-navy btn-lg">
                Get an Estimate
              </a>
            </div>
          </div>

          <div ref={aboutRightRef} className={`about-img-col reveal-right${aboutRightVisible ? ' visible' : ''}`} style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: -20, left: -20, right: 20, bottom: -20,
              border: '3px solid var(--crimson)', borderRadius: 'var(--radius-lg)',
              zIndex: 0,
            }} />
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80"
              alt="Professional electrician at work"
              width={700} height={500}
              loading="lazy"
              style={{ width: '100%', height: 460, objectFit: 'cover', borderRadius: 'var(--radius-lg)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-lg)' }}
            />
            <div style={{
              position: 'absolute', bottom: 28, right: -8, zIndex: 2,
              background: 'var(--navy-dark)', borderRadius: 'var(--radius-md)',
              padding: '18px 24px', boxShadow: 'var(--shadow-lg)',
              border: '2px solid var(--gold)',
            }}>
              <div style={{ fontFamily: 'var(--font-head)', color: 'var(--gold)', fontSize: 40, fontWeight: 700, lineHeight: 1 }}>30+</div>
              <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, marginTop: 4, letterSpacing: 1 }}>YEARS EXP.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section style={{ background: 'var(--surface)', padding: '64px 40px' }} aria-labelledby="testimonials-heading">
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div ref={testimonialsRef} className={`reveal${testimonialsVisible ? ' visible' : ''}`}>
          <span className="label-tag">What People Say</span>
          <h2 id="testimonials-heading" className="section-heading" style={{ marginBottom: 36 }}>
            Straight From the Customers
          </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <blockquote
                key={t.name}
                className={`reveal reveal-delay-${i + 1}${testimonialsVisible ? ' visible' : ''}`}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderTop: '4px solid var(--crimson)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 28px',
                  textAlign: 'left',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(s => (
                    <Icon key={s} name="star" size={18} color="var(--gold)" />
                  ))}
                </div>
                <p style={{ color: 'var(--text)', lineHeight: 1.75, fontSize: 15, marginBottom: 20, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <footer style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14 }}>
                  — {t.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--navy)',
          borderTop: '4px solid var(--crimson)', borderBottom: '4px solid var(--crimson)',
          padding: '60px 40px',
          textAlign: 'center',
        }}
        aria-label="Call to action"
      >
        <div ref={ctaBandRef} className={`reveal${ctaBandVisible ? ' visible' : ''}`} style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-head)', color: 'var(--white)',
            fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, marginBottom: 14, lineHeight: 1.1,
          }}>
            Need an Electrician?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}>
            Free estimates. No pressure. Real pricing before any work starts.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`tel:${PHONE}`} className="btn btn-primary btn-lg">
              <Icon name="phone" size={20} color="var(--navy-dark)" />
              Call {PHONE}
            </a>
            <a href="#contact" className="btn btn-outline-white btn-lg">
              Send a Message
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ───────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '64px 40px', background: 'var(--white)' }} aria-labelledby="contact-heading">
        <div style={{ maxWidth: 1060, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'start' }}>

          {/* Left col — info */}
          <div ref={contactLeftRef} className={`reveal-left${contactLeftVisible ? ' visible' : ''}`}>
            <span className="label-tag">Get In Touch</span>
            <div className="gold-bar" />
            <h2 id="contact-heading" className="section-heading" style={{ marginBottom: 20 }}>
              Request a Free Estimate
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.75, marginBottom: 40 }}>
              Fill out the form and Steve will get back to you the same day. Or just call.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { icon: 'phone', label: 'Phone',   val: PHONE,   href: `tel:${PHONE}` },
                { icon: 'map',   label: 'Address', val: ADDRESS, href: '#' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                    background: 'var(--gold-pale)', border: '1px solid var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={item.icon} size={22} color="var(--navy)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>
                      {item.label}
                    </div>
                    <a href={item.href} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 15, lineHeight: 1.5 }}>
                      {item.val}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 40, padding: '20px 24px',
              background: 'var(--gold-pale)', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--crimson)', display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <Icon name="bolt" size={22} color="var(--navy)" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14, marginBottom: 3 }}>Fast Response</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>
                  Most requests get a callback the same day. For urgent jobs, call directly.
                </div>
              </div>
            </div>
          </div>

          {/* Right col — form */}
          <div ref={contactRightRef} className={`reveal-right${contactRightVisible ? ' visible' : ''}`} style={{
            background: 'var(--white)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)',
            padding: 'clamp(28px, 4vw, 48px)',
          }}>
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', background: 'var(--gold-pale)',
                  border: '3px solid var(--crimson)', margin: '0 auto 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="check" size={32} color="var(--navy)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', fontSize: 28, fontWeight: 700, marginBottom: 10 }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7 }}>
                  Steve will reach out soon. In the meantime, feel free to call directly at{' '}
                  <a href={`tel:${PHONE}`} style={{ color: 'var(--navy)', fontWeight: 700 }}>{PHONE}</a>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setFormSubmitted(true); }}
                noValidate
                aria-label="Estimate request form"
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div className="field-wrap">
                    <label className="field-label" htmlFor="cf-name">Your Name <span aria-hidden="true" style={{ color: 'var(--crimson)' }}>*</span></label>
                    <input id="cf-name" className="field-input" type="text" placeholder="John Smith" required autoComplete="name" />
                  </div>
                  <div className="field-wrap">
                    <label className="field-label" htmlFor="cf-phone">Phone Number <span aria-hidden="true" style={{ color: 'var(--crimson)' }}>*</span></label>
                    <input id="cf-phone" className="field-input" type="tel" placeholder="517-000-0000" required autoComplete="tel" />
                  </div>
                </div>

                <div className="field-wrap" style={{ marginBottom: 20 }}>
                  <label className="field-label" htmlFor="cf-email">Email Address</label>
                  <input id="cf-email" className="field-input" type="email" placeholder="you@example.com" autoComplete="email" />
                </div>

                <div className="field-wrap" style={{ marginBottom: 20 }}>
                  <label className="field-label" htmlFor="cf-service">Type of Work <span aria-hidden="true" style={{ color: 'var(--crimson)' }}>*</span></label>
                  <select id="cf-service" className="field-input" required>
                    <option value="">Select a service...</option>
                    <option>Residential Wiring</option>
                    <option>Commercial Work</option>
                    <option>Agricultural / Farm</option>
                    <option>Panel Upgrade</option>
                    <option>Service and Repair</option>
                    <option>Outdoor / Lighting</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="field-wrap" style={{ marginBottom: 28 }}>
                  <label className="field-label" htmlFor="cf-message">Tell us about your project</label>
                  <textarea id="cf-message" className="field-input" placeholder="What needs to be done? Any details help..." />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  Send My Request
                  <Icon name="chevron" size={18} color="var(--navy-dark)" />
                </button>
                <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', marginTop: 14 }}>
                  We respond the same day, usually faster.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer style={{ background: 'var(--navy-dark)', borderTop: '4px solid var(--crimson)', padding: '52px 40px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="footer-cols" style={{ display: 'flex', justifyContent: 'space-between', gap: 48, marginBottom: 48, flexWrap: 'wrap' }}>
            {/* Brand */}
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <HammillLogo size={64} />
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', color: 'var(--white)', fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>HAMMILL ELECTRIC</div>
                  <div style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 700, letterSpacing: 3 }}>LLC</div>
                </div>
              </div>
              <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7 }}>
                Licensed and insured electrical contractor serving Addison, Michigan and the surrounding communities.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <div style={{ fontFamily: 'var(--font-head)', color: 'var(--white)', fontSize: 14, fontWeight: 600, letterSpacing: 2, marginBottom: 16, textTransform: 'uppercase' }}>Services</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Residential Wiring', 'Commercial Work', 'Agricultural / Farm', 'Panel Upgrades', 'Service & Repair', 'Outdoor & Lighting'].map(s => (
                  <li key={s}><a href="#services" style={{ color: '#475569', textDecoration: 'none', fontSize: 14, transition: 'color 150ms' }} onMouseEnter={e => e.target.style.color = 'var(--gold)'} onMouseLeave={e => e.target.style.color = '#475569'}>{s}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontFamily: 'var(--font-head)', color: 'var(--white)', fontSize: 14, fontWeight: 600, letterSpacing: 2, marginBottom: 16, textTransform: 'uppercase' }}>Contact</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`tel:${PHONE}`} style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 700, fontSize: 18, fontFamily: 'var(--font-head)', letterSpacing: 1 }}>{PHONE}</a>
                <a href={`mailto:${EMAIL}`} style={{ color: '#475569', textDecoration: 'none', fontSize: 14 }}>{EMAIL}</a>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.5 }}>{ADDRESS}</div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ color: '#334155', fontSize: 13 }}>
              &copy; {new Date().getFullYear()} Hammill Electric LLC. All rights reserved.
            </div>
            <div style={{ color: '#334155', fontSize: 13 }}>
              Licensed Electrical Contractor &middot; Addison, MI 49220
            </div>
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY BAR ──────────────────────────────────────────── */}
      <div className="mobile-cta-bar" role="complementary" aria-label="Quick contact">
        <a href={`tel:${PHONE}`} className="btn btn-primary" style={{ flex: 1, fontSize: 15, justifyContent: 'center' }}>
          <Icon name="phone" size={18} color="var(--navy-dark)" />
          Call Now
        </a>
        <a href="#contact" className="btn btn-outline-white" style={{ flex: 1, fontSize: 15, justifyContent: 'center' }}>
          Free Estimate
        </a>
      </div>

    </div>
  );
}
