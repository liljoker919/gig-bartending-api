# API Integration Guide

This document outlines the API structure needed to integrate a backend with the Gig Bartending App.

## Overview

The application is currently using mock data and authentication. To integrate with a real backend, you'll need to implement the following API endpoints and update the API client in `packages/shared/src/api/client.ts`.

## Base URL

```
Production: https://api.gigbartending.com
Development: http://localhost:8000/api
```

## Authentication

All authenticated endpoints should include a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "bartender" | "venue",
  "profile": {
    // For bartender:
    "name": "John Doe",
    "phone": "555-0123",
    "bio": "Experienced bartender",
    "experience": "5 years",
    "certifications": ["TIPS Certified", "Mixology Certificate"],
    "availability": "Weekends and evenings"
    
    // For venue:
    "venueName": "The Golden Bar",
    "address": "123 Main St",
    "phone": "555-0456",
    "description": "Premium cocktail bar",
    "venueType": "Cocktail Bar"
  }
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "role": "bartender",
    "profile": { ... }
  }
}
```

#### POST /auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "role": "bartender",
    "profile": { ... }
  }
}
```

#### POST /auth/logout
Logout the current user (invalidate token).

**Response:**
```json
{
  "success": true
}
```

#### GET /auth/me
Get current authenticated user.

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "role": "bartender",
  "profile": { ... }
}
```

### Shifts

#### GET /shifts
Get all shifts (filtered based on user role).

**Query Parameters:**
- `status` (optional): "open" | "pending" | "accepted" | "completed" | "cancelled"
- `date` (optional): Filter by date (YYYY-MM-DD)
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "shifts": [
    {
      "id": "shift_123",
      "venueId": "venue_456",
      "venueName": "The Golden Bar",
      "venueAddress": "123 Main St, Downtown",
      "title": "Friday Night Bartender",
      "description": "Looking for experienced bartender",
      "date": "2026-01-24",
      "startTime": "18:00",
      "endTime": "02:00",
      "hourlyRate": 25.00,
      "status": "open",
      "requestedBy": ["bartender_789"],
      "acceptedBy": null,
      "createdAt": "2026-01-19T10:00:00Z",
      "updatedAt": "2026-01-19T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

#### GET /shifts/:id
Get a specific shift by ID.

**Response:**
```json
{
  "id": "shift_123",
  "venueId": "venue_456",
  "venueName": "The Golden Bar",
  "venueAddress": "123 Main St, Downtown",
  "title": "Friday Night Bartender",
  "description": "Looking for experienced bartender",
  "date": "2026-01-24",
  "startTime": "18:00",
  "endTime": "02:00",
  "hourlyRate": 25.00,
  "status": "open",
  "requestedBy": ["bartender_789"],
  "acceptedBy": null,
  "createdAt": "2026-01-19T10:00:00Z",
  "updatedAt": "2026-01-19T10:00:00Z"
}
```

#### POST /shifts
Create a new shift (venue only).

**Request Body:**
```json
{
  "title": "Friday Night Bartender",
  "description": "Looking for experienced bartender for busy Friday night",
  "date": "2026-01-24",
  "startTime": "18:00",
  "endTime": "02:00",
  "hourlyRate": 25.00
}
```

**Response:**
```json
{
  "id": "shift_123",
  "venueId": "venue_456",
  "venueName": "The Golden Bar",
  "venueAddress": "123 Main St, Downtown",
  "title": "Friday Night Bartender",
  "description": "Looking for experienced bartender for busy Friday night",
  "date": "2026-01-24",
  "startTime": "18:00",
  "endTime": "02:00",
  "hourlyRate": 25.00,
  "status": "open",
  "requestedBy": [],
  "acceptedBy": null,
  "createdAt": "2026-01-19T10:00:00Z",
  "updatedAt": "2026-01-19T10:00:00Z"
}
```

#### PUT /shifts/:id
Update a shift (venue owner only).

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "hourlyRate": 30.00
}
```

**Response:**
```json
{
  "id": "shift_123",
  // ... updated shift data
}
```

#### DELETE /shifts/:id
Cancel/delete a shift (venue owner only).

