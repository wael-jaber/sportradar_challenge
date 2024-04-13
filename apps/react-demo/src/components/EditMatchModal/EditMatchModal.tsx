import React from 'react';

type EditMatchModalProps = {
  currentScore: string;
  newHomeScore: number;
  newAwayScore: number;
  setNewHomeScore: (newHomeScore: number) => void;
  setNewAwayScore: (newAwayScore: number) => void;
  isOpen: boolean;
  onClose: () => void;
  onUpdateMatchClick: () => void;
};

export function EditMatchModal(props: EditMatchModalProps): React.ReactElement {
  return <div></div>;
}
