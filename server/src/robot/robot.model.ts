export enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST'
}

export class Robot {
  x: number;
  y: number;
  direction: Direction;
  isPlaced: boolean;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = Direction.NORTH;
    this.isPlaced = false;
  }

  // Place robot at given coordinates facing given direction
  place(x: number, y: number, direction: Direction): boolean {
    if (this.isValidPosition(x, y)) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.isPlaced = true;
      return true;
    }
    return false;
  }

  // Move robot one step forward in current direction
  move(): { success: boolean; error?: string } {
    if (!this.isPlaced) {
      return { success: false, error: 'Robot not placed on table' };
    }

    let newX = this.x;
    let newY = this.y;

    // Calculate new position based on direction
    switch (this.direction) {
      case Direction.NORTH:
        newY += 1;
        break;
      case Direction.SOUTH:
        newY -= 1;
        break;
      case Direction.EAST:
        newX += 1;
        break;
      case Direction.WEST:
        newX -= 1;
        break;
    }

    // Validate and update position
    if (this.isValidPosition(newX, newY)) {
      this.x = newX;
      this.y = newY;
      return { success: true };
    }
    return { success: false, error: 'Cannot move: would fall off table' };
  }

  // Rotate robot 90 degrees left (counterclockwise)
  left(): boolean {
    if (!this.isPlaced) return false;

    // Rotate counterclockwise: NORTH → WEST → SOUTH → EAST → NORTH
    const directions = [Direction.NORTH, Direction.WEST, Direction.SOUTH, Direction.EAST];
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 1) % 4];
    return true;
  }

  // Rotate robot 90 degrees right (clockwise)
  right(): boolean {
    if (!this.isPlaced) return false;

    // Rotate clockwise: NORTH → EAST → SOUTH → WEST → NORTH
    const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];
    const currentIndex = directions.indexOf(this.direction);
    this.direction = directions[(currentIndex + 1) % 4];
    return true;
  }

  // Report current position and direction
  report(): string {
    if (!this.isPlaced) return 'Robot not placed on table';
    return `${this.x},${this.y},${this.direction}`;
  }

  // Check if position is within 5x5 grid bounds (0,0 = bottom left)
  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x <= 4 && y >= 0 && y <= 4;
  }
}