export type Tone = 'formal' | 'friendly' | 'enthusiastic' | 'professional';

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  position: string;
}

export interface CoverLetter {
  id: string;
  jobDescription: string;
  userInfo: UserInfo;
  tone: Tone;
  content: string;
  createdAt: number;
}

export interface Settings {
  apiKey: string;
  theme: 'light' | 'dark' | 'system';
}
