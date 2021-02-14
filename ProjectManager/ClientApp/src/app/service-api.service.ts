import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.baseUrl = baseUrl }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  // projects
  getProjects() {
    return this.http.get(this.baseUrl + 'api/Projects');
  }

  postProject(formData) {
    return this.http.post(this.baseUrl + 'api/Projects', formData);
  }

  putProject(projectId, formData) {
    return this.http.put(this.baseUrl + 'api/Projects/' + projectId, formData);
  }

  deleteProject(id) {
    return this.http.delete(this.baseUrl + 'api/Projects/' + id);
  }

  // tasks
  getTasks(projectId) {
    return this.http.get(this.baseUrl + 'api/Tasks/' + projectId);
  }

  postTask(formData) {
    return this.http.post(this.baseUrl + 'api/Tasks', formData);
  }

  putTask(taskId, formData) { 
    return this.http.put(this.baseUrl + 'api/Tasks/' + taskId, formData);
  }

  deleteTask(id) {
    return this.http.delete(this.baseUrl + 'api/Tasks/' + id);
  }

}
