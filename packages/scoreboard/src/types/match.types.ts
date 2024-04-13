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
