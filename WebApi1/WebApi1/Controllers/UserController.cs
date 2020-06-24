using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi1.Models;

namespace WebApi1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContext _db;
        public UserController(UserContext context)
        {
            _db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return await _db.Users.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromBody] User user)
        {
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            HttpContext.Response.StatusCode = 201;

            return user.Id;
        }
        [HttpPut]
        public async Task<ActionResult<int>> Put([FromBody] User user)
        {
            var check = await _db.Users.AnyAsync(a => a.Id == user.Id);

            _db.Users.Update(user);
            await _db.SaveChangesAsync();

            HttpContext.Response.StatusCode = check ? 204 : 201;

            return user.Id;
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<string>> Delete(int id)
        {
            var check = await _db.Users.FirstOrDefaultAsync(a => a.Id == id);

            if (check == null)
            {
                HttpContext.Response.StatusCode = 406;
                return "User not found";
            } 

            _db.Users.Remove(check);
            await _db.SaveChangesAsync();

            HttpContext.Response.StatusCode = 204;

            return "User was delete";
        }
    }
}
