import { ScoreboardInterface } from './interfaces';
import { Match } from './match.ts';

/**
 * @class Scoreboard
 * @implements ScoreboardInterface
 * @description Represents a scoreboard that contains a list of matches and provides methods to add a match, update the score of a match, end a match and get the list of matches sorted by total score.
 */
export class Scoreboard implements ScoreboardInterface {
  private _matches: Match[];

  constructor() {
    this._matches = [];
  }

  /**
   * @method addMatch Adds a match to the list of matches.
   * @param match The match to add.
   */
  public addMatch(match: Match): void {
    this._matches.push(match);
  }

  /**
   * @method updateScore Updates the score of the match with the provided values.
   * @param match The match to update.
   * @param homeScore The new score of the home team.
   * @param awayScore The new score of the away team.
   * @throws Error if the match is not in the list of matches.
   */
  public updateScore(match: Match, homeScore: number, awayScore: number): void {
    // throw error if match is not in the list of matches
    if (!this._matches.includes(match)) {
      throw new Error('Match not found');
    }
    match.updateScore({ homeScore, awayScore });
  }

  /**
   * @method endMatch Ends a match by removing it from the list of matches.
   * @param match The match to end.
   * @throws Error if the match is not in the list of matches.
   */
  public endMatch(match: Match): void {
    // throw error if match is not in the list of matches
    if (!this._matches.includes(match)) {
      throw new Error('Match not found');
    }
    this._matches = this._matches.filter((m) => m !== match);
  }

  /**
   * @method getMatches Gets the list of matches sorted by total score.
   * @description The list of matches is sorted by total score in descending order. If two matches have the same total score, they are sorted by the order in which they were added to the scoreboard.
   * @returns {Match[]} The list of matches sorted by total score.
   * @example
   * consider the following matches:
   *  a. Mexico 0 - Canada 5
   *  b. Spain 10 - Brazil 2
   *  c. Germany 2 - France 2
   *  d. Uruguay 6 - Italy 6
   *  e. Argentina 3 - Australia 1
   * the list of matches returned by getMatches() will be:
   * 1. Uruguay 6 - Italy 6
   * 2. Spain 10 - Brazil 2
   * 3. Mexico 0 - Canada 5
   * 4. Argentina 3 - Australia 1
   * 5. Germany 2 - France 2
   * @public
   */
  public getMatches(): Match[] {
    return this._matches.slice().sort((a, b) => {
      if (a.totalScore() === b.totalScore()) {
        return this._matches.indexOf(b) - this._matches.indexOf(a);
      }
      return b.totalScore() - a.totalScore();
    });
  }
}
