using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using GigBartending.Api.Models;

namespace GigBartending.Api.Data;

public class GigBartendingDbContext : IdentityDbContext<ApplicationUser>
{
    public GigBartendingDbContext(DbContextOptions<GigBartendingDbContext> options)
        : base(options)
    {
    }

    // Legacy user table for backward compatibility
    public DbSet<User> LegacyUsers { get; set; }
    public DbSet<Shift> Shifts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure ApplicationUser entity
        modelBuilder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(u => u.Role).IsRequired().HasMaxLength(50);
            entity.Property(u => u.FirstName).HasMaxLength(100);
            entity.Property(u => u.LastName).HasMaxLength(100);
            entity.Property(u => u.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(u => u.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        // Configure User entity (legacy/backward compatibility)
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
            entity.HasIndex(u => u.Email).IsUnique();
            entity.Property(u => u.PasswordHash).IsRequired();
            entity.Property(u => u.Role).IsRequired().HasMaxLength(50);
            entity.Property(u => u.FirstName).HasMaxLength(100);
            entity.Property(u => u.LastName).HasMaxLength(100);
            entity.Property(u => u.PhoneNumber).HasMaxLength(20);
            entity.Property(u => u.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(u => u.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        // Configure Shift entity
        modelBuilder.Entity<Shift>(entity =>
        {
            entity.HasKey(s => s.Id);
            entity.Property(s => s.Title).IsRequired().HasMaxLength(255);
            entity.Property(s => s.Description).HasMaxLength(1000);
            entity.Property(s => s.Location).IsRequired().HasMaxLength(255);
            entity.Property(s => s.Status).IsRequired().HasMaxLength(50);
            entity.Property(s => s.HourlyRate).HasColumnType("decimal(18,2)");
            entity.Property(s => s.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(s => s.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
            
            entity.HasOne(s => s.Venue)
                .WithMany(u => u.Shifts)
                .HasForeignKey(s => s.VenueId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
