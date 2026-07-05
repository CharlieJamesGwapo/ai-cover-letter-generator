'use client';

import { Zap, Loader } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

export function GenerateButton({ onClick, loading, disabled = false }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader size={20} className="animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Zap size={20} />
          Generate Cover Letter
        </>
      )}
    </button>
  );
}
