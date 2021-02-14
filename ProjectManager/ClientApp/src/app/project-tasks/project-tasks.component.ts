import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceApiService } from '../service-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'tasks-component-selector',
  templateUrl: './project-tasks.component.html'
})
export class TasksComponent implements OnChanges{

  public projectTasks: ProjectTask[];
  @Input() projectId: number;

  public projectTaskForm: FormGroup;
  public submitted = false;
  public eventValue: any = "createTask";
  public eventValueTitle: any = "Create Project Task";


  constructor(private ServiceApiService: ServiceApiService) { }

  ngOnInit(): void {

    this.projectTaskForm = new FormGroup({
      projectTaskId: new FormControl(null),
      projectTaskName: new FormControl("", [Validators.required]),
      projectTaskDesc: new FormControl(""),
      estimate: new FormControl(""),
      projectId: new FormControl("", [Validators.required])
    }) 
  }


  ngOnChanges(changes: SimpleChanges) {
    const currentProjectId = changes.projectId.currentValue;
    if (currentProjectId) {
      this.getTasks(currentProjectId);
      this.projectTaskForm.controls["projectId"].setValue(changes.projectId.currentValue);
    }
  }

  getTasks(currentProjectId) {
    this.ServiceApiService.getTasks(currentProjectId).subscribe((data: ProjectTask[]) => {
      this.projectTasks = data;
    })
  }

  createTask() {
    this.submitted = true;

    if (this.projectTaskForm.invalid) {
      return;
    }
    this.ServiceApiService.postTask(this.projectTaskForm.value).subscribe((data: any[]) => {
      console.log(data);
      this.refreshForm();
    })
  }

  updateTask() {
    this.submitted = true;

    if (this.projectTaskForm.invalid) {
      return;
    }

    this.ServiceApiService.putTask(this.projectTaskForm.value.projectTaskId, this.projectTaskForm.value).subscribe((data: any[]) => {
      this.refreshForm();
    })
  }

  delete(projectTaskId: number) {
    this.ServiceApiService.deleteTask(projectTaskId).subscribe((data: any[]) => {
      this.refreshForm();
    })
  }

  edit(projectTask: ProjectTask) {
    this.projectTaskForm.controls["projectTaskId"].setValue(projectTask.projectTaskId);
    this.projectTaskForm.controls["projectId"].setValue(projectTask.projectId);
    this.projectTaskForm.controls["projectTaskName"].setValue(projectTask.projectTaskName);
    this.projectTaskForm.controls["projectTaskDesc"].setValue(projectTask.projectTaskDesc);
    this.projectTaskForm.controls["estimate"].setValue(projectTask.estimate);

    this.eventValue = "updateTask";
    this.eventValueTitle = "Update Task"
  }


  refreshForm() {
    this.getTasks(this.projectId);
    this.projectTaskForm.reset();
    this.projectTaskForm.controls["projectId"].setValue(this.projectId);
    this.eventValue = "createTask";
    this.eventValueTitle = "Create Project Task"
    this.submitted = false;
  }  

}

interface ProjectTask {
  projectTaskId: number;
  projectTaskName: string;
  projectTaskDesc: string;
  dateCreated: Date;
  estimate: number;
  projectId: number;
}
