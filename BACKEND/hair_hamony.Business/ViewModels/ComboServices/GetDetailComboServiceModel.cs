using hair_hamony.Business.ViewModels.Combos;
using hair_hamony.Business.ViewModels.Services;

namespace hair_hamony.Business.ViewModels.ComboServices
{
    public class GetDetailComboServiceModel
    {
        public Guid Id { get; set; }
        public Guid? ComboId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Guid? ServiceId { get; set; }
        public GetComboModel? Combo { get; set; }
        public GetServiceModel? Service { get; set; }
    }
}
