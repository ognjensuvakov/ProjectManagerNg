using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProjectManager.Model
{
    public class ProjectTask
    {
        [Key]
        public int? ProjectTaskId { get; set; }
        public string ProjectTaskName { get; set; }
        public string ProjectTaskDesc { get; set; }
        public DateTime DateCreated { get; set; }
        public double? Estimate { get; set; }
        public int ProjectId { get; set; }
        
    }
}
