import { Component, Inject, EventEmitter, Output} from '@angular/core';
import { ServiceApiService } from '../service-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'projects-component-selector',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  public projects: Project[];
  public selected: number;
  @Output() selectedChange = new EventEmitter();

  public projectForm: FormGroup;
  public submitted = false;
  public eventValue: any = "createProject";
  public eventValueTitle: any = "Create Project";

  constructor(private ServiceApiService: ServiceApiService) { }

  ngOnInit(): void {
    this.getProjects();

    this.projectForm = new FormGroup({
      projectId: new FormControl(null),
      projectName: new FormControl("", [Validators.required]),
    }) 
  }

  select(projectId: number) {
    this.selected = projectId;
    this.selectedChange.emit(projectId);
  }


  getProjects() {
    this.ServiceApiService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    })
  } 

  createProject() {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }
    this.ServiceApiService.postProject(this.projectForm.value).subscribe((data: any[]) => {
      console.log(data);
      this.refreshForm();
    })  
  }

  updateProject() {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    this.ServiceApiService.putProject(this.projectForm.value.projectId, this.projectForm.value).subscribe((data: any[]) => {
      this.refreshForm();
    })  
  }

  delete(projectId: number) {
    this.ServiceApiService.deleteProject(projectId).subscribe((data: any[]) => {
      if (projectId == this.selected) {
        this.select(-1);
      }
      this.refreshForm();
    })
  }

  edit(project: Project) {
    this.projectForm.controls["projectId"].setValue(project.projectId);
    this.projectForm.controls["projectName"].setValue(project.projectName);
    this.eventValue = "updateProject";
    this.eventValueTitle = "Update Project"
  }

  
  refreshForm() {
    this.getProjects();
    this.projectForm.reset();
    this.eventValue = "createProject";
    this.eventValueTitle = "Create Project"
    this.submitted = false;
  }  

}

interface Project {
  projectId: number;
  projectName: string;
  cretatedDate: Date;
}
