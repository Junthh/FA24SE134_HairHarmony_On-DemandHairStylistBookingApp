﻿namespace hair_hamony.Business.ViewModels.Combos
{
    public class GetComboModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public double? Discount { get; set; }
        public double? TotalPrice { get; set; }
        public int? Duration { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}