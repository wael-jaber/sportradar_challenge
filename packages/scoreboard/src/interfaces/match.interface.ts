export type MatchInitialConfigT = {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
};

export type MatchUpdateScoreT = {
  homeScore: number;
  awayScore: number;
};

export interface MatchInterface {
  updateScore(updatedScores: MatchUpdateScoreT): void;
  totalScore(): number;
  toString(): string;
}
