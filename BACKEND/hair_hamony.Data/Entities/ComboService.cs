using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class ComboService
{
    public Guid Id { get; set; }

    public Guid? ComboId { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public Guid? ServiceId { get; set; }

    public virtual Combo? Combo { get; set; }

    public virtual Service? Service { get; set; }
}
