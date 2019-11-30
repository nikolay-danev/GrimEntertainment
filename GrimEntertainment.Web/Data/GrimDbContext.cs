using GrimEntertainment.Web.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GrimEntertainment.Web.Data
{
    public class GrimDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }

        public GrimDbContext(DbContextOptions options) 
            : base(options)
        {
        }

        public GrimDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(x => x.Email).IsUnique();
                entity.HasIndex(x => x.Username).IsUnique();
            });

            modelBuilder.Entity<Game>(entity =>
            {
                entity.HasIndex(x => x.Title).IsUnique();
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
