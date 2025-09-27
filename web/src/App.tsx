import { useState } from 'react'
import Grid from './components/Grid'
import CommandPanel from './components/CommandPanel'
import './App.css'

function App() {
  // Robot state - undefined means not placed
  const [robotX, setRobotX] = useState<number | undefined>(undefined);
  const [robotY, setRobotY] = useState<number | undefined>(undefined);
  const [robotDirection, setRobotDirection] = useState<string>('NORTH');

  const isRobotPlaced = robotX !== undefined && robotY !== undefined;

  const handleCellClick = (x: number, y: number) => {
    // PLACE command - clicking a cell places the robot facing NORTH
    setRobotX(x);
    setRobotY(y);
    setRobotDirection('NORTH');
  };

  const handleMove = () => {
    if (!isRobotPlaced) return;

    let newX = robotX;
    let newY = robotY;

    switch (robotDirection) {
      case 'NORTH':
        newY = robotY + 1;
        break;
      case 'SOUTH':
        newY = robotY - 1;
        break;
      case 'EAST':
        newX = robotX + 1;
        break;
      case 'WEST':
        newX = robotX - 1;
        break;
    }

    // Check boundaries (0-4 for both x and y)
    if (newX >= 0 && newX <= 4 && newY >= 0 && newY <= 4) {
      setRobotX(newX);
      setRobotY(newY);
    }
  };

  const handleLeft = () => {
    if (!isRobotPlaced) return;

    const directions = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
    const currentIndex = directions.indexOf(robotDirection);
    const newDirection = directions[(currentIndex + 1) % 4];
    setRobotDirection(newDirection);
  };

  const handleRight = () => {
    if (!isRobotPlaced) return;

    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentIndex = directions.indexOf(robotDirection);
    const newDirection = directions[(currentIndex + 1) % 4];
    setRobotDirection(newDirection);
  };

  const handleReport = () => {
    if (!isRobotPlaced) {
      alert('Robot not placed');
    } else {
      alert(`Position: ${robotX},${robotY},${robotDirection}`);
    }
  };

  return (
    <div className="App">
      <h1>Toy Robot Simulator</h1>
      <p className="instructions">
        Click to place the robot, use the buttons or arrows to move
      </p>
      <Grid
        robotX={robotX}
        robotY={robotY}
        robotDirection={robotDirection}
        onCellClick={handleCellClick}
      />
      <CommandPanel
        onMove={handleMove}
        onLeft={handleLeft}
        onRight={handleRight}
        onReport={handleReport}
        disabled={!isRobotPlaced}
      />
    </div>
  )
}

export default App
