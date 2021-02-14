using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Model
{
    public class Project
    {
        [Key]
        public int? ProjectId { get; set; }
        public string ProjectName { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<ProjectTask> ProjectTasks { get; set; }
    }
}
