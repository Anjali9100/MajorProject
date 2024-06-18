import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  showMsg: string = ''; 

  constructor(private empService:EmployeeService, private router:Router){}

  login(loginData: any) {
    this.empService.getAllRecord().subscribe(
      users => {
        const matchingUser = users.find((user: any) => user.email === loginData.value.email && user.password === loginData.value.password);
        if (matchingUser) {
          console.log(matchingUser);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('roleName', matchingUser.roleName);
            sessionStorage.setItem('userId', matchingUser.empId);
            sessionStorage.setItem('FirstName', matchingUser.firstName);
            sessionStorage.setItem('LastName', matchingUser.lastName);
            sessionStorage.setItem('Email', matchingUser.email);
            sessionStorage.setItem('RoleId', matchingUser.roleId);
            this.router.navigate(['/dashboard'])
          }
        } else {
          this.showMsg = 'Invalid email or password';
        }
      },
      error => {
        console.error('An error occurred:', error);
        this.showMsg = 'An error occurred while logging in. Please try again later.';
      }
    );
  }




  
}
