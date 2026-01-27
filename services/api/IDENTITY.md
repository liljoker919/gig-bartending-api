# Microsoft Identity Integration

This document describes the Microsoft Identity (ASP.NET Core Identity) integration in the GigBartending API.

## Overview

The API uses ASP.NET Core Identity for secure user authentication and management. Identity provides:
- Secure password hashing using PBKDF2
- Password policy enforcement
- Account lockout protection
- User management APIs
- Token-based authentication support

## Configuration

### Identity Settings (Program.cs)

```csharp
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Password settings
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 8;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // User settings
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<GigBartendingDbContext>()
.AddDefaultTokenProviders();
```

## Database Schema

Identity creates the following tables:

- **AspNetUsers**: User accounts (extends with Role, FirstName, LastName, CreatedAt, UpdatedAt)
- **AspNetRoles**: Role definitions (not currently used)
- **AspNetUserClaims**: Custom user claims
- **AspNetUserLogins**: External login providers
- **AspNetUserRoles**: User-to-role mappings
- **AspNetUserTokens**: Authentication tokens
- **AspNetRoleClaims**: Role-based claims
- **LegacyUsers**: Backward compatibility table for existing User model

## Models

### ApplicationUser

Custom user model extending `IdentityUser`:

```csharp
public class ApplicationUser : IdentityUser
{
    public required string Role { get; set; } // "Bartender" or "Venue"
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public ICollection<Shift>? Shifts { get; set; }
}
```

## Authentication Endpoints

### POST /api/auth/register

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "role": "Bartender",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "555-1234"
}
```

**Response (Success):**
```json
{
  "message": "User created successfully",
  "userId": "guid-here"
}
```

**Response (Error):**
```json
{
  "errors": [
    "Passwords must be at least 8 characters.",
    "Passwords must have at least one digit ('0'-'9')."
  ]
}
```

### POST /api/auth/login

Authenticate a user and get their information.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response (Success):**
```json
{
  "message": "Login successful",
  "userId": "guid-here",
  "email": "user@example.com",
  "role": "Bartender",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (Error):**
```json
{
  "message": "Invalid email or password"
}
```

### POST /api/auth/verify-password

Verify a user's password (for testing/validation).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response:**
```json
{
  "isValid": true,
  "message": "Password is correct"
}
```

## Password Requirements

- Minimum 8 characters
- At least one digit (0-9)
- At least one lowercase letter (a-z)
- At least one uppercase letter (A-Z)
- At least 1 unique character
- Non-alphanumeric characters are optional

## Account Lockout

To prevent brute-force attacks:
- After 5 failed login attempts, the account is locked for 5 minutes
- Lockout applies to new users by default
- Successful login resets the failed attempt counter

## Seeding Data

The DbSeeder creates sample users with properly hashed passwords:

- `bartender@example.com` / `Password123!` (Bartender - John Smith)
- `jane.bartender@example.com` / `Password456!` (Bartender - Jane Doe)
- `venue@example.com` / `Password789!` (Venue - The Grand Hotel)
- `downtown.venue@example.com` / `Password123!` (Venue - Downtown Bar & Grill)

## Database Migration

To apply Identity tables to the database:

```bash
cd services/api/GigBartending.Api
dotnet ef database update
```

To seed sample data:

```bash
dotnet run --seed-only
```

## Security Notes

1. **Email Confirmation**: Currently set to auto-confirm for development. In production, implement email verification flow.
2. **Password Hashing**: Uses Microsoft's default PBKDF2 algorithm with salt
3. **No Hardcoded Passwords**: All passwords in seeds are hashed via Identity's PasswordHasher
4. **Backward Compatibility**: Legacy User table maintained for existing Shift relationships

## Future Enhancements

- [ ] Implement JWT token-based authentication
- [ ] Add email verification flow
- [ ] Implement password reset functionality
- [ ] Add two-factor authentication support
- [ ] Implement refresh tokens
- [ ] Add role-based authorization
- [ ] External login providers (Google, Microsoft, etc.)
