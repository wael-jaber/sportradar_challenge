import React, { useEffect, useState } from 'react';
import { Scoreboard, Match } from 'scoreboard';
import { EditMatchModal, Match as MatchComponent } from '../../components/';

/**
 * ScoreboardContainer component that uses the scoreboard library to manage matches and scores
 * @returns {React.ReactElement} The ScoreboardContainer component
 */
export function ScoreboardContainer(): React.ReactElement {
  // NOTE: This is a simple example of how to use the scoreboard library in a React component,
  // but if this was a real-world application, you don't want to use a class instance as a state

  const [scoreboard] = useState<Scoreboard>(new Scoreboard());
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newHomeScore, setNewHomeScore] = useState<string>('');
  const [newAwayScore, setNewAwayScore] = useState<string>('');

  useEffect(() => {
    // Update React state with the summary
    setMatches(scoreboard.getMatches());
  }, [scoreboard]); // Ensure useEffect runs only once after scoreboard instantiation

  /**
   * End a match and update the React state with the updated matches
   * @param match  The match to end
   */
  const endMatch = (match: Match) => {
    scoreboard.endMatch(match);
    setMatches(scoreboard.getMatches()); // Update React state with the updated matches
  };

  /**
   * Add a match and update the React state with the updated matches
   * @param match The match to add
   */
  const handleAddMatch = (match: Match) => {
    scoreboard.addMatch(match);
    setMatches(scoreboard.getMatches());
    // always update React state with the updated matches
    // because the scoreboard instance is the state
    // (React will not know that the matches have changed)
  };

  /**
   * Update a match and update the React state with the updated matches
   * @param match The match to update
   * @param homeScore The new home score
   * @param awayScore The new away score
   */
  const handleUpdateMatch = (match: Match, homeScore: number, awayScore: number) => {
    scoreboard.updateScore(match, homeScore, awayScore);
    setMatches(scoreboard.getMatches());
  };

  /**
   * Open the modal to edit a match
   * @param match The match to edit
   */
  const handleOpenModal = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  /**
   * Close the modal to edit a match
   */
  const handleCloseModal = () => {
    setSelectedMatch(null);
    setIsModalOpen(false);
  };

  return (
    <div data-testid="scoreboard-container">
      <div data-testid="add-match-container"></div>

      <div data-testid="matches-container">
        {matches.map((match, index) => (
          <MatchComponent
            key={index}
            score={match.toString()}
            onEndClick={() => endMatch(match)}
            onEditClick={() => handleOpenModal(match)}
          />
        ))}
      </div>
      <div data-testid="edit-match-modal">
        <EditMatchModal
          isOpen={isModalOpen}
          currentScore={selectedMatch ? selectedMatch.toString() : ''}
          newHomeScore={newHomeScore}
          newAwayScore={newAwayScore}
          setNewHomeScore={setNewHomeScore}
          setNewAwayScore={setNewAwayScore}
          onClose={handleCloseModal}
          onUpdateMatchClick={() => {
            if (selectedMatch) {
              handleUpdateMatch(selectedMatch, parseInt(newHomeScore), parseInt(newAwayScore));
              handleCloseModal();
            }
          }}
        />
      </div>
    </div>
  );
}
