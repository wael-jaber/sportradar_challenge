import { afterEach, describe, expect, test, vi } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { EditMatchModal } from '../EditMatchModal.tsx';

describe('ScoreboardContainer', () => {
  afterEach(cleanup);
  test('should render', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    expect(screen.getByTestId('edit-match-modal')).toBeDefined();
  });

  test('should render current score in title', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    expect(screen.getByText('(HOME) Home 0 - 0 Away (AWAY)')).toBeDefined();
  });

  test('should render home score input', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    expect(screen.getByTestId('home-score-input')).toBeDefined();
  });

  test('should render away score input', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    expect(screen.getByTestId('away-score-input')).toBeDefined();
  });

  test('should render update match button', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    expect(screen.getByTestId('update-match-button')).toBeDefined();
  });

  test('should render close button', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    expect(screen.getByTestId('close-button')).toBeDefined();
  });

  test('should call setNewHomeScore when home score input changes', () => {
    const setNewHomeScore = vi.fn();
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={setNewHomeScore}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    const homeScoreInput = screen.getByTestId('home-score-input');
    fireEvent.change(homeScoreInput, { target: { value: '7' } });
    expect(setNewHomeScore).toHaveBeenCalledWith('7');
  });

  test('should call setNewAwayScore when away score input changes', () => {
    const setNewAwayScore = vi.fn();
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={setNewAwayScore}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    const awayScoreInput = screen.getByTestId('away-score-input');
    fireEvent.change(awayScoreInput, { target: { value: '6' } });
    expect(setNewAwayScore).toHaveBeenCalledWith('6');
  });

  test('should call onClose when close button is clicked', () => {
    const onClose = vi.fn();
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={onClose}
        onUpdateMatchClick={() => {}}
      />,
    );

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  test('should call onUpdateMatchClick when update match button is clicked', () => {
    const onUpdateMatchClick = vi.fn();
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={onUpdateMatchClick}
      />,
    );

    const updateMatchButton = screen.getByTestId('update-match-button');
    fireEvent.click(updateMatchButton);
    expect(onUpdateMatchClick).toHaveBeenCalled();
  });

  test('should disable update match button when home score is invalid', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'invalid'}
        newAwayScore={'0'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    const updateMatchButton = screen.getByTestId('update-match-button');

    expect(updateMatchButton).toHaveProperty('disabled', true);
  });

  test('should disable update match button when away score is invalid', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'0'}
        newAwayScore={'invalid'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    const updateMatchButton = screen.getByTestId('update-match-button');

    expect(updateMatchButton).toHaveProperty('disabled', true);
  });

  test('should enable update match button when home and away scores are valid ', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={'6'}
        newAwayScore={'7'}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    const updateMatchButton = screen.getByTestId('update-match-button');

    expect(updateMatchButton).toHaveProperty('disabled', false);
  });

  test('should disable button on empty scores', () => {
    const screen = render(
      <EditMatchModal
        isOpen={true}
        currentScore={'Home 0 - 0 Away'}
        newHomeScore={''}
        newAwayScore={''}
        setNewHomeScore={() => {}}
        setNewAwayScore={() => {}}
        onClose={() => {}}
        onUpdateMatchClick={() => {}}
      />,
    );

    const updateMatchButton = screen.getByTestId('update-match-button');

    expect(updateMatchButton).toHaveProperty('disabled', true);
  });
});
