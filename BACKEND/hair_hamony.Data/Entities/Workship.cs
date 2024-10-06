using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Workship
{
    public Guid Id { get; set; }

    public TimeOnly? StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<StylistWorkship> StylistWorkships { get; set; } = new List<StylistWorkship>();
}
