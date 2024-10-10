using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Payment
{
    public Guid Id { get; set; }

    public DateTime? PaymentDate { get; set; }

    public double? Price { get; set; }

    public string? PaymentMethod { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? BookingId { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual ICollection<TransactionDetail> TransactionDetails { get; set; } = new List<TransactionDetail>();
}
