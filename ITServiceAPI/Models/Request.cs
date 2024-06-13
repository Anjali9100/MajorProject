using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class Request
{
    public int RequestId { get; set; }

    public int? ProjectId { get; set; }

    public int? ProModuleId { get; set; }

    public int? BranchId { get; set; }

    public string Description { get; set; } = null!;

    public int Status { get; set; }

    public DateTime CreatedDate { get; set; }

    public int? CreatedBy { get; set; }

    public int? AssignedTo { get; set; }

    public virtual Employee? AssignedToNavigation { get; set; }

    public virtual ProjectBranch? Branch { get; set; }

    public virtual Employee? CreatedByNavigation { get; set; }

    public virtual ProjectsModule? ProModule { get; set; }

    public virtual Project? Project { get; set; }
}
