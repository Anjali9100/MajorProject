using ITServiceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectActionsController : ControllerBase
    {
        private readonly ItserviceContext _context;

        public ProjectActionsController(ItserviceContext context)
        {
            _context = context;
        }



        // GET: api/ProjectActions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectAction>>> GetProjectActions()
        {
            return await _context.ProjectActions.ToListAsync();
        }



        // GET: api/ProjectActions
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectAction>> GetProjectAction(int id)
        {
            var projectAction = await _context.ProjectActions.FirstOrDefaultAsync(pa => pa.ActionId == id);

            if (projectAction == null)
            {
                return Ok(new {message="not found"});
            }

            return projectAction;
        }



        // POST: api/ProjectActions
        [HttpPost]
        public async Task<ActionResult<ProjectAction>> PostProjectAction(ProjectAction projectAction)
        {
            _context.ProjectActions.Add(projectAction);
            await _context.SaveChangesAsync();

            return Ok(new {message="save"});
        }




        // PUT: api/ProjectActions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjectAction(int id, ProjectAction projectAction)
        {
            if (id != projectAction.ActionId)
            {
                return Ok(new {message="not found"});
            }

            _context.Entry(projectAction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectActionExists(id))
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




        // DELETE: api/ProjectActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectAction(int id)
        {
            var projectAction = await _context.ProjectActions.FindAsync(id);
            if (projectAction == null)
            {
                return Ok(new {message="not found"});
            }

            _context.ProjectActions.Remove(projectAction);
            await _context.SaveChangesAsync();

            return Ok(new {message="deleted"});
        }

        private bool ProjectActionExists(int id)
        {
            return _context.ProjectActions.Any(e => e.ActionId == id);
        }
    }
}
