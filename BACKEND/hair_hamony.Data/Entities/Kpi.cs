using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Kpi
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public int? Value { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<BookingSlotStylist> BookingSlotStylists { get; set; } = new List<BookingSlotStylist>();
}
