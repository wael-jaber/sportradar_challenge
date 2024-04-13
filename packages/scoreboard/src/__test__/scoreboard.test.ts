import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('Scoreboard unit tests', () => {
  // as this is a unit test, we will mock the Match class.
  // since mocking constructor is tricky, and we want to avoid the spy approach
  // because that will make this not a unit test but integration, so we need a different approach

  const matchClassConstructorStub = vi.fn();

  const matchClassToStingStub = vi.fn().mockImplementation(() => ({
    toString: () => 'Home 0 - 0 Away',
  }));

  const matchClassUpdateScoreStub = vi.fn().mockImplementation(() => ({
    updateScore: () => {},
  }));
  const matchClassTotalScoreStub = vi.fn().mockImplementation(() => ({
    totalScore: () => 0,
  }));

  const matchClassStub = class {
    constructor() {
      matchClassConstructorStub();
    }
    toString() {
      return matchClassToStingStub.toString();
    }
    updateScore() {
      matchClassUpdateScoreStub();
    }
    totalScore() {
      return matchClassTotalScoreStub();
    }
  };

  beforeEach(async () => {
    // stub external dependencies (Match)
    vi.doMock('../match', () => ({ Match: matchClassStub }));
  });
  afterEach(async () => {
    // restore external dependencies
    vi.restoreAllMocks();
  });

  test('should create a scoreboard with default values', async () => {
    const { Scoreboard } = await import('../scoreboard');
    const scoreboard = new Scoreboard();
    expect(scoreboard.getMatches()).toStrictEqual([]);
  });

  test('should add a match to the scoreboard', async () => {
    const { Scoreboard } = await import('../scoreboard');
    const { Match } = await import('../match');
    const scoreboard = new Scoreboard();
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    scoreboard.addMatch(match);
    expect(scoreboard.getMatches()).toStrictEqual([match]);
  });

  test('should remove a match from the scoreboard', async () => {
    const { Scoreboard } = await import('../scoreboard');
    const { Match } = await import('../match');
    const scoreboard = new Scoreboard();
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    scoreboard.addMatch(match);
    expect(scoreboard.getMatches()).toStrictEqual([match]);
    scoreboard.endMatch(match);
    expect(scoreboard.getMatches()).toStrictEqual([]);
  });

  test('should return the matches in the correct order', async () => {
    const { Scoreboard } = await import('../scoreboard');
    const { Match } = await import('../match');
    const scoreboard = new Scoreboard();

    // a. Mexico 0 - Canada 5
    // b. Spain 10 - Brazil 2
    // c. Germany 2 - France 2
    // d. Uruguay 6 - Italy 6
    // e. Argentina 3 - Australia 1

    const match1 = new Match({ homeTeam: 'Mexico', awayTeam: 'Canada' });
    const match2 = new Match({ homeTeam: 'Spain', awayTeam: 'Brazil' });
    const match3 = new Match({ homeTeam: 'Germany', awayTeam: 'France' });
    const match4 = new Match({ homeTeam: 'Uruguay', awayTeam: 'Italy' });
    const match5 = new Match({ homeTeam: 'Argentina', awayTeam: 'Australia' });

    scoreboard.addMatch(match1);
    scoreboard.addMatch(match2);
    scoreboard.addMatch(match3);
    scoreboard.addMatch(match4);
    scoreboard.addMatch(match5);

    // a. Mexico 0 - Canada 5 => 5
    // b. Spain 10 - Brazil 2 => 12
    // c. Germany 2 - France 2 => 4
    // d. Uruguay 6 - Italy 6 => 12
    // e. Argentina 3 - Australia 1 => 4

    matchClassTotalScoreStub.mockReturnValueOnce(5);
    matchClassTotalScoreStub.mockReturnValueOnce(12);
    matchClassTotalScoreStub.mockReturnValueOnce(4);
    matchClassTotalScoreStub.mockReturnValueOnce(12);
    matchClassTotalScoreStub.mockReturnValueOnce(4);

    // expected order:
    // 1. Uruguay 6 - Italy 6
    // 2. Spain 10 - Brazil 2
    // 3. Mexico 0 - Canada 5
    // 4. Argentina 3 - Australia 1
    // 5. Germany 2 - France 2

    expect(scoreboard.getMatches()).toStrictEqual([match4, match2, match1, match5, match3]);
  });

  test('should throw an error when trying to remove a match that is not in the scoreboard', async () => {
    const { Scoreboard } = await import('../scoreboard');
    const { Match } = await import('../match');
    const scoreboard = new Scoreboard();
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    expect(() => scoreboard.endMatch(match)).toThrow();
  });

  test('should update the score of a match', async () => {
    const { Scoreboard } = await import('../scoreboard');
    const { Match } = await import('../match');
    const scoreboard = new Scoreboard();
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    scoreboard.addMatch(match);
    scoreboard.updateScore(match, 2, 1);
    expect(matchClassUpdateScoreStub).toHaveBeenCalled();
  });

  test('should throw an error when updating the score of a match that is not in the scoreboard', async () => {
    const { Scoreboard } = await import('../scoreboard');
    const { Match } = await import('../match');
    const scoreboard = new Scoreboard();
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    expect(() => scoreboard.updateScore(match, 2, 1)).toThrow();
  });
});
