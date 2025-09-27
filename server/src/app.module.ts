import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotModule } from './robot/robot.module';

@Module({
  imports: [RobotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
