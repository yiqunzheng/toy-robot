import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotModule } from './robot/robot.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, RobotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
