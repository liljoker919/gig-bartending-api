using GigBartending.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GigBartending.Api.Data;

public static class DbSeeder
{
    public static async Task SeedDataAsync(GigBartendingDbContext context, UserManager<ApplicationUser> userManager)
    {
        // Check if data already exists in either Identity users or Legacy users
        if (context.Users.Any() || context.LegacyUsers.Any())
        {
            Console.WriteLine("Database already contains data. Skipping seed.");
            return;
        }

        Console.WriteLine("Seeding database...");

        // Create sample users with Identity
        var bartender1 = new ApplicationUser
        {
            UserName = "bartender@example.com",
            Email = "bartender@example.com",
            Role = "Bartender",
            FirstName = "John",
            LastName = "Smith",
            PhoneNumber = "555-0101",
            EmailConfirmed = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        var bartender1Result = await userManager.CreateAsync(bartender1, "Password123!");
        if (!bartender1Result.Succeeded)
        {
            Console.WriteLine($"Failed to create bartender1: {string.Join(", ", bartender1Result.Errors.Select(e => e.Description))}");
        }

        var bartender2 = new ApplicationUser
        {
            UserName = "jane.bartender@example.com",
            Email = "jane.bartender@example.com",
            Role = "Bartender",
            FirstName = "Jane",
            LastName = "Doe",
            PhoneNumber = "555-0102",
            EmailConfirmed = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        var bartender2Result = await userManager.CreateAsync(bartender2, "Password456!");
        if (!bartender2Result.Succeeded)
        {
            Console.WriteLine($"Failed to create bartender2: {string.Join(", ", bartender2Result.Errors.Select(e => e.Description))}");
        }

        var venue1 = new ApplicationUser
        {
            UserName = "venue@example.com",
            Email = "venue@example.com",
            Role = "Venue",
            FirstName = "The Grand",
            LastName = "Hotel",
            PhoneNumber = "555-0201",
            EmailConfirmed = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        var venue1Result = await userManager.CreateAsync(venue1, "Password789!");
        if (!venue1Result.Succeeded)
        {
            Console.WriteLine($"Failed to create venue1: {string.Join(", ", venue1Result.Errors.Select(e => e.Description))}");
        }

        var venue2 = new ApplicationUser
        {
            UserName = "downtown.venue@example.com",
            Email = "downtown.venue@example.com",
            Role = "Venue",
            FirstName = "Downtown",
            LastName = "Bar & Grill",
            PhoneNumber = "555-0202",
            EmailConfirmed = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        var venue2Result = await userManager.CreateAsync(venue2, "Password123!");
        if (!venue2Result.Succeeded)
        {
            Console.WriteLine($"Failed to create venue2: {string.Join(", ", venue2Result.Errors.Select(e => e.Description))}");
        }

        // Also create corresponding legacy User records for backward compatibility with Shifts
        // Get the password hasher to hash passwords properly
        var passwordHasher = new PasswordHasher<ApplicationUser>();
        
        var legacyUsers = new List<User>
        {
            new User
            {
                Email = "bartender@example.com",
                PasswordHash = passwordHasher.HashPassword(bartender1, "Password123!"),
                Role = "Bartender",
                FirstName = "John",
                LastName = "Smith",
                PhoneNumber = "555-0101",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new User
            {
                Email = "jane.bartender@example.com",
                PasswordHash = passwordHasher.HashPassword(bartender2, "Password456!"),
                Role = "Bartender",
                FirstName = "Jane",
                LastName = "Doe",
                PhoneNumber = "555-0102",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new User
            {
                Email = "venue@example.com",
                PasswordHash = passwordHasher.HashPassword(venue1, "Password789!"),
                Role = "Venue",
                FirstName = "The Grand",
                LastName = "Hotel",
                PhoneNumber = "555-0201",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new User
            {
                Email = "downtown.venue@example.com",
                PasswordHash = passwordHasher.HashPassword(venue2, "Password123!"),
                Role = "Venue",
                FirstName = "Downtown",
                LastName = "Bar & Grill",
                PhoneNumber = "555-0202",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        context.LegacyUsers.AddRange(legacyUsers);
        context.SaveChanges();

        // Get the venue IDs from the saved legacy users
        var venue1Legacy = legacyUsers.First(u => u.Email == "venue@example.com");
        var venue2Legacy = legacyUsers.First(u => u.Email == "downtown.venue@example.com");

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
                VenueId = venue1Legacy.Id,
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
                VenueId = venue2Legacy.Id,
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
                VenueId = venue1Legacy.Id,
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
                VenueId = venue2Legacy.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        context.Shifts.AddRange(shifts);
        context.SaveChanges();

        var identityUserCount = await userManager.Users.CountAsync();
        Console.WriteLine($"Seeded {identityUserCount} identity users, {context.LegacyUsers.Count()} legacy users, and {context.Shifts.Count()} shifts.");
    }
}
