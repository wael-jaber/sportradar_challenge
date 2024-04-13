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
    <div data-testid="edit-match-modal">
      <div>
        {/*<-- Modal content -->*/}
        <div>
          {/*<!-- Modal header -->*/}
          <div>
            <h3>{currentScore}</h3>
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
          <div>
            <div>
              <label>Home</label>
              <input
                data-testid="home-score-input"
                value={newHomeScore}
                onChange={(e) => setNewHomeScore(e.target.value)}
              />
            </div>
            <div>
              <label>Away</label>
              <input
                data-testid="away-score-input"
                value={newAwayScore}
                onChange={(e) => setNewAwayScore(e.target.value)}
              />
            </div>
          </div>
          {/*<!-- Modal footer -->*/}
          <div>
            <button
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