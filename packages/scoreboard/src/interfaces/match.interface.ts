import { MatchUpdateScoreT } from '../types/match.types.ts';

export interface MatchInterface {
  updateScore(updatedScores: MatchUpdateScoreT): void;
  totalScore(): number;
  toString(): string;
}
