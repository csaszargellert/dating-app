using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO userDto)
        {

            if (await UserExists(userDto.Username))
            {
                return BadRequest("User already exists");
            }

            using var hmac = new HMACSHA256();

            AppUser user = new AppUser
            {
                Username = userDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password)),
                PasswordSalt = hmac.Key,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();



            return new UserDTO(
                user.Username,
                 _tokenService.CreateToken(user)
            );
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => loginDto.Username.ToLower() == x.Username);

            if (user is null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA256(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            if (computedHash.SequenceEqual(user.PasswordHash)) return new UserDTO(user.Username, _tokenService.CreateToken(user));

            return Unauthorized("Invalid password");
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.Username == username.ToLower());
        }

    }
}