﻿using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Transaction
{
    public Guid Id { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public Guid? BookingId { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual ICollection<TransactionDetail> TransactionDetails { get; set; } = new List<TransactionDetail>();
}
