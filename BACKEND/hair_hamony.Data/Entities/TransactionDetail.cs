using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class TransactionDetail
{
    public Guid Id { get; set; }

    public int? LoyaltyPoints { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? TransactionId { get; set; }

    public virtual Transaction? Transaction { get; set; }
}
