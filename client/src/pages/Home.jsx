import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ── tiny icon components (no extra lib needed) ──────────────────
const Icon = ({ d, size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke={color} strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const CheckIcon  = () => <Icon d="M20 6L9 17l-5-5" color="#22c55e" />;
const LockIcon   = () => <Icon d="M12 17v-2m-4-4V9a4 4 0 018 0v2M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" />;
const BrainIcon  = () => <Icon d="M12 2a7 7 0 017 7c0 2.5-1 4.5-3 6l-1 5H9l-1-5C6 13.5 5 11.5 5 9a7 7 0 017-7z" />;
const ZapIcon    = () => <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />;
const StarIcon   = () => <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
const ArrowIcon  = () => <Icon d="M5 12h14M12 5l7 7-7 7" />;

// ── Navbar ───────────────────────────────────────────────────────
const Navbar = ({ user, onLogout, onNavigate }) => (
  <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
          <BrainIcon />
        </div>
        <span className="font-bold text-lg text-gray-900">Resume<span className="text-brand-500">AI</span></span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <a href="#how" className="hover:text-brand-500 transition-colors">Kaise kaam karta hai</a>
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
              Free mein try karo
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);

// ── Hero Section ─────────────────────────────────────────────────
const Hero = ({ onNavigate }) => (
  <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
    {/* background blobs */}
    <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-50 rounded-full blur-3xl opacity-60 -z-10" />
    <div className="absolute top-40 right-1/4 w-56 h-56 bg-purple-50 rounded-full blur-3xl opacity-60 -z-10" />

    <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-up">
      <ZapIcon />
      <span>AI-Powered · Gemini 1.5 Flash · Results in 5 sec</span>
    </div>

    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-up">
      Tera Resume kitna{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">
        fit hai
      </span>
      <br />us job ke liye?
    </h1>

    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 animate-fade-up">
      Resume upload karo · Job description paste karo · AI batayega exact score,
      missing skills aur kaise improve karo — sab{' '}
      <span className="font-semibold text-gray-700">5 seconds</span> mein.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
      <button onClick={() => onNavigate('/register')}
        className="btn-primary text-base gap-2 flex items-center justify-center">
        Free mein analyze karo
        <ArrowIcon />
      </button>
      <button onClick={() => onNavigate('/login')}
        className="btn-secondary text-base">
        Pehle se account hai? Login karo
      </button>
    </div>

    <p className="mt-4 text-xs text-gray-400">
      No credit card · Free score · ₹19 mein full report
    </p>

    {/* ── Mini Preview Card ── */}
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
        <span className="text-xs font-bold text-brand-500">₹19 unlock</span>
      </div>
    </div>
  </section>
);

// ── How it works ─────────────────────────────────────────────────
const steps = [
  { n:'01', icon:<ZapIcon />, title:'Resume Upload Karo', desc:'PDF select karo — hum real-time mein text extract karte hain pdf-parse se.' },
  { n:'02', icon:<BrainIcon />, title:'JD Paste Karo', desc:'LinkedIn ya Naukri se job description copy karo aur paste karo.' },
  { n:'03', icon:<StarIcon />, title:'AI Analysis', desc:'Gemini 1.5 Flash dono compare karta hai aur score + gaps batata hai.' },
  { n:'04', icon:<LockIcon />, title:'Full Report Unlock Karo', desc:'₹19 mein missing skills, suggestions aur strengths sab milega.' },
];

const HowItWorks = () => (
  <section id="how" className="py-20 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Kaise kaam karta hai?
        </h2>
        <p className="text-gray-500">4 simple steps — 5 seconds mein result</p>
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
  { title:'Real AI Analysis',    desc:'Gemini 1.5 Flash — Google ka best model. Copy-paste result nahi, actual intelligence.' },
  { title:'Exact Match Score',   desc:'0–100% score milta hai based on JD ke against tera resume.' },
  { title:'Missing Skills',      desc:'Exactly pata chalta hai kya add karna hai resume mein job paane ke liye.' },
  { title:'Actionable Tips',     desc:'Vague advice nahi — "Add AWS certification" jaisi specific suggestions.' },
  { title:'Instant Result',      desc:'5 seconds. Koi email wait nahi, koi queue nahi.' },
  { title:'Privacy Safe',        desc:'PDF parse hone ke baad delete ho jaata hai. Tera data store nahi hota.' },
];

const Features = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Kyun choose karo?
        </h2>
        <p className="text-gray-500">Dusre tools se kya alag hai</p>
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
    desc: 'Basic score dekho',
    features: ['Match % score', 'Matched skills', 'Summary analysis', 'Unlimited scans'],
    locked: ['Missing skills', 'Improvement tips', 'Strengths analysis'],
    cta: 'Free mein shuru karo',
    highlight: false,
  },
  {
    name: 'Basic Unlock',
    price: '₹19',
    desc: 'Per report',
    features: ['Sab free wala', 'Missing skills list', 'Top 3 suggestions', 'Job fit score breakdown'],
    locked: ['Resume rewrite tips'],
    cta: 'Report unlock karo',
    highlight: true,
  },
  {
    name: 'Full Report',
    price: '₹99',
    desc: 'Per report',
    features: ['Sab basic wala', 'Full suggestions list', 'Resume rewrite tips', 'ATS optimization', 'Priority support'],
    locked: [],
    cta: 'Full report lo',
    highlight: false,
  },
];

const Pricing = ({ onNavigate }) => (
  <section id="pricing" className="py-20 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Simple Pricing</h2>
        <p className="text-gray-500">Pehle free mein try karo, tab decide karo</p>
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
                  <CheckIcon />
                  {f}
                </div>
              ))}
              {p.locked.map((f, j) => (
                <div key={j} className="flex items-center gap-2 text-sm text-gray-400">
                  <LockIcon />
                  {f}
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
  { q:'Kya ye really AI use karta hai?',     a:'Haan! Google Gemini 1.5 Flash model use hota hai — ek bahut powerful language model jo resume aur JD dono ko deeply samajhta hai.' },
  { q:'Mera PDF safe hai?',                  a:'Bilkul. PDF parse hone ke baad server se delete ho jaata hai. Hum sirf extracted text store karte hain woh bhi encrypted.' },
  { q:'Ek hi resume multiple jobs ke liye?', a:'Haan! Har naye JD ke liye naya analysis karo. ₹19 per report hai, ek resume se 10 alag jobs check kar sakte ho.' },
  { q:'Payment fail ho gayi toh?',           a:'Koi tension nahi — Razorpay handle karta hai. Failed payment pe automatically refund hota hai within 5-7 business days.' },
];

const FAQ = () => (
  <section id="faq" className="py-20 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Sawaal? Jawab yahan hain
        </h2>
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
        Aaj hi pata karo teri job ki chances
      </h2>
      <p className="text-brand-100 mb-8 text-lg">
        Free mein shuru karo — credit card ki zarurat nahi
      </p>
      <button
        onClick={() => onNavigate('/register')}
        className="bg-white text-brand-600 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-200 shadow-xl">
        Free Resume Analyze Karo →
      </button>
      <p className="mt-4 text-xs text-brand-200">
        Already 500+ students ne use kiya hai
      </p>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-gray-100 py-10 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center">
          <BrainIcon />
        </div>
        <span className="font-bold text-gray-900">Resume<span className="text-brand-500">AI</span></span>
      </div>
      <p className="text-sm text-gray-400">
        © 2025 ResumeAI · Made with ❤️ for Indian job seekers
      </p>
      <div className="flex gap-6 text-sm text-gray-500">
        <a href="#" className="hover:text-brand-500 transition-colors">Privacy</a>
        <a href="#" className="hover:text-brand-500 transition-colors">Terms</a>
        <a href="#" className="hover:text-brand-500 transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

// ── Main Home Page ────────────────────────────────────────────────
const Home = () => {
  const navigate  = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen">
      <Navbar user={user} onLogout={handleLogout} onNavigate={navigate} />
      <Hero       onNavigate={navigate} />
      <HowItWorks />
      <Features   />
      <Pricing    onNavigate={navigate} />
      <FAQ        />
      <CTABanner  onNavigate={navigate} />
      <Footer     />
    </div>
  );
};

export default Home;