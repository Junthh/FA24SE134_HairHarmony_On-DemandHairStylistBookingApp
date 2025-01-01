using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class StylistWorkship
{
    public Guid Id { get; set; }

    public DateOnly? RegisterDate { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public Guid? WorkshipId { get; set; }

    public Guid? StylistId { get; set; }

    public bool? IsTimekeeping { get; set; }

    public Guid? TimekeepingId { get; set; }

    public virtual ICollection<BookingSlotStylist> BookingSlotStylists { get; set; } = new List<BookingSlotStylist>();

    public virtual ICollection<DayOff> DayOffs { get; set; } = new List<DayOff>();

    public virtual Stylist? Stylist { get; set; }

    public virtual Timekeeping? Timekeeping { get; set; }

    public virtual Workship? Workship { get; set; }
}
