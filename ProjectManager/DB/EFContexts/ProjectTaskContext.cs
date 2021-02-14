using System;
using Microsoft.EntityFrameworkCore;
using ProjectManager.Model;

namespace ProjectManager.DB.EFContexts
{
    public class ProjectTaskContext : DbContext
    {
        public ProjectTaskContext(DbContextOptions<ProjectTaskContext> options) : base(options)
        {
        }

        public DbSet<Project> Project { get; set; }
        public DbSet<ProjectTask> ProjectTask { get; set; }
    }
}
