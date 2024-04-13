import { MatchInitialConfigT, MatchInterface, MatchUpdateScoreT } from './interfaces/match.interface.ts';

export class Match implements MatchInterface {
  private readonly _homeTeam: string;
  private readonly _awayTeam: string;
  private _homeScore: number;
  private _awayScore: number;

  constructor(initialValues: MatchInitialConfigT) {
    const { homeTeam, awayTeam, homeScore = 0, awayScore = 0 } = initialValues;
    // we check if scores are valid integers
    if (!this.areScoresValidIntegers({ homeScore, awayScore })) {
      throw new Error('Scores must be integers');
    }

    // we check if scores are positive
    if (!this.areScoresPositive({ homeScore, awayScore })) {
      throw new Error('Scores cannot be negative');
    }

    this._homeTeam = homeTeam;
    this._awayTeam = awayTeam;
    this._homeScore = homeScore;
    this._awayScore = awayScore;
  }

  public updateScore(newScores: MatchUpdateScoreT): void {
    const { homeScore, awayScore } = newScores;
    // we check if scores are valid integers
    if (!this.areScoresValidIntegers({ homeScore, awayScore })) {
      throw new Error('Scores must be integers');
    }

    // we check if scores are positive
    if (!this.areScoresPositive({ homeScore, awayScore })) {
      throw new Error('Scores cannot be negative');
    }

    this._homeScore = homeScore;
    this._awayScore = awayScore;
  }

  public totalScore(): number {
    return this._homeScore + this._awayScore;
  }

  public toString(): string {
    return `${this._homeTeam} ${this._homeScore} - ${this._awayScore} ${this._awayTeam}`;
  }

  private areScoresValidIntegers(scores: MatchUpdateScoreT): boolean {
    return Number.isInteger(scores.homeScore) && Number.isInteger(scores.awayScore);
  }
  private areScoresPositive(scores: MatchUpdateScoreT): boolean {
    return scores.homeScore >= 0 && scores.awayScore >= 0;
  }
}
