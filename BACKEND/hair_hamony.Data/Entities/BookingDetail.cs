using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class BookingDetail
{
    public Guid Id { get; set; }

    public double? Price { get; set; }

    public int? Duration { get; set; }

    public Guid? BookingId { get; set; }

    public Guid? ServiceId { get; set; }

    public Guid? ComboId { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual ICollection<BookingSlotStylist> BookingSlotStylists { get; set; } = new List<BookingSlotStylist>();

    public virtual Combo? Combo { get; set; }

    public virtual Service? Service { get; set; }

    public virtual ICollection<TransactionDetail> TransactionDetails { get; set; } = new List<TransactionDetail>();
}
