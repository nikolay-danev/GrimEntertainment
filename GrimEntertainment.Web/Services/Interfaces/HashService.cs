using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Text;

namespace GrimEntertainment.Web.Services.Interfaces
{
    public class HashService : IHashService
    {
        public string HashPassword(string password)
        {

            var valueBytes = KeyDerivation.Pbkdf2(
                                password: password,
                                salt: Encoding.UTF8.GetBytes("NichetoEMnQk"),
                                prf: KeyDerivationPrf.HMACSHA512,
                                iterationCount: 10000,
                                numBytesRequested: 256 / 8);

            return Convert.ToBase64String(valueBytes);
        }

        public bool Validate(string hashedPassword, string inputPassword)
            => HashPassword(inputPassword) == hashedPassword;
    }
}
