import { MatchInitialConfigT, MatchInterface, MatchUpdateScoreT } from './interfaces/match.interface.ts';

/**
 * @class Match
 * @implements MatchInterface
 * @description Represents a match between two teams with a score for each team and provides methods to update the score, get the total score and get a string representation of the match.
 */
export class Match implements MatchInterface {
  private readonly _homeTeam: string;
  private readonly _awayTeam: string;
  private _homeScore: number;
  private _awayScore: number;

  /**
   * @constructor Match constructor method that initializes the match with the provided values.
   * @param initialValues.homeTeam The name of the home team.
   * @param initialValues.awayTeam The name of the away team.
   * @param initialValues.homeScore The score of the home team (default is 0).
   * @param initialValues.awayScore The score of the away team (default is 0).
   * @throws Error if the scores are not valid integers or if they are negative.
   */
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

  /**
   * @method updateScore Updates the score of the match with the provided values.
   * @param newScores.homeScore The new score of the home team.
   * @param newScores.awayScore The new score of the away team.
   * @throws Error if the scores are not valid integers or if they are negative.
   */
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

  /**
   * @method totalScore Returns the total score of the match.
   * @returns {number} The total score of the match.
   * @public
   */
  public totalScore(): number {
    return this._homeScore + this._awayScore;
  }

  /**
   * @method toString Returns a string representation of the match.
   * @returns {string} A string representation of the match in the format 'HomeTeam HomeScore - AwayScore AwayTeam'.
   * @example 'Home 2 - 1 Away'
   * @public
   */
  public toString(): string {
    return `${this._homeTeam} ${this._homeScore} - ${this._awayScore} ${this._awayTeam}`;
  }

  /**
   * @method areScoresValidIntegers Checks if the provided scores are valid integers.
   * @param scores The scores to check.
   * @returns {boolean} True if the scores are valid integers, false otherwise.
   * @private
   */
  private areScoresValidIntegers(scores: MatchUpdateScoreT): boolean {
    return Number.isInteger(scores.homeScore) && Number.isInteger(scores.awayScore);
  }

  /**
   * @method areScoresPositive Checks if the provided scores are positive.
   * @param scores The scores to check.
   * @returns {boolean} True if the scores are positive, false otherwise.
   * @private
   */
  private areScoresPositive(scores: MatchUpdateScoreT): boolean {
    return scores.homeScore >= 0 && scores.awayScore >= 0;
  }
}
