const fs = require('fs');

const extractTextFromPDF = async (filePath) => {
  try {
    console.log('📖 PDF parsing:', filePath);

    if (!fs.existsSync(filePath)) {
      throw new Error('File nahi mili: ' + filePath);
    }

    const dataBuffer = fs.readFileSync(filePath);
    
    // ✅ Correct import — require directly
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(dataBuffer);

    const cleanText = data.text
      .replace(/\s+/g, ' ')
      .trim();

    console.log('✅ Extracted chars:', cleanText.length);
    return cleanText;

  } catch (error) {
    console.error('❌ PDF parse error:', error.message);
    throw new Error('PDF read nahi ho paya: ' + error.message);
  }
};

module.exports = { extractTextFromPDF };