using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class StylistSalaryDetail
{
    public Guid Id { get; set; }

    public double? Commission { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? StylistSalaryId { get; set; }

    public Guid? BookingId { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual StylistSalary? StylistSalary { get; set; }
}
