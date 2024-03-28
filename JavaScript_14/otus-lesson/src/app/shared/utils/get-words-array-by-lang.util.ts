import { ENGLISH_WORDS } from '../constants/eng-words';
import { RUSSIAN_WORDS } from '../constants/ru-words';

export const getWordsArrayByLang = (lang: string): string[] => {
  switch (lang) {
    case 'en':
      return ENGLISH_WORDS;
    case 'ru':
      return RUSSIAN_WORDS;
    default:
      return [];
  }
};
