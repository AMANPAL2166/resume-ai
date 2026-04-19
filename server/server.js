const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

// ✅ CORS — Express v5 compatible
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// uploads folder auto-create
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger — debug ke liye
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/payment', require('./routes/payment'));

app.get('/', (req, res) => res.send('Resume AI API chal raha hai!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server port ${PORT} pe chal raha hai`));