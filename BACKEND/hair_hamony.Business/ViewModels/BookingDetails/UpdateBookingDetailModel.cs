﻿namespace hair_hamony.Business.ViewModels.BookingDetails
{
    public class UpdateBookingDetailModel
    {
        public Guid Id { get; set; }
        public double? Price { get; set; }
        public int? Duration { get; set; }
        public Guid? BookingId { get; set; }
        public Guid? ServiceId { get; set; }
        public Guid? ComboId { get; set; }
    }
}