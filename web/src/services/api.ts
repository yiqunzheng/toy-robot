const API_BASE_URL = 'http://localhost:3000';

export interface RobotState {
  x: number;
  y: number;
  direction: string;
  isPlaced: boolean;
}

export interface ApiResponse {
  success: boolean;
  state: RobotState;
  message?: string;
  error?: string;
}

class RobotAPI {
  async place(x: number, y: number, direction: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/robot/place`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x, y, direction }),
    });
    return response.json();
  }

  async move(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/robot/move`, {
      method: 'POST',
    });
    return response.json();
  }

  async left(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/robot/left`, {
      method: 'POST',
    });
    return response.json();
  }

  async right(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/robot/right`, {
      method: 'POST',
    });
    return response.json();
  }

  async report(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/robot/report`);
    return response.json();
  }
}

export default new RobotAPI();