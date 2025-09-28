import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('robot_position')
export class RobotPosition {
  @PrimaryColumn()
  id: number = 1;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  direction: string;

  @Column({ name: 'is_placed' })
  isPlaced: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}