using Microsoft.EntityFrameworkCore;

namespace WebApi1.Models
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public UserContext(DbContextOptions options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
