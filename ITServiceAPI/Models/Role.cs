using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class Role
{
    public int RoleId { get; set; }

    public string? RoleName { get; set; }

    public string? Description { get; set; }

    public DateTime ModifyDate { get; set; }

    public virtual ICollection<ProjectAction> ProjectActions { get; set; } = new List<ProjectAction>();

    public virtual ICollection<ProjectMember> ProjectMembers { get; set; } = new List<ProjectMember>();

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

    public virtual ICollection<ProjectsModule> ProjectsModules { get; set; } = new List<ProjectsModule>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
