using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.TimeSlots;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.TimeSlotServices
{
    public class TimeSlotService : ITimeSlotService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public TimeSlotService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetTimeSlotModel> Create(CreateTimeSlotModel requestBody)
        {
            var timeSlot = _mapper.Map<TimeSlot>(requestBody);
            timeSlot.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();

            await _context.TimeSlots.AddAsync(timeSlot);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetTimeSlotModel>(timeSlot);
        }

        public async Task Delete(Guid id)
        {
            var timeSlot = _mapper.Map<TimeSlot>(await GetById(id));
            _context.TimeSlots.Remove(timeSlot);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetTimeSlotModel>, int)> GetAll(PagingParam<TimeSlotEnum.TimeSlotSort> paginationModel, SearchTimeSlotModel searchTimeSlotModel)
        {
            var query = _context.TimeSlots.AsQueryable();
            query = query.GetWithSearch(searchTimeSlotModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetTimeSlotModel>>(query);

            return (results, total);
        }

        public async Task<GetTimeSlotModel> GetById(Guid id)
        {
            var timeSlot = await _context.TimeSlots.AsNoTracking().FirstOrDefaultAsync(timeSlot => timeSlot.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetTimeSlotModel>(timeSlot);
        }

        public async Task<GetTimeSlotModel> Update(Guid id, UpdateTimeSlotModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var timeSlot = _mapper.Map<TimeSlot>(await GetById(id));
            _mapper.Map(requestBody, timeSlot);

            _context.TimeSlots.Update(timeSlot);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetTimeSlotModel>(timeSlot);
        }
    }
}
