using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ProjectBranchDetail
{
    public int BranchId { get; set; }

    public string BranchName { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public bool BranchIsActive { get; set; }

    public string? BranchDescription { get; set; }

    public int? ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public string? ProjectDescription { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public int? RoleId { get; set; }

    public bool ProjectIsActive { get; set; }
}
