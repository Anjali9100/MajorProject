import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'https://localhost:7071/api/Requests'; 

 
  constructor(private http: HttpClient) { }

  // Create Role
  createRequest(projectData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, projectData);
  }



  // Read Role
  getRequestRecordLoginById(loginId:any): Observable<any[]> {
    return this.http.get<any[]>(`${'https://localhost:7071/api/Requests/getRecordByLoginId'}/${loginId}`);
  }


  

  updateRequest(empData: any, userId: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, empData);
  }
  

  

  // Delete Role
  deleteRequest(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }




  updateStatus(projectMemberID: number, status: number, description:string): Observable<any> {
    const url = `https://localhost:7071/api/Requests/updateStatus/${projectMemberID}`;
    const body = { status: status, description: description};
    return this.http.put<any>(url, body);
  }

  



}
