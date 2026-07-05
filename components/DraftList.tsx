'use client';

import Link from 'next/link';
import { CoverLetter } from '@/lib/types';
import { Trash2, FileText, Calendar, Briefcase } from 'lucide-react';

interface DraftListProps {
  drafts: CoverLetter[];
  onDelete: (id: string) => void;
  onSelect?: (letter: CoverLetter) => void;
}

export function DraftList({ drafts, onDelete, onSelect }: DraftListProps) {
  if (drafts.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">No saved drafts yet.</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Generate a cover letter to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {drafts.map((draft) => (
        <div
          key={draft.id}
          className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <button
                onClick={() => onSelect?.(draft)}
                className="text-left"
              >
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  {draft.userInfo.name}
                </h3>
              </button>
              <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} />
                  {draft.userInfo.position}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(draft.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  {draft.tone}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this draft?')) {
                  onDelete(draft.id);
                }
              }}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              aria-label="Delete draft"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
