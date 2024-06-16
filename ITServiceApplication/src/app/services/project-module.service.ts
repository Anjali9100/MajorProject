import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectModuleService {

  private apiUrl = 'https://localhost:7071/api/ProjectsModules'; 

 
  constructor(private http: HttpClient) { }

  // Create Role
  createModule(branchData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, branchData);
  }

  // Read Role
  getModuleRecord(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  

  getModuleBasedOnProject(projectId:any):Observable<any>{
    return this.http.get<any>(`https://localhost:7071/api/ProjectsModules/getModuleBasedOnProject/${projectId}`)
  }

  

  updateModule(branchData: any, branchId: any): Observable<any> {
    const url = `${this.apiUrl}/${branchId}`;
    return this.http.put(url, branchData);
  }
  

  // Delete Role
  deleteModule(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }




}
