﻿namespace hair_hamony.Business.ViewModels.Stylists
{
    public class GetStylistModel
    {
        public Guid Id { get; set; }
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public string? Level { get; set; }
        public int? Experience { get; set; }
        public double? Salary { get; set; }
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public string? Avatar { get; set; }
        public string? Password { get; set; }
        public double? ExpertFee { get; set; }
        public int? Kpi { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
