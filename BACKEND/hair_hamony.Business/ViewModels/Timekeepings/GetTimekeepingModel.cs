namespace hair_hamony.Business.ViewModels.Timekeepings
{
    public class GetTimekeepingModel
    {
        public Guid Id { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
        public bool? IsTimekeepping { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
