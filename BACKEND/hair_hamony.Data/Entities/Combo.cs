using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Combo
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public double? Discount { get; set; }

    public double? TotalPrice { get; set; }

    public int? Duration { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public string? Image { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<BookingDetail> BookingDetails { get; set; } = new List<BookingDetail>();

    public virtual ICollection<ComboService> ComboServices { get; set; } = new List<ComboService>();
}
