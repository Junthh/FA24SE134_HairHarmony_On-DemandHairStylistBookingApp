namespace hair_hamony.Business.ViewModels.DayOffs
{
    public class SearchDayOffModel
    {
        public int? Month { get; set; }
        public int? Year { get; set; }
        public bool? IsApprove { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? StylistId { get; set; }
        public Guid? StylistWorkshipId { get; set; }
    }
}
