using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.News;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.NewsServices
{
    public class NewsService : INewsService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public NewsService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<GetNewsModel> Create(CreateNewsModel requestBody)
        {
            var news = _mapper.Map<News>(requestBody);
            news.CreatedDate = DateTime.Now;
            news.UpdatedDate = DateTime.Now;

            await _context.News.AddAsync(news);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetNewsModel>(news);
        }

        public async Task Delete(Guid id)
        {
            var news = _mapper.Map<News>(await GetById(id));
            _context.News.Remove(news);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetNewsModel>, int)> GetAll(PagingParam<NewsEnum.NewsSort> paginationModel, SearchNewsModel searchNewsModel)
        {
            var query = _context.News.AsQueryable();
            query = query.GetWithSearch(searchNewsModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetNewsModel>>(query);

            return (results, total);
        }

        public async Task<GetNewsModel> GetById(Guid id)
        {
            var news = await _context.News.AsNoTracking().FirstOrDefaultAsync(news => news.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetNewsModel>(news);
        }

        public async Task<GetNewsModel> Update(Guid id, UpdateNewsModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }
            var news = _mapper.Map<News>(await GetById(id));
            _mapper.Map(requestBody, news);
            news.UpdatedDate = DateTime.Now;

            _context.News.Update(news);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetNewsModel>(news);
        }
    }
}
