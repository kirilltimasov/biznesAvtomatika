using Microsoft.EntityFrameworkCore;

namespace WebApi2.Models
{
    public class DepartmentContext : DbContext
    {
        public DbSet<Department> Departments { get; set; }

        public DepartmentContext(DbContextOptions options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
