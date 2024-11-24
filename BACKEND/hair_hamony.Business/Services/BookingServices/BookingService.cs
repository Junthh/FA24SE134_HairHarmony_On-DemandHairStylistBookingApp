using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.BookingSlotStylistServices;
using hair_hamony.Business.Services.StylistSalaryServices;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Bookings;
using hair_hamony.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Business.Services.BookingServices
{
    public class BookingService : IBookingService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        private readonly IBookingSlotStylistService _bookingSlotStylistService;
        private readonly IStylistSalaryService _stylistSalaryService;

        public BookingService(IMapper mapper,
            IBookingSlotStylistService bookingSlotStylistService,
            IStylistSalaryService stylistSalaryService)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
            _bookingSlotStylistService = bookingSlotStylistService;
            _stylistSalaryService = stylistSalaryService;
        }

        public async Task<GetBookingModel> Create(CreateBookingModel requestBody)
        {
            var booking = _mapper.Map<Booking>(requestBody);
            booking.CreatedDate = DateTime.Now;
            booking.UpdatedDate = DateTime.Now;

            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();

            return _mapper.Map<GetBookingModel>(booking);
        }

        public async Task Delete(Guid id)
        {
            var booking = _mapper.Map<Booking>(await GetById(id));
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
        }

        public async Task<(IList<GetDetailBookingModel>, int)> GetAll(PagingParam<BookingEnum.BookingSort> paginationModel,
            SearchBookingModel searchBookingModel,
            string? customerPhoneNumber)
        {
            var query = _context.Bookings
                .Include(booking => booking.Customer)
                .Include(booking => booking.Staff)
                .Include(booking => booking.Feedbacks)
                .Include(booking => booking.BookingDetails)
                .ThenInclude(bookingDetail => bookingDetail.Combo)
                .Include(booking => booking.BookingDetails)
                .ThenInclude(bookingDetail => bookingDetail.Service)
                .Include(booking => booking.BookingDetails)
                .ThenInclude(bookingDetail => bookingDetail.BookingSlotStylists)
                .ThenInclude(bookingSlotStylist => bookingSlotStylist.Stylist)
                .Include(booking => booking.BookingDetails)
                .ThenInclude(bookingDetail => bookingDetail.BookingSlotStylists)
                .ThenInclude(bookingSlotStylist => bookingSlotStylist.TimeSlot)
                .AsQueryable();

            if (customerPhoneNumber != null)
            {
                query = query.Where(booking => booking.Customer!.PhoneNumber!.Contains(customerPhoneNumber));
            }

            query = query.GetWithSearch(searchBookingModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();

            var results = _mapper.Map<IList<GetDetailBookingModel>>(query);

            foreach (var item in results)
            {
                item.IsFeedback = item.Feedbacks != null && item.Feedbacks.Any() && item.Status == "Completed";
            }

            return (results, total);
        }

        public async Task<GetBookingModel> GetById(Guid id)
        {
            var booking = await _context.Bookings.AsNoTracking().FirstOrDefaultAsync(booking => booking.Id == id)
                ?? throw new CException
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    ErrorMessage = $"Id {id} không tồn tại"
                };

            return _mapper.Map<GetBookingModel>(booking);
        }

        public async Task<GetBookingModel> Init(CreateInitBookingModel requestBody)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                Stylist? stylist;
                if (requestBody.IsRandomStylist == true)
                {
                    var stylistFreeTimes = await _bookingSlotStylistService
                       .GetListStylistFreetime(requestBody.BookingDate, requestBody.TimeSlotId);

                    stylist = _mapper.Map<Stylist>(stylistFreeTimes.FirstOrDefault());
                }
                else
                {
                    stylist = _context.Stylists.FirstOrDefault(stylist => stylist.Id == requestBody.StylistId);
                }

                double totalPrice = 0;
                double totalDiscount = 0;

                if (requestBody.Services != null && requestBody.Services.Any())
                {
                    foreach (var item in requestBody.Services)
                    {
                        totalPrice += item.Price!.Value;
                    }
                }
                if (requestBody.Combos != null && requestBody.Combos.Any())
                {
                    foreach (var item in requestBody.Combos)
                    {
                        totalPrice += item.TotalPrice!.Value;
                        totalDiscount += item.Discount!.Value;
                    }
                }
                if (requestBody.ExpertFee != null)
                {
                    totalPrice = totalPrice + (totalPrice * requestBody.ExpertFee.Value / 100);
                }

                double amoutToPaid = totalPrice - totalDiscount;

                var customerId = Guid.NewGuid();

                // staff đặt lịch hoặc customer đặt lịch nhưng không đăng kí tài khoản
                if (requestBody.CustomerId == null)
                {
                    var customer = _context.Customers.FirstOrDefault(customer => customer.PhoneNumber == requestBody.CustomerPhoneNummber);
                    if (customer == null)
                    {
                        _context.Customers.Add(new Customer
                        {
                            Id = customerId,
                            FullName = requestBody.CustomerFullName,
                            PhoneNumber = requestBody.CustomerPhoneNummber,
                            LoyaltyPoints = 0,
                            CreatedDate = DateTime.Now,
                            Status = "Active"
                        });
                    }
                    else
                    {
                        customerId = customer.Id;
                    }
                }

                var bookingId = Guid.NewGuid();
                var booking = _context.Bookings.Add(new Booking
                {
                    Id = bookingId,
                    BookingDate = requestBody.BookingDate,
                    ExpertFee = requestBody.ExpertFee,
                    TotalPrice = totalPrice,
                    AmoutToPaid = amoutToPaid,
                    LoyaltyPoints = requestBody.LoyaltyPoints,
                    IsRandomStylist = requestBody.IsRandomStylist,
                    CustomerId = requestBody.CustomerId ?? customerId,
                    StaffId = requestBody.StaffId,
                    Status = "Initialize",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                }).Entity;

                var transactionId = Guid.NewGuid();
                _context.Transactions.Add(new Transaction
                {
                    Id = transactionId,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    Status = "Initialize",
                    BookingId = bookingId,
                });

                var paymentId = Guid.NewGuid();
                _context.Payments.Add(new Payment
                {
                    Id = paymentId,
                    PaymentDate = null,
                    Price = amoutToPaid,
                    PaymentMethod = null,
                    Status = "Initialize",
                    CreatedDate = DateTime.Now,
                    BookingId = bookingId
                });

                int countTimeSlot = 0;
                var timeSlot = _context.TimeSlots.FirstOrDefault(timeSlot => timeSlot.Id == requestBody.TimeSlotId);

                if (requestBody.Services != null && requestBody.Services.Any())
                {
                    foreach (var serviceModel in requestBody.Services)
                    {
                        var service = _context.Services
                            .AsNoTracking()
                            .FirstOrDefault(service => service.Id == serviceModel.Id);

                        var bookingDetailId = Guid.NewGuid();
                        _context.BookingDetails.Add(new BookingDetail
                        {
                            Id = bookingDetailId,
                            Price = serviceModel.Price,
                            ServiceId = serviceModel.Id,
                            Duration = service!.Duration,
                            BookingId = bookingId,
                            CreatedDate = DateTime.Now
                        });

                        int countServiceDuration = (int)Math.Ceiling(service.Duration!.Value / (decimal)60);
                        countTimeSlot += countServiceDuration;

                        for (int i = 0; i < countServiceDuration; i++)
                        {
                            var timeSlotNext = _context.TimeSlots
                                .FirstOrDefault(x => x.StartTime == timeSlot!.StartTime!.Value.AddHours(countTimeSlot - 1));
                            IsStylistBusy(requestBody.BookingDate, timeSlotNext!.Id, stylist!.Id);

                            _context.BookingSlotStylists.Add(new BookingSlotStylist
                            {
                                Status = "Booked",
                                BookingDate = requestBody.BookingDate,
                                CreatedDate = DateTime.Now,
                                UpdatedDate = DateTime.Now,
                                BookingDetailId = bookingDetailId,
                                TimeSlotId = timeSlotNext.Id,
                                StylistId = stylist!.Id,
                                StylistWorkshipId = null // ?
                            });
                        }

                        var paymentDetailId = Guid.NewGuid();
                        _context.PaymentDetails.Add(new PaymentDetail
                        {
                            Id = paymentDetailId,
                            CreatedDate = DateTime.Now,
                            Price = serviceModel.Price,
                            PaymentId = paymentId,
                        });

                        _context.TransactionDetails.Add(new TransactionDetail
                        {
                            LoyaltyPoints = requestBody.LoyaltyPoints,
                            Status = "Scheduled",
                            CreatedDate = DateTime.Now,
                            TransactionId = transactionId,
                        });
                    }
                }

                if (requestBody.Combos != null && requestBody.Combos.Any())
                {
                    foreach (var comboModel in requestBody.Combos)
                    {
                        var combo = _context.Combos
                            .AsNoTracking()
                            .FirstOrDefault(combo => combo.Id == comboModel.Id);

                        var bookingDetailId = Guid.NewGuid();
                        _context.BookingDetails.Add(new BookingDetail
                        {
                            Id = bookingDetailId,
                            Price = comboModel.TotalPrice,
                            ComboId = comboModel.Id,
                            Duration = combo.Duration,
                            BookingId = bookingId,
                            CreatedDate = DateTime.Now
                        });

                        int countServiceDuration = (int)Math.Ceiling(combo.Duration!.Value / (decimal)60);
                        countTimeSlot += countServiceDuration;

                        for (int i = 0; i < countServiceDuration; i++)
                        {
                            var timeSlotNext = _context.TimeSlots
                                .FirstOrDefault(x => x.StartTime == timeSlot!.StartTime!.Value.AddHours(countTimeSlot - 1));
                            IsStylistBusy(requestBody.BookingDate, timeSlotNext!.Id, stylist!.Id);

                            _context.BookingSlotStylists.Add(new BookingSlotStylist
                            {
                                Status = "Booked",
                                BookingDate = requestBody.BookingDate,
                                CreatedDate = DateTime.Now,
                                UpdatedDate = DateTime.Now,
                                BookingDetailId = bookingDetailId,
                                TimeSlotId = timeSlotNext.Id,
                                StylistId = stylist!.Id,
                                StylistWorkshipId = null // ?
                            });
                        }

                        var paymentDetailId = Guid.NewGuid();
                        _context.PaymentDetails.Add(new PaymentDetail
                        {
                            Id = paymentDetailId,
                            CreatedDate = DateTime.Now,
                            Price = comboModel.TotalPrice,
                            PaymentId = paymentId,
                        });

                        _context.TransactionDetails.Add(new TransactionDetail
                        {
                            LoyaltyPoints = requestBody.LoyaltyPoints,
                            Status = "Scheduled",
                            CreatedDate = DateTime.Now,
                            TransactionId = transactionId,
                        });
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return _mapper.Map<GetBookingModel>(booking);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        private async Task IsStylistBusy(DateOnly bookingDate, Guid timeSlotId, Guid stylistId)
        {
            var stylists = await _bookingSlotStylistService
                    .GetListStylistFreetime(bookingDate, timeSlotId);

            var isStylistFreeTime = stylists.Any(stylist => stylist.Id == stylistId);

            if (!isStylistFreeTime)
            {
                throw new CException
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    ErrorMessage = "Thợ cắt tóc không rảnh trong khoảng thời gian khách hàng đã đặt lịch"
                };
            }
        }

        public async Task<GetBookingModel> Update(Guid id, UpdateBookingModel requestBody)
        {
            var dbTransaction = _context.Database.BeginTransaction();
            try
            {
                if (id != requestBody.Id)
                {
                    throw new CException
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        ErrorMessage = "Id không trùng"
                    };
                }
                var booking = _mapper.Map<Booking>(await GetById(id));

                if (requestBody.Status != booking.Status)
                {
                    var transaction = _context.Transactions.FirstOrDefault(transaction => transaction.BookingId == requestBody.Id);
                    _context.TransactionDetails.Add(new TransactionDetail
                    {
                        Status = requestBody.Status,
                        CreatedDate = DateTime.Now,
                        TransactionId = transaction!.Id
                    });
                }

                // tăng số lượng booking cho stylist khi hoàn thành booking
                if (requestBody.Status == "Completed")
                {
                    var stylistIds = from bookingDetail in _context.BookingDetails
                                     join bookingSlotStylist in _context.BookingSlotStylists on bookingDetail.Id equals bookingSlotStylist.BookingDetailId
                                     select bookingSlotStylist.StylistId;

                    var monthCurrent = DateTime.Now.Month;
                    var yearCurrent = DateTime.Now.Year;

                    var stylist = await _context.Stylists
                            .FirstOrDefaultAsync(stylist => stylist.Id == stylistIds.FirstOrDefault());

                    var stylistSalary = await _context.StylistSalarys
                        .FirstOrDefaultAsync(stylistSalary =>
                            stylistSalary.StylistId == stylist.Id
                            && stylistSalary.Month == monthCurrent
                            && stylistSalary.Year == yearCurrent
                        );

                    // nếu trong tháng này chưa có booking thì tạo để có dữ liệu so sánh tổng booking trong tháng
                    if (stylistSalary == null)
                    {
                        await _stylistSalaryService.Create(new ViewModels.StylistSalarys.CreateStylistSalaryModel
                        {
                            Month = monthCurrent,
                            Year = yearCurrent,
                            StylistId = stylist.Id,
                            TotalBooking = 1,
                            TotalCommission = 0,
                            TotalSalary = stylist.Salary
                        });
                    }
                    else
                    {
                        var commissionRate = _context.SystemConfigs.FirstOrDefault(systemConfig => systemConfig.Name == "COMMISSION_RATE")!.Value!.Value;

                        var totalBooking = stylistSalary.TotalBooking + 1;
                        var totalCommission = stylistSalary.TotalCommission
                            + stylist.Kpi > stylistSalary.TotalBooking + 1 ? requestBody.TotalPrice * commissionRate / 100 : 0;
                        await _stylistSalaryService.Update(stylistSalary.Id, new ViewModels.StylistSalarys.UpdateStylistSalaryModel
                        {
                            Id = stylistSalary.Id,
                            Month = stylistSalary.Month,
                            Year = stylistSalary.Year,
                            StylistId = stylistSalary.StylistId,
                            TotalBooking = totalBooking,
                            TotalCommission = totalCommission,
                            TotalSalary = stylist.Salary + totalCommission
                        });
                    }

                    var customer = _context.Customers.FirstOrDefault(customer => customer.Id == requestBody.CustomerId);
                    var customerLoyaltyPoints = customer!.LoyaltyPoints;

                    var vndToPoints = _context.SystemConfigs.FirstOrDefault(systemConfig => systemConfig.Name == "VND_TO_POINTS")!.Value;

                    customerLoyaltyPoints = (int)(customerLoyaltyPoints + (requestBody.TotalPrice * vndToPoints));

                    if (requestBody.LoyaltyPoints != null)
                    {
                        customerLoyaltyPoints -= requestBody.LoyaltyPoints;
                    }

                    _context.Customers.Update(customer);

                    var payment = _context.Payments.FirstOrDefault(payment => payment.BookingId == requestBody.Id);
                    payment.Status = "Completed";
                    payment.Price = requestBody.AmoutToPaid;
                    payment.PaymentMethod = requestBody.PaymentMethod;
                    payment.CreatedDate = DateTime.Now;
                    _context.Payments.Update(payment);
                }
                else if (requestBody.Status == "Cancel")
                {
                    await _context.Transactions.Where(transaction => transaction.BookingId == requestBody.Id)
                        .ExecuteUpdateAsync(setters =>
                            setters.SetProperty(transaction => transaction.Status, "Cancel")
                        );

                    await _context.Payments
                        .Where(payment => payment.BookingId == requestBody.Id)
                        .ExecuteUpdateAsync(setters =>
                            setters.SetProperty(payment => payment.Status, "Cancel")
                        );

                    var transactionIds = _context.Transactions
                        .Where(transaction => transaction.BookingId == requestBody.Id)
                        .Select(transaction => transaction.Id).ToList();

                    await _context.TransactionDetails
                        .Where(transactionDetail => transactionIds.Contains(transactionDetail.Id))
                        .ExecuteUpdateAsync(setters
                            => setters.SetProperty(transactionDetail => transactionDetail.Status, "Cancel")
                        );

                    var bookingDetailIds = _context.BookingDetails
                        .Where(bookingDetail => bookingDetail.BookingId == requestBody.Id).Select(bookingDetail => bookingDetail.Id).ToList();

                    await _context.BookingSlotStylists
                        .Where(bookingSlotStylist => bookingDetailIds.Contains((Guid)bookingSlotStylist.BookingDetailId!))
                        .ExecuteUpdateAsync(setters
                            => setters.SetProperty(bookingSlotStylist => bookingSlotStylist.Status, "Available")
                        );
                }

                _mapper.Map(requestBody, booking);
                booking.UpdatedDate = DateTime.Now;

                _context.Bookings.Update(booking);

                await _context.SaveChangesAsync();
                await dbTransaction.CommitAsync();

                return _mapper.Map<GetBookingModel>(booking);
            }
            catch
            {
                dbTransaction.Rollback();
                throw;
            }
        }
    }
}
