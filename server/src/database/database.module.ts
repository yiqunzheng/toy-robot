import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotPosition } from './entities/robot-position.entity';
import { RobotHistory } from './entities/robot-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../robot.db',
      entities: [RobotPosition, RobotHistory],
      synchronize: true, // Auto-create tables in development
      logging: true,
    }),
    TypeOrmModule.forFeature([RobotPosition, RobotHistory]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}