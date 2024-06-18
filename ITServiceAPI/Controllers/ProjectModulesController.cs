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
        public async Task<ActionResult<IEnumerable<ProjectsModule>>> GetProjectsModulesView()
        {
            var record = await _context.ProjectModuleViews.ToListAsync();
            return Ok(record);
        }



        [HttpGet("getModuleByBranchId/{branchId}")]
        public async Task<ActionResult<IEnumerable<ProjectModuleView>>> GetProjectsModulesByBranch(int branchId)
        {
            var records = await _context.ProjectModuleViews
                                        .Where(m => m.BranchId == branchId).ToListAsync();

            return Ok(records);
        }




        [HttpGet("getModuleBasedOnProject/{id}")]
        public async Task<ActionResult<ProjectBranch>> GetProjectModule(int id)
        {
            var projectModule = await _context.ProjectsModules.Where(pm => pm.ProjectId == id).ToListAsync();

            if (projectModule == null)
            {
                return Ok(new { message = "not found" });
            }

            return Ok(projectModule);
        }



        // POST: api/ProjectsModules
        [HttpPost]
        public async Task<ActionResult<ProjectsModule>> PostProjectsModule(ProjectsModule projectsModule)
        {
            _context.ProjectsModules.Add(projectsModule);
            await _context.SaveChangesAsync();

            return Ok(new { message = "save" });
        }



        [HttpGet("projectModuleCount")]
        public async Task<ActionResult<ProjectBranch>> getBrnachCount()
        {
            var moduleCount = await _context.ViewProjectModuleCounts.ToListAsync();

            if (moduleCount == null)
            {
                return Ok(new { message = "not found" });
            }

            return Ok(moduleCount);
        }




        // PUT: api/ProjectsModules/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjectsModule(int id, ProjectsModule projectsModule)
        {
            var record = await _context.ProjectsModules.FindAsync(id);
            if (record == null)
            {
                return Ok(new { message = "not found" });
            }

            try
            {
                record.ModuleName = projectsModule.ModuleName;
                record.Description = projectsModule.Description;
                record.ProjectId = projectsModule.ProjectId;
                record.BranchId = projectsModule.BranchId;
                record.StartDate = projectsModule.StartDate;
                record.EndDate = projectsModule.EndDate;
                await _context.SaveChangesAsync();

                return Ok(new { message = "updated" });
            }
            catch (Exception exp)
            {
                return Ok(exp);
            }
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

            return Ok(new { message = "deleted" });
        }



        private bool ProjectsModuleExists(int id)
        {
            return _context.ProjectsModules.Any(e => e.ProModuleId == id);
        }
    }
}
