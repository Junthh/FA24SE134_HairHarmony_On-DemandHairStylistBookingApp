using Microsoft.AspNetCore.Http;

namespace hair_hamony.Business.ViewModels
{
    public static class SuccessMessageResponse
    {
        public const string SEND_REQUEST = "Gửi yêu cầu thành công";
        public const string CREATED_REQUEST = "Tạo thành công";
        public const string UPDATED_REQUEST = "Cập nhật thàhh công";
        public const string LOGIN_REQUEST = "Đăng nhập thành công";
    }

    public class BaseResponse<T>
    {
        public int StatusCode { get; }
        public string Msg { get; }
        public bool Success { get; }
        public T? Data { get; }
        public BaseResponse(T? data, int statusCode = StatusCodes.Status200OK, string msg = SuccessMessageResponse.SEND_REQUEST, bool success = true)
        {
            StatusCode = statusCode;
            Success = success;
            Msg = msg;
            Data = data;
        }
    }

    public class ErrorResponse
    {
        public int StatusCode { get; }
        public string? Msg { get; }
        public string? Detail { get; }
        public bool Success { get; }
        public ErrorResponse(string? msg, string? detail, int statusCode = StatusCodes.Status500InternalServerError, bool success = false)
        {
            StatusCode = statusCode;
            Success = success;
            Msg = msg;
            Detail = detail;
        }
    }

    public class ModelsResponse<T>
    {
        public int StatusCode { get; }
        public string Msg { get; }
        public bool Success { get; }
        public IList<T> Data { get; }
        public PagingResponse Paging { get; }
        public ModelsResponse(PagingResponse paging, IList<T> data, int statusCode = StatusCodes.Status200OK,
            bool success = true, string msg = SuccessMessageResponse.SEND_REQUEST)
        {
            StatusCode = statusCode;
            Success = success;
            Msg = msg;
            Data = data;
            Paging = paging;
        }
    }

    public class ModelDataLoginResponse<T> where T : new()
    {
        public string Token { get; set; }
        public dynamic User { get; set; }
        public ModelDataLoginResponse(string token, T user)
        {
            Token = token;
            User = user!;
        }
    }

    public class ModelOwnerDataLoginResponse
    {
        public string Token { get; set; }
        public Guid Id { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Avatar { get; set; }
        public string Role { get; set; }

        public ModelOwnerDataLoginResponse(string token, Guid id, string? email, string? firstName, string? lastName, string? avatar, string role)
        {
            Token = token;
            Id = id;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Avatar = avatar;
            Role = role;
        }
    }

    public class ModelTouristDataLoginResponse
    {
        public string Token { get; set; }
        public Guid Id { get; set; }
        public string? PhoneNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Role { get; set; }
        public ModelTouristDataLoginResponse(string token, Guid id, string? phoneNumber, string? firstName, string? lastName, string role)
        {
            Token = token;
            Id = id;
            PhoneNumber = phoneNumber;
            FirstName = firstName;
            LastName = lastName;
            Role = role;
        }
    }

    public class ModelAdminDataLoginResponse
    {
        public string Token { get; set; }
        public Guid Id { get; set; }
        public string? Username { get; set; }
        public string Role { get; set; }
        public ModelAdminDataLoginResponse(string token, Guid id, string username, string role)
        {
            Token = token;
            Id = id;
            Username = username;
            Role = role;
        }
    }

    public class ModelOwnerLoginResponse
    {
        public int StatusCode { get; }
        public string Msg { get; }
        public bool Success { get; }
        public ModelOwnerDataLoginResponse Data { get; }
        public ModelOwnerLoginResponse(ModelOwnerDataLoginResponse data, int statusCode = StatusCodes.Status200OK,
            bool success = true, string msg = SuccessMessageResponse.LOGIN_REQUEST)
        {
            StatusCode = statusCode;
            Success = success;
            Msg = msg;
            Data = data;
        }
    }

    public class ModelTouristLoginResponse
    {
        public int StatusCode { get; }
        public string Msg { get; }
        public bool Success { get; }
        public ModelTouristDataLoginResponse Data { get; }
        public ModelTouristLoginResponse(ModelTouristDataLoginResponse data, int statusCode = StatusCodes.Status200OK,
            bool success = true, string msg = SuccessMessageResponse.LOGIN_REQUEST)
        {
            StatusCode = statusCode;
            Success = success;
            Msg = msg;
            Data = data;
        }
    }

    public class ModelLoginResponse<T> where T : new()
    {
        public int StatusCode { get; }
        public string Msg { get; }
        public bool Success { get; }
        public ModelDataLoginResponse<T> Data { get; }
        public ModelLoginResponse(ModelDataLoginResponse<T> data, int statusCode = StatusCodes.Status200OK,
            bool success = true, string msg = SuccessMessageResponse.LOGIN_REQUEST)
        {
            StatusCode = statusCode;
            Success = success;
            Msg = msg;
            Data = data;
        }
    }

    public class ModelAdminLoginResponse
    {
        public int StatusCode { get; }
        public string Msg { get; }
        public bool Success { get; }
        public ModelAdminDataLoginResponse Data { get; }
        public ModelAdminLoginResponse(ModelAdminDataLoginResponse data, int statusCode = StatusCodes.Status200OK,
            bool success = true, string msg = SuccessMessageResponse.LOGIN_REQUEST)
        {
            StatusCode = statusCode;
            Success = success;
            Msg = msg;
            Data = data;
        }
    }

    public class PagingResponse
    {
        public int Page { get; set; }
        public int Size { get; set; }
        public int Total { get; set; }
    }
}