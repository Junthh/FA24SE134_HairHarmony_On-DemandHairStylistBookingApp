using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Role
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
