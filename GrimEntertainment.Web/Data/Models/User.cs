using System;
using System.ComponentModel.DataAnnotations;

namespace GrimEntertainment.Web.Data.Models
{
    public class User
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string HashedPassword { get; set; }
    }
}
