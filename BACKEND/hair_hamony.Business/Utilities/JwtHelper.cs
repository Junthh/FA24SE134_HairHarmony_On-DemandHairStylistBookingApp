using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace hair_hamony.Business.Utilities
{

    public interface IJwtHelper
    {
        string GenerateJwtToken(string role, Guid id, string? email = null, string? phoneNumber = null, string? username = null);
    }
    public class JwtHelper : IJwtHelper
    {
        private readonly IConfiguration _config;

        public JwtHelper(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateJwtToken(string role, Guid id, string? email = null, string? phoneNumber = null, string? username = null)
        {
            // symmetric security key
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]!));

            // signing credentials
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var claim = new[]{
                new Claim("Username", username ?? ""),
                new Claim("Email", email ?? ""),
                new Claim("PhoneNumber", phoneNumber ?? ""),
                new Claim("Id", id.ToString()),
                new Claim("Role", role),
                new Claim(ClaimTypes.Role, role)
            };

            // create token
            var token = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signingCredentials,
                claims: claim
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}