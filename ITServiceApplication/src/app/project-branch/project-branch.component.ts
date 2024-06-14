import { Component, ViewChild } from '@angular/core';
import { ProjectBranchService } from '../services/project-branch.service';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-branch',
  templateUrl: './project-branch.component.html',
  styleUrl: './project-branch.component.css'
})
export class ProjectBranchComponent {
  formTitle: string = "Add Project";
  btnText: string = "Save";
  project:any;
  branchRecord: any[] = [];  
  showMsg: string = "";


  constructor(private branchService:ProjectBranchService, private projectService:ProjectService){}

  ngOnInit(): void {
    this.getBranchRecord();
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
    this.getProject();
    this.myform.resetForm(); 
  }
  



  getBranchRecord(): void {
    this.branchService.getBranchRecord()
      .subscribe({
        next: (data) => this.branchRecord = data,
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

  saveProjectBranchRecord(branchData: any): void {
    if(this.btnText=="Save"){
      this.branchService.createBranch(branchData.value).subscribe({
        next: (data) => {
          if(data.message=="save"){
            this.getBranchRecord();
            branchData.reset();
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
      this.branchService.updateBranch(branchData.value, this.recordId).subscribe({
        next: (data) => {
          if(data.message=="updated"){
            this.getBranchRecord();
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




  @ViewChild('branchData') myform!:NgForm;
  recordId : any;


  editRecord(allData:any){
    this.myform.controls['BranchName'].setValue(allData.branchName);
    this.myform.controls['Description'].setValue(allData.description);
    this.btnText = "Update"
    this.recordId = allData.branchId;
    this.showMsg = "";
  }


  deleteRecord(bId: number): void {
    if(confirm("Are you sure want to delete this record")){
      this.branchService.deleteBranch(bId).subscribe({
          next: (data) => {
            if(data.message=="deleted"){
              this.getBranchRecord();
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
