﻿namespace hair_hamony.Business.ViewModels.Users
{
    public class CreateUserModel
    {
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Avatar { get; set; }
        public Guid? RoleId { get; set; }
    }
}
