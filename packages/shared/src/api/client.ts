// API client utilities - mock implementation for now
// This structure allows for easy replacement with real API calls

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    // Mock implementation
    throw new Error('API not yet implemented');
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    // Mock implementation
    throw new Error('API not yet implemented');
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    // Mock implementation
    throw new Error('API not yet implemented');
  }

  async delete<T>(endpoint: string): Promise<T> {
    // Mock implementation
    throw new Error('API not yet implemented');
  }
}

export const apiClient = new ApiClient();
