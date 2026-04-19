const fs   = require('fs');
const path = require('path');
const Report  = require('../models/Report');
const { extractTextFromPDF }    = require('../services/pdfParser');
const { analyzeResumeWithJD }   = require('../services/gemini');

const uploadResume = async (req, res) => {
  try {
    console.log('📄 Upload request aaya');
    console.log('File:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'PDF file bhejo bhai' });
    }

    console.log('📂 File path:', req.file.path);

    const resumeText = await extractTextFromPDF(req.file.path);
    console.log('✅ Text extracted, length:', resumeText.length);

    // File delete karo
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({ message: 'PDF mein text nahi mila' });
    }

    res.json({
      success:    true,
      message:    'Resume parse ho gaya!',
      resumeText,
      charCount:  resumeText.length
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

const matchWithJD = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ message: 'Resume text aur JD dono chahiye' });
    }

    console.log('🤖 Gemini analysis shuru...');
    const aiResult = await analyzeResumeWithJD(resumeText, jobDescription);
    console.log('✅ AI result:', aiResult);

    const report = await Report.create({
      user:            req.user._id,
      resumeText,
      jobDescription,
      matchPercentage: aiResult.match_percentage,
      missingSkills:   aiResult.missing_skills,
      suggestions:     aiResult.suggestions,
      isPaid:          false
    });

    res.json({
      success:          true,
      reportId:         report._id,
      match_percentage: aiResult.match_percentage,
      matched_skills:   aiResult.matched_skills,
      summary:          aiResult.summary,
      missing_skills:   '🔒 Unlock karo ₹19 mein',
      suggestions:      '🔒 Unlock karo ₹19 mein',
      strengths:        '🔒 Unlock karo ₹19 mein',
      isPaid:           false
    });

  } catch (error) {
    console.error('❌ Match error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report nahi mili' });
    }

    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Ye teri report nahi hai' });
    }

    if (!report.isPaid) {
      return res.status(403).json({
        message:  'Pehle payment karo',
        reportId: report._id
      });
    }

    res.json({
      success:         true,
      matchPercentage: report.matchPercentage,
      missingSkills:   report.missingSkills,
      suggestions:     report.suggestions,
      isPaid:          report.isPaid
    });

  } catch (error) {
    console.error('❌ Report error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResume, matchWithJD, getReport };