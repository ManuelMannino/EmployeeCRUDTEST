using EmployeeManagement.Data;
using EmployeeManagement.Moldes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;
        public EmployeeController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployee()
        {
            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Employee>>> UpdateEmployee(Employee employee)
        {
            var dbEmployee = _context.Employees.Where(x => x.Id.Equals(employee.Id)).FirstOrDefault();
            if (dbEmployee == null) { return BadRequest(string.Empty); }

            dbEmployee.firstName = employee.firstName;
            dbEmployee.lastName = employee.lastName;
            dbEmployee.email = employee.email;
            dbEmployee.phoneNumber = employee.phoneNumber;

            await _context.SaveChangesAsync();
            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee (Guid id)
        {
            var dbEmployee = _context.Employees.Where(x => x.Id.Equals(id)).FirstOrDefault();
            if (dbEmployee == null) { return BadRequest(string.Empty); }

            _context.Employees.Remove(dbEmployee);

            await _context.SaveChangesAsync();
            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<List<Employee>>> GetAllEmployeeByEmail(string email)
        {
            return Ok(await _context.Employees.Where(x=> x.email.Contains(email)).ToListAsync());
        }
    }
}
