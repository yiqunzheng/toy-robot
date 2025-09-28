import { Module } from '@nestjs/common';
import { RobotModule } from './robot/robot.module';

@Module({
  imports: [RobotModule],
})
export class AppModule {}
