﻿namespace hair_hamony.Business.ViewModels.Payments
{
    public class SearchPaymentModel
    {
        public DateTime? PaymentDate { get; set; }
        public double? Price { get; set; }
        public string? PaymentMethod { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? BookingId { get; set; }
    }
}