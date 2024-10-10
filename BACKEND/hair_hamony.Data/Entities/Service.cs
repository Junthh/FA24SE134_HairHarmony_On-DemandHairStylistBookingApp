using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Service
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public int? Duration { get; set; }

    public double? Price { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public Guid? CategoryId { get; set; }

    public virtual ICollection<BookingDetail> BookingDetails { get; set; } = new List<BookingDetail>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<ComboService> ComboServices { get; set; } = new List<ComboService>();
}
