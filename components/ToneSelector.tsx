'use client';

import { Tone } from '@/lib/types';

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
}

const tones: { value: Tone; label: string; description: string }[] = [
  {
    value: 'formal',
    label: 'Formal',
    description: 'Professional and sophisticated',
  },
  {
    value: 'friendly',
    label: 'Friendly',
    description: 'Conversational and approachable',
  },
  {
    value: 'enthusiastic',
    label: 'Enthusiastic',
    description: 'Energetic and excited',
  },
  {
    value: 'professional',
    label: 'Professional',
    description: 'Balanced and confident',
  },
];

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Tone *
      </label>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {tones.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onChange(tone.value)}
            className={`p-4 rounded-lg border-2 transition-all ${
              value === tone.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <div className="font-medium text-gray-900 dark:text-gray-100">{tone.label}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{tone.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
