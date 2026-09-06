import apiClient from '../../services/api.js';

export const skillsApi = {
  getSkillGaps: (district = 'Pune', industry = 'Automotive / EV', thresholds) => {
    const params = { district, industry };
    if (thresholds) {
      params.criticalThreshold = thresholds.critical;
      params.highThreshold = thresholds.high;
      params.medThreshold = thresholds.medium;
    }
    return apiClient.get('/skill-gaps', params);
  },
};

export default skillsApi;
