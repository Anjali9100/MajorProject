using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class RequestedProjectDetail
{
    public int ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public string? ProjectDescription { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public int? BranchId { get; set; }

    public string? BranchName { get; set; }

    public string? BranchDescription { get; set; }

    public int? ProModuleId { get; set; }

    public string? ModuleName { get; set; }

    public string? ModuleDescription { get; set; }

    public string ManagerName { get; set; } = null!;

    public string ManagerEmail { get; set; } = null!;

    public int RequestId { get; set; }

    public string RequestDescription { get; set; } = null!;

    public DateTime RequestCreatedDate { get; set; }
}
