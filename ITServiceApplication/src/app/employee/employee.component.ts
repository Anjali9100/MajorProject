import { Component, ViewChild } from '@angular/core';
import { RolesService } from '../services/roles.service';
import { EmployeeService } from '../services/employee.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  formTitle: string = "Add Employee";
  roles: any;
  btnText: string = "Save";
  empRecord: any[] = [];  
  originalEmpRecords: any[] = [];  
  showMsg: string = "";
  RoleId: any;
  constructor(private  RoleService: RolesService, private empService:EmployeeService){}

  ngOnInit(): void {
    this.getEmpRecord();
  }

  getRole(): void {
    this.RoleService.getRoles().subscribe({
        next: (data) => {
          this.roles = data
        },
        error: (err) => {
          console.log(err);
        }
    });
  }

  openForm() {
    this.getRole();
    this.myform.resetForm(); 
  }
  


  getEmpRecord(): void {
    this.empService.getAllRecord()
      .subscribe({
        next: (data) => this.empRecord = data,
        error: (err) => {
          console.log(err);
        }
      });
  }


  searchRecords(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (!searchTerm) {
      this.empRecord = this.originalEmpRecords; 
      return;
    }
    this.empRecord = this.originalEmpRecords.filter(emp => 
      (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(searchTerm) ||
      emp.phone.includes(searchTerm) ||
      emp.email.toLowerCase().includes(searchTerm) ||
      emp.address.toLowerCase().includes(searchTerm) ||
      emp.roleId.toString().includes(searchTerm)
    );
  }

  saveEmpRecord(empData: any): void {
    if(this.btnText=="Save"){
      this.empService.createEmployee(empData.value).subscribe({
        next: (data) => {
          if(data.message=="save"){
            this.getEmpRecord();
            empData.reset();
            this.showMsg="Record save";
          }else if(data.message=="email find"){
            this.showMsg="Email is already used";
          }else if(data.message=="phone find"){
            this.showMsg="Phone Number is already used";
          }
          setTimeout(() => {
            this.showMsg = "";
          }, 5000);
        },
        error: (err) => {
          console.log(err)
        }
      });
    }else{
      this.empService.updateEmployee(empData.value, this.recordId).subscribe({
        next: (data) => {
          if(data.message=="updated"){
            this.getEmpRecord();
            this.showMsg="Record Update Successfully";
          }else if(data.message=="email find"){
            this.showMsg="Email is already used";
          }else if(data.message=="phone find"){
            this.showMsg="Phone Number is already used";
          }
          setTimeout(() => {
            this.showMsg = "";
          }, 5000);
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }




  @ViewChild('employeeData') myform!:NgForm;
  recordId : any;


  editRecord(allData:any){
    this.getRole();
    this.myform.controls['FirstName'].setValue(allData.firstName);
    this.myform.controls['LastName'].setValue(allData.lastName);
    this.myform.controls['Email'].setValue(allData.email);
    this.myform.controls['Phone'].setValue(allData.phone);
    this.RoleId = allData.roleId;
    this.myform.controls['Address'].setValue(allData.address);
    this.btnText = "Update"
    this.recordId = allData.empId;
    this.showMsg = "";
  }


  deleteRecord(userId: number): void {
    if(confirm("Are you sure want to delete this record")){
      this.empService.deleteEmployee(userId)
        .subscribe({
          next: (data) => {
            if(data.message=="deleted"){
              this.getEmpRecord();
              this.showMsg="Record Deleted Successfully";
              setTimeout(() => {
                this.showMsg = "";
              }, 5000);
            }
          },
          error: (err) => {
            console.log(err)
          }
        });
    }
  }



  
  
}
