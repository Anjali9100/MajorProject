using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ProjectModuleView
{
    public int ProModuleId { get; set; }

    public string ModuleName { get; set; } = null!;

    public string? ModuleDescription { get; set; }

    public int Status { get; set; }

    public int? ProjectId { get; set; }

    public int? ModuleRoleId { get; set; }

    public int? BranchId { get; set; }

    public DateTime ModuleModifyDate { get; set; }

    public DateOnly? ModuleEndDate { get; set; }

    public DateOnly? ModuleStartDate { get; set; }

    public string BranchName { get; set; } = null!;

    public string? BranchDescription { get; set; }

    public string ProjectName { get; set; } = null!;

    public string? ProjectDescription { get; set; }

    public int? ProjectRoleId { get; set; }

    public int? EmpId { get; set; }

    public bool ProjectIsActive { get; set; }

    public DateTime ProjectModifyDate { get; set; }
}
