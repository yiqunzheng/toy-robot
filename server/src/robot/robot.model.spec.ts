import { Robot, Direction } from './robot.model';

describe('Robot Model', () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  describe('Placement', () => {
    it('should place robot at valid coordinates', () => {
      const result = robot.place(2, 3, Direction.NORTH);

      expect(result).toBe(true);
      expect(robot.x).toBe(2);
      expect(robot.y).toBe(3);
      expect(robot.direction).toBe(Direction.NORTH);
      expect(robot.isPlaced).toBe(true);
    });

    it('should reject placement outside boundaries', () => {
      expect(robot.place(-1, 2, Direction.NORTH)).toBe(false);
      expect(robot.place(5, 2, Direction.NORTH)).toBe(false);
      expect(robot.place(2, -1, Direction.NORTH)).toBe(false);
      expect(robot.place(2, 5, Direction.NORTH)).toBe(false);
      expect(robot.isPlaced).toBe(false);
    });
  });

  describe('Movement', () => {
    it('should move in all four directions', () => {
      robot.place(2, 2, Direction.NORTH);
      expect(robot.move().success).toBe(true);
      expect(robot.y).toBe(3);

      robot.place(2, 2, Direction.SOUTH);
      expect(robot.move().success).toBe(true);
      expect(robot.y).toBe(1);

      robot.place(2, 2, Direction.EAST);
      expect(robot.move().success).toBe(true);
      expect(robot.x).toBe(3);

      robot.place(2, 2, Direction.WEST);
      expect(robot.move().success).toBe(true);
      expect(robot.x).toBe(1);
    });

    it('should prevent falling off any edge', () => {
      robot.place(0, 4, Direction.NORTH);
      expect(robot.move().success).toBe(false);

      robot.place(0, 0, Direction.SOUTH);
      expect(robot.move().success).toBe(false);

      robot.place(4, 0, Direction.EAST);
      expect(robot.move().success).toBe(false);

      robot.place(0, 0, Direction.WEST);
      expect(robot.move().success).toBe(false);
    });

    it('should not move when not placed', () => {
      const result = robot.move();
      expect(result.success).toBe(false);
      expect(result.error).toContain('not placed');
    });
  });

  describe('Rotation', () => {
    it('should rotate left correctly', () => {
      robot.place(0, 0, Direction.NORTH);
      robot.left();
      expect(robot.direction).toBe(Direction.WEST);
      robot.left();
      expect(robot.direction).toBe(Direction.SOUTH);
      robot.left();
      expect(robot.direction).toBe(Direction.EAST);
      robot.left();
      expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should rotate right correctly', () => {
      robot.place(0, 0, Direction.NORTH);
      robot.right();
      expect(robot.direction).toBe(Direction.EAST);
      robot.right();
      expect(robot.direction).toBe(Direction.SOUTH);
      robot.right();
      expect(robot.direction).toBe(Direction.WEST);
      robot.right();
      expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should not rotate when not placed', () => {
      expect(robot.left()).toBe(false);
      expect(robot.right()).toBe(false);
    });
  });

  describe('Report', () => {
    it('should report position when placed', () => {
      robot.place(1, 2, Direction.EAST);
      expect(robot.report()).toBe('1,2,EAST');
    });

    it('should report "not placed" when robot is not on table', () => {
      expect(robot.report()).toBe('Robot not placed on table');
    });
  });

  describe('Example scenarios from requirements', () => {
    it('should handle PLACE 0,0,NORTH; MOVE; REPORT', () => {
      robot.place(0, 0, Direction.NORTH);
      robot.move();
      expect(robot.report()).toBe('0,1,NORTH');
    });

    it('should handle PLACE 0,0,NORTH; LEFT; REPORT', () => {
      robot.place(0, 0, Direction.NORTH);
      robot.left();
      expect(robot.report()).toBe('0,0,WEST');
    });

    it('should handle PLACE 1,2,NORTH; MOVE; MOVE; RIGHT; MOVE; REPORT', () => {
      robot.place(1, 2, Direction.NORTH);
      robot.move();
      robot.move();
      robot.right();
      robot.move();
      expect(robot.report()).toBe('2,4,EAST');
    });
  });
});