/**
 * API Client for CareerSync Platform (JavaScript)
 */

export async function fetchStats(district = 'Pune') {
  const res = await fetch(`/api/stats?district=${encodeURIComponent(district)}`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchDistricts() {
  const res = await fetch('/api/districts');
  if (!res.ok) throw new Error('Failed to fetch districts');
  return res.json();
}

export async function fetchMarketIntelligence(role = 'EV Technician', district = 'Pune') {
  const res = await fetch(`/api/market-intelligence?role=${encodeURIComponent(role)}&district=${encodeURIComponent(district)}`);
  if (!res.ok) throw new Error('Failed to fetch market intelligence');
  return res.json();
}

export async function fetchSkillGaps(district = 'Pune', industry = 'Automotive / EV', thresholds) {
  const params = new URLSearchParams({
    district,
    industry,
    ...(thresholds ? {
      criticalThreshold: thresholds.critical.toString(),
      highThreshold: thresholds.high.toString(),
      medThreshold: thresholds.medium.toString(),
    } : {}),
  });
  const res = await fetch(`/api/skill-gaps?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch skill gaps');
  return res.json();
}

export async function fetchCourses() {
  const res = await fetch('/api/courses');
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
}

export async function fetchCourseAlignment(courseId = 'COURSE_ITI_EV_TECH') {
  const res = await fetch(`/api/courses/alignment?courseId=${encodeURIComponent(courseId)}`);
  if (!res.ok) throw new Error('Failed to fetch course alignment');
  return res.json();
}

export async function analyzeJobDescription(jobDescription, district = 'Pune') {
  const res = await fetch('/api/job-description/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobDescription, district }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to analyze job description');
  }
  return res.json();
}

export async function fetchRecommendations(filters) {
  const params = new URLSearchParams();
  if (filters?.district) params.append('district', filters.district);
  if (filters?.priority) params.append('priority', filters.priority);
  if (filters?.status) params.append('status', filters.status);

  const res = await fetch(`/api/recommendations?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch recommendations');
  return res.json();
}

export async function updateRecommendationStatus(id, status) {
  const res = await fetch(`/api/recommendations/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update recommendation status');
  return res.json();
}

export async function fetchInstitutes(district) {
  const res = await fetch(`/api/institutes?district=${encodeURIComponent(district || '')}`);
  if (!res.ok) throw new Error('Failed to fetch institutes');
  return res.json();
}

export async function fetchDistrictPlan(district = 'Pune') {
  const res = await fetch(`/api/districts/${encodeURIComponent(district)}/plan`);
  if (!res.ok) throw new Error('Failed to fetch district plan');
  return res.json();
}

export async function fetchEmployerFeedback() {
  const res = await fetch('/api/employer-feedback');
  if (!res.ok) throw new Error('Failed to fetch employer feedback');
  return res.json();
}

export async function submitEmployerFeedback(feedback) {
  const res = await fetch('/api/employer-feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  if (!res.ok) throw new Error('Failed to submit feedback');
  return res.json();
}

export async function resetSeedDataset() {
  const res = await fetch('/api/seed/reset', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reset dataset');
  return res.json();
}
