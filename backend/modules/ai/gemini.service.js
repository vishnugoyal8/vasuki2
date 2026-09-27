import { GoogleGenAI, Type } from '@google/genai';
import { config } from '../../config/env.js';

let aiClient = null;

export const getAiClient = () => {
  if (!aiClient && config.geminiApiKey) {
    aiClient = new GoogleGenAI({
      apiKey: config.geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
};

export const extractSkillsWithGemini = async (rawText) => {
  const ai = getAiClient();
  if (!ai || !config.geminiApiKey) {
    return null;
  }

  const systemInstruction = `You are a Labour-Market Intelligence & Curriculum Alignment AI for the Government of Maharashtra (Skill Development & Entrepreneurship Department).
Analyze raw industrial job descriptions and extract structured technical and soft skills, mapped against standard vocational frameworks (NSDC, ESCO, NCVT).
Focus especially on emerging automotive, electric vehicle (EV), battery technologies, precision CNC manufacturing, and power electronics.`;

  const prompt = `Analyze this industrial job posting and extract all required skills, experience levels, and competencies with precise confidence ratings:

--- JOB DESCRIPTION ---
${rawText}
--- END ---

Respond with structured JSON matching the requested schema.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          jobTitle: { type: Type.STRING },
          targetRole: { type: Type.STRING },
          industry: { type: Type.STRING },
          seniorityLevel: { type: Type.STRING },
          summary: { type: Type.STRING },
          skills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skillName: { type: Type.STRING },
                category: { type: Type.STRING },
                importance: { type: Type.STRING, description: 'CRITICAL, HIGH, MEDIUM, or NICE_TO_HAVE' },
                proficiency: { type: Type.STRING, description: 'BASIC, INTERMEDIATE, or ADVANCED' },
                confidenceScore: { type: Type.NUMBER, description: 'Score between 60 and 99' },
                rationale: { type: Type.STRING },
              },
              required: ['skillName', 'category', 'importance', 'proficiency', 'confidenceScore', 'rationale'],
            },
          },
        },
        required: ['jobTitle', 'targetRole', 'industry', 'seniorityLevel', 'summary', 'skills'],
      },
    },
  });

  return JSON.parse(response.text || '{}');
};

export const analyzeCurriculumWithGemini = async ({
  base64Pdf,
  rawText,
  fileName,
  tradeSector,
  district = 'Pune',
}) => {
  const ai = getAiClient();
  if (!ai || !config.geminiApiKey) {
    return null;
  }

  const systemInstruction = `You are the Lead Vocational Curriculum Auditor and Industrial Alignment Specialist for the Directorate of Vocational Education & Training (DVET), Government of Maharashtra.
Analyze vocational training trade syllabi (PDF documents or text outlines) submitted by Industrial Training Institutes (ITIs) and polytechnics.
Benchmark the submitted syllabus against live, real-world industry requirements across Maharashtra manufacturing clusters (e.g. Pune Chakan/Bhosari automotive belt, Aurangabad Shendra, Nashik, Kolhapur).
Identify exact competencies taught, curricular deficits, practical-to-theory imbalances, obsolete topics, missing modern industry competencies (such as 800V EV safety, CAN bus diagnostics, 5-axis CNC machining, solar microgrids), and specify recommended bridge modules and lab hardware equipment.`;

  const contents = [];
  if (base64Pdf) {
    contents.push({
      inlineData: {
        mimeType: 'application/pdf',
        data: base64Pdf,
      },
    });
  }

  const textPrompt = `Conduct an exhaustive curriculum audit on this syllabus document${fileName ? ` (${fileName})` : ''} for trade sector "${tradeSector || 'Engineering & Automotive Trades'}" benchmarked for industrial demand in ${district}, Maharashtra:

${rawText ? `--- EXTRACTED SYLLABUS TEXT ---\n${rawText.slice(0, 15000)}\n--- END CONTENT ---\n` : ''}

Evaluate:
1. Trade title, awarding body (DGT CTS / NCVT / MSBTE), estimated total course hours, practical vs theory ratio.
2. Overall Alignment Score (0-100%) against modern industry demand in Maharashtra industrial corridors.
3. Competency Breakdown: mapping specific competencies to COVERED (taught with practicals), PARTIAL (theory only / lack of lab specs), or NOT_COVERED (completely absent).
4. Obsolete/Legacy Topics that are obsolete in modern industry and should be phased out or shortened.
5. Missing Emerging High-Demand Skills required by local OEMs and suppliers (e.g., Tata Motors, Bharat Forge, Bajaj Auto, Mahindra).
6. Actionable Bridge Module and required laboratory equipment/hardware specifications with estimated capital requirements.

Return the response strictly adhering to the requested JSON schema.`;

  contents.push(textPrompt);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          courseTitle: { type: Type.STRING },
          awardingBody: { type: Type.STRING },
          detectedNsqfLevel: { type: Type.STRING },
          totalHours: { type: Type.NUMBER },
          practicalHoursRatio: { type: Type.NUMBER, description: 'Decimal between 0 and 1, e.g. 0.4 for 40%' },
          overallAlignmentScore: { type: Type.NUMBER, description: 'Percentage between 0 and 100' },
          alignmentStatus: { type: Type.STRING, description: 'CRITICAL_DEFICIT, MODERATE_ALIGNMENT, or WELL_ALIGNED' },
          executiveSummary: { type: Type.STRING },
          competencies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skillName: { type: Type.STRING },
                category: { type: Type.STRING },
                demandScore: { type: Type.NUMBER, description: '0 to 100' },
                coverageStatus: { type: Type.STRING, description: 'COVERED, PARTIAL, or NOT_COVERED' },
                syllabusTopic: { type: Type.STRING },
                gapDiagnostic: { type: Type.STRING },
                recommendedAction: { type: Type.STRING },
                requiredLabEquipment: { type: Type.STRING },
              },
              required: ['skillName', 'category', 'demandScore', 'coverageStatus', 'gapDiagnostic', 'recommendedAction'],
            },
          },
          obsoleteTopics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                topicName: { type: Type.STRING },
                reasonObsolete: { type: Type.STRING },
                replacementRecommendation: { type: Type.STRING },
              },
              required: ['topicName', 'reasonObsolete', 'replacementRecommendation'],
            },
          },
          missingEmergingSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skillName: { type: Type.STRING },
                industrialNeed: { type: Type.STRING },
                recommendedHours: { type: Type.NUMBER },
              },
              required: ['skillName', 'industrialNeed'],
            },
          },
          bridgeRecommendation: {
            type: Type.OBJECT,
            properties: {
              moduleTitle: { type: Type.STRING },
              recommendedHours: { type: Type.NUMBER },
              targetBatch: { type: Type.STRING },
              estimatedLabCost: { type: Type.STRING },
              syllabusSummary: { type: Type.STRING },
            },
            required: ['moduleTitle', 'recommendedHours', 'estimatedLabCost', 'syllabusSummary'],
          },
        },
        required: [
          'courseTitle',
          'awardingBody',
          'overallAlignmentScore',
          'alignmentStatus',
          'executiveSummary',
          'competencies',
          'obsoleteTopics',
          'missingEmergingSkills',
          'bridgeRecommendation',
        ],
      },
    },
  });

  return JSON.parse(response.text || '{}');
};

export default {
  getAiClient,
  extractSkillsWithGemini,
  analyzeCurriculumWithGemini,
};

