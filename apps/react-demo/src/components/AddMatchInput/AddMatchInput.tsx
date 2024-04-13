import React, { useEffect, useState } from 'react';
import { Match } from 'scoreboard';

type AddMatchInputProps = {
  onAddMatch: (match: Match) => void;
};

export function AddMatchInput({ onAddMatch }: AddMatchInputProps): React.ReactElement {
  const [homeTeamName, setHomeTeamName] = useState<string>('');
  const [awayTeamName, setAwayTeamName] = useState<string>('');
  const [homeTeamScore, setHomeTeamScore] = useState<string>('');
  const [awayTeamScore, setAwayTeamScore] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    // we check if both home and away team names are not empty
    const areTeamsNamesNotEmpty = homeTeamName && awayTeamName;
    // we check if both home and away scores are empty since it's optional
    const isHomeScoreEmpty = homeTeamScore === '';
    const isAwayScoreEmpty = awayTeamScore === '';
    // we check if both home and away scores are valid integers
    const areScoresValidIntegers = Number.isInteger(Number(homeTeamScore)) && Number.isInteger(Number(awayTeamScore));
    // we check if both home and away scores are positive
    const areScoresPositive = Number(homeTeamScore) >= 0 && Number(awayTeamScore) >= 0;

    // our conditions:
    // 1. if both team names are not empty and both scores are empty
    const condition1 = areTeamsNamesNotEmpty && isHomeScoreEmpty && isAwayScoreEmpty;
    // 2. if both team names are not empty and both scores are not empty and both scores are valid integers and positive
    const condition2 =
      areTeamsNamesNotEmpty && areScoresValidIntegers && areScoresPositive && !isHomeScoreEmpty && !isAwayScoreEmpty;

    if (condition1 || condition2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [homeTeamName, awayTeamName, homeTeamScore, awayTeamScore]);

  const handleAddMatch = () => {
    const homeTeam: string = homeTeamName;
    const awayTeam: string = awayTeamName;
    // we need to check if the score isn't empty string else we set it to undefined
    const homeScore: number | undefined = homeTeamScore ? Number(homeTeamScore) : undefined;
    const awayScore: number | undefined = awayTeamScore ? Number(awayTeamScore) : undefined;

    const match: Match = new Match({
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
    });
    onAddMatch(match);
    // we reset the input fields
    setHomeTeamName('');
    setAwayTeamName('');
    setHomeTeamScore('');
    setAwayTeamScore('');
  };

  return (
    <div data-testid="add-match-input">
      <div>
        <label>Home Team</label>
        <input
          value={homeTeamName}
          data-testid={'home-team-name-input'}
          type="text"
          onChange={(e) => setHomeTeamName(e.target.value)}
        />
      </div>
      <div>
        <label>Away Team</label>
        <input
          value={awayTeamName}
          data-testid={'away-team-name-input'}
          type="text"
          onChange={(e) => setAwayTeamName(e.target.value)}
        />
      </div>
      <div>
        <label>Home Team Score</label>
        <input
          value={homeTeamScore}
          data-testid={'home-team-score-input'}
          onChange={(e) => setHomeTeamScore(e.target.value)}
        />
      </div>
      <div>
        <label>Away Team Score</label>
        <input
          value={awayTeamScore}
          data-testid={'away-team-score-input'}
          onChange={(e) => setAwayTeamScore(e.target.value)}
        />
      </div>
      <button onClick={handleAddMatch} disabled={isDisabled} data-testid="add-match-button">
        Add Match
      </button>
    </div>
  );
}
