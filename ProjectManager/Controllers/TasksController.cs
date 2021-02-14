using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectManager.DB.EFContexts;
using ProjectManager.Model;

namespace ProjectManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        readonly ProjectTaskContext ProjectTaskContext;

        public TasksController(ProjectTaskContext projectTaskContext)
        {
            ProjectTaskContext = projectTaskContext;
        }

        [HttpGet("{id:int}")]
        public IEnumerable<ProjectTask> Get(int id)
        {
            var projectTasks = ProjectTaskContext.ProjectTask.Where(t => t.ProjectId == id).ToList();
            return projectTasks;
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProjectTask projectTask)
        {
            projectTask.DateCreated = DateTime.Now;

            var data = ProjectTaskContext.ProjectTask.Add(projectTask);
            ProjectTaskContext.SaveChanges();

            return Ok();
        }



        [HttpPut("{id:int}")]
        public IActionResult Put([FromBody] ProjectTask projectTask)
        {
            var data = ProjectTaskContext.ProjectTask.Update(projectTask);
            ProjectTaskContext.Entry(projectTask).Property(x => x.DateCreated).IsModified = false;
            ProjectTaskContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var data = ProjectTaskContext.ProjectTask.Where(a => a.ProjectTaskId == id).FirstOrDefault();
            ProjectTaskContext.ProjectTask.Remove(data);
            ProjectTaskContext.SaveChanges();
                
            return Ok();
        }

    }

}
