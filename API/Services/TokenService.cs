using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        private readonly string _issuer;
        private readonly string _audience;
        private const int ExpirationMinutes = 180;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtSettings:Key"]));
            _issuer = config["JwtSettings:Issuer"];
            _audience = config["JwtSettings:Audience"];
        }

        public string CreateToken(AppUser user)
        {
            var expiration = DateTime.UtcNow.AddMinutes(ExpirationMinutes);
            var claims = CreateClaims(user);
            var signingCredentials = CreateSigninCredentials();
            var token = new JwtSecurityToken(_issuer, _audience, claims, null, expiration, signingCredentials);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        private static List<Claim> CreateClaims(AppUser user)
        {
            return new List<Claim> {
                new Claim(JwtRegisteredClaimNames.NameId, user.Username),
            };
        }

        private SigningCredentials CreateSigninCredentials()
        {
            return new SigningCredentials(_key, SecurityAlgorithms.HmacSha512);
        }
    }
}