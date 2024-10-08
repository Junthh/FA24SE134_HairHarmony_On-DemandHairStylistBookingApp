﻿using System;
using System.Collections.Generic;

namespace hair_hamony.Data.Entities;

public partial class Booking
{
    public Guid Id { get; set; }

    public DateOnly? BookingDate { get; set; }

    public double? ExpertFee { get; set; }

    public double? TotalPrice { get; set; }

    public double? AmoutToPaid { get; set; }

    public int? LoyaltyPoints { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public Guid? CustomerId { get; set; }

    public virtual ICollection<BookingDetail> BookingDetails { get; set; } = new List<BookingDetail>();

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
