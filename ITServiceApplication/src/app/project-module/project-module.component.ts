import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { ProjectBranchService } from '../services/project-branch.service';
import { ProjectModuleService } from '../services/project-module.service';

@Component({
  selector: 'app-project-module',
  templateUrl: './project-module.component.html',
  styleUrl: './project-module.component.css'
})
export class ProjectModuleComponent {
  formTitle: string = "Add Project";
  btnText: string = "Save";
  project:any;
  branch:any[]=[];
  moduleRecord:any;
  showMsg: string = "";
  ProjectID:any;
  BranchID:any;
  selectedProjectId: number | null = null;
  roleName:any;
  loginId:any;
  roleId:any;


  constructor(private branchService:ProjectBranchService, private projectService:ProjectService,private projectModule:ProjectModuleService){
    this.getProject();
    this.getBranch();
  }

  ngOnInit(): void {
    this.getModule();
    this.getProject();

    if (typeof window !== 'undefined') {
      this.roleName = sessionStorage.getItem('roleName');
      this.loginId = sessionStorage.getItem('userId');
      this.roleId = sessionStorage.getItem('RoleId');
    }
    
  }


  getProject(): void {
    this.projectService.getProject().subscribe({
        next: (data) => {
          this.project = data;
        },
        error: (err) => {
          console.log(err);
        }
    });
  }

  

  onProjectChange(): void {
    if (this.selectedProjectId !== null) {
      this.branchService.getBranchBasedOnPro(this.selectedProjectId).subscribe((data: any) => {
        this.branch = data;
      });
    }
  }

  

  openForm() {
    this.myform.resetForm(); 
    this.btnText = "Save";
  }
  


  getBranch(): void {
    console.log(this.ProjectID);
    this.branchService.getBranchBasedOnPro(this.ProjectID).subscribe((data: any) => {
      this.branch = data;
    });
  }




  getModule(): void {
    this.projectModule.getModuleRecord()
      .subscribe({
        next: (data) => {
          this.moduleRecord = data
        },
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

  saveProjectModuleRecord(moduleData: any): void {
    if(this.btnText=="Save"){
      this.projectModule.createModule(moduleData.value).subscribe({
        next: (data) => {
          if(data.message=="save"){
            this.getModule();
            moduleData.reset();
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
      this.projectModule.updateModule(moduleData.value, this.recordId).subscribe({
        next: (data) => {
          console.log(data)
          if(data.message=="updated"){
            this.getModule();
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
    this.getBranch();
    this.BranchID = allData.branchId;
    this.ProjectID = allData.projectId;
    this.myform.controls['ModuleName'].setValue(allData.moduleName);
    this.myform.controls['Description'].setValue(allData.description);
    this.myform.controls['StartDate'].setValue(allData.startDate);
    this.myform.controls['EndDate'].setValue(allData.endDate);
    this.btnText = "Update"
    this.recordId = allData.proModuleId;
    this.showMsg = "";
  }


  deleteRecord(mId: number): void {
    if(confirm("Are you sure want to delete this record")){
      this.projectModule.deleteModule(mId).subscribe({
          next: (data) => {
            console.log(data);
            if(data.message=="deleted"){
              this.getModule();
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
