using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class DayOff
{
    public Guid Id { get; set; }

    public int? Month { get; set; }

    public int? Year { get; set; }

    public bool? IsApprove { get; set; }

    public DateTime? ApprovalDate { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? StylistId { get; set; }

    public Guid? StylistWorkshipId { get; set; }

    public virtual Stylist? Stylist { get; set; }

    public virtual StylistWorkship? StylistWorkship { get; set; }
}
