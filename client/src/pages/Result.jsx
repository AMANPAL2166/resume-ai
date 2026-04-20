import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;
  const [isPaid, setIsPaid] = useState(false);
  const [fullData, setFullData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  if (!result) {
    navigate('/upload');
    return null;
  }

  const score = result.match_percentage;

  // Score color decide karo
  const getScoreColor = (s) => {
    if (s >= 75) return '#22c55e';   // green
    if (s >= 50) return '#f59e0b';   // yellow
    return '#ef4444';                 // red
  };

  const getScoreLabel = (s) => {
    if (s >= 75) return 'Strong Match! 🔥';
    if (s >= 50) return 'Average Match 😐';
    return 'Weak Match 😬';
  };

  // Razorpay payment trigger
  const handlePayment = async (amount) => {
    setLoading(true);
    try {
      console.log('💳 Payment start:', amount);
  
      // Step 1: Backend se order lo
      const { data: order } = await api.post('/payment/create-order', {
        reportId: result.reportId,
        amount
      });
  
      console.log('✅ Order mila:', order.orderId);
  
      // Step 2: Razorpay checkout open karo
      const options = {
        key:         order.keyId,
        amount:      order.amount,
        currency:    order.currency,
        name:        'ResumeAI',
        description: `Resume Report Unlock - ₹${amount}`,
        image:       '/logo.svg',
        order_id:    order.orderId,
  
        handler: async (response) => {
          console.log('✅ Payment done:', response);
          try {
            // Step 3: Backend se verify karo
            const { data: verified } = await api.post('/payment/verify', {
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              reportId:            result.reportId
            });
  
            console.log('🎉 Verified:', verified);
            setFullData(verified.data);
            setIsPaid(true);
            toast.success('Payment successful! Your full has report unlocked! 🎉');
  
          } catch (err) {
            console.error('Verify error:', err);
            toast.error('Payment has not verified. Support se contact karo.');
          }
        },
  
        prefill: {
          name:    user?.name  || '',
          email:   user?.email || '',
          contact: ''
        },
  
        notes: {
          reportId: result.reportId
        },
  
        theme: {
          color: '#6366f1'
        },
  
        modal: {
          ondismiss: () => {
            console.log('Modal closed');
            setLoading(false);
          }
        }
      };
  
      const rzp = new window.Razorpay(options);
  
      rzp.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
        toast.error(`Payment fail: ${response.error.description}`);
        setLoading(false);
      });
  
      rzp.open();
  
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment has not started.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      {/* Score Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Your Resume</h2>

        {/* Circular Score */}
        <div style={styles.scoreCircle}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="65" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
            <circle
              cx="80" cy="80" r="65"
              fill="none"
              stroke={getScoreColor(score)}
              strokeWidth="12"
              strokeDasharray={`${(score / 100) * 408} 408`}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
          </svg>
          <div style={styles.scoreText}>
            <span style={{ fontSize: 36, fontWeight: 800, color: getScoreColor(score) }}>
              {score}%
            </span>
            <span style={{ fontSize: 12, color: '#888' }}>Match</span>
          </div>
        </div>

        <p style={{ ...styles.label, color: getScoreColor(score) }}>
          {getScoreLabel(score)}
        </p>

        {/* Summary */}
        <div style={styles.summaryBox}>
          <p style={styles.summaryText}>{result.summary}</p>
        </div>

        {/* Matched Skills — Free */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>✅ Matched Skills</h3>
          <div style={styles.tagRow}>
            {result.matched_skills?.map((skill, i) => (
              <span key={i} style={{ ...styles.tag, background: '#dcfce7', color: '#166534' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Locked Section */}
        {!isPaid ? (
          <div style={styles.lockedBox}>
            <div style={styles.blur}>
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>❌ Missing Skills</h3>
                <div style={styles.tagRow}>
                  {['Docker', 'AWS', 'Kubernetes', 'CI/CD'].map((s, i) => (
                    <span key={i} style={{ ...styles.tag, background: '#fee2e2', color: '#991b1b' }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>💡 Suggestions</h3>
                {['Add cloud projects to resume', 'Get AWS certification', 'Learn Docker basics'].map((s, i) => (
                  <p key={i} style={styles.suggestionItem}>• {s}</p>
                ))}
              </div>
            </div>

            {/* Unlock Options */}
            <div style={styles.unlockOverlay}>
              <p style={styles.lockIcon}>🔒</p>
              <p style={styles.lockTitle}>Unlock Full Report</p>
              <p style={styles.lockSub}>Missing skills, suggestions aur strengths dekho</p>

              <div style={styles.planRow}>
                <button
                  style={styles.planBtn}
                  onClick={() => handlePayment(19)}
                  disabled={loading}
                >
                  <span style={styles.planPrice}>₹19</span>
                  <span style={styles.planName}>Basic Unlock</span>
                  <span style={styles.planDesc}>Missing skills + suggestions</span>
                </button>

                <button
                  style={{ ...styles.planBtn, border: '2px solid #6366f1' }}
                  onClick={() => handlePayment(49)}
                  disabled={loading}
                >
                  <span style={styles.planBadge}>Popular</span>
                  <span style={styles.planPrice}>₹49</span>
                  <span style={styles.planName}>Job-Specific</span>
                  <span style={styles.planDesc}>Full analysis + rewrite tips</span>
                </button>
              </div>
            </div>
          </div>

        ) : (
          /* Unlocked Section */
          <>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>❌ Missing Skills</h3>
              <div style={styles.tagRow}>
                {fullData?.missingSkills?.map((skill, i) => (
                  <span key={i} style={{ ...styles.tag, background: '#fee2e2', color: '#991b1b' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>💡 Suggestions</h3>
              {fullData?.suggestions?.map((s, i) => (
                <p key={i} style={styles.suggestionItem}>• {s}</p>
              ))}
            </div>

            <div style={styles.successBadge}>
            ✅ Full Report Unlocked!
            </div>
          </>
        )}

        <button style={styles.analyzeBtn} onClick={() => navigate('/upload')}>
        Analyze New Resume
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f0f4ff', padding: '24px 16px', display: 'flex', justifyContent: 'center' },
  card: { background: '#fff', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '560px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', height: 'fit-content' },
  title: { textAlign: 'center', fontSize: '22px', fontWeight: 700, marginBottom: '20px' },
  scoreCircle: { position: 'relative', width: 160, height: 160, margin: '0 auto 12px' },
  scoreText: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', display: 'flex', flexDirection: 'column' },
  label: { textAlign: 'center', fontWeight: 700, fontSize: 18, marginBottom: 16 },
  summaryBox: { background: '#f8f8ff', borderRadius: 10, padding: '12px 16px', marginBottom: 20, borderLeft: '3px solid #6366f1' },
  summaryText: { margin: 0, fontSize: 14, color: '#444', lineHeight: 1.6 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 15, fontWeight: 700, marginBottom: 10, color: '#1f2937' },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  tag: { padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 },
  lockedBox: { position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
  blur: { filter: 'blur(4px)', userSelect: 'none', pointerEvents: 'none', padding: '16px', background: '#f9fafb', borderRadius: 12 },
  unlockOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 },
  lockIcon: { fontSize: 32, margin: 0 },
  lockTitle: { fontSize: 18, fontWeight: 700, margin: '8px 0 4px' },
  lockSub: { fontSize: 13, color: '#666', marginBottom: 20, textAlign: 'center' },
  planRow: { display: 'flex', gap: 12, width: '100%' },
  planBtn: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 8px', borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', gap: 4, position: 'relative' },
  planBadge: { position: 'absolute', top: -10, background: '#6366f1', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 20 },
  planPrice: { fontSize: 24, fontWeight: 800, color: '#6366f1' },
  planName: { fontSize: 13, fontWeight: 700, color: '#1f2937' },
  planDesc: { fontSize: 11, color: '#888', textAlign: 'center' },
  suggestionItem: { fontSize: 14, color: '#374151', marginBottom: 6, lineHeight: 1.5 },
  successBadge: { background: '#dcfce7', color: '#166534', textAlign: 'center', padding: '12px', borderRadius: 10, fontWeight: 700, marginBottom: 20 },
  analyzeBtn: { width: '100%', padding: '12px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 10, fontSize: 15, cursor: 'pointer', fontWeight: 600 }
};

export default Result;