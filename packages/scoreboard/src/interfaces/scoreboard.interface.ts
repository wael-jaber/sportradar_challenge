import { Match } from '../match';

export interface ScoreboardInterface {
  addMatch(match: Match): void;
  updateScore(match: Match, homeScore: number, awayScore: number): void;
  endMatch(match: Match): void;
  getMatches(): Match[];
}
