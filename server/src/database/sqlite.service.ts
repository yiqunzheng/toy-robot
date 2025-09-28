import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { promisify } from 'util';

export interface RobotPosition {
  x: number;
  y: number;
  direction: string;
  isPlaced: boolean;
}

export interface RobotHistoryEntry {
  x: number;
  y: number;
  direction: string;
  action: string;
}

@Injectable()
export class SqliteService implements OnModuleInit {
  private db: sqlite3.Database;
  private run: (sql: string, params?: any[]) => Promise<any>;
  private get: (sql: string, params?: any[]) => Promise<any>;

  async onModuleInit() {
    return new Promise<void>((resolve, reject) => {
      this.db = new sqlite3.Database('robot.db', (err) => {
        if (err) {
          reject(err);
        } else {
          this.run = promisify(this.db.run.bind(this.db));
          this.get = promisify(this.db.get.bind(this.db));
          this.initializeDatabase().then(resolve).catch(reject);
        }
      });
    });
  }

  private async initializeDatabase() {
    // Create robot_position table
    await this.run(`
      CREATE TABLE IF NOT EXISTS robot_position (
        id INTEGER PRIMARY KEY DEFAULT 1,
        x INTEGER NOT NULL,
        y INTEGER NOT NULL,
        direction TEXT NOT NULL,
        is_placed BOOLEAN NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create robot_history table
    await this.run(`
      CREATE TABLE IF NOT EXISTS robot_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        x INTEGER NOT NULL,
        y INTEGER NOT NULL,
        direction TEXT NOT NULL,
        action TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async savePosition(position: RobotPosition): Promise<void> {
    await this.run(`
      INSERT OR REPLACE INTO robot_position (id, x, y, direction, is_placed, updated_at)
      VALUES (1, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [position.x, position.y, position.direction, position.isPlaced ? 1 : 0]);
  }

  async getPosition(): Promise<RobotPosition | null> {
    const row = await this.get('SELECT * FROM robot_position WHERE id = 1') as any;

    if (!row || !row.is_placed) {
      return null;
    }

    return {
      x: row.x,
      y: row.y,
      direction: row.direction,
      isPlaced: !!row.is_placed
    };
  }

  async addHistory(entry: RobotHistoryEntry): Promise<void> {
    await this.run(`
      INSERT INTO robot_history (x, y, direction, action, timestamp)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [entry.x, entry.y, entry.direction, entry.action]);
  }
}