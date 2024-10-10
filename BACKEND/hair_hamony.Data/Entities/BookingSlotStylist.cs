using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class BookingSlotStylist
{
    public Guid Id { get; set; }

    public string? Status { get; set; }

    public DateOnly? BookingDate { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public Guid? BookingDetailId { get; set; }

    public Guid? TimeSlotId { get; set; }

    public Guid? StylistId { get; set; }

    public Guid? StylistWorkshipId { get; set; }

    public virtual BookingDetail? BookingDetail { get; set; }

    public virtual Stylist? Stylist { get; set; }

    public virtual StylistWorkship? StylistWorkship { get; set; }

    public virtual TimeSlot? TimeSlot { get; set; }
}
