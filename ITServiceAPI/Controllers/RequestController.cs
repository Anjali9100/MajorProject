using ITServiceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly ItserviceContext _context;

        public RequestsController(ItserviceContext context)
        {
            _context = context;
        }

        // GET: api/Requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            var record = await _context.ViewRequestDetails.ToListAsync();
            return Ok(record);
        }

        // GET: api/Requests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
            var request = await _context.Requests.FirstOrDefaultAsync(r => r.RequestId == id);

            if (request == null)
            {
                return Ok(new { message = "not found" });
            }

            return request;
        }



        [HttpGet("getRecordByLoginId/{loginId}")]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequestRecordById(int loginId)
        {
            var requests = await _context.ViewRequestDetails
                                        .Where(r => r.CreatedById == loginId || r.AssignedToId == loginId)
                                        .ToListAsync();

            if (requests.Count == 0)
            {
                return Ok(new { message = "not found" });
            }

            return Ok(requests);
        }




        [HttpGet("requestedProject/{requestId}")] 
        public async Task<ActionResult<Request>> GetRequestedProject(int requestId)
        {
            var request = await _context.Requests.FirstOrDefaultAsync(r => r.RequestId == requestId);

            if (request == null)
            {
                return NotFound(new { message = "Request not found" });
            }
            return Ok(request);
        }




        // POST: api/Requests
        [HttpPost]
        public async Task<ActionResult<Request>> InsertRequest(Request request)
        {
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            return Ok(new { message = "save" });
        }

        // PUT: api/Requests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRequest(int id, Request request)
        {
            var record = await _context.Requests.FindAsync(id);
            if (record == null)
            {
                return Ok(new { message = "not found" });
            }

            try
            {
                record.ProjectId = request.ProjectId;
                record.Description = request.Description;
                record.CreatedBy = request.CreatedBy;
                record.AssignedTo = request.AssignedTo;
                await _context.SaveChangesAsync();

                return Ok(new { message = "updated" });
            }
            catch (Exception exp)
            {
                return Ok(exp);
            }

        }




        [HttpPut("updateStatus/{RequestId}")]
        public async Task<IActionResult> UpdateRequestStatus(int RequestId, Request request)
        {
            var record = await _context.Requests.FindAsync(RequestId);
            if (record == null)
            {
                return Ok(new { message = "not found" });
            }

            try
            {
                record.Status = request.Status;
                record.Description = request.Description;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Status updated" });
            }
            catch (Exception exp)
            {
                return StatusCode(500, new { message = exp.Message });
            }
        }







        // DELETE: api/Requests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return Ok(new { message = "not found" });
            }

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return Ok(new { message = "deleted" });
        }

        private bool RequestExists(int id)
        {
            return _context.Requests.Any(e => e.RequestId == id);
        }
    }
}
