using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class Project
{
    public int ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public string? Description { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public int? RoleId { get; set; }

    public int? EmpId { get; set; }

    public bool IsActive { get; set; }

    public DateTime ModifyDate { get; set; }

    public virtual Employee? Emp { get; set; }

    public virtual ICollection<ProjectAction> ProjectActions { get; set; } = new List<ProjectAction>();

    public virtual ICollection<ProjectBranch> ProjectBranches { get; set; } = new List<ProjectBranch>();

    public virtual ICollection<ProjectMember> ProjectMembers { get; set; } = new List<ProjectMember>();

    public virtual ICollection<ProjectsModule> ProjectsModules { get; set; } = new List<ProjectsModule>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();

    public virtual Role? Role { get; set; }
}
