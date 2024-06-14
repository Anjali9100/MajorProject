using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ITServiceAPI.Models;

public partial class ItserviceContext : DbContext
{
    public ItserviceContext()
    {
    }

    public ItserviceContext(DbContextOptions<ItserviceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<ProjectAction> ProjectActions { get; set; }

    public virtual DbSet<ProjectBranch> ProjectBranches { get; set; }

    public virtual DbSet<ProjectMember> ProjectMembers { get; set; }

    public virtual DbSet<ProjectsModule> ProjectsModules { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-6G6I50O\\SQLEXPRESS; Initial Catalog=ITService; Integrated Security=True; TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.ProjectId).HasName("PK__Projects__761ABED08CFADE2B");

            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ModifyDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ProjectName)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Emp).WithMany(p => p.Projects)
                .HasForeignKey(d => d.EmpId)
                .HasConstraintName("FK__Projects__EmpId__571DF1D5");

            entity.HasOne(d => d.Role).WithMany(p => p.Projects)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Projects__RoleId__5629CD9C");
        });

        modelBuilder.Entity<ProjectAction>(entity =>
        {
            entity.HasKey(e => e.ActionId).HasName("PK__ProjectA__FFE3F4B9C656489A");

            entity.Property(e => e.ActionId).HasColumnName("ActionID");
            entity.Property(e => e.ActionDescription).HasColumnType("text");
            entity.Property(e => e.ModifyDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

            entity.HasOne(d => d.Emp).WithMany(p => p.ProjectActions)
                .HasForeignKey(d => d.EmpId)
                .HasConstraintName("FK__ProjectAc__EmpId__6E01572D");

            entity.HasOne(d => d.ProModule).WithMany(p => p.ProjectActions)
                .HasForeignKey(d => d.ProModuleId)
                .HasConstraintName("FK__ProjectAc__ProMo__6EF57B66");

            entity.HasOne(d => d.Project).WithMany(p => p.ProjectActions)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("FK__ProjectAc__Proje__6D0D32F4");

            entity.HasOne(d => d.Role).WithMany(p => p.ProjectActions)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__ProjectAc__RoleI__6FE99F9F");
        });

        modelBuilder.Entity<ProjectBranch>(entity =>
        {
            entity.HasKey(e => e.BranchId).HasName("PK__ProjectB__A1682FA55A6812AC");

            entity.Property(e => e.BranchId).HasColumnName("BranchID");
            entity.Property(e => e.BranchName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

            entity.HasOne(d => d.Project).WithMany(p => p.ProjectBranches)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ProjectBr__Proje__5BE2A6F2");
        });

        modelBuilder.Entity<ProjectMember>(entity =>
        {
            entity.HasKey(e => e.ProjectMemberId).HasName("PK__ProjectM__E4E9983C96D091DB");

            entity.Property(e => e.ProjectMemberId).HasColumnName("ProjectMemberID");
            entity.Property(e => e.EmpId).HasColumnName("EmpID");
            entity.Property(e => e.ModifyDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

            entity.HasOne(d => d.Emp).WithMany(p => p.ProjectMembers)
                .HasForeignKey(d => d.EmpId)
                .HasConstraintName("FK__ProjectMe__EmpID__68487DD7");

            entity.HasOne(d => d.ProModule).WithMany(p => p.ProjectMembers)
                .HasForeignKey(d => d.ProModuleId)
                .HasConstraintName("FK__ProjectMe__ProMo__6754599E");

            entity.HasOne(d => d.Project).WithMany(p => p.ProjectMembers)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("FK__ProjectMe__Proje__66603565");

            entity.HasOne(d => d.Role).WithMany(p => p.ProjectMembers)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__ProjectMe__RoleI__693CA210");
        });

        modelBuilder.Entity<ProjectsModule>(entity =>
        {
            entity.HasKey(e => e.ProModuleId).HasName("PK__Projects__A3C103CE43351334");

            entity.Property(e => e.ProModuleId).HasColumnName("ProModuleID");
            entity.Property(e => e.BranchId).HasColumnName("BranchID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.ModifyDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ModuleName)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Branch).WithMany(p => p.ProjectsModules)
                .HasForeignKey(d => d.BranchId)
                .HasConstraintName("FK__ProjectsM__Branc__619B8048");

            entity.HasOne(d => d.Emp).WithMany(p => p.ProjectsModules)
                .HasForeignKey(d => d.EmpId)
                .HasConstraintName("FK__ProjectsM__EmpId__60A75C0F");

            entity.HasOne(d => d.Project).WithMany(p => p.ProjectsModules)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("FK__ProjectsM__Proje__5FB337D6");

            entity.HasOne(d => d.Role).WithMany(p => p.ProjectsModules)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__ProjectsM__RoleI__628FA481");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PK__Requests__33A8519A2CCB9CC3");

            entity.Property(e => e.RequestId).HasColumnName("RequestID");
            entity.Property(e => e.BranchId).HasColumnName("BranchID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.RequestAssignedToNavigations)
                .HasForeignKey(d => d.AssignedTo)
                .HasConstraintName("FK__Requests__Assign__778AC167");

            entity.HasOne(d => d.Branch).WithMany(p => p.Requests)
                .HasForeignKey(d => d.BranchId)
                .HasConstraintName("FK__Requests__Branch__787EE5A0");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RequestCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__Requests__Create__75A278F5");

            entity.HasOne(d => d.ProModule).WithMany(p => p.Requests)
                .HasForeignKey(d => d.ProModuleId)
                .HasConstraintName("FK__Requests__ProMod__76969D2E");

            entity.HasOne(d => d.Project).WithMany(p => p.Requests)
                .HasForeignKey(d => d.ProjectId)
                .HasConstraintName("FK__Requests__Projec__74AE54BC");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE3A5ADBA8B6");

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.ModifyDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.RoleName)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.EmpId).HasName("PK__Employee__AF2DBA792AE9D470");

            entity.ToTable("users");

            entity.Property(e => e.EmpId).HasColumnName("EmpID");
            entity.Property(e => e.Address)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Keys)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("keys");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.LastUpdated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ModifyDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__Employees__RoleI__5165187F");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
