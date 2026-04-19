const analyzeResumeWithJD = async (resumeText, jobDescription) => {
  
  // 🧪 TEMPORARY - Testing ke liye fake response
  // Baad mein real API se replace karna
  console.log('✅ Mock AI response return kar raha hai');
  
  return {
    match_percentage: 72,
    matched_skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    missing_skills: ['Docker', 'AWS', 'Kubernetes'],
    suggestions: [
      'Add Docker experience to your resume',
      'Get AWS Cloud Practitioner certification',
      'Build a project using microservices architecture'
    ],
    strengths: [
      'Strong full-stack JavaScript skills',
      'Good database knowledge'
    ],
    summary: 'Good candidate with solid web development skills but needs cloud and DevOps experience for this role.'
  };
};

module.exports = { analyzeResumeWithJD };