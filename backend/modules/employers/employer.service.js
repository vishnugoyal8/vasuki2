import employerRepository from './employer.repository.js';

export const getEmployers = async (district) => {
  return employerRepository.getEmployers(district);
};

export const getEmployerFeedback = async () => {
  return employerRepository.getEmployerFeedback();
};

export const submitEmployerFeedback = async (data) => {
  const {
    companyName,
    district = 'Pune',
    industry = 'Automotive / EV',
    role,
    requiredSkills = [],
    hiringDifficultyScore = 5,
    reportedShortages = [],
    candidateVolumeNeeded = 10,
    quarter = 'Q3 2026',
  } = data;

  const employerId = `EMP_${companyName.toUpperCase().replace(/\s+/g, '_').slice(0, 10)}`;

  return employerRepository.addEmployerFeedback({
    employerId,
    companyName,
    district,
    industry,
    role,
    requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [requiredSkills],
    hiringDifficultyScore: Number(hiringDifficultyScore) || 5,
    reportedShortages: Array.isArray(reportedShortages) ? reportedShortages : [reportedShortages],
    candidateVolumeNeeded: Number(candidateVolumeNeeded) || 10,
    quarter,
  });
};

export default {
  getEmployers,
  getEmployerFeedback,
  submitEmployerFeedback,
};
