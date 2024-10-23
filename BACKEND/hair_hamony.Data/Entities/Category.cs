using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Category
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<Service> Services { get; set; } = new List<Service>();
}
