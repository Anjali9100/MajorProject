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
            var record = await _context.ViewProjectMemberDetails.ToListAsync();
            return Ok(record);
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
            var record = await _context.ProjectMembers.FindAsync(id);
            if (record == null)
            {
                return Ok(new { message = "not found" });
            }

            try
            {
                record.RoleId = projectMember.RoleId;
                record.ProjectId = projectMember.ProjectId;
                record.BranchId = projectMember.BranchId;
                record.ProModuleId = projectMember.ProModuleId;
                record.EmpId = projectMember.EmpId;
                await _context.SaveChangesAsync();

                return Ok(new { message = "updated" });
            }
            catch (Exception exp)
            {
                return Ok(exp);
            }
        }





        [HttpPut("updateStatus/{projectMemberID}")]
        public async Task<IActionResult> UpdateProjectMemberStatus(int projectMemberID, ProjectMember projectMember)
        {
            var record = await _context.ProjectMembers.FindAsync(projectMemberID);
            if (record == null)
            {
                return Ok(new { message = "not found" });
            }

            try
            {
                record.Status = projectMember.Status;
                record.RoleId = projectMember.RoleId; 

                await _context.SaveChangesAsync();
                return Ok(new { message = "Status updated" });
            }
            catch (Exception exp)
            {
                return StatusCode(500, new { message = exp.Message }); 
            }
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
