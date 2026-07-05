import { CoverLetter, Settings } from './types';

const LETTERS_KEY = 'coverLetters';
const SETTINGS_KEY = 'settings';

export const storageUtils = {
  // Cover Letters
  getLetters: (): CoverLetter[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(LETTERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveLetter: (letter: CoverLetter): void => {
    if (typeof window === 'undefined') return;
    const letters = storageUtils.getLetters();
    const index = letters.findIndex(l => l.id === letter.id);
    if (index >= 0) {
      letters[index] = letter;
    } else {
      letters.push(letter);
    }
    localStorage.setItem(LETTERS_KEY, JSON.stringify(letters));
  },

  deleteLetter: (id: string): void => {
    if (typeof window === 'undefined') return;
    const letters = storageUtils.getLetters().filter(l => l.id !== id);
    localStorage.setItem(LETTERS_KEY, JSON.stringify(letters));
  },

  getLetter: (id: string): CoverLetter | null => {
    const letters = storageUtils.getLetters();
    return letters.find(l => l.id === id) || null;
  },

  // Settings
  getSettings: (): Settings => {
    if (typeof window === 'undefined') {
      return { apiKey: '', theme: 'system' };
    }
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : { apiKey: '', theme: 'system' };
  },

  saveSettings: (settings: Settings): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  getApiKey: (): string => {
    return storageUtils.getSettings().apiKey;
  },

  saveApiKey: (apiKey: string): void => {
    const settings = storageUtils.getSettings();
    settings.apiKey = apiKey;
    storageUtils.saveSettings(settings);
  },

  getTheme: (): 'light' | 'dark' | 'system' => {
    return storageUtils.getSettings().theme;
  },

  saveTheme: (theme: 'light' | 'dark' | 'system'): void => {
    const settings = storageUtils.getSettings();
    settings.theme = theme;
    storageUtils.saveSettings(settings);
  },
};
