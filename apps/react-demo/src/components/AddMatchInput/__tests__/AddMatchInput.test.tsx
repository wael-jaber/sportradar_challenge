import { afterEach, describe, expect, test, vi } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddMatchInput } from '../AddMatchInput.tsx';
import { Match } from 'scoreboard';

describe('ScoreboardContainer', () => {
  afterEach(cleanup);
  test('should render', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    expect(screen.getByTestId('add-match-input')).toBeDefined();
  });

  test('should render add match button', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    expect(screen.getByTestId('add-match-button')).toBeDefined();
  });

  test('should render home team name input', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    expect(screen.getByTestId('home-team-name-input')).toBeDefined();
  });

  test('should render away team score input', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    expect(screen.getByTestId('away-team-score-input')).toBeDefined();
  });

  test('should render home team score input', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    expect(screen.getByTestId('home-team-score-input')).toBeDefined();
  });

  test('should disable add match button when home team name is empty', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    expect(screen.getByTestId('add-match-button')).toHaveProperty('disabled', true);
  });

  test('should enable add match button when home team name and away team name are both not empty', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    fireEvent.change(screen.getByTestId('home-team-name-input'), { target: { value: 'home' } });
    expect(screen.getByTestId('add-match-button')).toHaveProperty('disabled', true);
    fireEvent.change(screen.getByTestId('away-team-name-input'), { target: { value: 'away' } });
    expect(screen.getByTestId('add-match-button')).toHaveProperty('disabled', false);
  });

  test('should disable add match button when home score is empty and away score is not empty', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    fireEvent.change(screen.getByTestId('home-team-name-input'), { target: { value: 'home' } });
    fireEvent.change(screen.getByTestId('away-team-name-input'), { target: { value: 'away' } });
    fireEvent.change(screen.getByTestId('away-team-score-input'), { target: { value: '2' } });
    expect(screen.getByTestId('add-match-button')).toHaveProperty('disabled', true);
  });

  test('should disable add match button when away score is empty and home score is not empty', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    fireEvent.change(screen.getByTestId('home-team-name-input'), { target: { value: 'home' } });
    fireEvent.change(screen.getByTestId('away-team-name-input'), { target: { value: 'away' } });
    fireEvent.change(screen.getByTestId('home-team-score-input'), { target: { value: '1' } });
    expect(screen.getByTestId('add-match-button')).toHaveProperty('disabled', true);
  });

  test('should enable add match button when home score and away score are both not empty', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    fireEvent.change(screen.getByTestId('home-team-name-input'), { target: { value: 'home' } });
    fireEvent.change(screen.getByTestId('away-team-name-input'), { target: { value: 'away' } });
    fireEvent.change(screen.getByTestId('home-team-score-input'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('away-team-score-input'), { target: { value: '2' } });
    expect(screen.getByTestId('add-match-button')).toHaveProperty('disabled', false);
  });

  test('should disable add match button when home score is not a number', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    fireEvent.change(screen.getByTestId('home-team-name-input'), { target: { value: 'home' } });
    fireEvent.change(screen.getByTestId('away-team-name-input'), { target: { value: 'away' } });
    fireEvent.change(screen.getByTestId('home-team-score-input'), { target: { value: 'a' } });
    fireEvent.change(screen.getByTestId('away-team-score-input'), { target: { value: '2' } });
    expect(screen.getByTestId('add-match-button')).toHaveProperty('disabled', true);
  });

  test('should disable add match button when away score is not a number', () => {
    const screen = render(<AddMatchInput onAddMatch={() => {}} />);
    fireEvent.change(screen.getByTestId('home-team-name-input'), { target: { value: 'home' } });
    fireEvent.change(screen.getByTestId('away-team-name-input'), { target: { value: 'away' } });
    fireEvent.change(screen.getByTestId('home-team-score-input'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('away-team-score-input'), { target: { value: 'a' } });
    expect(screen.getByTestId('add-match-button')).toHaveProperty('disabled', true);
  });

  test('should call onAddMatch when add match button is clicked', () => {
    const onAddMatch = vi.fn();
    const screen = render(<AddMatchInput onAddMatch={onAddMatch} />);
    fireEvent.change(screen.getByTestId('home-team-name-input'), { target: { value: 'home' } });
    fireEvent.change(screen.getByTestId('away-team-name-input'), { target: { value: 'away' } });
    fireEvent.change(screen.getByTestId('home-team-score-input'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('away-team-score-input'), { target: { value: '2' } });
    fireEvent.click(screen.getByTestId('add-match-button'));
    expect(onAddMatch).toHaveBeenCalled();
    expect(onAddMatch).toHaveBeenCalledWith(expect.any(Match));
  });

  test('should clear input fields when add match button is clicked', () => {
    const onAddMatch = vi.fn();
    const screen = render(<AddMatchInput onAddMatch={onAddMatch} />);
    fireEvent.change(screen.getByTestId('home-team-name-input'), { target: { value: 'home' } });
    fireEvent.change(screen.getByTestId('away-team-name-input'), { target: { value: 'away' } });
    fireEvent.change(screen.getByTestId('home-team-score-input'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('away-team-score-input'), { target: { value: '2' } });
    fireEvent.click(screen.getByTestId('add-match-button'));
    expect(screen.getByTestId('home-team-name-input')).toHaveProperty('value', '');
    expect(screen.getByTestId('away-team-name-input')).toHaveProperty('value', '');
    expect(screen.getByTestId('home-team-score-input')).toHaveProperty('value', '');
    expect(screen.getByTestId('away-team-score-input')).toHaveProperty('value', '');
  });
});
