using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ViewProjectDetail
{
    public int ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public string? Description { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public int? RoleId { get; set; }

    public bool IsActive { get; set; }

    public DateTime ModifyDate { get; set; }

    public int? EmpId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public long? Phone { get; set; }

    public string? Address { get; set; }
}
