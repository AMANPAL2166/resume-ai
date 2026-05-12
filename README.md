cat > /mnt/user-data/outputs/README.md << 'EOF'
<div align="center">

<img src="https://img.shields.io/badge/ResumeAI-AI%20Resume%20Analyzer-6366f1?style=for-the-badge&logo=artificial-intelligence&logoColor=white" alt="ResumeAI" />

# ResumeAI — AI-Powered Resume Analyzer

**Upload your resume · Paste any job description · Get exact match score in 5 seconds**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-resume--ai--bice--beta.vercel.app-6366f1?style=flat-square&logo=vercel)](https://resume-ai-bice-beta.vercel.app)
[![Made with React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Gemini AI](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-02042B?style=flat-square&logo=razorpay)](https://razorpay.com)

<img src="https://img.shields.io/badge/Status-Production%20Live-22c55e?style=flat-square" />
<img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" />

</div>

---

## 🚀 What is ResumeAI?

ResumeAI is a full-stack SaaS product that analyzes your resume against any job description using Google Gemini AI. It gives you an exact match score, missing skills, and actionable improvement tips — all in under 5 seconds.

> Built from scratch in one night. Real payments. Real AI. Real product.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Analysis** | Google Gemini AI compares resume vs job description |
| 📊 **Match Score** | Get a 0–100% compatibility score instantly |
| ❌ **Missing Skills** | Know exactly what skills to add |
| 💡 **Suggestions** | Actionable tips to improve your resume |
| 🔒 **Lock / Unlock** | Free basic score · ₹19 for full report |
| 💳 **Real Payments** | Razorpay integration — test & live modes |
| 🔐 **Auth System** | JWT-based secure login & registration |
| 📄 **PDF Parsing** | Real-time PDF text extraction via pdf-parse |

---

## 🖥️ Tech Stack

### Frontend
```
React 19          — UI framework
Tailwind CSS      — Styling
React Router DOM  — Navigation
Axios             — API calls
React Hot Toast   — Notifications
```

### Backend
```
Node.js + Express — Server
MongoDB + Mongoose — Database
JWT               — Authentication
Multer            — File uploads
pdf-parse         — PDF text extraction
bcryptjs          — Password hashing
express-rate-limit — API protection
```

### AI & Payments
```
Google Gemini AI  — Resume analysis engine
Razorpay          — Payment processing
```

### Deployment
```
Vercel            — Frontend hosting
Render            — Backend hosting
MongoDB Atlas     — Cloud database
```

---

## 📸 Screenshots

### Home Page
```
AI-Powered · Gemini 1.5 Flash · Results in 5 sec

"How well does your resume match that job?"
```

### Result Page
- ✅ Match Score (circular progress)
- ✅ Matched Skills (green tags)
- 🔒 Missing Skills + Suggestions (locked — unlock at ₹19)
- 💳 Razorpay payment modal

---

## 🔁 User Flow

```
Register / Login
      ↓
Upload Resume (PDF)
      ↓
pdf-parse extracts text
      ↓
Paste Job Description
      ↓
Gemini AI analyzes both
      ↓
Score + Matched Skills shown FREE
      ↓
Pay ₹19 → Missing Skills + Suggestions unlocked
      ↓
Razorpay verifies → DB updated → Report unlocked
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Gemini API key — [Get here](https://aistudio.google.com/apikey)
- Razorpay account — [Sign up](https://razorpay.com)

### 1. Clone the repo

```bash
git clone https://github.com/AMANPAL2166/resume-ai.git
cd resume-ai
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/resumeai
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=rzp_test_xxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLIENT_URL=http://localhost:3000
```

```bash
npm start
```

### 3. Frontend setup

```bash
cd client
npm install
```

Create `client/src/.env`:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_RAZORPAY_KEY=rzp_test_xxxxxx
```

```bash
npm start
```

### 4. Open in browser

```
http://localhost:3000
```

---

## 📡 API Endpoints

### Auth
```
POST /api/auth/register    — Create account
POST /api/auth/login       — Login
GET  /api/auth/me          — Get current user (protected)
```

### Analysis
```
POST /api/analyze/upload   — Upload PDF resume
POST /api/analyze/match    — Match resume with JD via AI
GET  /api/analyze/report/:id — Fetch full report (paid only)
```

### Payment
```
POST /api/payment/create-order — Create Razorpay order
POST /api/payment/verify       — Verify payment + unlock report
```

---

## 💰 Monetization

| Plan | Price | Features |
|------|-------|----------|
| Free | ₹0 | Match score + Matched skills + Summary |
| Basic Unlock | ₹19 | + Missing skills + Top suggestions |
| Job-Specific | ₹49 | + Full analysis + Rewrite tips |
| Full Report | ₹99 | + ATS optimization + Priority support |

---

## 🚀 Deployment

### Frontend → Vercel
```bash
# Push to GitHub → Vercel auto-deploys
# Set env vars in Vercel dashboard:
REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_RAZORPAY_KEY=rzp_live_xxxxxx
```

### Backend → Render
```bash
# Root Directory: server
# Build Command: npm install
# Start Command: node server.js
# Add all env vars in Render dashboard
```

---

## 🛡️ Security Features

- JWT authentication with 7-day expiry
- bcrypt password hashing (salt rounds: 10)
- Rate limiting — 5 requests per 15 min on analyze routes
- CORS configured for specific origins only
- PDF deleted from server after parsing
- Razorpay signature verification on every payment

---

## 📁 Project Structure

```
resume-ai/
├── client/                  # React Frontend
│   └── src/
│       ├── pages/           # Home, Login, Register, Upload, Result
│       ├── components/      # Reusable UI components
│       ├── context/         # AuthContext
│       ├── services/        # api.js
│       └── config/          # constants.js
│
├── server/                  # Node.js Backend
│   ├── controllers/         # authController, analyzeController, paymentController
│   ├── middleware/          # authMiddleware, upload (multer)
│   ├── models/              # User, Report, Payment
│   ├── routes/              # auth, analyze, payment
│   ├── services/            # gemini.js, pdfParser.js, razorpay.js
│   └── server.js            # Entry point
│
└── .gitignore
```

---

## 🧠 AI Engine

The core analysis happens in `server/services/gemini.js`:

1. Receives extracted resume text + job description
2. Sends structured prompt to Google Gemini API
3. Returns JSON with match score, skills, and suggestions
4. Response is stored in MongoDB with `isPaid: false`
5. Full data unlocked only after Razorpay payment verified

---

## 🤝 Contributing

PRs welcome! For major changes, open an issue first.

```bash
git checkout -b feature/your-feature
git commit -m "Add: your feature"
git push origin feature/your-feature
```

---

## 📄 License

MIT © [Aman Pal](https://github.com/AMANPAL2166)

---

<div align="center">

**Built with ❤️ for Indian job seekers**

⭐ Star this repo if you found it useful!

[![GitHub stars](https://img.shields.io/github/stars/AMANPAL2166/resume-ai?style=social)](https://github.com/AMANPAL2166/resume-ai)

</div>
EOF
echo "README created!"
