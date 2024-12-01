using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class StaffSalary
{
    public Guid Id { get; set; }

    public int? Month { get; set; }

    public int? Year { get; set; }

    public double? TotalSalary { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? StaffId { get; set; }

    public virtual Staff? Staff { get; set; }
}