**Response:**
```json
{
  "success": true,
  "message": "Shift cancelled successfully"
}
```

#### POST /shifts/:id/request
Request a shift (bartender only).

**Response:**
```json
{
  "success": true,
  "shift": {
    // ... updated shift with bartender added to requestedBy
  }
}
```

#### POST /shifts/:id/accept
Accept a bartender's request for a shift (venue owner only).

**Request Body:**
```json
{
  "bartenderId": "bartender_789"
}
```

**Response:**
```json
{
  "success": true,
  "shift": {
    // ... updated shift with acceptedBy set
  }
}
```

#### POST /shifts/:id/reject
Reject a bartender's request (venue owner only).

**Request Body:**
```json
{
  "bartenderId": "bartender_789"
}
```

**Response:**
```json
{
  "success": true,
  "shift": {
    // ... updated shift with bartender removed from requestedBy
  }
}
```

### Profile

#### GET /profile
Get current user's profile.

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "role": "bartender",
  "profile": {
    "name": "John Doe",
    "phone": "555-0123",
    "bio": "Experienced bartender",
    "experience": "5 years",
    "certifications": ["TIPS Certified"],
    "availability": "Weekends and evenings",
    "photoUrl": "https://example.com/photos/user_123.jpg"
  }
}
```

#### PUT /profile
Update current user's profile.

**Request Body:**
```json
{
  "profile": {
    "bio": "Updated bio",
    "experience": "6 years"
  }
}
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "role": "bartender",
  "profile": {
    // ... updated profile
  }
}
```

#### POST /profile/photo
Upload profile photo.

**Request:** Multipart form data with image file

**Response:**
```json
{
  "photoUrl": "https://example.com/photos/user_123.jpg"
}
```

## Error Responses

All endpoints should return consistent error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional details
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` (401): Invalid or missing authentication token
- `FORBIDDEN` (403): User doesn't have permission for this action
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Invalid request data
- `CONFLICT` (409): Resource conflict (e.g., already requested this shift)
- `INTERNAL_ERROR` (500): Server error

## Implementation Steps

### 1. Update API Client

Edit `packages/shared/src/api/client.ts`:

```typescript
export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = process.env.API_BASE_URL || 'http://localhost:8000/api') {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Request failed');
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
```

### 2. Update Auth Context

Replace mock authentication in `packages/shared/src/contexts/AuthContext.tsx` with real API calls:

```typescript
const login = async (credentials: LoginCredentials) => {
  setAuthState(prev => ({ ...prev, isLoading: true }));
  try {
    const response = await apiClient.post('/auth/login', credentials);
    apiClient.setToken(response.token);
    
    setAuthState({
      user: response.user,
      isAuthenticated: true,
      isLoading: false,
    });
  } catch (error) {
    setAuthState(prev => ({ ...prev, isLoading: false }));
    throw error;
  }
};
```

### 3. Update Shift Hook

Replace mock data in `packages/shared/src/hooks/useShifts.ts` with real API calls:

```typescript
useEffect(() => {
  const loadShifts = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<{ shifts: Shift[] }>('/shifts');
      setShifts(data.shifts);
    } catch (error) {
      console.error('Failed to load shifts:', error);
    } finally {
      setLoading(false);
    }
  };

  loadShifts();
}, []);
```

## Security Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **Token Expiration**: Implement JWT token expiration and refresh
3. **Rate Limiting**: Implement rate limiting on API endpoints
4. **Input Validation**: Validate all inputs on the backend
5. **SQL Injection**: Use parameterized queries
6. **XSS Prevention**: Sanitize user inputs
7. **CSRF Protection**: Implement CSRF tokens for state-changing operations

## Testing

Use tools like Postman or curl to test API endpoints:

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"bartender@example.com","password":"password123"}'

# Get shifts (with token)
curl http://localhost:8000/api/shifts \
  -H "Authorization: Bearer <token>"
```

## Additional Resources

- [JWT.io](https://jwt.io/) - Learn about JSON Web Tokens
- [RESTful API Design](https://restfulapi.net/) - Best practices for REST APIs
- [OpenAPI Specification](https://swagger.io/specification/) - API documentation standard
