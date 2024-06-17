import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectBranchService {

  private apiUrl = 'https://localhost:7071/api/ProjectBranches'; 

 
  constructor(private http: HttpClient) { }

  // Create Role
  createBranch(branchData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, branchData);
  }

  // Read Role
  getBranchRecord(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  getBranchCount():Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7071/api/ProjectBranches/projectBranchCount');
  }
  

  getBranchBasedOnPro(projectId:any): Observable<any[]> {
    return this.http.get<any[]>(`${'https://localhost:7071/api/ProjectBranches/getBranchBasedOnProject'}/${projectId}`);
  }


  updateBranch(branchData: any, branchId: any): Observable<any> {
    const url = `${this.apiUrl}/${branchId}`;
    return this.http.put(url, branchData);
  }
  

  // Delete Role
  deleteBranch(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }



}
