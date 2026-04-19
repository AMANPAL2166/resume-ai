// ── Navbar ───────────────────────────────────────────────────────
const Navbar = ({ user, onLogout, onNavigate }) => (
  <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          AI
        </div>
        <span className="font-bold text-lg text-gray-900">Resume<span className="text-brand-500">AI</span></span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <a href="#how" className="hover:text-brand-500 transition-colors">How it works</a>
        <a href="#pricing" className="hover:text-brand-500 transition-colors">Pricing</a>
        <a href="#faq" className="hover:text-brand-500 transition-colors">FAQ</a>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <button onClick={() => onNavigate('/upload')} className="btn-primary text-sm py-2">
              Dashboard
            </button>
            <button onClick={onLogout} className="text-sm text-gray-500 hover:text-gray-700">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onNavigate('/login')} className="btn-secondary text-sm py-2">
              Login
            </button>
            <button onClick={() => onNavigate('/register')} className="btn-primary text-sm py-2">
              Try for Free
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);

// ── Hero ─────────────────────────────────────────────────────────
const Hero = ({ onNavigate }) => (
  <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
    <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-50 rounded-full blur-3xl opacity-60 -z-10" />
    <div className="absolute top-40 right-1/4 w-56 h-56 bg-purple-50 rounded-full blur-3xl opacity-60 -z-10" />

    <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
      <ZapIcon />
      <span>AI-Powered · Gemini 1.5 Flash · Results in 5 sec</span>
    </div>

    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
      How well does your resume{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">
        match
      </span>
      <br />that job?
    </h1>

    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
      Upload your resume · Paste the job description · Get exact match score,
      missing skills and how to improve — all in{' '}
      <span className="font-semibold text-gray-700">5 seconds</span>.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button onClick={() => onNavigate('/register')}
        className="btn-primary text-base gap-2 flex items-center justify-center">
        Analyze for Free
        <ArrowIcon />
      </button>
      <button onClick={() => onNavigate('/login')}
        className="btn-secondary text-base">
        Already have an account? Login
      </button>
    </div>

    <p className="mt-4 text-xs text-gray-400">
      No credit card · Free score · Full report at ₹19
    </p>

    <div className="mt-16 max-w-sm mx-auto card border border-gray-100 text-left shadow-xl shadow-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-700">Match Score</span>
        <span className="text-xs text-gray-400">Gemini AI</span>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="#e5e7eb" strokeWidth="6"/>
            <circle cx="32" cy="32" r="26" fill="none" stroke="#22c55e" strokeWidth="6"
              strokeDasharray="114 163" strokeLinecap="round"
              transform="rotate(-90 32 32)"/>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-green-600">70%</span>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Matched skills</p>
          <div className="flex flex-wrap gap-1">
            {['React','Node.js','MongoDB'].map(s=>(
              <span key={s} className="tag-green">{s}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <LockIcon />
          <span>Missing skills + Suggestions</span>
        </div>
        <span className="text-xs font-bold text-brand-500">Unlock ₹19</span>
      </div>
    </div>
  </section>
);

// ── How it works ─────────────────────────────────────────────────
const steps = [
  { n:'01', icon:<ZapIcon />, title:'Upload Your Resume', desc:'Select your PDF — we extract text in real-time using pdf-parse.' },
  { n:'02', icon:<BrainIcon />, title:'Paste Job Description', desc:'Copy the JD from LinkedIn or Naukri and paste it here.' },
  { n:'03', icon:<StarIcon />, title:'AI Analysis', desc:'Gemini 1.5 Flash compares both and gives you a score + skill gaps.' },
  { n:'04', icon:<LockIcon />, title:'Unlock Full Report', desc:'Get missing skills, suggestions and strengths for just ₹19.' },
];

const HowItWorks = () => (
  <section id="how" className="py-20 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">How does it work?</h2>
        <p className="text-gray-500">4 simple steps — results in 5 seconds</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={i} className="card group">
            <div className="w-10 h-10 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
              {s.icon}
            </div>
            <p className="text-xs font-bold text-brand-500 mb-1">{s.n}</p>
            <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Features ─────────────────────────────────────────────────────
const features = [
  { title:'Real AI Analysis', desc:'Gemini 1.5 Flash by Google. Not just keyword matching — actual intelligence that understands context.' },
  { title:'Exact Match Score', desc:'Get a 0–100% score showing how well your resume matches the specific job description.' },
  { title:'Missing Skills', desc:'Know exactly what to add to your resume to improve your chances of getting hired.' },
  { title:'Actionable Tips', desc:'No vague advice — specific suggestions like "Add AWS certification" or "Add Docker projects".' },
  { title:'Instant Results', desc:'5 seconds. No email wait, no queue, no signup required to see basic score.' },
  { title:'Privacy Safe', desc:'PDF is deleted after parsing. We only store extracted text, encrypted and secure.' },
];

const Features = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Why choose ResumeAI?</h2>
        <p className="text-gray-500">What makes us different from other tools</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="card">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0"><CheckIcon /></div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Pricing ──────────────────────────────────────────────────────
const plans = [
  {
    name: 'Free',
    price: '₹0',
    desc: 'See your basic score',
    features: ['Match % score', 'Matched skills list', 'Summary analysis', 'Unlimited scans'],
    locked: ['Missing skills', 'Improvement tips', 'Strengths analysis'],
    cta: 'Start for Free',
    highlight: false,
  },
  {
    name: 'Basic Unlock',
    price: '₹19',
    desc: 'Per report',
    features: ['Everything in Free', 'Missing skills list', 'Top 3 suggestions', 'Job fit breakdown'],
    locked: ['Resume rewrite tips'],
    cta: 'Unlock Report',
    highlight: true,
  },
  {
    name: 'Full Report',
    price: '₹99',
    desc: 'Per report',
    features: ['Everything in Basic', 'Full suggestions list', 'Resume rewrite tips', 'ATS optimization', 'Priority support'],
    locked: [],
    cta: 'Get Full Report',
    highlight: false,
  },
];

const Pricing = ({ onNavigate }) => (
  <section id="pricing" className="py-20 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Simple Pricing</h2>
        <p className="text-gray-500">Try for free, then decide</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {plans.map((p, i) => (
          <div key={i} className={`rounded-2xl border p-6 bg-white transition-all duration-300
            ${p.highlight
              ? 'border-brand-500 shadow-xl shadow-brand-500/10 scale-105'
              : 'border-gray-100 hover:border-brand-100 hover:shadow-lg'}`}>
            {p.highlight && (
              <div className="text-center mb-4">
                <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <p className="text-sm font-semibold text-gray-500 mb-1">{p.name}</p>
            <p className="text-4xl font-extrabold text-gray-900 mb-1">{p.price}</p>
            <p className="text-xs text-gray-400 mb-6">{p.desc}</p>
            <div className="space-y-2 mb-6">
              {p.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckIcon />{f}
                </div>
              ))}
              {p.locked.map((f, j) => (
                <div key={j} className="flex items-center gap-2 text-sm text-gray-400">
                  <LockIcon />{f}
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate('/register')}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200
                ${p.highlight
                  ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:scale-105'
                  : 'border border-gray-200 hover:border-brand-500 text-gray-700 hover:text-brand-500'}`}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── FAQ ───────────────────────────────────────────────────────────
const faqs = [
  { q:'Does it really use AI?', a:'Yes! We use Google Gemini 1.5 Flash — a powerful language model that deeply understands both your resume and the job description.' },
  { q:'Is my PDF safe?', a:'Absolutely. Your PDF is deleted from our servers immediately after parsing. We only store extracted text, encrypted and secure.' },
  { q:'Can I use one resume for multiple jobs?', a:'Yes! Run a new analysis for each job description. At ₹19 per report, you can check 10 different jobs from one resume.' },
  { q:'What if my payment fails?', a:'No worries — Razorpay handles all payments securely. Failed payments are automatically refunded within 5-7 business days.' },
];

const FAQ = () => (
  <section id="faq" className="py-20 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="card">
            <p className="font-semibold text-gray-900 mb-2">{f.q}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA Banner ────────────────────────────────────────────────────
const CTABanner = ({ onNavigate }) => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-500 to-purple-600 rounded-3xl p-12 text-center text-white">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        Find out your chances today
      </h2>
      <p className="text-brand-100 mb-8 text-lg">
        Start for free — no credit card needed
      </p>
      <button
        onClick={() => onNavigate('/register')}
        className="bg-white text-brand-600 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-200 shadow-xl">
        Analyze Your Resume Free →
      </button>
      <p className="mt-4 text-xs text-brand-200">
        500+ students have already used ResumeAI
      </p>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-gray-100 py-10 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center text-white font-bold text-xs">
          AI
        </div>
        <span className="font-bold text-gray-900">Resume<span className="text-brand-500">AI</span></span>
      </div>
      <p className="text-sm text-gray-400">
        © 2025 ResumeAI · Built for Indian job seekers
      </p>
      <div className="flex gap-6 text-sm text-gray-500">
        <a href="#" className="hover:text-brand-500 transition-colors">Privacy</a>
        <a href="#" className="hover:text-brand-500 transition-colors">Terms</a>
        <a href="#" className="hover:text-brand-500 transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);