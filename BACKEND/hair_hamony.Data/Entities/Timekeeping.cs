using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Timekeeping
{
    public Guid Id { get; set; }

    public int? Month { get; set; }

    public int? Year { get; set; }

    public bool? IsTimekeepping { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<StylistWorkship> StylistWorkships { get; set; } = new List<StylistWorkship>();
}
