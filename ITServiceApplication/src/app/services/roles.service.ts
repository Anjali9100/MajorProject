import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiUrl = 'https://localhost:7071/api/Roles'; 

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  constructor(private http: HttpClient) { }

  // Create Role
  createRole(role: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, role);
  }

  // Read Role
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  // Read Single Role
  getRoleById(id: number): Observable<any> {
    const url = `${'https://localhost:7071/api/User/getRecordById'}/${id}`;
    return this.http.get<any>(url);
  }

  

  // Update Role
  updateRole(roleData: any, roleId:any): Observable<any> {
    const url = `${this.apiUrl}/${roleId}`;
    return this.http.put(url, roleData);
  }

  

  // Delete Role
  deleteRole(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
