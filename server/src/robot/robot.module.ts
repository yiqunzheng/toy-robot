import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotController } from './robot.controller';
import { RobotService } from './robot.service';
import { RobotPosition } from '../database/entities/robot-position.entity';
import { RobotHistory } from '../database/entities/robot-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RobotPosition, RobotHistory])],
  controllers: [RobotController],
  providers: [RobotService],
})
export class RobotModule {}