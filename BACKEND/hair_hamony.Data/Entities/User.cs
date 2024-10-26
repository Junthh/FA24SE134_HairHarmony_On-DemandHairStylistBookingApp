using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class User
{
    public Guid Id { get; set; }

    public string? Username { get; set; }

    public string? FullName { get; set; }

    public string? Password { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? RoleId { get; set; }

    public string? Avatar { get; set; }

    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();

    public virtual ICollection<News> News { get; set; } = new List<News>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<Stylist> Stylists { get; set; } = new List<Stylist>();
}
