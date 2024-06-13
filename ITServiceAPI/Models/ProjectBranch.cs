using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ProjectBranch
{
    public int BranchId { get; set; }

    public int ProjectId { get; set; }

    public string BranchName { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public bool IsActive { get; set; }

    public string? Description { get; set; }

    public virtual Project Project { get; set; } = null!;

    public virtual ICollection<ProjectsModule> ProjectsModules { get; set; } = new List<ProjectsModule>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
