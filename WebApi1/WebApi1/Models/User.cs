using System.ComponentModel.DataAnnotations;

namespace WebApi1.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public int DepartmentId { get; set; }
    }
}
