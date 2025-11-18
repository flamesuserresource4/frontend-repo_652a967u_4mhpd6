import { useEffect, useMemo, useState } from 'react'
import { Menu, X, ChevronRight, Gavel, PenTool, Theater, Linkedin, Twitter, Film, Mail, Phone } from 'lucide-react'
import Spline from '@splinetool/react-spline'

function App() {
  // Simple client-side router for 4 pages
  const routes = useMemo(() => ['/', '/portfolio', '/gallery', '/contact'], [])
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState(() => {
    const p = window.location.pathname
    return routes.includes(p) ? p : '/'
  })

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to) => {
    if (to === path) return
    window.history.pushState({}, '', to)
    setPath(to)
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      <Navbar path={path} onNavigate={navigate} open={open} setOpen={setOpen} />

      {path === '/' && <Home onNavigate={navigate} />}
      {path === '/portfolio' && <Portfolio />}
      {path === '/gallery' && <Gallery />}
      {path === '/contact' && <Contact />}

      <Footer onNavigate={navigate} />
    </div>
  )
}

function Navbar({ path, onNavigate, open, setOpen }) {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ]
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div onClick={() => onNavigate('/')} className="flex items-center gap-3 cursor-pointer select-none">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-300 shadow-inner shadow-emerald-900/40 flex items-center justify-center">
              <span className="text-slate-950 font-black">DM</span>
            </div>
            <div className="leading-tight">
              <p className="font-semibold">Diego Mwesigwa</p>
              <p className="text-xs text-slate-400">Advocate • Poet • Performer</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => onNavigate(l.href)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 hover:text-emerald-300 hover:bg-slate-800/60 ${
                  path === l.href ? 'text-emerald-300' : 'text-slate-300'
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-800/60 transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/95">
          <div className="px-4 py-2 flex flex-col">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => onNavigate(l.href)}
                className={`text-left px-3 py-3 rounded-lg transition hover:bg-slate-800/70 ${
                  path === l.href ? 'text-emerald-300' : 'text-slate-300'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function Home({ onNavigate }) {
  return (
    <main>
      {/* Hero with interactive Spline cover */}
      <section className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Dark overlay + gradient sheen */}
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_60%_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)]" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[11px] text-emerald-300/90 bg-emerald-600/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-4">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Modern • Elegant • Immersive
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Diego Mwesigwa: <span className="text-emerald-300">Advocate</span>, <span className="text-emerald-300">Poet</span>, <span className="text-emerald-300">Performer</span>.
            </h1>
            <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed">
              Bridging the discipline of the law, the imagination of poetry, and the presence of the stage. A portfolio that
              harmonizes professionalism, creativity, and theatrical dynamism.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CTAButton icon={<Gavel className="h-4 w-4" />} label="View Legal Profile" onClick={() => onNavigate('/portfolio')} />
              <CTAButton icon={<PenTool className="h-4 w-4" />} label="Explore Poetry" variant="secondary" onClick={() => onNavigate('/portfolio')} />
              <CTAButton icon={<Theater className="h-4 w-4" />} label="See Acting Roles" variant="ghost" onClick={() => onNavigate('/portfolio')} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick highlights */}
      <section className="relative py-14 sm:py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_50%_at_70%_0%,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Highlight title="Legal Practice" icon={<Gavel className="h-5 w-5 text-emerald-300" />}>
            Corporate counsel, litigation strategy, and governance guidance with clarity and rigor.
          </Highlight>
          <Highlight title="Poetry" icon={<PenTool className="h-5 w-5 text-emerald-300" />}>
            Verse that interrogates justice, memory, and identity—performed and published.
          </Highlight>
          <Highlight title="Acting" icon={<Theater className="h-5 w-5 text-emerald-300" />}>
            Classical training meets modern storytelling across stage and voiceover.
          </Highlight>
        </div>
      </section>
    </main>
  )
}

function CTAButton({ label, onClick, icon, variant = 'primary' }) {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400/60'
  const styles = {
    primary: 'bg-emerald-400 text-slate-950 hover:brightness-95 active:brightness-90',
    secondary: 'bg-slate-800/80 text-emerald-300 hover:bg-slate-700/80 border border-slate-700',
    ghost: 'bg-transparent text-slate-200 hover:text-emerald-300 hover:bg-slate-800/40 border border-slate-800',
  }
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      <span>{label}</span>
      <ChevronRight className="h-4 w-4" />
    </button>
  )
}

function Highlight({ title, icon, children }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 hover:border-emerald-500/30 transition-all">
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
      <div className="flex items-center gap-3 mb-2">
        <div className="h-9 w-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">{icon}</div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{children}</p>
    </div>
  )
}

function Portfolio() {
  const tabs = [
    { key: 'legal', label: 'Legal Practice', icon: <Gavel className="h-4 w-4" /> },
    { key: 'poetry', label: 'Poetry', icon: <PenTool className="h-4 w-4" /> },
    { key: 'acting', label: 'Acting', icon: <Theater className="h-4 w-4" /> },
  ]
  const [active, setActive] = useState('legal')

  return (
    <main className="bg-gradient-to-b from-slate-950 to-slate-900">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-widest text-emerald-300/80">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">A multidisciplinary body of work</h2>
          <p className="text-slate-300 mt-3 max-w-3xl">Explore legal achievements, published and performed poetry, and a range of acting roles across stage and voice.</p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition ${
                active === t.key
                  ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                  : 'bg-slate-900/60 text-slate-200 border-slate-800 hover:border-emerald-600/40'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {active === 'legal' && <LegalPanel />}
        {active === 'poetry' && <PoetryPanel />}
        {active === 'acting' && <ActingPanel />}
      </section>
    </main>
  )
}

function PanelCard({ title, subtitle, items }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col gap-3 hover:border-emerald-500/30 transition">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
      <ul className="space-y-2 list-disc list-inside text-slate-300 text-sm leading-relaxed">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  )
}

function LegalPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PanelCard
        title="Practice Areas"
        items={['Corporate Law', 'Mergers & Acquisitions', 'Litigation & Dispute Resolution', 'Regulatory Compliance']}
      />
      <PanelCard
        title="Notable Achievements"
        items={[
          'Led successful merger of Axiom & Yarrow, $220M transaction',
          'Argued and won precedent-setting appellate case on contract interpretation',
          'Advised Fortune 500 governance overhaul with ESG alignment',
        ]}
      />
      <PanelCard
        title="Approach"
        items={['Client-first strategy', 'Clear, persuasive advocacy', 'Meticulous research', 'Measured negotiation']}
      />
    </div>
  )
}

function PoetryPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PanelCard
        title="Selected Works"
        items={[
          '“The Witness Stand” — a cycle interrogating justice and memory',
          '“Chambers” — poems on power, silence, and the letter of the law',
          '“Cross-Examination” — a performance suite for voice and strings',
        ]}
      />
      <PanelCard
        title="Themes"
        items={['Justice', 'Memory', 'Identity', 'Responsibility', 'Restoration']}
      />
      <PanelCard
        title="Read More"
        items={['Published in Journal of Modern Letters (2023)', 'Performances at The Lantern Series (NYC)', 'Forthcoming chapbook: "Decrees"']}
      />
    </div>
  )
}

function ActingPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PanelCard
        title="Featured Roles"
        items={[
          "Lead in 'Justice Delayed' (Stage)",
          'Narrator — documentary series on legal history',
          'Voiceover — national campaign for civic education',
        ]}
      />
      <PanelCard title="Training" items={["Classical theatre (RADA)", 'On-camera technique', 'Voice & speech (Fitzmaurice)']} />
      <PanelCard title="Skills" items={['Cold reading', 'Improvisation', 'Dialect work', 'Teleprompter']} />
    </div>
  )
}

function Gallery() {
  const sections = [
    { title: 'Professional (Law)', tone: 'emerald', items: 6 },
    { title: 'Artistic (Poetry)', tone: 'emerald', items: 6 },
    { title: 'Performance (Acting)', tone: 'emerald', items: 6 },
  ]

  return (
    <main className="bg-gradient-to-b from-slate-950 to-slate-900">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-10">
        {sections.map((sec, idx) => (
          <div key={idx}>
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-300/80">Gallery</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{sec.title}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {Array.from({ length: sec.items }).map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden bg-slate-800 border border-slate-800 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-slate-400">Placeholder</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

function Contact() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus(null)
    if (!form.name || !form.email || !form.message) {
      setStatus({ ok: false, msg: 'Please complete all required fields.' })
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStatus({ ok: true, msg: 'Message sent. Thank you for reaching out!' })
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 900)
  }

  return (
    <main className="bg-gradient-to-b from-slate-950 to-slate-900">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-widest text-emerald-300/80">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Let’s connect</h2>
          <p className="text-slate-300 mt-3">For legal inquiries, literary collaborations, or performance opportunities, send a message below.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={onSubmit} className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Input label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            </div>
            <Input label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
            <TextArea label="Message" required rows={6} value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
            {status && (
              <p className={`text-sm ${status.ok ? 'text-emerald-300' : 'text-amber-300'}`}>{status.msg}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition bg-emerald-400 text-slate-950 hover:brightness-95 active:brightness-90 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <span className="h-2 w-2 rounded-full bg-slate-900 animate-ping" />}
              Send Message
              <Mail className="h-4 w-4" />
            </button>
          </form>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 h-fit">
            <h3 className="font-semibold text-white mb-3">Professional Links</h3>
            <div className="space-y-2">
              <SocialLink href="#" label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
              <SocialLink href="#" label="IMDb" icon={<Film className="h-4 w-4" />} />
              <SocialLink href="#" label="Twitter / X" icon={<Twitter className="h-4 w-4" />} />
            </div>
            <div className="mt-6 space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-emerald-300" /> contact@diegomwesigwa.example</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-300" /> +256 700 000 000</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

function Input({ label, type = 'text', value, onChange, required }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-200">{label}{required && <span className="text-emerald-300"> *</span>}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/40"
        placeholder=""
      />
    </label>
  )
}

function TextArea({ label, rows = 5, value, onChange, required }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-200">{label}{required && <span className="text-emerald-300"> *</span>}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/40"
        placeholder=""
      />
    </label>
  )
}

function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-emerald-500/30 hover:bg-slate-900 transition"
      target="_blank"
      rel="noreferrer"
    >
      <span className="inline-flex items-center gap-2 text-slate-200">{icon}{label}</span>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </a>
  )
}

function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Diego Mwesigwa. All rights reserved.</p>
        <button onClick={() => onNavigate('/')} className="inline-flex items-center gap-2 text-slate-300 hover:text-emerald-300 transition">
          Back to Home <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </footer>
  )
}

export default App
