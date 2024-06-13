using ITServiceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectMembersController : ControllerBase
    {
        private readonly ItserviceContext _context;

        public ProjectMembersController(ItserviceContext context)
        {
            _context = context;
        }



        // GET: api/ProjectMembers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectMember>>> GetProjectMembers()
        {
            return await _context.ProjectMembers.ToListAsync();
        }



        // GET: api/ProjectMembers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectMember>> GetProjectMember(int id)
        {
            var projectMember = await _context.ProjectMembers.FirstOrDefaultAsync(pm => pm.ProjectMemberId == id);

            if (projectMember == null)
            {
                return Ok(new {message="not found"});
            }

            return projectMember;
        }



        // POST: api/ProjectMembers
        [HttpPost]
        public async Task<ActionResult<ProjectMember>> PostProjectMember(ProjectMember projectMember)
        {
            _context.ProjectMembers.Add(projectMember);
            await _context.SaveChangesAsync();

            return Ok(new { message = "save" });

        }



        // PUT: api/ProjectMembers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjectMember(int id, ProjectMember projectMember)
        {
            if (id != projectMember.ProjectMemberId)
            {
                return Ok(new { message = "not found" });
            }

            _context.Entry(projectMember).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectMemberExists(id))
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




        // DELETE: api/ProjectMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectMember(int id)
        {
            var projectMember = await _context.ProjectMembers.FindAsync(id);
            if (projectMember == null)
            {
                return Ok(new {message = "not found"});
            }

            _context.ProjectMembers.Remove(projectMember);
            await _context.SaveChangesAsync();

            return Ok(new { message = "deleted" });
        }

        private bool ProjectMemberExists(int id)
        {
            return _context.ProjectMembers.Any(e => e.ProjectMemberId == id);
        }
    }
}
