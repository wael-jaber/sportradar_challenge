import { ScoreboardInterface } from './interfaces';
import { Match } from './match.ts';

export class Scoreboard implements ScoreboardInterface {
  private _matches: Match[];

  constructor() {
    this._matches = [];
  }

  public addMatch(match: Match): void {
    this._matches.push(match);
  }

  public updateScore(match: Match, homeScore: number, awayScore: number): void {
    // throw error if match is not in the list of matches
    if (!this._matches.includes(match)) {
      throw new Error('Match not found');
    }
    match.updateScore({ homeScore, awayScore });
  }

  public endMatch(match: Match): void {
    // throw error if match is not in the list of matches
    if (!this._matches.includes(match)) {
      throw new Error('Match not found');
    }
    this._matches = this._matches.filter((m) => m !== match);
  }

  public getMatches(): Match[] {
    return this._matches.slice().sort((a, b) => {
      if (a.totalScore() === b.totalScore()) {
        return this._matches.indexOf(b) - this._matches.indexOf(a);
      }
      return b.totalScore() - a.totalScore();
    });
  }
}
