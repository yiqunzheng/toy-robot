import React from 'react';
import './CommandPanel.css';

interface CommandPanelProps {
  onLeft: () => void;
  onMove: () => void;
  onRight: () => void;
  onReport: () => void;
  disabled?: boolean;
}

const CommandPanel: React.FC<CommandPanelProps> = ({
  onLeft,
  onMove,
  onRight,
  onReport,
  disabled = false
}) => {
  return (
    <div className="command-panel">
      <div className="direction-buttons">
        <button
          className="command-button"
          onClick={onLeft}
          disabled={disabled}
        >
          Left
        </button>
        <button
          className="command-button"
          onClick={onMove}
          disabled={disabled}
        >
          Move
        </button>
        <button
          className="command-button"
          onClick={onRight}
          disabled={disabled}
        >
          Right
        </button>
      </div>
      <button
        className="command-button report-button"
        onClick={onReport}
        disabled={disabled}
      >
        Report
      </button>
    </div>
  );
};

export default CommandPanel;