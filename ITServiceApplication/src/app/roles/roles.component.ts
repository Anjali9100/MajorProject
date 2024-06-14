import { Component, ViewChild } from '@angular/core';
import { RolesService } from '../services/roles.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  roles: any; 
  showMsg:string="";
  index:number=1;
  btnText:string="Save";

  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.rolesService.getRoles()
      .subscribe({
        next: (roles) => this.roles = roles,
        error: (err) => {
          console.log(err);
        }
      });
  }
  

  saveRoles(roleData: any) {
    console.log(roleData.value);
    if(this.btnText=="Save"){
      this.rolesService.createRole(roleData.value).subscribe({
        next: (date) => {
          if(date.message=="save"){
            this.getRoles();
            roleData.reset();
            this.showMsg="Record save";
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
    else{
      this.rolesService.updateRole(roleData.value, this.recordId).subscribe({
        next: (date) => {
          if(date.message=="updated"){
            this.getRoles();
            this.showMsg="Record Update Successfully";
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


  @ViewChild('roleData') myform!:NgForm;
  recordId : any;


  editRecord(allData:any){
    this.myform.controls['RoleName'].setValue(allData.roleName);
    this.myform.controls['Description'].setValue(allData.description);
    this.btnText = "Update"
    this.recordId = allData.roleId;
    this.showMsg = "";
  }


  deleteRecord(roleId: number): void {
    if(confirm("Are you sure want to delete this record")){
      this.rolesService.deleteRole(roleId)
       .subscribe({
          next: (data) => {
            if(data.message=="deleted"){
              this.getRoles();
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





