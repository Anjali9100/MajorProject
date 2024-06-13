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
            return await _context.ProjectBranches.ToListAsync();
        }



        // GET: api/ProjectBranches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectBranch>> GetProjectBranch(int id)
        {
            var projectBranch = await _context.ProjectBranches.FirstOrDefaultAsync(pb => pb.BranchId == id);

            if (projectBranch == null)
            {
                return Ok(new { message = "not found" });
            }

            return projectBranch;
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
            if (id != projectBranch.BranchId)
            {
                return Ok(new {message="not found"});
            }

            _context.Entry(projectBranch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectBranchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
