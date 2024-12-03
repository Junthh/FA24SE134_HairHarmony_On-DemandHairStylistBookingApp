using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace hair_hamony.Data.Entities;

public partial class HairHamonyContext : DbContext
{
    public HairHamonyContext()
    {
    }

    public HairHamonyContext(DbContextOptions<HairHamonyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<BookingDetail> BookingDetails { get; set; }

    public virtual DbSet<BookingSlotStylist> BookingSlotStylists { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Combo> Combos { get; set; }

    public virtual DbSet<ComboService> ComboServices { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Kpi> Kpis { get; set; }

    public virtual DbSet<News> News { get; set; }

    public virtual DbSet<Owner> Owners { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<PaymentDetail> PaymentDetails { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<Staff> Staffs { get; set; }

    public virtual DbSet<StaffSalary> StaffSalarys { get; set; }

    public virtual DbSet<Stylist> Stylists { get; set; }

    public virtual DbSet<StylistSalary> StylistSalarys { get; set; }

    public virtual DbSet<StylistSalaryDetail> StylistSalaryDetails { get; set; }

    public virtual DbSet<StylistWorkship> StylistWorkships { get; set; }

    public virtual DbSet<SystemConfig> SystemConfigs { get; set; }

    public virtual DbSet<TimeSlot> TimeSlots { get; set; }

    public virtual DbSet<Timekeeping> Timekeepings { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<Workship> Workships { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=hairhamony.database.windows.net;Initial Catalog=HairHamony;Persist Security Info=True;User ID=hairhamony;Password=abcd@1234;Encrypt=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Bookings__3214EC07246F1D70");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Customer).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Bookings__Custom__0C85DE4D");

            entity.HasOne(d => d.Staff).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.StaffId)
                .HasConstraintName("FK_Bookings_Staffs");
        });

        modelBuilder.Entity<BookingDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookingD__3214EC07DF887C51");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Booking).WithMany(p => p.BookingDetails)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__BookingDe__Booki__10566F31");

            entity.HasOne(d => d.Combo).WithMany(p => p.BookingDetails)
                .HasForeignKey(d => d.ComboId)
                .HasConstraintName("FK__BookingDe__Combo__123EB7A3");

            entity.HasOne(d => d.Service).WithMany(p => p.BookingDetails)
                .HasForeignKey(d => d.ServiceId)
                .HasConstraintName("FK__BookingDe__Servi__114A936A");
        });

        modelBuilder.Entity<BookingSlotStylist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookingS__3214EC07493ACADD");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.BookingDetail).WithMany(p => p.BookingSlotStylists)
                .HasForeignKey(d => d.BookingDetailId)
                .HasConstraintName("FK__BookingSl__Booki__160F4887");

            entity.HasOne(d => d.Kpi).WithMany(p => p.BookingSlotStylists)
                .HasForeignKey(d => d.KpiId)
                .HasConstraintName("FK__BookingSl__KpiId__15DA3E5D");

            entity.HasOne(d => d.Stylist).WithMany(p => p.BookingSlotStylists)
                .HasForeignKey(d => d.StylistId)
                .HasConstraintName("FK_BookingSlotStylists_Stylists");

            entity.HasOne(d => d.StylistWorkship).WithMany(p => p.BookingSlotStylists)
                .HasForeignKey(d => d.StylistWorkshipId)
                .HasConstraintName("FK_BookingSlotStylists_StylistWorkships");

