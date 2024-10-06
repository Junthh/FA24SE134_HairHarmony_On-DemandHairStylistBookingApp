using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Level
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public int? Experience { get; set; }

    public double? Salary { get; set; }

    public int? Kpi { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<Stylist> Stylists { get; set; } = new List<Stylist>();
}
