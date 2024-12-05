using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class StylistSalary
{
    public Guid Id { get; set; }

    public int? Month { get; set; }

    public int? Year { get; set; }

    public int? TotalBooking { get; set; }

    public double? TotalCommission { get; set; }

    public double? TotalSalary { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? StylistId { get; set; }

    public int? Kpi { get; set; }

    public virtual Stylist? Stylist { get; set; }

    public virtual ICollection<StylistSalaryDetail> StylistSalaryDetails { get; set; } = new List<StylistSalaryDetail>();
}
