import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  showMsg:any;
  btnText:string="Sign Up";
  roles:any;

  constructor(private empService:EmployeeService, private router:Router, private roleService:RolesService){
    this.getRole();
  }

  getRole(): void {
    this.roleService.getRoles().subscribe({
        next: (data) => {
          this.roles = data.filter(role => 
            role.roleName.toLowerCase() === 'manager' || 
            role.roleName.toLowerCase() === 'team lead'
          );
        },
        error: (err) => {
          console.log(err);
        }
    });
}


  signUp(signUpData:any){
    if(signUpData.valid) {
      console.log('Form Data:', signUpData.value);
      this.empService.createEmployee(signUpData.value).subscribe({
        next:(data)=>{
          if(data.message=="save"){
            this.showMsg="Signup successfully";
          }
          else if(data.message=="email find"){
            this.showMsg="Email already exist";
          }
          setTimeout(() => {
            this.showMsg = "";
            this.router.navigate(['/login']);
          }, 5000);
        }
      })
    } else {
      this.showMsg = "Fill all the required fields";
    }
  }
}
