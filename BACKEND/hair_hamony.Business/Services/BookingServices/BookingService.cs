using AutoMapper;
using hair_hamony.Business.Common;
using hair_hamony.Business.Commons;
using hair_hamony.Business.Commons.Paging;
using hair_hamony.Business.Enum;
using hair_hamony.Business.Services.BookingSlotStylistServices;
using hair_hamony.Business.Services.StylistSalaryServices;
using hair_hamony.Business.Utilities;
using hair_hamony.Business.Utilities.ErrorHandling;
using hair_hamony.Business.ViewModels.Bookings;
using hair_hamony.Business.ViewModels.TimeSlots;
using hair_hamony.Data.Entities;
using home_travel.Business.Services.VnPayServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace hair_hamony.Business.Services.BookingServices
{
    public class BookingService : IBookingService
    {
        private readonly HairHamonyContext _context;
        private readonly IMapper _mapper;
        private readonly IBookingSlotStylistService _bookingSlotStylistService;
        private readonly IStylistSalaryService _stylistSalaryService;
        private readonly IConfiguration _configuration;

        public BookingService(IMapper mapper,
            IBookingSlotStylistService bookingSlotStylistService,
            IStylistSalaryService stylistSalaryService,
            IConfiguration configuration)
        {
            _context = new HairHamonyContext();
            _mapper = mapper;
            _bookingSlotStylistService = bookingSlotStylistService;
            _stylistSalaryService = stylistSalaryService;
            _configuration = configuration;
        }

        public async Task<GetBookingModel> Create(CreateBookingModel requestBody)
        {
            var booking = _mapper.Map<Booking>(requestBody);
            booking.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();
            booking.UpdatedDate = UtilitiesHelper.DatetimeNowUTC7();

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

        public async Task<(IList<GetDetailBookingModel>, int)> GetAll(
            PagingParam<BookingEnum.BookingSort> paginationModel,
            SearchBookingModel searchBookingModel,
            string? customerPhoneNumber,
            Guid? stylistId, DateOnly? startDate, DateOnly? endDate)
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

            if (stylistId != null)
            {
                query = query.Where(booking =>
                    booking.BookingDetails.Any(bookingDetail =>
                        bookingDetail.BookingSlotStylists.Any(bookingSlotStylist =>
                            bookingSlotStylist.Stylist.Id == stylistId)
                        )
                    );
            }

            if (startDate != null && endDate != null)
            {
                query = query.Where(booking => booking.BookingDate >= startDate && booking.BookingDate <= endDate);
            }

            query = query.GetWithSearch(searchBookingModel);
            query = query.GetWithSorting(paginationModel.SortKey.ToString(), paginationModel.SortOrder);
            var total = await query.CountAsync();
            query = query.GetWithPaging(paginationModel.PageIndex, paginationModel.PageSize).AsQueryable();

            var results = _mapper.Map<IList<GetDetailBookingModel>>(query);

            foreach (var item in results)
            {
                item.IsFeedback = item.Feedbacks != null && item.Feedbacks.Any() && item.Status == "Finished";
                var timeSlots = new List<GetTimeSlotModel>();
                foreach (var bookingDetail in item.BookingDetails)
                {
                    foreach (var bookingSlotStylist in bookingDetail.BookingSlotStylists)
                    {
                        timeSlots.Add(bookingSlotStylist.TimeSlot);
                    }
                }

                item.StartTime = timeSlots.OrderBy(x => x.StartTime).FirstOrDefault().StartTime;
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
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
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
                    CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                    UpdatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                }).Entity;

                var transactionId = Guid.NewGuid();
                _context.Transactions.Add(new Transaction
                {
                    Id = transactionId,
                    CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                    UpdatedDate = UtilitiesHelper.DatetimeNowUTC7(),
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
                    CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
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
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7()
                        });

                        int countServiceDuration = countTimeSlot + (int)Math.Ceiling(service.Duration!.Value / (decimal)60);

                        for (int i = countTimeSlot; i < countServiceDuration; i++)
                        {
                            var timeSlotNext = _context.TimeSlots
                                .FirstOrDefault(x => x.StartTime == timeSlot!.StartTime!.Value.AddHours(i));
                            await IsStylistBusy(requestBody.BookingDate, timeSlotNext!.Id, stylist!.Id);

                            _context.BookingSlotStylists.Add(new BookingSlotStylist
                            {
                                Status = "Booked",
                                BookingDate = requestBody.BookingDate,
                                CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                                UpdatedDate = UtilitiesHelper.DatetimeNowUTC7(),
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
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                            Price = serviceModel.Price,
                            PaymentId = paymentId,
                            Status = "Initialize"
                        });

                        countTimeSlot += countServiceDuration;
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
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7()
                        });

                        int countServiceDuration = countTimeSlot + (int)Math.Ceiling(combo.Duration!.Value / (decimal)60);

                        for (int i = countTimeSlot; i < countServiceDuration; i++)
                        {
                            var timeSlotNext = _context.TimeSlots
                                .FirstOrDefault(x => x.StartTime == timeSlot!.StartTime!.Value.AddHours(i));
                            await IsStylistBusy(requestBody.BookingDate, timeSlotNext!.Id, stylist!.Id);

                            _context.BookingSlotStylists.Add(new BookingSlotStylist
                            {
                                Status = "Booked",
                                BookingDate = requestBody.BookingDate,
                                CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                                UpdatedDate = UtilitiesHelper.DatetimeNowUTC7(),
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
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                            Price = comboModel.TotalPrice,
                            PaymentId = paymentId,
                            Status = "Initalize"
                        });

                        countTimeSlot += countServiceDuration;
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
                    _context.Transactions.Add(new Transaction
                    {
                        BookingId = requestBody.Id,
                        Id = Guid.NewGuid(),
                        CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                        Status = requestBody.Status,
                        UpdatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                    });
                }

                // tăng số lượng booking cho stylist khi hoàn thành booking
                if (requestBody.Status == "Finished")
                {
                    var stylistIds = from bookingDetail in _context.BookingDetails
                                     join bookingSlotStylist in _context.BookingSlotStylists on bookingDetail.Id equals bookingSlotStylist.BookingDetailId
                                     where bookingDetail.BookingId == requestBody.Id
                                     select bookingSlotStylist.StylistId;

                    var monthCurrent = UtilitiesHelper.DatetimeNowUTC7().Month;
                    var yearCurrent = UtilitiesHelper.DatetimeNowUTC7().Year;

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
                        var kpi = _context.Kpis.FirstOrDefault(x =>
                                x.StartDate <= DateOnly.FromDateTime(UtilitiesHelper.DatetimeNowUTC7())
                                && x.EndDate >= DateOnly.FromDateTime(UtilitiesHelper.DatetimeNowUTC7()
                                )
                            );

                        var stylistSalaryId = Guid.NewGuid();
                        var totalKpi = kpi.Value + stylist.Kpi;
                        var totalSalary = stylist.Salary * 1 / totalKpi;
                        _context.StylistSalarys.Add(new StylistSalary
                        {
                            Id = stylistSalaryId,
                            Month = monthCurrent,
                            Year = yearCurrent,
                            StylistId = stylist.Id,
                            TotalBooking = 1,
                            TotalCommission = 0,
                            Kpi = totalKpi,
                            TotalSalary = totalSalary,
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                        });

                        _context.StylistSalaryDetails.Add(new StylistSalaryDetail
                        {
                            Commission = 0,
                            StylistSalaryId = stylistSalaryId,
                            BookingId = requestBody.Id,
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7()
                        });
                    }
                    else
                    {
                        var commissionRate = _context.SystemConfigs.FirstOrDefault(systemConfig => systemConfig.Name == "COMMISSION_RATE")!.Value!.Value;

                        var totalBooking = stylistSalary.TotalBooking + 1;
                        //var kpi = _context.Kpis.FirstOrDefault(kpi =>
                        //    kpi.StartDate <= DateOnly.FromDateTime(UtilitiesHelper.DatetimeNowUTC7())
                        //    && kpi.EndDate >= DateOnly.FromDateTime(UtilitiesHelper.DatetimeNowUTC7())
                        //);

                        var newCommission = totalBooking > stylistSalary.Kpi ? requestBody.TotalPrice * commissionRate / 100 : 0;
                        var totalSalary = totalBooking > stylistSalary.Kpi ? stylistSalary.TotalSalary : stylist.Salary * totalBooking / stylistSalary.Kpi;
                        await _stylistSalaryService.Update(stylistSalary.Id, new ViewModels.StylistSalarys.UpdateStylistSalaryModel
                        {
                            Id = stylistSalary.Id,
                            Month = stylistSalary.Month,
                            Year = stylistSalary.Year,
                            StylistId = stylistSalary.StylistId,
                            TotalBooking = totalBooking,
                            TotalCommission = stylistSalary.TotalCommission + newCommission,
                            TotalSalary = totalSalary + newCommission
                        });
                        _context.StylistSalaryDetails.Add(new StylistSalaryDetail
                        {
                            Commission = newCommission,
                            StylistSalaryId = stylistSalary.Id,
                            BookingId = requestBody.Id,
                            CreatedDate = UtilitiesHelper.DatetimeNowUTC7()
                        });
                    }

                    var customer = _context.Customers.FirstOrDefault(customer => customer.Id == requestBody.CustomerId);
                    // var customerLoyaltyPoints = customer!.LoyaltyPoints;

                    var vndToPoints = _context.SystemConfigs.FirstOrDefault(systemConfig => systemConfig.Name == "VND_TO_POINTS")!.Value;

                    // customerLoyaltyPoints = (int)(customerLoyaltyPoints + (requestBody.TotalPrice * vndToPoints));

                    if (requestBody.LoyaltyPoints != null)
                    {
                        customer!.LoyaltyPoints = customer!.LoyaltyPoints - requestBody.LoyaltyPoints;
                    }

                    _context.Customers.Update(customer);

                    var payment = _context.Payments.FirstOrDefault(payment => payment.BookingId == requestBody.Id);
                    payment.Status = "Completed";
                    payment.Price = requestBody.AmoutToPaid;
                    payment.PaymentMethod = requestBody.PaymentMethod;
                    payment.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();
                    _context.Payments.Update(payment);

                    _context.PaymentDetails.Add(new PaymentDetail
                    {
                        CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                        PaymentId = payment.Id,
                        Price = payment.Price,
                        Status = "Success",
                    });
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

                    var bookingDetailIds = _context.BookingDetails
                        .Where(bookingDetail => bookingDetail.BookingId == requestBody.Id).Select(bookingDetail => bookingDetail.Id).ToList();

                    await _context.BookingSlotStylists
                        .Where(bookingSlotStylist => bookingDetailIds.Contains((Guid)bookingSlotStylist.BookingDetailId!))
                        .ExecuteUpdateAsync(setters
                            => setters.SetProperty(bookingSlotStylist => bookingSlotStylist.Status, "Available")
                        );
                }

                _mapper.Map(requestBody, booking);
                booking.UpdatedDate = UtilitiesHelper.DatetimeNowUTC7();

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

        public GetTotalRevenueByMonthModel GetTotalRevenueByMonth(int year, int month)
        {
            var lastDayOfMonth = new DateTime(year, month, 1).AddMonths(1).AddDays(-1).Day;

            var totalRevenueByMonth = _context.Bookings.Where(booking =>
                booking.BookingDate >= DateOnly.FromDateTime(new DateTime(year, month, 1))
                && booking.BookingDate <= DateOnly.FromDateTime(new DateTime(year, month, lastDayOfMonth))
                && booking.Status == "Finished"
            ).Sum(x => x.TotalPrice);

            var result = new GetTotalRevenueByMonthModel();

            result.Month = month;
            result.Year = year;
            result.TotalRevenue = totalRevenueByMonth.Value;

            for (int i = 0; i < lastDayOfMonth; i++)
            {
                var totalRevenueByDay = _context.Bookings
                    .Where(x =>
                        x.BookingDate == DateOnly.FromDateTime(new DateTime(year, month, i + 1))
                        && x.Status == "Finished"
                    )
                    .Sum(x => x.TotalPrice);
                result.TotalRevenueByDay.Add(new GetTotalRevenueByMonthModel.GetTotalRevenueByDayModel
                {
                    Day = i + 1,
                    TotalRevenue = totalRevenueByDay.Value
                });
            }

            return result;
        }

        public GetBookingByStatusModel GetTotalBookingByStatus()
        {
            var bookings = _context.Bookings.ToList();
            return new GetBookingByStatusModel
            {
                Cancel = bookings.Where(booking => booking.Status == "Cancel").Count(),
                Initialize = bookings.Where(booking => booking.Status == "Initialize").Count(),
                Confirmed = bookings.Where(booking => booking.Status == "Confirmed").Count(),
                Processing = bookings.Where(booking => booking.Status == "Processing").Count(),
                Completed = bookings.Where(booking => booking.Status == "Completed").Count(),
                Finished = bookings.Where(booking => booking.Status == "Finished").Count(),
            };
        }

        public string PayWithVnpay(Guid id, UpdateBookingModel requestBody)
        {
            string url = _configuration["VnPay:Url"]!;
            string returnUrl = _configuration["VnPay:ReturnPathVerify"]!;
            string tmnCode = _configuration["VnPay:TmnCode"]!;
            string hashSecret = _configuration["VnPay:HashSecret"]!;
            VnPayLibrary pay = new();

            pay.AddRequestData("vnp_Version", "2.1.0"); //Phiên bản api mà merchant kết nối. Phiên bản hiện tại là 2.0.0
            pay.AddRequestData("vnp_Command", "pay"); //Mã API sử dụng, mã cho giao dịch thanh toán là 'pay'
            pay.AddRequestData("vnp_TmnCode", tmnCode); //Mã website của merchant trên hệ thống của VNPAY (khi đăng ký tài khoản sẽ có trong mail VNPAY gửi về)
            pay.AddRequestData("vnp_Amount", requestBody.AmoutToPaid + "00"); //số tiền cần thanh toán, công thức: số tiền * 100 - ví dụ 10.000 (mười nghìn đồng) --> 1000000
            pay.AddRequestData("vnp_CreateDate", UtilitiesHelper.DatetimeNowUTC7().ToString("yyyyMMddHHmmss")); //ngày thanh toán theo định dạng yyyyMMddHHmmss
            pay.AddRequestData("vnp_CurrCode", "VND"); //Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND
            pay.AddRequestData("vnp_IpAddr", "0.0.0.0"); //Địa chỉ IP của khách hàng thực hiện giao dịch
            pay.AddRequestData("vnp_Locale", "vn"); //Ngôn ngữ giao diện hiển thị - Tiếng Việt (vn), Tiếng Anh (en)
            //pay.AddRequestData("vnp_OrderInfo", JsonConvert.SerializeObject(requestBody)); //Thông tin mô tả nội dung thanh toán
            pay.AddRequestData("vnp_OrderInfo", $"{requestBody.Id},{requestBody.AmoutToPaid},{requestBody.LoyaltyPoints}");
            pay.AddRequestData("vnp_OrderType", "other"); //topup: Nạp tiền điện thoại - billpayment: Thanh toán hóa đơn - fashion: Thời trang - other: Thanh toán trực tuyến
            pay.AddRequestData("vnp_ReturnUrl", returnUrl); //URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán
            pay.AddRequestData("vnp_TxnRef", DateTime.Now.Ticks.ToString()); //mã hóa đơn
            pay.AddRequestData("vnp_ExpireDate", UtilitiesHelper.DatetimeNowUTC7().AddHours(1).ToString("yyyyMMddHHmmss")); //Thời gian kết thúc thanh toán
            return pay.CreateRequestUrl(url, hashSecret);
        }

        public async Task<string> ConfirmPayWithVnpay(HttpRequest request)
        {
            string returnUrl = _configuration["VnPay:ReturnPath"]!;
            double amount = 0;
            string status = "Failed";
            if (request.Query.Count > 0)
            {
                string vnp_HashSecret = _configuration["VnPay:HashSecret"]!; //Secret key
                var vnpayData = request.Query;
                VnPayLibrary vnpay = new VnPayLibrary();
                foreach (string s in vnpayData.Keys)
                {
                    //get all querystring data
                    if (!string.IsNullOrEmpty(s) && s.StartsWith("vnp_"))
                    {
                        vnpay.AddResponseData(s, vnpayData[s]);
                    }
                }

                //Lay danh sach tham so tra ve tu VNPAY
                //vnp_TxnRef: Ma don hang merchant gui VNPAY tai command=pay    
                //vnp_TransactionNo: Ma GD tai he thong VNPAY
                //vnp_ResponseCode:Response code from VNPAY: 00: Thanh cong, Khac 00: Xem tai lieu
                //vnp_SecureHash: HmacSHA512 cua du lieu tra ve

                long orderId = Convert.ToInt64(vnpay.GetResponseData("vnp_TxnRef"));
                float vnp_Amount = Convert.ToInt64(vnpay.GetResponseData("vnp_Amount")) / 100;
                amount = vnp_Amount;
                long vnpayTranId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
                string vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
                string vnp_TransactionStatus = vnpay.GetResponseData("vnp_TransactionStatus");
                String vnp_SecureHash = request.Query["vnp_SecureHash"]!;
                bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, vnp_HashSecret);
                var vnp_OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");
                var bookingId = Guid.Parse(vnp_OrderInfo.Split(",")[0]);
                var amountToPaid = double.Parse(vnp_OrderInfo.Split(",")[1]);
                var loyaltyPoints = int.Parse(vnp_OrderInfo.Split(",")[2]);

                if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
                {
                    status = "Success";
                    var booking = _context.Bookings
                        .AsNoTracking().FirstOrDefault(x => x.Id == bookingId);
                    await Update(bookingId, new UpdateBookingModel
                    {
                        AmoutToPaid = amountToPaid,
                        BookingDate = booking.BookingDate,
                        Id = bookingId,
                        CustomerId = booking.CustomerId,
                        ExpertFee = booking.ExpertFee,
                        LoyaltyPoints = loyaltyPoints,
                        PaymentMethod = "BANK_TRANSFER",
                        StaffId = booking.StaffId,
                        Status = "Finished",
                        TotalPrice = booking.TotalPrice
                    });
                }
                else
                {
                    var payment = _context.Payments.FirstOrDefault(payment => payment.BookingId == bookingId);
                    payment.Price = amountToPaid;
                    payment.PaymentMethod = "BANK_TRANSFER";
                    payment.CreatedDate = UtilitiesHelper.DatetimeNowUTC7();
                    _context.Payments.Update(payment);

                    _context.PaymentDetails.Add(new PaymentDetail
                    {
                        CreatedDate = UtilitiesHelper.DatetimeNowUTC7(),
                        PaymentId = payment.Id,
                        Price = payment.Price,
                        Status = status,
                    });
                    await _context.SaveChangesAsync();
                }
            }
            return status;
        }
    }
}
