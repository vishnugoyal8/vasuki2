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

export default {
  getAiClient,
  extractSkillsWithGemini,
};
