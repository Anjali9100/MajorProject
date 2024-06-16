using ITServiceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectBranchesController : ControllerBase
    {
        private readonly ItserviceContext _context;

        public ProjectBranchesController(ItserviceContext context)
        {
            _context = context;
        }



        // GET: api/ProjectBranches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectBranch>>> GetProjectBranches()
        {
            var record =  await _context.ProjectBranchDetails.ToListAsync();
            return Ok(record);
        }



        // GET: api/ProjectBranches/5
        [HttpGet("getBranchBasedOnProject/{id}")]
        public async Task<ActionResult<ProjectBranch>> GetProjectBranch(int id)
        {
            var projectBranches = await _context.ProjectBranches.Where(pb => pb.ProjectId == id).ToListAsync();

            if (projectBranches == null)
            {
                return Ok(new { message = "not found" });
            }

            return Ok(projectBranches);
        }



        // POST: api/ProjectBranches
        [HttpPost]
        public async Task<ActionResult<ProjectBranch>> PostProjectBranch(ProjectBranch projectBranch)
        {
            _context.ProjectBranches.Add(projectBranch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "save" });
        }



        // PUT: api/ProjectBranches/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjectBranch(int id, ProjectBranch projectBranch)
        {
            var record = await _context.ProjectBranches.FindAsync(id);
            if (record == null)
            {
                return Ok(new { message = "not found" });
            }

            try
            {
                record.BranchName = projectBranch.BranchName;
                record.Description = projectBranch.Description;
                await _context.SaveChangesAsync();

                return Ok(new { message = "updated" });
            }
            catch (Exception exp)
            {
                return Ok(exp);
            }
        }



        // DELETE: api/ProjectBranches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectBranch(int id)
        {
            var projectBranch = await _context.ProjectBranches.FindAsync(id);
            if (projectBranch == null)
            {
                return Ok(new { message = "not found" });
            }

            _context.ProjectBranches.Remove(projectBranch);
            await _context.SaveChangesAsync();

            return Ok(new { message = "deleted" });
        }



        private bool ProjectBranchExists(int id)
        {
            return _context.ProjectBranches.Any(e => e.BranchId == id);
        }
    }
}
