namespace hair_hamony.Business.ViewModels.DayOffs
{
    public class UpdateDayOffModel
    {
        public Guid Id { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
        public bool? IsApprove { get; set; }
        public Guid? StylistId { get; set; }
        public Guid? StylistWorkshipId { get; set; }
    }
}
