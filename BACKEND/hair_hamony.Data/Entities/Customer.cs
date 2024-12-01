using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Customer
{
    public Guid Id { get; set; }

    public int? LoyaltyPoints { get; set; }

    public string? FullName { get; set; }

    public string? Password { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Status { get; set; }

    public string? Avatar { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
