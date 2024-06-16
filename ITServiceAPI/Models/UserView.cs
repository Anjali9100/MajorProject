using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class UserView
{
    public int EmpId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public long? Phone { get; set; }

    public string? Address { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? UserModifyDate { get; set; }

    public DateTime? LastUpdated { get; set; }

    public string? Keys { get; set; }

    public string? Password { get; set; }

    public int RoleId { get; set; }

    public string? RoleName { get; set; }

    public string? Description { get; set; }
}
