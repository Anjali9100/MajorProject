import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7071/api/User'; 

 
  constructor(private http: HttpClient) { }

  // Create Role
  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
  }

  // Read Role
  getAllRecord(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  getRecordById(empId:any):Observable<any>{
    return this.http.get<any[]>(`${'https://localhost:7071/api/User/getRecordById'}/${empId}`);
  }

  // checkCredential(loginData: any): Observable<any> {
  //   const url = 'https://localhost:7071/api/User/checkCredential';
  //   const body = { email: loginData.email, password: loginData.password };

  //   return this.http.post<any>(url, body);
  // }
  


  getManagerOrTeamLeadRecord(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7071/api/User/GetManagerOrTeamLead');
  }



  getEmployeeOnly(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7071/api/User/GetEmployeeRecord');
  }


  // Read Single Role
  getEmployeeId(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  

  updateEmployee(empData: any, userId: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put(url, empData);
  }
  

  

  // Delete Role
  deleteEmployee(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }



}
