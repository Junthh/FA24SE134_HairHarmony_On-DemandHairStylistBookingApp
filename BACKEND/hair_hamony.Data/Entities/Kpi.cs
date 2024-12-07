using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Kpi
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public int? Value { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }
}
