import { Component, ViewChild } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { EmployeeService } from '../services/employee.service';
import { NgForm } from '@angular/forms';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent {
  formTitle: string = "Add Project";
  btnText: string = "Save";
  project:any;
  branch:any;
  module:any;
  managerRecord:any;
  employeeRecord:any;
  showMsg: string = "";
  selectedProjectId: number | null = null;
  selectManagerId: number | null = null;
  requestRecord:any;

  RoleId:any;
  ProjectID:any;
  BranchID:any;
  ModuleId:any;
  EmployeeId:any;

  loginId:any;
  
  


  constructor( 
    private projectService:ProjectService,
    private empService:EmployeeService, private requestService:RequestService){

    this.getManagerOrTeamLeadRecord();
    this.getEmployeeRecord();
  }

  ngOnInit(): void {
    this.getRequestRecord();
  }





  getManagerOrTeamLeadRecord(){
    this.empService.getManagerOrTeamLeadRecord()
      .subscribe({
        next: (data) => {
          this.managerRecord = data
        },
        error: (err) => {
          console.log(err);
        }
      });
  }




  onManagerRoleChange(): void {
    if (this.selectManagerId !== null) {
      this.projectService.getProjectByRole(this.selectManagerId).subscribe((data: any) => {
        this.project = data;
      });
    }
  }


  getProject(): void {
    this.projectService.getProject().subscribe({
        next: (data) => {
          this.project = data
        },
        error: (err) => {
          console.log(err);
        }
    });
  }



  getEmployeeRecord(): void {
    this.empService.getEmployeeOnly()
      .subscribe({
        next: (data) => {
          this.employeeRecord = data
        },
        error: (err) => {
          console.log(err);
        }
      });
  }


  openForm() {
    this.myform.resetForm(); 
    this.btnText = "Save";
  }



  getRequestRecord(){
    this.requestService.getRequestRecord()
     .subscribe({
        next: (data) => {
          this.requestRecord = data
          console.log(data)
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  

  saveProjectRequest(requestData: any): void {
    if(this.btnText=="Save"){
      this.requestService.createRequest(requestData.value).subscribe({
        next: (data) => {
          if(data.message=="save"){
            this.getRequestRecord();
            requestData.reset();
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
      this.requestService.updateRequest(requestData.value, this.recordId).subscribe({
        next: (data) => {
          console.log(data)
          if(data.message=="updated"){
            this.getRequestRecord();
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




  @ViewChild('requestData') myform!:NgForm;
  recordId : any;


  editRecord(allData:any){
    this.RoleId = allData.assignedToRoleId;
    this.ProjectID = allData.projectId;
    this.myform.controls['Description'].setValue(allData.requestDescription);
    this.ModuleId = allData.createdByRoleId;
    this.btnText = "Update"
    this.recordId = allData.requestId;
    this.showMsg = "";
  }


  deleteRecord(requestId: number): void {
    if(confirm("Are you sure want to delete this record")){
      this.requestService.deleteRequest(requestId).subscribe({
          next: (data) => {
            if(data.message=="deleted"){
              this.getRequestRecord();
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
