﻿namespace hair_hamony.Business.ViewModels.Kpis
{
    public class CreateKpiModel
    {
        public string? Name { get; set; }
        public int? Value { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
