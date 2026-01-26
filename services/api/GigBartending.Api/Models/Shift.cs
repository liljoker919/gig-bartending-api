namespace GigBartending.Api.Models;

public class Shift
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateTime ShiftDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public decimal HourlyRate { get; set; }
    public required string Location { get; set; }
    public required string Status { get; set; } // "Open", "Filled", "Cancelled"
    public int VenueId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public User? Venue { get; set; }
}
