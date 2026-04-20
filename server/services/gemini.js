const analyzeResumeWithJD = async (resumeText, jobDescription) => {
  const techSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'MongoDB',
    'SQL', 'AWS', 'Docker', 'Git', 'TypeScript', 'Express',
    'Java', 'Angular', 'Vue', 'C++', 'Machine Learning',
    'Data Analysis', 'Figma', 'REST API', 'GraphQL'
  ];

  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  const matched = techSkills.filter(s => resumeLower.includes(s.toLowerCase()));
  const missing = techSkills.filter(s =>
    !resumeLower.includes(s.toLowerCase()) &&
    jdLower.includes(s.toLowerCase())
  ).slice(0, 5);

  const score = Math.min(92, Math.max(30,
    (matched.length * 8) + (missing.length === 0 ? 20 : 0) + 25
  ));

  return {
    match_percentage: Math.round(score),
    matched_skills:   matched.slice(0, 6),
    missing_skills:   missing,
    suggestions: [
      'Quantify your achievements with specific numbers and metrics',
      missing.length > 0 ? `Learn ${missing[0]} — most in-demand for this role` : 'Add more project descriptions',
      'Include links to GitHub portfolio or live projects',
    ],
    strengths: [
      matched.length > 0 ? `Strong in ${matched.slice(0,2).join(' & ')}` : 'Good foundation',
      'Relevant work experience'
    ],
    summary: `Your resume shows ${Math.round(score)}% match. ${
      missing.length > 0
        ? `Key gaps: ${missing.slice(0,2).join(', ')}.`
        : 'Strong overall fit!'
    } Focus on quantifying your impact.`
  };
};

module.exports = { analyzeResumeWithJD };