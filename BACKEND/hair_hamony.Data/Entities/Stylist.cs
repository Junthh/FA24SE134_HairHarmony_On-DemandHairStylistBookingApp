using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Stylist
{
    public Guid Id { get; set; }

    public double? Rating { get; set; }

    public string? Description { get; set; }

    public string? Level { get; set; }

    public int? Experience { get; set; }

    public int? Kpi { get; set; }

    public double? Salary { get; set; }

    public string? Username { get; set; }

    public string? FullName { get; set; }

    public string? Password { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Status { get; set; }

    public string? Avatar { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<BookingSlotStylist> BookingSlotStylists { get; set; } = new List<BookingSlotStylist>();

    public virtual ICollection<StylistSalary> StylistSalaries { get; set; } = new List<StylistSalary>();

    public virtual ICollection<StylistWorkship> StylistWorkships { get; set; } = new List<StylistWorkship>();
}
