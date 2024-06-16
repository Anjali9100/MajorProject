using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ViewProjectMemberDetail
{
    public int ProjectMemberId { get; set; }

    public int? ProjectId { get; set; }

    public int? EmpId { get; set; }

    public int? RoleId { get; set; }

    public int? ProModuleId { get; set; }

    public int? BranchId { get; set; }

    public int? Status { get; set; }

    public int? Approved { get; set; }

    public DateTime MemberModifyDate { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public long? Phone { get; set; }

    public string? Address { get; set; }

    public bool? UserIsActive { get; set; }

    public string? RoleName { get; set; }

    public string? ProjectName { get; set; }

    public string? ProjectDescription { get; set; }

    public DateOnly? ProjectStartDate { get; set; }

    public DateOnly? ProjectEndDate { get; set; }

    public int? ProjectManagerId { get; set; }

    public bool? ProjectIsActive { get; set; }

    public string? ModuleName { get; set; }

    public string? ModuleDescription { get; set; }

    public int? ModuleStatus { get; set; }

    public DateOnly? ModuleStartDate { get; set; }

    public DateOnly? ModuleEndDate { get; set; }

    public string? BranchName { get; set; }

    public DateTime? BranchCreatedDate { get; set; }

    public bool? BranchIsActive { get; set; }

    public string? BranchDescription { get; set; }
}
