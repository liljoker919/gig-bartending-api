using GigBartending.Api.Models;

namespace GigBartending.Api.Data;

public static class DbSeeder
{
    public static void SeedData(GigBartendingDbContext context)
    {
        // Check if data already exists
        if (context.Users.Any())
        {
            Console.WriteLine("Database already contains data. Skipping seed.");
            return;
        }

        Console.WriteLine("Seeding database...");

        // Create sample users
        var bartender1 = new User
        {
            Email = "bartender@example.com",
            PasswordHash = "hashed_password_123", // NOTE: These are plaintext for development only. Use BCrypt or ASP.NET Core Identity password hasher in production.
            Role = "Bartender",
            FirstName = "John",
            LastName = "Smith",
            PhoneNumber = "555-0101",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var bartender2 = new User
        {
            Email = "jane.bartender@example.com",
            PasswordHash = "hashed_password_456", // NOTE: These are plaintext for development only. Use BCrypt or ASP.NET Core Identity password hasher in production.
            Role = "Bartender",
            FirstName = "Jane",
            LastName = "Doe",
            PhoneNumber = "555-0102",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var venue1 = new User
        {
            Email = "venue@example.com",
            PasswordHash = "hashed_password_789", // NOTE: These are plaintext for development only. Use BCrypt or ASP.NET Core Identity password hasher in production.
            Role = "Venue",
            FirstName = "The Grand",
            LastName = "Hotel",
            PhoneNumber = "555-0201",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var venue2 = new User
        {
            Email = "downtown.venue@example.com",
            PasswordHash = "hashed_password_abc", // NOTE: These are plaintext for development only. Use BCrypt or ASP.NET Core Identity password hasher in production.
            Role = "Venue",
            FirstName = "Downtown",
            LastName = "Bar & Grill",
            PhoneNumber = "555-0202",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        context.Users.AddRange(bartender1, bartender2, venue1, venue2);
        context.SaveChanges();

        // Create sample shifts
        var shifts = new List<Shift>
        {
            new Shift
            {
                Title = "Weekend Bartender - Wedding Event",
                Description = "Looking for an experienced bartender for a wedding reception.",
                ShiftDate = DateTime.UtcNow.AddDays(7),
                StartTime = new TimeSpan(18, 0, 0),
                EndTime = new TimeSpan(23, 0, 0),
                HourlyRate = 25.00m,
                Location = "The Grand Hotel, 123 Main St",
                Status = "Open",
                VenueId = venue1.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Shift
            {
                Title = "Friday Night Bartender",
                Description = "Busy Friday night, need experienced bartender.",
                ShiftDate = DateTime.UtcNow.AddDays(5),
                StartTime = new TimeSpan(17, 0, 0),
                EndTime = new TimeSpan(1, 0, 0),
                HourlyRate = 22.00m,
                Location = "Downtown Bar & Grill, 456 Oak Ave",
                Status = "Open",
                VenueId = venue2.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Shift
            {
                Title = "Saturday Brunch Service",
                Description = "Brunch shift with cocktail service.",
                ShiftDate = DateTime.UtcNow.AddDays(3),
                StartTime = new TimeSpan(10, 0, 0),
                EndTime = new TimeSpan(15, 0, 0),
                HourlyRate = 20.00m,
                Location = "The Grand Hotel, 123 Main St",
                Status = "Open",
                VenueId = venue1.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Shift
            {
                Title = "Private Party - Experienced Required",
                Description = "Upscale private party, cocktail expertise required.",
                ShiftDate = DateTime.UtcNow.AddDays(10),
                StartTime = new TimeSpan(19, 0, 0),
                EndTime = new TimeSpan(23, 30, 0),
                HourlyRate = 30.00m,
                Location = "Downtown Bar & Grill, 456 Oak Ave",
                Status = "Open",
                VenueId = venue2.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        context.Shifts.AddRange(shifts);
        context.SaveChanges();

        Console.WriteLine($"Seeded {context.Users.Count()} users and {context.Shifts.Count()} shifts.");
    }
}
