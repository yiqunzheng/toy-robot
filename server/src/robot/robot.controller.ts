import { Controller, Post, Get, Body } from '@nestjs/common';
import { RobotService } from './robot.service';
import { Direction } from './robot.model';

@Controller('robot')
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Post('place')
  async place(@Body() body: { x: number; y: number; direction: Direction }) {
    const success = await this.robotService.place(body.x, body.y, body.direction);
    return { success, state: this.robotService.getState() };
  }

  @Post('move')
  async move() {
    const result = await this.robotService.move();
    return { ...result, state: this.robotService.getState() };
  }

  @Post('left')
  async left() {
    const success = await this.robotService.left();
    return { success, state: this.robotService.getState() };
  }

  @Post('right')
  async right() {
    const success = await this.robotService.right();
    return { success, state: this.robotService.getState() };
  }

  @Get('report')
  report() {
    const message = this.robotService.report();
    return { message, state: this.robotService.getState() };
  }

}