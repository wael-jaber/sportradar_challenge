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
    <div className={'flex w-full border-2 rounded-lg p-5 align-middle'}>
      <div
        id={'score'}
        className={'w-full text-center font-extrabold'}
        style={{ wordSpacing: '20px', height: 'max-content' }}
      >
        {score}
      </div>

      <div id={'controls'} className={'flex space-x-5 ml-auto'}>
        <button
          className={'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full'}
          data-testid={'edit-button'}
          onClick={handleEditClick}
        >
          Edit
        </button>
        <button
          className={'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'}
          data-testid={'end-button'}
          onClick={handleEndClick}
        >
          End
        </button>
      </div>
    </div>
  );
};
