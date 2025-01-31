﻿using hair_hamony.Business.ViewModels.BookingDetails;
using hair_hamony.Business.ViewModels.Customers;
using hair_hamony.Business.ViewModels.Feedbacks;
using hair_hamony.Business.ViewModels.Payments;
using hair_hamony.Business.ViewModels.Staffs;

namespace hair_hamony.Business.ViewModels.Bookings
{
    public class GetDetailBookingModel
    {
        public Guid Id { get; set; }
        public DateOnly? BookingDate { get; set; }
        public double? ExpertFee { get; set; }
        public double? TotalPrice { get; set; }
        public double? AmoutToPaid { get; set; }
        public int? LoyaltyPoints { get; set; }
        public bool? IsRandomStylist { get; set; }
        public string? Status { get; set; }
        public bool? IsFeedback { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public TimeOnly? StartTime { get; set; }
        public Guid? TimeSlotId { get; set; }
        public Guid? CustomerId { get; set; }
        public Guid? StaffId { get; set; }
        public ICollection<GetDetailBookingDetailModel>? BookingDetails { get; set; } = new List<GetDetailBookingDetailModel>();
        public GetCustomerModel? Customer { get; set; }
        public GetStaffModel? Staff { get; set; }
        public ICollection<GetFeedbackModel>? Feedbacks { get; set; } = new List<GetFeedbackModel>();
        public ICollection<GetPaymentModel>? Payments { get; set; } = new List<GetPaymentModel>();
    }
}
