# Toy Robot Simulator

A web-based toy robot simulator where a robot moves on a 5x5 grid table. Users can place, move, and rotate the robot through a visual interface with persistence support.

## Features

- **5x5 Grid Interface**: Click to place the robot anywhere on the table
- **Movement Controls**: Move the robot forward in its current direction
- **Rotation Controls**: Turn the robot left or right (90 degrees)
- **Keyboard Support**: Use arrow keys for quick movements
- **Position Persistence**: Robot position saved to database and restored on page refresh
- **Movement History**: All robot movements are logged to database
- **Boundary Protection**: Robot cannot fall off the table edges

## Tech Stack

### Backend
- **Node.js** with **NestJS** framework
- **TypeScript** for type safety
- **SQLite** database for persistence
- **Jest** for unit testing

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **CSS** for styling

## Project Structure

```
toy-robot/
├── server/                 # Backend NestJS application
│   ├── src/
│   │   ├── robot/         # Robot module (model, controller, service)
│   │   ├── database/      # SQLite service
│   │   └── app.module.ts  # Main application module
│   └── robot.db           # SQLite database file
│
├── web/                    # Frontend React application
│   ├── src/
│   │   ├── components/    # Grid and CommandPanel components
│   │   ├── services/      # API service
│   │   └── App.tsx        # Main app component
│   └── package.json
│
└── package.json           # Root package with convenience scripts
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd toy-robot
```

2. Install dependencies:
```bash
npm install
```

This will install dependencies for both server and web applications.

### Running the Application

From the root directory:

```bash
# Start both backend and frontend together
npm start
```

Or run them separately in different terminals:

```bash
# Terminal 1 - Start backend (http://localhost:3000)
cd server
npm run start:dev

# Terminal 2 - Start frontend (http://localhost:5173)
cd web
npm run dev
```

### Running Tests

```bash
# Run backend unit tests
npm test
```

## API Endpoints

The backend provides these REST endpoints:

- `POST /robot/place` - Place robot at specified position
- `POST /robot/move` - Move robot forward
- `POST /robot/left` - Rotate robot left
- `POST /robot/right` - Rotate robot right
- `GET /robot/report` - Get current position

## Database Schema

**robot_position** - Current robot state (single row):
```sql
id | x | y | direction | is_placed | updated_at
```

**robot_history** - Movement history log:
```sql
id | x | y | direction | action | timestamp
```

## Architecture Notes

- **Minimal Dependencies**: Only essential packages used
- **Error Handling**: Graceful degradation - app works even if database fails
- **State Management**: In-memory state with database persistence

