import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const Upload = () => {
  const [step, setStep] = useState(1);           // 1: upload, 2: JD paste
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: PDF Upload
  const handleUpload = async () => {
    if (!file) return toast.error('Pehle PDF select karo!');
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const { data } = await api.post('/analyze/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setResumeText(data.resumeText);
      toast.success('Resume parse ho gaya! Ab JD paste karo');
      setStep(2);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload fail ho gaya');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: JD Match
  const handleMatch = async () => {
    if (!jobDescription.trim()) return toast.error('Job Description paste karo!');
    
    setLoading(true);
    try {
      const { data } = await api.post('/analyze/match', {
        resumeText,
        jobDescription
      });

      toast.success('Analysis ho gaya! Result dekho');
      // Result page pe bhejo with data
      navigate('/result', { state: { result: data } });

    } catch (error) {
      toast.error(error.response?.data?.message || 'Match fail ho gaya');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Progress bar */}
        <div style={styles.progress}>
          <div style={{ ...styles.step, background: step >= 1 ? '#6366f1' : '#e5e7eb' }}>1</div>
          <div style={styles.line} />
          <div style={{ ...styles.step, background: step >= 2 ? '#6366f1' : '#e5e7eb' }}>2</div>
        </div>

        {step === 1 && (
          <>
            <h2 style={styles.title}>Upload Your Resume</h2>
            <p style={styles.sub}>PDF format only (max 5MB)</p>

            <div
              style={styles.dropzone}
              onClick={() => document.getElementById('fileInput').click()}
            >
              {file ? (
                <p style={{ color: '#6366f1', fontWeight: 600 }}>📄 {file.name}</p>
              ) : (
                <p style={{ color: '#888' }}>Click here or drag your PDF</p>
              )}
              <input
                id="fileInput"
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <button
              style={styles.btn}
              onClick={handleUpload}
              disabled={loading || !file}
            >
              {loading ? 'Parsing...' : 'Upload & Parse →'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={styles.title}>Paste Job Description</h2>
            <p style={styles.sub}>Copy from LinkedIn or Naukri</p>

            <textarea
              style={styles.textarea}
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
            />

            <button
              style={styles.btn}
              onClick={handleMatch}
              disabled={loading || !jobDescription.trim()}
            >
              {loading ? 'AI analyzing... 🤖' : 'Match & See Score  →'}
            </button>

            <button
              style={styles.backBtn}
              onClick={() => setStep(1)}
            >
              ← Go Back
            </button>
          </>
        )}

      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' },
  card: { background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' },
  progress: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' },
  step: { width: 32, height: 32, borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 },
  line: { width: 60, height: 2, background: '#e5e7eb', margin: '0 8px' },
  title: { margin: '0 0 4px', fontSize: '22px', fontWeight: '700' },
  sub: { margin: '0 0 20px', color: '#888', fontSize: '14px' },
  dropzone: { border: '2px dashed #c7d2fe', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', marginBottom: '16px', background: '#f8f8ff' },
  textarea: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', marginBottom: '16px' },
  btn: { width: '100%', padding: '14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', cursor: 'pointer', fontWeight: '700', marginBottom: '8px' },
  backBtn: { width: '100%', padding: '10px', background: 'transparent', color: '#888', border: '1px solid #ddd', borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }
};

export default Upload;