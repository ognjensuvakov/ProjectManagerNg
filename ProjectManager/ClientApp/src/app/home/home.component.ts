import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public selectedProjectId: number;

  projectSelected(projectId: number) {
    this.selectedProjectId = projectId;
    console.log("fromhome:" + projectId);
  }

}
