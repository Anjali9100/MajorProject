import { Component, ViewChild } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  formTitle: string = "Add Project";
  btnText: string = "Save";
  projectRecord: any[] = [];  
  showMsg: string = "";
  managerRecord:any;
  empId:any;
  loginId:any;
  roleId:any;


  constructor(private projectService:ProjectService, private empService:EmployeeService){
    this.getManagerOrTeamLeadRecord();
  }

  ngOnInit(): void {
    this.getProjectRecord();
    if (typeof window !== 'undefined') {
      this.loginId = sessionStorage.getItem('userId');
      this.roleId = sessionStorage.getItem('RoleId');
    }
  }


  openForm() {
    this.myform.resetForm(); 
    this.btnText= "Save";
  }


  getManagerOrTeamLeadRecord(){
    this.empService.getManagerOrTeamLeadRecord()
     .subscribe({
        next: (data) => {
          this.managerRecord = data
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  

  getProjectRecord(): void {
    this.projectService.getProject()
      .subscribe({
        next: (data) => this.projectRecord = data,
        error: (err) => {
          console.log(err);
        }
      });
  }


  // searchRecords(event: any) {
  //   const searchTerm = event.target.value.toLowerCase();
  //   if (!searchTerm) {
  //     this.empRecord = this.originalEmpRecords; 
  //     return;
  //   }
  //   this.empRecord = this.originalEmpRecords.filter(emp => 
  //     (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(searchTerm) ||
  //     emp.phone.includes(searchTerm) ||
  //     emp.email.toLowerCase().includes(searchTerm) ||
  //     emp.address.toLowerCase().includes(searchTerm) ||
  //     emp.roleId.toString().includes(searchTerm)
  //   );
  // }

  saveProjectRecord(projectData: any): void {
    if(this.btnText=="Save"){
      this.projectService.createEmployee(projectData.value).subscribe({
        next: (data) => {
          if(data.message=="save"){
            this.getProjectRecord();
            projectData.reset();
            this.showMsg="Record save";
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
    else{
      this.projectService.updateProject(projectData.value, this.recordId).subscribe({
        next: (data) => {
          if(data.message=="updated"){
            this.getProjectRecord();
            this.showMsg="Record Update Successfully";
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




  @ViewChild('projectData') myform!:NgForm;
  recordId : any;


  editRecord(allData:any){
    this.myform.controls['ProjectName'].setValue(allData.projectName);
    this.myform.controls['Description'].setValue(allData.description);
    this.empId = allData.empId;
    this.myform.controls['StartDate'].setValue(allData.startDate);
    this.myform.controls['EndDate'].setValue(allData.endDate);
    this.btnText = "Update"
    this.recordId = allData.projectId;
    this.showMsg = "";
  }


  deleteRecord(userId: number): void {
    if(confirm("Are you sure want to delete this record")){
      this.projectService.deleteProject(userId).subscribe({
          next: (data) => {
            if(data.message=="deleted"){
              this.getProjectRecord();
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
