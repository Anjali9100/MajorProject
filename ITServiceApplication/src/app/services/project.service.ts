import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'https://localhost:7071/api/Projects'; 

 
  constructor(private http: HttpClient) { }

  // Create Role
  createEmployee(projectData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, projectData);
  }

  // Read Role
  getProject(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  getProjectByRole(empRoleId:any):Observable<any>{
    return this.http.get<any>(`${'https://localhost:7071/api/Projects/getProjectByUserID'}/${empRoleId}`);
  }


  getProjectCount():Observable<any>{
    return this.http.get<any>('https://localhost:7071/api/Projects/getProjectCount');
  }
  

  updateProject(empData: any, userId: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, empData);
  }
  

  

  // Delete Role
  deleteProject(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }


  
}
