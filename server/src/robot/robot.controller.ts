import { Controller, Post, Get, Body } from '@nestjs/common';
import { RobotService } from './robot.service';
import { Direction } from './robot.model';

@Controller('robot')
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Post('place')
  place(@Body() body: { x: number; y: number; direction: Direction }) {
    const success = this.robotService.place(body.x, body.y, body.direction);
    return { success, state: this.robotService.getState() };
  }

  @Post('move')
  move() {
    const result = this.robotService.move();
    return { ...result, state: this.robotService.getState() };
  }

  @Post('left')
  left() {
    const success = this.robotService.left();
    return { success, state: this.robotService.getState() };
  }

  @Post('right')
  right() {
    const success = this.robotService.right();
    return { success, state: this.robotService.getState() };
  }

  @Get('report')
  report() {
    const message = this.robotService.report();
    return { message, state: this.robotService.getState() };
  }
}