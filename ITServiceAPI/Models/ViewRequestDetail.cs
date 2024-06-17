using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ViewRequestDetail
{
    public int RequestId { get; set; }

    public int? ProjectId { get; set; }

    public string? ProjectName { get; set; }

    public string RequestDescription { get; set; } = null!;

    public int Status { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? CreatedByName { get; set; }

    public string? CreatedByEmail { get; set; }

    public long? CreatedByPhone { get; set; }

    public int? CreatedByRoleId { get; set; }

    public bool? CreatedByIsActive { get; set; }

    public string? CreatedByRoleName { get; set; }

    public string? AssignedToName { get; set; }

    public int? AssignedToRoleId { get; set; }

    public bool? AssignedToIsActive { get; set; }

    public string? AssignedToRoleName { get; set; }

    public DateOnly? ProjectStartDate { get; set; }

    public DateOnly? ProjectEndDate { get; set; }

    public int? ProjectRoleId { get; set; }

    public int? ProjectEmpId { get; set; }

    public bool? ProjectIsActive { get; set; }

    public DateTime? ProjectModifyDate { get; set; }
}
