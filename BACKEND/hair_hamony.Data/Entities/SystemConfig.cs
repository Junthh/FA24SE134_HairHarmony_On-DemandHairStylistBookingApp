using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class SystemConfig
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public double? Value { get; set; }
}
