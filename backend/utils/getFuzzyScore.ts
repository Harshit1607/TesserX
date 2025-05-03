// utils/getFuzzyScore.ts
import { fuzzyMatch } from './matchUtils';

export const getFuzzyScore = (a: string, b: string): number => {
  return fuzzyMatch(a.toLowerCase(), b.toLowerCase());
};
