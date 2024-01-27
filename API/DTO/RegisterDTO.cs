using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Text)]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "Password must be at least 8 chars long")]
        // [RegularExpression("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$)(?=.*[@#$%^&-+=()]).{8,20}$", ErrorMessage = "Password must have min. 1 lowercase, 1 uppercase, 1 number")]
        public string Password { get; set; }
    }
}