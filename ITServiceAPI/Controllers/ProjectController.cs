using ITServiceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ItserviceContext _context;

        public ProjectsController(ItserviceContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var record = await _context.ViewProjectDetails.ToListAsync();
            return Ok(record);
        }



        [HttpGet("getProjectByUserID/{loginId}")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjectsById(int loginId)
        {
            var record = await _context.ViewProjectDetails.Where(p=>p.EmpId== loginId).ToListAsync();
            return Ok(record);
        }



        [HttpGet("getProjectCount")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjectsCount(int rolesId)
        {
            var record = await _context.ViewManagerProjectCounts.ToListAsync();
            return Ok(record);
        }


        // POST: api/Projects
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return Ok( new { message="save" });
        }


        // PUT: api/Projects/
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, Project project)
        {
            var record = await _context.Projects.FindAsync(id);
            if (record == null)
            {
                return Ok(new { message = "not found" });
            }


            try
            {
                record.ProjectName = project.ProjectName;
                record.Description = project.Description;
                record.EmpId = project.EmpId;
                record.StartDate = project.StartDate;
                record.EndDate = project.EndDate;
                await _context.SaveChangesAsync();

                return Ok(new { message = "updated" });
            }
            catch (Exception exp)
            {
                return Ok(exp);
            }
        }


        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return Ok(new {message="not found"});
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Ok(new {message="deleted"});
        }


        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.ProjectId == id);
        }
    }
}
