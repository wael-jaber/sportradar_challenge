import { afterEach, describe, expect, test } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { ScoreboardContainer } from '../ScoreboardContainer.tsx';

describe('ScoreboardContainer', () => {
  afterEach(cleanup);
  test('should render', () => {
    const screen = render(<ScoreboardContainer />);
    expect(screen.getByTestId('scoreboard-container')).toBeDefined();
  });

  test('should render matches container', () => {
    const screen = render(<ScoreboardContainer />);
    expect(screen.getByTestId('matches-container')).toBeDefined();
  });
  test('should render add match container', () => {
    const screen = render(<ScoreboardContainer />);
    expect(screen.getByTestId('add-match-container')).toBeDefined();
  });
  test('should render edit match modal', () => {
    const screen = render(<ScoreboardContainer />);
    expect(screen.getByTestId('edit-match-modal')).toBeDefined();
  });
});
