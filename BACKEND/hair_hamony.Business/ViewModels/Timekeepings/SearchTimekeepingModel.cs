namespace hair_hamony.Business.ViewModels.Timekeepings
{
    public class SearchTimekeepingModel
    {
        public int? Month { get; set; }
        public int? Year { get; set; }
        public bool? IsTimekeepping { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
