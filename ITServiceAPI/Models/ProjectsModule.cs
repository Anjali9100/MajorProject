using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ProjectsModule
{
    public int ProModuleId { get; set; }

    public string ModuleName { get; set; } = null!;

    public string? Description { get; set; }

    public int Status { get; set; }

    public int? ProjectId { get; set; }

    public int? EmpId { get; set; }

    public int? RoleId { get; set; }

    public int? BranchId { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public DateTime ModifyDate { get; set; }

    public virtual ProjectBranch? Branch { get; set; }

    public virtual User? Emp { get; set; }

    public virtual Project? Project { get; set; }

    public virtual ICollection<ProjectAction> ProjectActions { get; set; } = new List<ProjectAction>();

    public virtual ICollection<ProjectMember> ProjectMembers { get; set; } = new List<ProjectMember>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();

    public virtual Role? Role { get; set; }
}
