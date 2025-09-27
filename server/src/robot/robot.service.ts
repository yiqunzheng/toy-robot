import { Injectable } from '@nestjs/common';
import { Robot, Direction } from './robot.model';

@Injectable()
export class RobotService {
  private robot: Robot;

  constructor() {
    this.robot = new Robot();
  }

  place(x: number, y: number, direction: Direction): boolean {
    return this.robot.place(x, y, direction);
  }

  move(): { success: boolean; error?: string } {
    return this.robot.move();
  }

  left(): boolean {
    return this.robot.left();
  }

  right(): boolean {
    return this.robot.right();
  }

  report(): string {
    return this.robot.report();
  }

  getState() {
    return {
      x: this.robot.x,
      y: this.robot.y,
      direction: this.robot.direction,
      isPlaced: this.robot.isPlaced
    };
  }
}