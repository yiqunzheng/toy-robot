import React from 'react';
import './Grid.css';

interface GridProps {
  robotX?: number;
  robotY?: number;
  robotDirection?: string;
  onCellClick: (x: number, y: number) => void;
}

const Grid: React.FC<GridProps> = ({ robotX, robotY, robotDirection, onCellClick }) => {
  // Create 5x5 grid with origin (0,0) at bottom-left
  const renderGrid = () => {
    const rows = [];

    // Render from top to bottom (y=4 to y=0) for visual layout
    for (let y = 4; y >= 0; y--) {
      const cells = [];

      for (let x = 0; x < 5; x++) {
        const hasRobot = robotX === x && robotY === y;

        cells.push(
          <td
            key={`${x}-${y}`}
            className="grid-cell"
            onClick={() => onCellClick(x, y)}
          >
            {hasRobot && (
              <div className={`robot robot-${robotDirection?.toLowerCase()}`}>
                🤖
                <div className="robot-arrow">
                  {robotDirection === 'NORTH' && '▲'}
                  {robotDirection === 'SOUTH' && '▼'}
                  {robotDirection === 'EAST' && '▶'}
                  {robotDirection === 'WEST' && '◀'}
                </div>
              </div>
            )}
          </td>
        );
      }

      rows.push(
        <tr key={y}>
          {cells}
        </tr>
      );
    }

    return rows;
  };

  return (
    <div className="grid-container">
      <table className="grid-table">
        <tbody>
          {renderGrid()}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;