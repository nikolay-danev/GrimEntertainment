using System.ComponentModel.DataAnnotations;

namespace GrimEntertainment.Web.Data.Models
{
    public class UserLoginModel
    {
        [Required]
        [DataType(DataType.Password)]
        public string Username { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string AuthToken { get; set; }

        public string Id { get; set; }
    }
}
