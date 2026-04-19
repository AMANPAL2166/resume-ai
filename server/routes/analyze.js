const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const { uploadResume, matchWithJD, getReport } = require('../controllers/analyzeController');

// Resume upload — multer middleware use hoga
router.post('/upload', protect, upload.single('resume'), uploadResume);

// JD se match karo
router.post('/match', protect, matchWithJD);

// Full report fetch karo
router.get('/report/:id', protect, getReport);

module.exports = router;