            entity.HasOne(d => d.TimeSlot).WithMany(p => p.BookingSlotStylists)
                .HasForeignKey(d => d.TimeSlotId)
                .HasConstraintName("FK__BookingSl__TimeS__17036CC0");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3214EC07CB49513F");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Image).IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Combo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Combos__3214EC07B5700F39");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Image).IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Category).WithMany(p => p.Combos)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_Combos_Categories");
        });

        modelBuilder.Entity<ComboService>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ComboSer__3214EC07A29B0152");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Combo).WithMany(p => p.ComboServices)
                .HasForeignKey(d => d.ComboId)
                .HasConstraintName("FK__ComboSeri__Combo__04E4BC85");

            entity.HasOne(d => d.Service).WithMany(p => p.ComboServices)
                .HasForeignKey(d => d.ServiceId)
                .HasConstraintName("FK__ComboSeri__Servi__05D8E0BE");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Customer__3214EC07B7B98A2A");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Avatar).IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Feedback__3214EC07B129348D");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Booking).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__Feedbacks__Booki__1AD3FDA4");

            entity.HasOne(d => d.Stylist).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.StylistId)
                .HasConstraintName("FK_Feedbacks_Stylists");
        });

        modelBuilder.Entity<Kpi>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Kpis__3214EC072E2BF8F5");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__News__3214EC0779EEB0CB");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Author).HasMaxLength(100);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Thumbnail).IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Staff).WithMany(p => p.News)
                .HasForeignKey(d => d.StaffId)
                .HasConstraintName("FK_News_Staff");
        });

        modelBuilder.Entity<Owner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Admin__3214EC07A25C9D1D");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Avatar).IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Password).IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Payments__3214EC07CF1C8015");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(100);
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Booking).WithMany(p => p.Payments)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__Payments__Bookin__1EA48E88");
        });

        modelBuilder.Entity<PaymentDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_PaymentDetail");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Payment).WithMany(p => p.PaymentDetails)
                .HasForeignKey(d => d.PaymentId)
                .HasConstraintName("FK_PaymentDetail_Payments");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Services__3214EC07B3DB7425");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Image).IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Category).WithMany(p => p.Services)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Services__Catego__7E37BEF6");
        });

        modelBuilder.Entity<Staff>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Staff__3214EC072938E32E");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Avatar).IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Password).IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<StaffSalary>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StaffSal__3214EC0787DE0A03");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Staff).WithMany(p => p.StaffSalaries)
                .HasForeignKey(d => d.StaffId)
                .HasConstraintName("FK__StaffSala__Staff__09746778");
        });

        modelBuilder.Entity<Stylist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Stylists__3214EC0787544767");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Avatar).IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Level).HasMaxLength(100);
            entity.Property(e => e.Password).IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<StylistSalary>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SalarySt__3214EC07ADAEDF8D");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Stylist).WithMany(p => p.StylistSalaries)
                .HasForeignKey(d => d.StylistId)
                .HasConstraintName("FK__SalarySty__Styli__6FE99F9F");
        });

        modelBuilder.Entity<StylistSalaryDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StylistS__3214EC07E32F9466");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Booking).WithMany(p => p.StylistSalaryDetails)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__StylistSa__Booki__11158940");

            entity.HasOne(d => d.StylistSalary).WithMany(p => p.StylistSalaryDetails)
                .HasForeignKey(d => d.StylistSalaryId)
                .HasConstraintName("FK__StylistSa__Styli__10216507");
        });

        modelBuilder.Entity<StylistWorkship>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StylistW__3214EC070686DA2E");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Stylist).WithMany(p => p.StylistWorkships)
                .HasForeignKey(d => d.StylistId)
                .HasConstraintName("FK__StylistWo__Styli__778AC167");

            entity.HasOne(d => d.Timekeeping).WithMany(p => p.StylistWorkships)
                .HasForeignKey(d => d.TimekeepingId)
                .HasConstraintName("FK__StylistWo__Timek__14E61A24");

            entity.HasOne(d => d.Workship).WithMany(p => p.StylistWorkships)
                .HasForeignKey(d => d.WorkshipId)
                .HasConstraintName("FK__StylistWo__Works__76969D2E");
        });

        modelBuilder.Entity<SystemConfig>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SystemCo__3214EC07222FD130");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TimeSlot>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TimeSlot__3214EC07FCE40C10");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Timekeeping>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Timekeep__3214EC07CD8D3481");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Transact__3214EC07DF064DD0");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Booking).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__Transacti__Booki__22751F6C");
        });

        modelBuilder.Entity<Workship>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Workship__3214EC0785ED0D6A");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
