using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Staff
{
    public Guid Id { get; set; }

    public string? Username { get; set; }

    public string? FullName { get; set; }

    public string? Password { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Status { get; set; }

    public string? Avatar { get; set; }

    public DateTime? CreatedDate { get; set; }

    public double? Salary { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<News> News { get; set; } = new List<News>();
}
