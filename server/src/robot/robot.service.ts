import { Injectable, OnModuleInit } from '@nestjs/common';
import { Robot, Direction } from './robot.model';
import { SqliteService } from '../database/sqlite.service';

@Injectable()
export class RobotService implements OnModuleInit {
  private robot: Robot;

  constructor(private sqliteService: SqliteService) {
    this.robot = new Robot();
  }

  async onModuleInit() {
    try {
      await this.loadRobotState();
    } catch (error) {
      console.log('Database not ready yet, starting with unplaced robot');
    }
  }

  private async loadRobotState() {
    try {
      const savedPosition = await this.sqliteService.getPosition();
      if (savedPosition && savedPosition.isPlaced) {
        this.robot.place(savedPosition.x, savedPosition.y, savedPosition.direction as Direction);
      }
    } catch (error) {
      // Silently fail if database isn't ready
    }
  }

  async place(x: number, y: number, direction: Direction): Promise<boolean> {
    const success = this.robot.place(x, y, direction);
    if (success) {
      await this.savePosition();
      await this.addHistory('PLACE');
    }
    return success;
  }

  async move(): Promise<{ success: boolean; error?: string }> {
    const result = this.robot.move();
    if (result.success) {
      await this.savePosition();
      await this.addHistory('MOVE');
    }
    return result;
  }

  async left(): Promise<boolean> {
    const success = this.robot.left();
    if (success) {
      await this.savePosition();
      await this.addHistory('LEFT');
    }
    return success;
  }

  async right(): Promise<boolean> {
    const success = this.robot.right();
    if (success) {
      await this.savePosition();
      await this.addHistory('RIGHT');
    }
    return success;
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

  private async savePosition() {
    if (this.robot.isPlaced) {
      try {
        await this.sqliteService.savePosition({
          x: this.robot.x,
          y: this.robot.y,
          direction: this.robot.direction,
          isPlaced: this.robot.isPlaced
        });
      } catch (error) {
        console.log('Database save failed, continuing without persistence');
      }
    }
  }

  private async addHistory(action: string) {
    if (this.robot.isPlaced) {
      try {
        await this.sqliteService.addHistory({
          x: this.robot.x,
          y: this.robot.y,
          direction: this.robot.direction,
          action
        });
      } catch (error) {
        console.log('History save failed, continuing without history');
      }
    }
  }

}