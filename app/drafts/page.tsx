'use client';

import { useState, useEffect } from 'react';
import { CoverLetter } from '@/lib/types';
import { storageUtils } from '@/lib/storage';
import { DraftList } from '@/components/DraftList';
import { CoverLetterPreview } from '@/components/CoverLetterPreview';

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<CoverLetter[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<CoverLetter | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const letters = storageUtils.getLetters();
    setDrafts(letters.sort((a, b) => b.createdAt - a.createdAt));
  }, []);

  const handleDelete = (id: string) => {
    storageUtils.deleteLetter(id);
    setDrafts(drafts.filter((d) => d.id !== id));
    if (selectedDraft?.id === id) {
      setSelectedDraft(null);
    }
  };

  const handleSelect = (letter: CoverLetter) => {
    setSelectedDraft(letter);
  };

  const handleSave = (content: string) => {
    if (!selectedDraft) return;

    const updatedLetter = { ...selectedDraft, content };
    setSelectedDraft(updatedLetter);
    storageUtils.saveLetter(updatedLetter);
  };

  const handleRegenerate = () => {
    // Regeneration would require API call - just redirect to generator
  };

  if (!mounted) {
    return null;
  }

  if (selectedDraft) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setSelectedDraft(null)}
          className="mb-6 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Drafts
        </button>

        <CoverLetterPreview
          letter={selectedDraft}
          onSave={handleSave}
          onRegenerate={handleRegenerate}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Saved Drafts
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          View and manage your saved cover letters.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
        <DraftList drafts={drafts} onDelete={handleDelete} onSelect={handleSelect} />
      </div>
    </div>
  );
}
