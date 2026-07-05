'use client';

import { CoverLetter } from '@/lib/types';
import { CopyButton } from './CopyButton';
import { ExportPDFButton } from './ExportPDFButton';
import { EditableLetterContent } from './EditableLetterContent';

interface CoverLetterPreviewProps {
  letter: CoverLetter;
  onSave: (content: string) => void;
  onRegenerate: () => void;
  regenerating?: boolean;
}

export function CoverLetterPreview({
  letter,
  onSave,
  onRegenerate,
  regenerating = false,
}: CoverLetterPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {letter.userInfo.name}
        </h1>
        <div className="space-y-1 text-gray-600 dark:text-gray-400">
          <p>{letter.userInfo.email}</p>
          <p>{letter.userInfo.phone}</p>
        </div>
      </div>

      <EditableLetterContent
        content={letter.content}
        onSave={onSave}
        onRegenerate={onRegenerate}
        regenerating={regenerating}
      />

      <div className="flex flex-wrap gap-3">
        <CopyButton text={letter.content} />
        <ExportPDFButton letter={letter} />
      </div>
    </div>
  );
}
