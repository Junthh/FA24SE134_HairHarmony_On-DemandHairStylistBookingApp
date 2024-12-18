﻿using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class PaymentDetail
{
    public Guid Id { get; set; }

    public DateTime? CreatedDate { get; set; }

    public double? Price { get; set; }

    public Guid? PaymentId { get; set; }

    public string? Status { get; set; }

    public virtual Payment? Payment { get; set; }
}
