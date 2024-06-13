﻿using System;
using System.Collections.Generic;

namespace ITServiceAPI.Models;

public partial class Employee
{
    public int EmpId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public long Phone { get; set; }

    public string Address { get; set; } = null!;

    public string EmpRegistrationId { get; set; } = null!;

    public int? RoleId { get; set; }

    public bool? IsActive { get; set; }

    public byte[] LastUpdated { get; set; } = null!;

    public DateTime ModifyDate { get; set; }

    public virtual ICollection<ProjectAction> ProjectActions { get; set; } = new List<ProjectAction>();

    public virtual ICollection<ProjectMember> ProjectMembers { get; set; } = new List<ProjectMember>();

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

    public virtual ICollection<ProjectsModule> ProjectsModules { get; set; } = new List<ProjectsModule>();

    public virtual ICollection<Request> RequestAssignedToNavigations { get; set; } = new List<Request>();

    public virtual ICollection<Request> RequestCreatedByNavigations { get; set; } = new List<Request>();

    public virtual Role? Role { get; set; }
}
