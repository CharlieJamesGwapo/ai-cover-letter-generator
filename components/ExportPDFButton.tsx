'use client';

import { Download } from 'lucide-react';
import { CoverLetter } from '@/lib/types';
import { generatePDF } from '@/lib/pdf';

interface ExportPDFButtonProps {
  letter: CoverLetter;
}

export function ExportPDFButton({ letter }: ExportPDFButtonProps) {
  const handleExport = () => {
    generatePDF(letter);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
    >
      <Download size={18} />
      Export PDF
    </button>
  );
}
