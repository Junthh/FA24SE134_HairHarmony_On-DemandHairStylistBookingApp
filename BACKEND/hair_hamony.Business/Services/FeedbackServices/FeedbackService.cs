using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Feedbacks;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.FeedbackServices
{
    public class FeedbackService : IFeedbackService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public FeedbackService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetFeedbackModel> Create(CreateFeedbackModel requestBody)
        {
            var feedback = _mapper.Map<Feedback>(requestBody);
            feedback.CreatedDate = DateTime.Now;
            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetFeedbackModel>(feedback);
        }

        public async Task Delete(Guid id)
        {
            var feedback = _mapper.Map<Feedback>(await GetById(id));
            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetFeedbackModel>, int)> GetAll(PagingParam<FeedbackEnum.FeedbackSort> paginationModel, SearchFeedbackModel searchFeedbackModel)
        {
            var query = _context.Feedbacks.AsQueryable();
            query = query.GetWithSearch(searchFeedbackModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetFeedbackModel>>(query);

            return (results, total);
        }

        public async Task<GetFeedbackModel> GetById(Guid id)
        {
            var feedback = await _context.Feedbacks.AsNoTracking().FirstOrDefaultAsync(feedback => feedback.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetFeedbackModel>(feedback);
        }

        public async Task<GetFeedbackModel> Update(Guid id, UpdateFeedbackModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var feedback = _mapper.Map<Feedback>(await GetById(id));
            _context.Feedbacks.Update(feedback);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetFeedbackModel>(feedback);
        }
    }
}
