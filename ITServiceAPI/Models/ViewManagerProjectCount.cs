using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class ViewManagerProjectCount
{
    public int EmpId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? RoleName { get; set; }

    public int? NumberOfProjects { get; set; }
}
