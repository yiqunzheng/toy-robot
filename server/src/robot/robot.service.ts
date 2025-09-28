import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Robot, Direction } from './robot.model';
import { RobotPosition } from '../database/entities/robot-position.entity';
import { RobotHistory } from '../database/entities/robot-history.entity';

@Injectable()
export class RobotService implements OnModuleInit {
  private robot: Robot;

  constructor(
    @InjectRepository(RobotPosition)
    private positionRepository: Repository<RobotPosition>,
    @InjectRepository(RobotHistory)
    private historyRepository: Repository<RobotHistory>,
  ) {
    this.robot = new Robot();
  }

  async onModuleInit() {
    await this.loadRobotState();
  }

  private async loadRobotState() {
    const savedPosition = await this.positionRepository.findOne({ where: { id: 1 } });
    if (savedPosition && savedPosition.isPlaced) {
      this.robot.place(savedPosition.x, savedPosition.y, savedPosition.direction as Direction);
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
      const position = new RobotPosition();
      position.id = 1;
      position.x = this.robot.x;
      position.y = this.robot.y;
      position.direction = this.robot.direction;
      position.isPlaced = this.robot.isPlaced;

      await this.positionRepository.save(position);
    }
  }

  private async addHistory(action: string) {
    if (this.robot.isPlaced) {
      const history = new RobotHistory();
      history.x = this.robot.x;
      history.y = this.robot.y;
      history.direction = this.robot.direction;
      history.action = action;

      await this.historyRepository.save(history);
    }
  }

  async getHistory(): Promise<RobotHistory[]> {
    return this.historyRepository.find({
      order: { createdAt: 'DESC' },
      take: 100,
    });
  }
}