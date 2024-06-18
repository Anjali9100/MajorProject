import { Component, ViewChild } from '@angular/core';
import { ProjectBranchService } from '../services/project-branch.service';
import { ProjectService } from '../services/project.service';
import { ProjectModuleService } from '../services/project-module.service';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ProjectMemberService } from '../services/project-member.service';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrl: './project-member.component.css'
})
export class ProjectMemberComponent {
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
  memberRecord:any;

  RoleId:any;
  ProjectID:any;
  BranchID:any;
  ModuleId:any;
  EmployeeId:any;
  loginId:any;
  roleName:any;
  roleId:any;
  
  


  constructor(private branchService:ProjectBranchService, 
    private projectService:ProjectService,
    private projectModule:ProjectModuleService,
    private empService:EmployeeService, private memberService:ProjectMemberService){

    this.getManagerOrTeamLeadRecord();
    this.getEmployeeRecord();
  }

  ngOnInit(): void {
    this.getMemberRecord();
    if (typeof window !== 'undefined') {
      this.loginId = sessionStorage.getItem('userId');
      this.roleId = sessionStorage.getItem('RoleId');
      this.roleName = sessionStorage.getItem('roleName');
      // console.log(this.roleId);
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



  onProjectChange(): void {
    if (this.selectedProjectId !== null) {
      this.branchService.getBranchBasedOnPro(this.selectedProjectId).subscribe((data: any) => {
        this.branch = data;
      });

      this.projectModule.getModuleBasedOnProject(this.selectedProjectId).subscribe((data: any) => {
        this.module = data;
      });
    }
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



  getMemberRecord(){
    this.memberService.getModuleRecord()
     .subscribe({
        next: (data) => {
          this.memberRecord = data
          console.log(data)
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  



  toggleStatus(item: any): void {
    // if(confirm("Are you sure want to "))
      item.status = item.status == 0 ? 1 : 0; 
      this.memberService.updateStatus(item.projectMemberId, item.status, this.loginId).subscribe({
          next: (response) => {
            if(response.message=="Status updated"){
              this.showMsg="Status updated successfully";
              setTimeout(() => {
                this.showMsg = "";
              }, 5000);
            }
          },
          error: (error) => {
              console.error('Failed to update status', error);
          }
      });
  }




  saveProjectMember(memberData: any): void {
    if(this.btnText=="Save"){
      this.memberService.createModule(memberData.value).subscribe({
        next: (data) => {
          if(data.message=="save"){
            this.getMemberRecord();
            memberData.reset();
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
      this.memberService.updateModule(memberData.value, this.recordId).subscribe({
        next: (data) => {
          console.log(data)
          if(data.message=="updated"){
            this.getMemberRecord();
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




  @ViewChild('moduleData') myform!:NgForm;
  recordId : any;


  editRecord(allData:any){
    this.RoleId = allData.roleId;
    this.ProjectID = allData.projectId;
    this.BranchID = allData.branchId;
    this.ModuleId = allData.proModuleId;
    this.EmployeeId = allData.empId;
    this.btnText = "Update"
    this.recordId = allData.projectMemberId;
    this.showMsg = "";
  }


  deleteRecord(projectMemberId: number): void {
    if(confirm("Are you sure want to delete this record")){
      this.memberService.deleteModule(projectMemberId).subscribe({
          next: (data) => {
            console.log(data);
            if(data.message=="deleted"){
              this.getMemberRecord();
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
