import { describe, test, expect } from 'vitest';

describe('Match unit tests', () => {
  test('should create a match with default values', async () => {
    const { Match } = await import('../match');
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    expect(match.toString()).toBe('Home 0 - 0 Away');
  });

  test('should create a match with custom scores', async () => {
    const { Match } = await import('../match');
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away', homeScore: 2, awayScore: 1 });
    expect(match.toString()).toBe('Home 2 - 1 Away');
  });

  test('should throw an error when creating a match with negative scores', async () => {
    const { Match } = await import('../match');
    expect(() => new Match({ homeTeam: 'Home', awayTeam: 'Away', homeScore: -1, awayScore: 1 })).toThrow();
    expect(() => new Match({ homeTeam: 'Home', awayTeam: 'Away', homeScore: 1, awayScore: -1 })).toThrow();
  });

  test('should throw an error when creating a match with non-integer scores', async () => {
    const { Match } = await import('../match');
    expect(() => new Match({ homeTeam: 'Home', awayTeam: 'Away', homeScore: 1.5, awayScore: 1 })).toThrow();
    expect(() => new Match({ homeTeam: 'Home', awayTeam: 'Away', homeScore: 1, awayScore: 1.5 })).toThrow();
    expect(() => new Match({ homeTeam: 'Home', awayTeam: 'Away', homeScore: '1', awayScore: 1 })).toThrow();
    expect(() => new Match({ homeTeam: 'Home', awayTeam: 'Away', homeScore: 1, awayScore: '1' })).toThrow();
  });

  test('should update the score of a match', async () => {
    const { Match } = await import('../match');
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    match.updateScore({ homeScore: 2, awayScore: 1 });
    expect(match.toString()).toBe('Home 2 - 1 Away');
  });

  test('should throw an error when updating the score with negative values', async () => {
    const { Match } = await import('../match');
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    expect(() => match.updateScore({ homeScore: -1, awayScore: 1 })).toThrow();
    expect(() => match.updateScore({ homeScore: 1, awayScore: -1 })).toThrow();
    // @ts-expect-error TS2322: we are testing invalid input
    expect(() => match.updateScore({ homeScore: '1', awayScore: 1 })).toThrow();
    // @ts-expect-error TS2322: we are testing invalid input
    expect(() => match.updateScore({ homeScore: 1, awayScore: '1' })).toThrow();
  });

  test('should throw an error when updating the score with non-integer values', async () => {
    const { Match } = await import('../match');
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    expect(() => match.updateScore({ homeScore: 1.5, awayScore: 1 })).toThrow();
  });

  test('should return the total score of a match', async () => {
    const { Match } = await import('../match');
    const match = new Match({ homeTeam: 'Home', awayTeam: 'Away' });
    match.updateScore({ homeScore: 2, awayScore: 1 });
    expect(match.totalScore()).toBe(3);
  });
});
