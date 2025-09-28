import { useState, useEffect } from 'react'
import Grid from './components/Grid'
import CommandPanel from './components/CommandPanel'
import robotAPI from './services/api'
import './App.css'

function App() {
  // Robot state - undefined means not placed
  const [robotX, setRobotX] = useState<number | undefined>(undefined);
  const [robotY, setRobotY] = useState<number | undefined>(undefined);
  const [robotDirection, setRobotDirection] = useState<string>('NORTH');

  const isRobotPlaced = robotX !== undefined && robotY !== undefined;

  // Load initial robot state from backend on mount
  useEffect(() => {
    const loadRobotState = async () => {
      try {
        const response = await robotAPI.report();
        if (response.state && response.state.isPlaced) {
          setRobotX(response.state.x);
          setRobotY(response.state.y);
          setRobotDirection(response.state.direction);
        } else {
          // Ensure robot starts unplaced if not in database
          setRobotX(undefined);
          setRobotY(undefined);
          setRobotDirection('NORTH');
        }
      } catch (error) {
        console.error('Failed to load initial robot state:', error);
        // Start with empty grid if API fails
        setRobotX(undefined);
        setRobotY(undefined);
        setRobotDirection('NORTH');
      }
    };
    loadRobotState();
  }, []);

  const handleCellClick = async (x: number, y: number) => {
    // PLACE command via API
    try {
      const response = await robotAPI.place(x, y, 'NORTH');
      if (response.success) {
        setRobotX(response.state.x);
        setRobotY(response.state.y);
        setRobotDirection(response.state.direction);
      }
    } catch (error) {
      console.error('Failed to place robot:', error);
    }
  };

  const handleMove = async () => {
    if (!isRobotPlaced) return;

    try {
      const response = await robotAPI.move();
      if (response.success) {
        setRobotX(response.state.x);
        setRobotY(response.state.y);
        setRobotDirection(response.state.direction);
      }
    } catch (error) {
      console.error('Failed to move robot:', error);
    }
  };

  const handleLeft = async () => {
    if (!isRobotPlaced) return;

    try {
      const response = await robotAPI.left();
      if (response.success) {
        setRobotDirection(response.state.direction);
      }
    } catch (error) {
      console.error('Failed to turn left:', error);
    }
  };

  const handleRight = async () => {
    if (!isRobotPlaced) return;

    try {
      const response = await robotAPI.right();
      if (response.success) {
        setRobotDirection(response.state.direction);
      }
    } catch (error) {
      console.error('Failed to turn right:', error);
    }
  };

  const handleReport = async () => {
    try {
      const response = await robotAPI.report();
      alert(response.message || 'Robot not placed');
    } catch (error) {
      console.error('Failed to get report:', error);
      alert('Failed to get robot position');
    }
  };

  // Keyboard controls - arrow keys for directional movement
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (!isRobotPlaced) return;

      let targetX = robotX;
      let targetY = robotY;
      let targetDirection = robotDirection;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          targetY = robotY + 1;
          targetDirection = 'NORTH';
          break;
        case 'ArrowDown':
          e.preventDefault();
          targetY = robotY - 1;
          targetDirection = 'SOUTH';
          break;
        case 'ArrowLeft':
          e.preventDefault();
          targetX = robotX - 1;
          targetDirection = 'WEST';
          break;
        case 'ArrowRight':
          e.preventDefault();
          targetX = robotX + 1;
          targetDirection = 'EAST';
          break;
        default:
          return;
      }

      // Check boundaries before making API call
      if (targetX >= 0 && targetX <= 4 && targetY >= 0 && targetY <= 4) {
        try {
          // Use API to ensure database logging
          const response = await robotAPI.place(targetX, targetY, targetDirection);
          if (response.success) {
            setRobotX(response.state.x);
            setRobotY(response.state.y);
            setRobotDirection(response.state.direction);
          }
        } catch (error) {
          console.error('Failed to move robot via arrow keys:', error);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRobotPlaced, robotX, robotY, robotDirection]);

  return (
    <div className="App">
      <div className="instructions">
        Click to place the robot, use the buttons or arrows to move
      </div>
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
