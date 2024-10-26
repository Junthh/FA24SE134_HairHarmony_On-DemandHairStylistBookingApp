using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Customer
{
    public Guid Id { get; set; }

    public int? LoyaltyPoints { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? UserId { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual User? User { get; set; }
}
