import React, { useEffect, useState } from 'react';
import { Scoreboard, Match } from 'scoreboard';
import { Match as MatchComponent } from '../../components/';

export function ScoreboardContainer(): React.ReactElement {
  // NOTE: This is a simple example of how to use the scoreboard library in a React component,
  // but if this was a real-world application, you don't want to use a class instance as a state

  const [scoreboard] = useState<Scoreboard>(new Scoreboard());
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newHomeScore, setNewHomeScore] = useState<number>(0);
  const [newAwayScore, setNewAwayScore] = useState<number>(0);

  useEffect(() => {
    // Update React state with the summary
    setMatches(scoreboard.getMatches());
  }, [scoreboard]); // Ensure useEffect runs only once after scoreboard instantiation

  const endMatch = (match: Match) => {
    scoreboard.endMatch(match);
    setMatches(scoreboard.getMatches()); // Update React state with the updated matches
  };

  const handleAddMatch = (match: Match) => {
    scoreboard.addMatch(match);
    setMatches(scoreboard.getMatches());
    // always update React state with the updated matches
    // because the scoreboard instance is the state
    // (React will not know that the matches have changed)
  };

  const handleUpdateMatch = (match: Match, homeScore: number, awayScore: number) => {
    scoreboard.updateScore(match, homeScore, awayScore);
    setMatches(scoreboard.getMatches());
  };

  const handleOpenModal = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

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
      <div data-testid="edit-match-modal"></div>
    </div>
  );
}
