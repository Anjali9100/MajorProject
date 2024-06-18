import { Component } from '@angular/core';
import { LoginAuthenticationService } from '../services/login-authentication.service';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.css'
})
export class UserSignUpComponent {
    constructor(private loginAuthService:LoginAuthenticationService, 
      private empService:EmployeeService, private router:Router){}
      email:any;
      username:any

      signup(signUpData: any) {
        console.log(signUpData.value);
        const usernameParts = signUpData.value.username.split(' ');
      
        let firstName = usernameParts[0];
        let lastName = usernameParts.slice(1).join(' '); 
      
        this.loginAuthService.signUp(signUpData.value.username, signUpData.value.password, signUpData.value.email).then(
          user => {
            this.empService.createEmployee({
              EmailId: signUpData.value.email,
              firstName: firstName,
              lastName: lastName,
              password: signUpData.value.password
            }).subscribe(() => {
              this.router.navigate(['/emailPage'], {
                state: {
                  email: signUpData.value.email
                }
              });
            });
          }
        );
      }
      
}
