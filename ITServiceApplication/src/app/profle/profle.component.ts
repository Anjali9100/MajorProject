import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-profle',
  templateUrl: './profle.component.html',
  styleUrl: './profle.component.css'
})
export class ProfleComponent {
  empId:any;
  showMsg="";
  
  constructor(private empService:EmployeeService){}


  profileRecord = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roleName: '',
    password: '',
    address: ''
  };

  get fullName(): string {
    return `${this.profileRecord.firstName} ${this.profileRecord.lastName}`;
  }

  set fullName(value: string) {
    let [firstName, lastName] = value.split(' ');
    this.profileRecord.firstName = firstName;
    this.profileRecord.lastName = lastName || ''; 
  }



  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.empId = sessionStorage.getItem('userId');
    }
    this.getProfileRecord();
  }

  getProfileRecord(){
    this.empService.getRecordById(this.empId).subscribe(
      data => {
        console.log(data);
        this.profileRecord=data;
      }
    )
  }



  updateProfile(profileData:any){
    this.empService.updateEmployee(this.profileRecord, this.empId).subscribe({
      next:(data)=>{
        this.getProfileRecord();
        this.showMsg="Profile Update Successfully"
        console.log(data);
        setTimeout(() => {
          this.showMsg = "";
        }, 5000);
      }
    })
  }


}
