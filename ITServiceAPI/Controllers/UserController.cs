using ITServiceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ItserviceContext _context;

        public UserController(ItserviceContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetEmployees()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("GetEmpById/{id}")]
        public async Task<ActionResult<User>> GetEmployee(int id)
        {
            var employee = await _context.Users.FindAsync(id);

            if (employee == null)
            {
                return Ok(new { message = "not found" });
            }

            return employee;
        }



        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<User>> PostEmployee(User UsersData)
        {
            var checkEmail = await _context.Users.FirstOrDefaultAsync(e => e.Email == UsersData.Email);

            if(checkEmail != null)
            {
                return Ok(new { message = "email find" });
            }


            var checkPhone = await _context.Users.FirstOrDefaultAsync(p => p.Phone == UsersData.Phone);

            if (checkPhone != null)
            {
                return Ok(new { message = "phone find" });
            }

            _context.Users.Add(UsersData);
            await _context.SaveChangesAsync();

            return Ok(new { message = "save" });
        }



        // PUT: api/Employees/5
        [HttpPut("{empId}")]
        public async Task<IActionResult> PutEmployee(int empId, User UsersData)
        {
            var record = await _context.Users.FindAsync(empId);
            if (record == null)
            {
                return Ok(new { message = "not found" });
            }

            var checkEmail = await _context.Users.FirstOrDefaultAsync(e => e.Email == UsersData.Email && e.EmpId!= empId);

            if (checkEmail != null)
            {
                return Ok(new { message = "email find" });
            }


            var checkPhone = await _context.Users.FirstOrDefaultAsync(p => p.Phone == UsersData.Phone && p.EmpId != empId);

            if (checkPhone != null)
            {
                return Ok(new { message = "phone find" });
            }

            try
            {
                record.FirstName = UsersData.FirstName;
                record.LastName = UsersData.LastName;
                record.Email = UsersData.Email;
                record.Phone = UsersData.Phone;
                record.Address = UsersData.Address;
                record.RoleId = UsersData.RoleId;
                await _context.SaveChangesAsync();

                return Ok(new { message = "updated" });
            }
            catch (Exception exp)
            {
                return Ok(exp);
            }

            
        }


        // DELETE: api/Employees/5
        [HttpDelete("{empId}")]
        public async Task<IActionResult> DeleteEmployee(int empId)
        {
            var employee = await _context.Users.FindAsync(empId);
            if (employee == null)
            {
                return Ok(new { message = "not found" });
            }

            _context.Users.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(new { message = "deleted" });
        }

        private bool EmployeeExists(int empId)
        {
            return _context.Users.Any(e => e.EmpId == empId);
        }
    }



}
