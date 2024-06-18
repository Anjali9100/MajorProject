import { Component, ViewChild } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { EmployeeService } from '../services/employee.service';
import { NgForm } from '@angular/forms';
import { RequestService } from '../services/request.service';
import { RolesService } from '../services/roles.service';

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

  roleRecord:any;

  checkRoleId: any;
  loginId: string | null = null;
  roleName: string | null = null;
  
  
  


  constructor( 
    private projectService:ProjectService,
    private empService:EmployeeService, private requestService:RequestService,
    private roleService:RolesService){

    this.getManagerOrTeamLeadRecord();
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.loginId = sessionStorage.getItem('userId');
      this.roleName = sessionStorage.getItem('roleName');
      if (this.loginId) {
        this.getRequestRecord(this.loginId);
      }
    }
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




  openForm() {
    this.myform.resetForm(); 
    this.btnText = "Save";
  }




  toggleStatus(item: any): void {
    console.log(this.roleName);
    if (this.roleName !== 'Employee') {  
      item.status = item.status === 0 ? 1 : 0;
      if (item.status === 1) {
        if (confirm("Are you sure you want to Approve?")) {
          this.requestService.updateStatus(item.requestId, item.status, item.requestDescription).subscribe({
            next: (response) => {
              if (response.message === "Status updated") {
                this.showMsg = "Status updated successfully";
                setTimeout(() => {
                  this.showMsg = "";
                }, 5000);
              }
            },
            error: (error) => {
              console.error('Failed to update status', error);
              this.showMsg = "Failed to update status";
              setTimeout(() => {
                this.showMsg = "";
              }, 5000);
            }
          });
        }
      }
    }
  }


  getRequestRecord(loginId:any){
    this.requestService.getRequestRecordLoginById(loginId)
      .subscribe({
        next: (data) => {
          this.requestRecord = data
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
            this.getRequestRecord(this.loginId);
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
            this.getRequestRecord(this.loginId);
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
              this.getRequestRecord(this.loginId);
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
