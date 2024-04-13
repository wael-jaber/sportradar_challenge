import React from 'react';

type EditMatchModalProps = {
  currentScore: string;
  newHomeScore: string;
  newAwayScore: string;
  setNewHomeScore: (newHomeScore: string) => void;
  setNewAwayScore: (newAwayScore: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onUpdateMatchClick: () => void;
};

/**
 * Edit match modal component
 * @param props
 * @param props.isOpen - Whether the modal is open
 * @param props.currentScore - The current score of the match
 * @param props.newHomeScore - The new home score
 * @param props.newAwayScore - The new away score
 * @param props.setNewHomeScore - Function to set the new home score
 * @param props.setNewAwayScore - Function to set the new away score
 * @param props.onClose - Function to close the modal
 * @param props.onUpdateMatchClick - Function to update the match
 */
export const EditMatchModal: React.FC<EditMatchModalProps> = ({
  isOpen,
  currentScore,
  newHomeScore,
  newAwayScore,
  setNewHomeScore,
  setNewAwayScore,
  onClose,
  onUpdateMatchClick,
}: EditMatchModalProps) => {
  // check if both scores are not empty and valid numbers (including zero)
  const isUpdateDisabled = !newHomeScore || !newAwayScore || isNaN(Number(newHomeScore)) || isNaN(Number(newAwayScore));
  if (!isOpen) {
    return <> </>;
  }
  return (
    /* <!-- Main modal -->  */
    <div
      data-testid="edit-match-modal"
      className={
        'flex align-middle justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
      }
      onClick={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className={'relative p-4 w-full max-w-2xl max-h-full'} onClick={(e) => e.stopPropagation()}>
        {/*<-- Modal content -->*/}
        <div className={'relative bg-white rounded-lg shadow dark:bg-gray-700'}>
          {/*<!-- Modal header -->*/}
          <div className={'flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {' '}
              {'(HOME) ' + currentScore + ' (AWAY)'}{' '}
            </h3>
            <button type="button" data-testid="close-button" onClick={() => onClose()}>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          {/*<!-- Modal body -->*/}
          <div className={'flex flex-col space-y-5 p-4'}>
            <div className={'flex items-center space-x-3'}>
              <label className={'text-nowrap'}>New Home Score</label>
              <input
                className={` bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${newHomeScore !== '' && isNaN(Number(newHomeScore)) ? 'border-red-500' : ''}`}
                data-testid="home-score-input"
                value={newHomeScore}
                onChange={(e) => setNewHomeScore(e.target.value)}
              />
            </div>
            <div className={'flex items-center space-x-3'}>
              <label className={'text-nowrap'}>New Away score</label>
              <input
                className={` bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${newAwayScore !== '' && isNaN(Number(newAwayScore)) ? 'border-red-500' : ''}`}
                data-testid="away-score-input"
                value={newAwayScore}
                onChange={(e) => setNewAwayScore(e.target.value)}
              />
            </div>
          </div>
          {/*<!-- Modal footer -->*/}
          <div className={'flex p-3'}>
            <button
              className={`ml-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed text-nowrap`}
              data-testid="update-match-button"
              type="button"
              disabled={isUpdateDisabled}
              onClick={() => onUpdateMatchClick()}
            >
              Update scores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
