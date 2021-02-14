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
    public class ProjectsController : ControllerBase
    {
        readonly ProjectTaskContext ProjectTaskContext;

        public ProjectsController(ProjectTaskContext projectTaskContext)
        {
            ProjectTaskContext = projectTaskContext;
        }

        [HttpGet]
        public IEnumerable<Project> Get()
        {
            var projects = ProjectTaskContext.Project.ToList();
            return projects;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Project project)
        {
            project.DateCreated = DateTime.Now;

            var data = ProjectTaskContext.Project.Add(project);
            ProjectTaskContext.SaveChanges();

            return Ok();
        }

        

        [HttpPut("{id:int}")]
        public IActionResult Put([FromBody] Project project)
        {
            var data = ProjectTaskContext.Project.Update(project);
            ProjectTaskContext.Entry(project).Property(x => x.DateCreated).IsModified = false;
            ProjectTaskContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var data = ProjectTaskContext.Project.Where(a => a.ProjectId == id).FirstOrDefault();
            ProjectTaskContext.Project.Remove(data);
            ProjectTaskContext.SaveChanges();

            return Ok();
        }

    }

}
