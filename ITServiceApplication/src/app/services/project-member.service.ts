import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectMemberService {

  private apiUrl = 'https://localhost:7071/api/ProjectMembers'; 

 
  constructor(private http: HttpClient) { }


  
  // Create Role
  createModule(moduleData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, moduleData);
  }



  // Read Role
  getModuleRecord(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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



  updateStatus(projectMemberID: number, status: number, loginId: number): Observable<any> {
    const url = `https://localhost:7071/api/ProjectMembers/updateStatus/${projectMemberID}`;
    const body = { status: status, roleID: loginId };
    return this.http.put<any>(url, body);
  }




}
