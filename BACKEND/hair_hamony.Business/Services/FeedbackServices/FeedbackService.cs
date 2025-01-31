﻿using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Utilities;
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
            using var dbTransaction = _context.Database.BeginTransaction();
            try
            {
                var feedback = _mapper.Map<Feedback>(requestBody);
                feedback.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();

                var booking = _context.Bookings.FirstOrDefault(x => x.Id == feedback.BookingId);
                if (booking.Status == "Finished")
                {
                    var customer = _context.Customers.FirstOrDefault(x => x.Id == booking.CustomerId);
                    var vndToPoints = _context.SystemConfigs.FirstOrDefault(systemConfig => systemConfig.Name == "VND_TO_POINTS")!.Value;
                    customer.LoyaltyPoints = (int)(customer.LoyaltyPoints + (booking.TotalPrice * vndToPoints));
                    _context.Customers.Update(customer);

                    var countFeedbackOfStylist = _context.Feedbacks.Where(x => x.StylistId == requestBody.StylistId).Count();
                    var stylist = _context.Stylists.FirstOrDefault(x => x.Id == requestBody.StylistId);
                    stylist.Rating = ((stylist.Rating * countFeedbackOfStylist) + requestBody.Rating) / (countFeedbackOfStylist + 1);
                    _context.Stylists.Update(stylist);
                }

                await _context.Feedbacks.AddAsync(feedback);
                await _context.SaveChangesAsync();
                await dbTransaction.CommitAsync();

                return _mapper.Map<GetFeedbackModel>(feedback);
            }
            catch
            {
                await dbTransaction.RollbackAsync();
                throw;
            }
        }

        public async Task Delete(Guid id)
        {
            var feedback = _mapper.Map<Feedback>(await GetById(id));
            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetDetailFeedbackModel>, int)> GetAll(PagingParam<FeedbackEnum.FeedbackSort> paginationModel, SearchFeedbackModel searchFeedbackModel)
        {
            var query = _context.Feedbacks
                .Include(feedback => feedback.Booking)
                .ThenInclude(booking => booking.Customer)
                .AsQueryable();
            query = query.GetWithSearch(searchFeedbackModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();
            var results = _mapper.Map<IList<GetDetailFeedbackModel>>(query);

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
            _mapper.Map(requestBody, feedback);

            _context.Feedbacks.Update(feedback);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetFeedbackModel>(feedback);
        }
    }
}
