using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.StylistWorkships;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.StylistWorkshipServices
{
    public class StylistWorkshipService : IStylistWorkshipService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        public StylistWorkshipService(IMapper mapper)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
        }

        public async Task<IList<GetStylistWorkshipModel>> Create(CreateStylistWorkshipModel requestBody)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var stylistWorkships = new List<StylistWorkship>();
                if (requestBody.WorkshipIds != null && requestBody.WorkshipIds.Any())
                {
                    foreach (var workshipId in requestBody.WorkshipIds)
                    {
                        var stylistWorkship = _context.StylistWorkships
                            .FirstOrDefault(stylistWorkship =>
                                stylistWorkship.RegisterDate == requestBody.RegisterDate && stylistWorkship.WorkshipId == workshipId
                            );

                        if (stylistWorkship != null)
                        {
                            var workship = _context.Workships.FirstOrDefault(workship => workship.Id == workshipId);
                            throw new CException
                            {
                                StatusCode = StatusCodes.Status400BadRequest,
                                ErrorMessage = $"Ca làm việc {workship.StartTime} - {workship.EndTime} ngày {requestBody.RegisterDate} đã được đăng ký, vui lòng chọn ca làm việc khác"
                            };
                        }
                        var newStylistWorkship = new StylistWorkship
                        {
                            RegisterDate = requestBody.RegisterDate,
                            CreatedDate = DateTime.Now,
                            UpdatedDate = DateTime.Now,
                            WorkshipId = workshipId,
                            StylistId = requestBody.StylistId,
                        };
                        _context.StylistWorkships.Add(newStylistWorkship);
                        stylistWorkships.Add(newStylistWorkship);
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return _mapper.Map<IList<GetStylistWorkshipModel>>(stylistWorkships);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task Delete(Guid id)
        {
            var stylistWorkship = _mapper.Map<StylistWorkship>(await GetById(id));
            _context.StylistWorkships.Remove(stylistWorkship);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetDetailStylistWorkshipModel>, int)> GetAll(
            PagingParam<StylistWorkshipEnum.StylistWorkshipSort> paginationModel,
            SearchStylistWorkshipModel searchStylistWorkshipModel)
        {
            var query = _context.StylistWorkships
                .Include(stylistWorkship => stylistWorkship.Workship)
                .Include(stylistWorkship => stylistWorkship.Stylist)
                .AsQueryable();
            query = query.GetWithSearch(searchStylistWorkshipModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetDetailStylistWorkshipModel>>(query);

            return (results, total);
        }

        public async Task<GetStylistWorkshipModel> GetById(Guid id)
        {
            var stylistWorkship = await _context.StylistWorkships.AsNoTracking().FirstOrDefaultAsync(stylistWorkship => stylistWorkship.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetStylistWorkshipModel>(stylistWorkship);
        }

        public async Task<GetStylistWorkshipModel> Update(Guid id, UpdateStylistWorkshipModel requestBody)
        {
            if (id != requestBody.Id)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Id không trùng"
                };
            }

            var stylistWorkship = _context.StylistWorkships
                            .FirstOrDefault(stylistWorkship =>
                                stylistWorkship.RegisterDate == requestBody.RegisterDate
                                && stylistWorkship.WorkshipId == requestBody.WorkshipId
                            );

            if (stylistWorkship != null)
            {
                var workship = _context.Workships.FirstOrDefault(workship => workship.Id == requestBody.WorkshipId);
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = $"Ca làm việc {workship.StartTime} - {workship.EndTime} ngày {requestBody.RegisterDate} đã được đăng ký, vui lòng chọn ca làm việc khác"
                };
            }

            var updateStylistWorkship = _mapper.Map<StylistWorkship>(await GetById(id));
            _mapper.Map(requestBody, updateStylistWorkship);
            updateStylistWorkship.UpdatedDate = DateTime.Now;

            _context.StylistWorkships.Update(updateStylistWorkship);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetStylistWorkshipModel>(updateStylistWorkship);
        }
    }
}
