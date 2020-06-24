using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi2.Models;

namespace WebApi2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentContext _db;
        public DepartmentController(DepartmentContext context)
        {
            _db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Department>>> Get()
        {
            return await _db.Departments.ToListAsync();
        }
    }
}
