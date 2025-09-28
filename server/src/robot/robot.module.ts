import { Module } from '@nestjs/common';
import { RobotController } from './robot.controller';
import { RobotService } from './robot.service';
import { SqliteService } from '../database/sqlite.service';

@Module({
  controllers: [RobotController],
  providers: [RobotService, SqliteService],
})
export class RobotModule {}