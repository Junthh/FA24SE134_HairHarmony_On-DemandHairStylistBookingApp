using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Stylist
{
    public Guid Id { get; set; }

    public double? Rating { get; set; }

    public string? Description { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? UserId { get; set; }

    public Guid? LevelId { get; set; }

    public virtual ICollection<BookingSlotStylist> BookingSlotStylists { get; set; } = new List<BookingSlotStylist>();

    public virtual Level? Level { get; set; }

    public virtual ICollection<StylistSalary> StylistSalaries { get; set; } = new List<StylistSalary>();

    public virtual ICollection<StylistWorkship> StylistWorkships { get; set; } = new List<StylistWorkship>();

    public virtual User? User { get; set; }
}
