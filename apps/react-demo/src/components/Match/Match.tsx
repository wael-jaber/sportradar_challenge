import React from 'react';

type MatchProps = {
  score: string;
  onEditClick: () => void;
  onEndClick: () => void;
};

/**
 * Match component that displays the score of a match and provides buttons to edit and end the match.
 * @param props {MatchProps}
 * @param props.score {string} The score of the match.
 * @param props.onEditClick {() => void} Function to call when the edit button is clicked.
 * @param props.onEndClick  {() => void}  Function to call when the end button is clicked.
 */
export const Match: React.FC<MatchProps> = ({ score, onEditClick, onEndClick }: MatchProps) => {
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    onEditClick();
  };

  const handleEndClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    onEndClick();
  };

  return (
    <div>
      <div id={'score'}>{score}</div>

      <div id={'controls'}>
        <button data-testid={'edit-button'} onClick={handleEditClick}>
          Edit
        </button>
        <button data-testid={'end-button'} onClick={handleEndClick}>
          End
        </button>
      </div>
    </div>
  );
};
