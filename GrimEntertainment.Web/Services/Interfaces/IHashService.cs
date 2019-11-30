namespace GrimEntertainment.Web.Services.Interfaces
{
    public interface IHashService
    {
        public string HashPassword(string password);

        public bool Validate(string hashedPassword, string inputPassword);
    }
}
