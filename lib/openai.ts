import { Tone, UserInfo } from './types';
import OpenAI from 'openai';

export async function generateCoverLetter(
  jobDescription: string,
  userInfo: UserInfo,
  tone: Tone,
  apiKey: string
): Promise<string> {
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please set it in settings.');
  }

  const client = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const toneDescriptions: Record<Tone, string> = {
    formal: 'formal and professional, using sophisticated language and proper business terminology',
    friendly: 'friendly and approachable, with a conversational tone while remaining professional',
    enthusiastic: 'enthusiastic and energetic, conveying genuine excitement about the opportunity',
    professional: 'professional and concise, striking a balance between personality and expertise',
  };

  const prompt = `Write a compelling cover letter with the following details:

Applicant Name: ${userInfo.name}
Email: ${userInfo.email}
Phone: ${userInfo.phone}
Position Applying For: ${userInfo.position}

Job Description:
${jobDescription}

Requirements:
- The tone should be ${toneDescriptions[tone]}
- Address the hiring manager directly
- Highlight relevant skills and experiences that match the job description
- Keep it to 3-4 paragraphs
- Include a call to action
- Do not include the applicant's contact information in the letter body (as it will be provided separately)
- Do not start with "Dear Hiring Manager" - just begin with an engaging opening

Generate only the cover letter content, without any additional formatting or metadata.`;

  const message = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = message.choices[0].message.content;
  if (content) {
    return content;
  }

  throw new Error('Unexpected response format from API');
}
