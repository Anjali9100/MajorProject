using ITServiceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsModulesController : ControllerBase
    {
        private readonly ItserviceContext _context;

        public ProjectsModulesController(ItserviceContext context)
        {
            _context = context;
        }

        // GET: api/ProjectsModules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectsModule>>> GetProjectsModules()
        {
            return await _context.ProjectsModules.ToListAsync();
        }

        // GET: api/ProjectsModules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectsModule>> GetProjectsModule(int id)
        {
            var projectsModule = await _context.ProjectsModules.FirstOrDefaultAsync(pm => pm.ProModuleId == id);

            if (projectsModule == null)
            {
                return Ok(new {message="not found"});
            }

            return projectsModule;
        }

        // POST: api/ProjectsModules
        [HttpPost]
        public async Task<ActionResult<ProjectsModule>> PostProjectsModule(ProjectsModule projectsModule)
        {
            _context.ProjectsModules.Add(projectsModule);
            await _context.SaveChangesAsync();

            return Ok(new { message = "save" });
        }

        // PUT: api/ProjectsModules/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjectsModule(int id, ProjectsModule projectsModule)
        {
            if (id != projectsModule.ProModuleId)
            {
                return Ok(new { message = "not found" });
            }

            _context.Entry(projectsModule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectsModuleExists(id))
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



        // DELETE: api/ProjectsModules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectsModule(int id)
        {
            var projectsModule = await _context.ProjectsModules.FindAsync(id);
            if (projectsModule == null)
            {
                return Ok(new { message = "not found" });
            }

            _context.ProjectsModules.Remove(projectsModule);
            await _context.SaveChangesAsync();

            return Ok(new { message = "save" });
        }



        private bool ProjectsModuleExists(int id)
        {
            return _context.ProjectsModules.Any(e => e.ProModuleId == id);
        }
    }
}
