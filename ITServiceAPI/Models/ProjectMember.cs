using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ProjectMember
{
    public int ProjectMemberId { get; set; }

    public int? ProjectId { get; set; }

    public int? EmpId { get; set; }

    public int? RoleId { get; set; }

    public int? ProModuleId { get; set; }

    public DateTime ModifyDate { get; set; }

    public virtual User? Emp { get; set; }

    public virtual ProjectsModule? ProModule { get; set; }

    public virtual Project? Project { get; set; }

    public virtual Role? Role { get; set; }
}
