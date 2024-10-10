using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Feedback
{
    public Guid Id { get; set; }

    public double? Rating { get; set; }

    public string? Description { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? BookingId { get; set; }

    public virtual Booking? Booking { get; set; }
}
