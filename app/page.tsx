'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { UserInfoForm } from '@/components/UserInfoForm';
import { ToneSelector } from '@/components/ToneSelector';
import { GenerateButton } from '@/components/GenerateButton';
import { CoverLetterPreview } from '@/components/CoverLetterPreview';
import { CoverLetter, UserInfo, Tone } from '@/lib/types';
import { generateCoverLetter } from '@/lib/openai';
import { storageUtils } from '@/lib/storage';

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    phone: '',
    position: '',
  });
  const [tone, setTone] = useState<Tone>('professional');
  const [generatedLetter, setGeneratedLetter] = useState<CoverLetter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = async () => {
    setError('');

    if (!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.position) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please provide a job description.');
      return;
    }

    setLoading(true);

    try {
      const apiKey = storageUtils.getApiKey();
      if (!apiKey) {
        setError('OpenAI API key not configured. Please set it in settings.');
        setLoading(false);
        return;
      }

      const content = await generateCoverLetter(jobDescription, userInfo, tone, apiKey);

      const letter: CoverLetter = {
        id: uuidv4(),
        jobDescription,
        userInfo,
        tone,
        content,
        createdAt: Date.now(),
      };

      setGeneratedLetter(letter);
      storageUtils.saveLetter(letter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate cover letter');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!generatedLetter) return;

    setLoading(true);

    try {
      const apiKey = storageUtils.getApiKey();
      const content = await generateCoverLetter(
        generatedLetter.jobDescription,
        generatedLetter.userInfo,
        tone,
        apiKey
      );

      const updatedLetter: CoverLetter = {
        ...generatedLetter,
        tone,
        content,
      };

      setGeneratedLetter(updatedLetter);
      storageUtils.saveLetter(updatedLetter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to regenerate cover letter');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (content: string) => {
    if (!generatedLetter) return;

    const updatedLetter = { ...generatedLetter, content };
    setGeneratedLetter(updatedLetter);
    storageUtils.saveLetter(updatedLetter);
  };

  if (!mounted) {
    return null;
  }

  if (generatedLetter) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setGeneratedLetter(null)}
          className="mb-6 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Generator
        </button>

        <CoverLetterPreview
          letter={generatedLetter}
          onSave={handleSave}
          onRegenerate={handleRegenerate}
          regenerating={loading}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Generate Your Cover Letter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Create a compelling cover letter tailored to your dream job in seconds.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-8 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
        <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <UserInfoForm value={userInfo} onChange={setUserInfo} />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <ToneSelector value={tone} onChange={setTone} />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <GenerateButton
            onClick={handleGenerate}
            loading={loading}
            disabled={!userInfo.name || !userInfo.email || !userInfo.phone || !jobDescription}
          />
        </div>
      </div>
    </div>
  );
}
